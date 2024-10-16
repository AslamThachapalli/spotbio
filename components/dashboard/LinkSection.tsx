'use client'

import { LinkType, ReturnTypeCreateLink, ReturnTypeUpdateLink } from "@/actions/links/types"
import { useState, useEffect } from "react"
import { createLink, deleteLink, getLinks, updateLink } from "@/actions/links"
import LinksList from "./LinkList"
import { AddLinkDialog } from "./AddLinkDialog"
import { toast } from "sonner"

export default function LinkSection() {
    const [showDialog, setShowDialog] = useState(false)
    const [links, setLinks] = useState<LinkType[]>([])
    const [maxPosition, setMaxPosition] = useState(0)
    const [linkToEdit, setLinkToEdit] = useState<LinkType | null>(null)

    useEffect(() => {
        const fetchLinks = async () => {
            const { links, maxPosition } = await getLinks()
            setLinks(links)
            setMaxPosition(maxPosition)
        }

        fetchLinks()
    }, [])

    const handleSave = async (title: string, link: string) => {
        const res = linkToEdit ?
            await updateLink({
                ...linkToEdit,
                title,
                link,
            }) :
            await createLink({ title, link, position: maxPosition + 1 })

        if (!res.error && res.data) {
            if(linkToEdit) {
                setLinks(links.map((link) => link.id === linkToEdit.id ? res.data! : link))
                setLinkToEdit(null)
                toast.success('Link updated')
            } else {
                setLinks([...links, res.data])
                setMaxPosition(maxPosition + 1)
                toast.success('Link created')
            }
            setShowDialog(false)
        } else {
            toast.error(res.error)
        }
    }

    const handleDelete = async (id: number) => {
        const res = await deleteLink(id)
        if (res) {
            setLinks(links.filter((link) => link.id !== id))
            toast.success('Link deleted')
            setLinkToEdit(null)
            setShowDialog(false)
        } else {
            toast.error('Failed deleting link')
        }
    }

    const handleClose = () => {
        setShowDialog(false)
        setLinkToEdit(null)
    }

    const handleTap = (link: LinkType) => {
        setLinkToEdit(link)
        setShowDialog(true)
    }

    return (
        <>
            {
                showDialog &&
                <AddLinkDialog
                    onClose={handleClose}
                    onSave={handleSave}
                    linkToEdit={linkToEdit}
                    onDelete={handleDelete}
                />
            }

            <button
                className="bg-pink-300 p-3 w-full"
                onClick={() => setShowDialog(true)}
            >
                Add Link
            </button>

            <LinksList links={links} onTap={handleTap} />
        </>
    )
}
