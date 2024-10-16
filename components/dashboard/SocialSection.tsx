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

    const handleSave = async (link: string, platformId: number) => {
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

    const handleDelete = async (id: number) => {
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
                className="bg-pink-300 p-3 w-full"
                onClick={() => setShowDialog(true)}
            >
                Add Social
            </button>
        </>
    )
}

