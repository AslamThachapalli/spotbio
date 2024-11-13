'use client'

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { SocialWithPlatform } from "@/actions/socials/types"
import { createSocial, deleteSocial, getSocialPlatforms, getSocials, updateSocial } from "@/actions/socials"
import { toast } from "sonner"
import { SocialPlatform } from "@prisma/client"

interface SocialContextType {
    socials: SocialWithPlatform[],
    setSocials: Dispatch<SetStateAction<SocialWithPlatform[]>>,
    maxPosition: number,
    setMaxPosition: Dispatch<SetStateAction<number>>,
    socialToEdit: SocialWithPlatform | null,
    setSocialToEdit: Dispatch<SetStateAction<SocialWithPlatform | null>>,
    showAddSocialDialog: boolean,
    setShowAddSocialDialog: Dispatch<SetStateAction<boolean>>,
    handleSave: (link: string, platformId: string) => void,
    handleDelete: (id: string) => void,
    handleCloseDialog: () => void,
    handleEdit: (social: SocialWithPlatform) => void,
    handleAddSocial: () => void,
    handleBack: () => void,
    handleAddOrEditSocial: (platform: SocialPlatform, isEdit: boolean) => void,
    socialPlatforms: SocialPlatform[],
    setSocialPlatforms: Dispatch<SetStateAction<SocialPlatform[]>>,
    selectedPlatform: SocialPlatform | null,
    setSelectedPlatform: Dispatch<SetStateAction<SocialPlatform | null>>,
}

export const SocialContext = createContext<SocialContextType | undefined>(undefined)

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socials, setSocials] = useState<SocialWithPlatform[]>([])
    const [maxPosition, setMaxPosition] = useState<number>(0)
    const [socialToEdit, setSocialToEdit] = useState<SocialWithPlatform | null>(null)
    const [showAddSocialDialog, setShowAddSocialDialog] = useState(false)
    const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null)

    const fetchSocials = async () => {
        const { data, error } = await getSocials()

        if (error) {
            toast.error(error)
            setSocials([])
        } else {
            setSocials(data?.socials || [])
            setMaxPosition(data?.maxPosition || 0)
        }
    }

    const fetchSocialPlatforms = async () => {
        const { data, error } = await getSocialPlatforms()

        if (error) {
            toast.error(error)
            setSocialPlatforms([])
        } else {
            setSocialPlatforms(data as SocialPlatform[])
        }
    }

    useEffect(() => {
        fetchSocials()
        fetchSocialPlatforms()
    }, [])

    const handleSave = async (link: string, platformId: string) => {
        const { data, error } = socialToEdit ?
            await updateSocial({
                ...socialToEdit,
                link,
            }) :
            await createSocial({ link, platformId, position: maxPosition + 1 })

        if (!error && data) {
            if (socialToEdit) {
                setSocials(socials.map((social) => social.id === socialToEdit.id ? data : social))
                setSocialToEdit(null)
                toast.success('Social updated')
            } else {
                setSocials([...socials, data])
                setMaxPosition(maxPosition + 1)
                toast.success('Social created')
            }
            setShowAddSocialDialog(false)
        } else {
            toast.error(error)
        }
    }

    const handleDelete = async (id: string) => {
        const { data, error } = await deleteSocial(id)

        if (!error && data) {
            setSocials(socials.filter((social) => social.id !== id))
            setSocialToEdit(null)
            setShowAddSocialDialog(false)
            toast.success('Social deleted')
        } else {
            toast.error('Delete failed')
        }
    }

    const handleCloseDialog = () => {
        setShowAddSocialDialog(false)
        setSocialToEdit(null)
        setSelectedPlatform(null)
    }

    const handleEdit = (social: SocialWithPlatform) => {
        setSocialToEdit(social)
        setSelectedPlatform(socialPlatforms.find(platform => platform.id === social.platformId) || null)
        setShowAddSocialDialog(true)
    }

    const handleAddSocial = () => {
        setSelectedPlatform(null)
        setSocialToEdit(null)
        setShowAddSocialDialog(true)
    }

    const handleBack = () => {
        setSocialToEdit(null)
        setSelectedPlatform(null)
    }

    const handleAddOrEditSocial = (platform: SocialPlatform, isEdit: boolean) => {
        setSelectedPlatform(platform)
        if (isEdit) {
            setSocialToEdit(socials.find(social => social.platformId == platform.id)!)
        }
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
            handleCloseDialog,
            handleEdit,
            handleAddSocial,
            handleBack,
            handleAddOrEditSocial,
            socialPlatforms,
            setSocialPlatforms,
            selectedPlatform,
            setSelectedPlatform,
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
