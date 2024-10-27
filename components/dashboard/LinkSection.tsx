'use client'

import { LinkType } from "@/actions/links/types"
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
            if (linkToEdit) {
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
                className="bg-default-gradient p-3 w-full flex items-center justify-center gap-2 text-white rounded-md shadow-sm"
                onClick={() => setShowDialog(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>

                <p className="font-bold">Add Link</p>
            </button>

            <LinksList links={links} onTap={handleTap} />
        </>
    )
}
