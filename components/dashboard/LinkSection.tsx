'use client'

import { LinkType } from "@/actions/links/types"
import { useState, useEffect } from "react"
import { createLink, getLinks } from "@/actions/links"
import LinksList from "./LinkList"
import { AddLinkDialog } from "./AddLinkDialog"
import { toast } from "sonner"

export default function LinkSection() {
    const [showDialog, setShowDialog] = useState(false)
    const [links, setLinks] = useState<LinkType[]>([])
    const [maxPosition, setMaxPosition] = useState(0)

    useEffect(() => {
        const fetchLinks = async () => {
            const { links, maxPosition } = await getLinks()
            setLinks(links)
            setMaxPosition(maxPosition)
        }

        fetchLinks()
    }, [])

    const handleSave = async (title: string, link: string) => {
        const newLink = await createLink({ title, link, position: maxPosition + 1 })
        if (!newLink.error && newLink.data) {
            setLinks([...links, newLink.data])
            setMaxPosition(maxPosition + 1)
        setShowDialog(false)
        } else {
            toast.error(newLink.error)
        }
    }

    const handleClose = () => {
        setShowDialog(false)
    }

    return (
        <>
            {
                showDialog &&
                <AddLinkDialog
                    onClose={handleClose}
                    onSave={handleSave}
                />
            }

            <button
                className="bg-pink-300 p-3 w-full"
                onClick={() => setShowDialog(true)}
            >
                Add Link
            </button>

            <LinksList links={links} />
        </>
    )
}
