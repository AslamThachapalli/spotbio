'use client'

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { SocialType } from "@/actions/socials/types"
import { createSocial, deleteSocial, getSocialPlatforms, getSocials, updateSocial } from "@/actions/socials"
import { toast } from "sonner"
import { PlatformType } from "@prisma/client"
import { SocialPlatform } from "@prisma/client"

interface SocialContextType {
    socials: SocialType[],
    setSocials: Dispatch<SetStateAction<SocialType[]>>,
    maxPosition: number,
    setMaxPosition: Dispatch<SetStateAction<number>>,
    socialToEdit: SocialType | null,
    setSocialToEdit: Dispatch<SetStateAction<SocialType | null>>,
    showAddSocialDialog: boolean,
    setShowAddSocialDialog: Dispatch<SetStateAction<boolean>>,
    handleSave: (link: string, platformId: string) => void,
    handleDelete: (id: string) => void,
    handleClose: () => void,
    handleTap: (social: SocialType) => void,
    socialData: Array<SocialType & { platformName: PlatformType }>,
    setSocialData: Dispatch<SetStateAction<Array<SocialType & { platformName: PlatformType }>>>
    socialPlatforms: SocialPlatform[],
    setSocialPlatforms: Dispatch<SetStateAction<SocialPlatform[]>>,
    selectedPlatform: SocialPlatform | null,
    setSelectedPlatform: Dispatch<SetStateAction<SocialPlatform | null>>,
    existingSocials: SocialType[],
    setExistingSocials: Dispatch<SetStateAction<SocialType[]>>
}

export const SocialContext = createContext<SocialContextType | undefined>(undefined)

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socials, setSocials] = useState<SocialType[]>([])
    const [maxPosition, setMaxPosition] = useState<number>(0)
    const [socialToEdit, setSocialToEdit] = useState<SocialType | null>(null)
    const [showAddSocialDialog, setShowAddSocialDialog] = useState(false)
    const [socialData, setSocialData] = useState<Array<SocialType & { platformName: PlatformType }>>([])
    const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null)
    const [existingSocials, setExistingSocials] = useState<SocialType[]>([])

    useEffect(() => {
        const fetchSocialData = async () => {
            const data = await Promise.all(socials.map(async (social) => {
                const platform = await getSocialPlatforms(social.platformId) as SocialPlatform
                return { ...social, platformName: platform.type }
            }))
            setSocialData(data)
        }

        fetchSocialData()
    }, [socials])

    useEffect(() => {
        const fetchSocials = async () => {
            const { socials, maxPosition } = await getSocials()
            setSocials(socials)
            setMaxPosition(maxPosition)
        }

        fetchSocials()
    }, [])

    useEffect(() => {
        const fetchSocialPlatforms = async () => {
            const platforms = await getSocialPlatforms() as SocialPlatform[]
            setSocialPlatforms(platforms)
        }

        const fetchSelectedPlatform = async () => {
            if (socialToEdit) {
                const platform = await getSocialPlatforms(socialToEdit.platformId) as SocialPlatform
                setSelectedPlatform(platform)
            }
        }

        const fetchExistingSocials = async () => {
            const { socials } = await getSocials()
            setExistingSocials(socials)
        }

        if (socialToEdit) {
            fetchSelectedPlatform()
        }
        fetchSocialPlatforms()
        fetchExistingSocials()
    }, [])

    const handleSave = async (link: string, platformId: string) => {
        const res = socialToEdit ?
            await updateSocial({
                ...socialToEdit,
                link,
            }) :
            await createSocial({ link, platformId, position: maxPosition + 1 })

        if (!res.error && res.data) {
            if (socialToEdit) {
                setSocials(socials.map((social) => social.id === socialToEdit.id ? res.data! : social))
                setSocialToEdit(null)
                toast.success('Social updated')
            } else {
                setSocials([...socials, res.data])
                setMaxPosition(maxPosition + 1)
                toast.success('Social created')
            }
            setShowAddSocialDialog(false)
        } else {
            toast.error(res.error)
        }
    }

    const handleDelete = async (id: string) => {
        const res = await deleteSocial(id)
        if (res) {
            setSocials(socials.filter((social) => social.id !== id))
            toast.success('Social deleted')
            setSocialToEdit(null)
            setShowAddSocialDialog(false)
        } else {
            toast.error('Failed deleting social')
        }
    }

    const handleClose = () => {
        setShowAddSocialDialog(false)
        setSocialToEdit(null)
    }

    const handleTap = (social: SocialType) => {
        setSocialToEdit(social)
        setShowAddSocialDialog(true)
    }

    return (
        <SocialContext.Provider value={{
            socials,
            setSocials,
            maxPosition,
            setMaxPosition,
            socialToEdit,
            setSocialToEdit,
            showAddSocialDialog,
            setShowAddSocialDialog,
            handleSave,
            handleDelete,
            handleClose,
            handleTap,
            socialData,
            setSocialData,
            socialPlatforms,
            setSocialPlatforms,
            selectedPlatform,
            setSelectedPlatform,
            existingSocials,
            setExistingSocials
        }}>
            {children}
        </SocialContext.Provider>
    )
}

export const useSocial = () => {
    const context = useContext(SocialContext)
    if (!context) {
        throw new Error('useSocialContext must be used within a SocialProvider')
    }
    return context
}
