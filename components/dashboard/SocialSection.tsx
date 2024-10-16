'use client'

import { useEffect, useState } from "react"
import { SocialType } from "@/actions/socials/types";
import { createSocial, getSocials } from "@/actions/socials";
import  AddSocialDialog  from "./AddSocialDialog";
import { toast } from "sonner";
import SocialsList from "./SocialList";

export default function SocialSection() {
    const [socials, setSocials] = useState<SocialType[]>([])
    const [maxPosition, setMaxPosition] = useState(0)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        const fetchSocials = async () => {
            const { socials, maxPosition } = await getSocials()
            setSocials(socials)
            setMaxPosition(maxPosition)
        }

        fetchSocials()
    }, [])

    const handleSave = async (link: string, platformId: number) => {
        const newSocial = await createSocial({
            link,
            platformId,
            position: maxPosition + 1
        })

        if (!newSocial.error && newSocial.data) {
            setSocials([...socials, newSocial.data])
            setMaxPosition(maxPosition + 1)
            setShowDialog(false)
        } else { 
            toast.error(newSocial.error)
        }
    }

    const handleClose = () => {
        setShowDialog(false)
    }

    return (
        <>
            {
                showDialog &&
                <AddSocialDialog
                    onClose={handleClose}
                    onSave={handleSave}
                />
            }

            <h3 className="text-lg font-bold text-gray-500">Socials</h3>

            <SocialsList socials={socials} />

            <button
                className="bg-pink-300 p-3 w-full"
                onClick={() => setShowDialog(true)}
            >
                Add Social
            </button>
        </>
    )
}

