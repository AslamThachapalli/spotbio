'use client'

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { CreateOrUpdateLinkParams } from "@/actions/links/types"
import { createLink, deleteLink, getLinks, updateLink } from "@/actions/links"
import { toast } from "sonner"

interface LinkContextType {
    links: CreateOrUpdateLinkParams[],
    setLinks: Dispatch<SetStateAction<CreateOrUpdateLinkParams[]>>,
    maxPosition: number,
    setMaxPosition: Dispatch<SetStateAction<number>>,
    linkToEdit: CreateOrUpdateLinkParams | null,
    setLinkToEdit: Dispatch<SetStateAction<CreateOrUpdateLinkParams | null>>,
    showAddLinkDialog: boolean,
    setShowAddLinkDialog: Dispatch<SetStateAction<boolean>>,
    handleSave: (title: string, link: string) => void,
    handleDelete: (id: string) => void,
    handleClose: () => void,
    handleTap: (link: CreateOrUpdateLinkParams) => void,
}

export const LinkContext = createContext<LinkContextType | undefined>(undefined)

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [links, setLinks] = useState<CreateOrUpdateLinkParams[]>([])
    const [maxPosition, setMaxPosition] = useState<number>(0)
    const [linkToEdit, setLinkToEdit] = useState<CreateOrUpdateLinkParams | null>(null)
    const [showAddLinkDialog, setShowAddLinkDialog] = useState(false)

    useEffect(() => {
        const fetchLinks = async () => {
            const { data, error } = await getLinks()
            if (error) {
                toast.error(error)
                setLinks([])
            } else {
                setLinks(data?.links || [])
                setMaxPosition(data?.maxPosition || 0)
            }
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
            setShowAddLinkDialog(false)
        } else {
            toast.error(res.error)
        }
    }

    const handleDelete = async (id: string) => {
        const res = await deleteLink(id)
        if (res) {
            setLinks(links.filter((link) => link.id !== id))
            toast.success('Link deleted')
            setLinkToEdit(null)
            setShowAddLinkDialog(false)
        } else {
            toast.error('Failed deleting link')
        }
    }

    const handleClose = () => {
        setShowAddLinkDialog(false)
        setLinkToEdit(null)
    }

    const handleTap = (link: CreateOrUpdateLinkParams) => {
        setLinkToEdit(link)
        setShowAddLinkDialog(true)
    }

    return (
        <LinkContext.Provider value={{
            links,
            setLinks,
            maxPosition,
            setMaxPosition,
            linkToEdit,
            setLinkToEdit,
            showAddLinkDialog,
            setShowAddLinkDialog,
            handleSave,
            handleDelete,
            handleClose,
            handleTap,
        }}>
            {children}
        </LinkContext.Provider>
    )
}

export const useLink = () => {
    const context = useContext(LinkContext)
    if (!context) {
        throw new Error('useLinkContext must be used within a LinkProvider')
    }
    return context
}

