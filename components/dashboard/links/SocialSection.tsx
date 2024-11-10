'use client'

import { useEffect, useState } from "react"
import { SocialType } from "@/actions/socials/types";
import { createSocial, deleteSocial, getSocials, updateSocial } from "@/actions/socials";
import AddSocialDialog from "./AddSocialDialog";
import { toast } from "sonner";
import SocialsList from "./SocialList";

export default function SocialSection() {
    const [socials, setSocials] = useState<SocialType[]>([])
    const [maxPosition, setMaxPosition] = useState(0)
    const [showDialog, setShowDialog] = useState(false)
    const [socialToEdit, setSocialToEdit] = useState<SocialType | null>(null)

    useEffect(() => {
        const fetchSocials = async () => {
            const { socials, maxPosition } = await getSocials()
            setSocials(socials)
            setMaxPosition(maxPosition)
        }

        fetchSocials()
    }, [])

    const handleSave = async (link: string, platformId: string) => {
        const res = socialToEdit ? await updateSocial({
            ...socialToEdit,
            link,
        }) : await createSocial({
            link,
            platformId,
            position: maxPosition + 1
        })

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
            setShowDialog(false)
        } else {
            toast.error(res.error)
        }
    }

    const handleClose = () => {
        setShowDialog(false)
        setSocialToEdit(null)
    }

    const handleTap = (social: SocialType) => {
        setSocialToEdit(social)
        setShowDialog(true)
    }

    const handleDelete = async (id: string) => {
        const res = await deleteSocial(id)
        if (res) {
            setSocials(socials.filter((social) => social.id !== id))
            toast.success('Social deleted')
            setSocialToEdit(null)
            setShowDialog(false)
        } else {
            toast.error('Failed deleting social')
        }
    }

    return (
        <>
            {
                showDialog &&
                <AddSocialDialog
                    onClose={handleClose}
                    onSave={handleSave}
                    socialToEdit={socialToEdit}
                    onDelete={handleDelete}
                />
            }

            <h3 className="text-lg font-bold text-gray-500">Socials</h3>

            <SocialsList socials={socials} onTap={handleTap} />

            <button
                className="bg-white p-3 w-full flex items-center justify-center gap-2 text-blue-500 rounded-sm shadow-sm"
                onClick={() => setShowDialog(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                <p className="font-bold">Add Social</p>
            </button>
        </>
    )
}

