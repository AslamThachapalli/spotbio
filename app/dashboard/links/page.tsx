'use client'
import { createLink, getLinks } from "@/actions/links";
import { LinkType } from "@/actions/links/types";
import { useEffect, useState } from "react"

export default function LinksPage() {
    const [showDialog, setShowDialog] = useState(false);
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
        if (newLink.data) {
            setLinks([...links, newLink.data])
            setMaxPosition(maxPosition + 1)
        }
        setShowDialog(false)
    }

    return (
        <>
            {showDialog && <Dialog
                onClose={() => { setShowDialog(false) }}
                onSave={handleSave}
            />}
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

function LinksList({ links }: { links: LinkType[] }) {
    return (
        <div className="my-8">
            {links.map((link) => (
                <div 
                    key={link.id}
                    className="bg-white px-8 py-4 w-full my-4 rounded-sm shadow-sm flex flex-col items-start justify-center cursor-pointer"
                >
                    <h3 className="text-lg font-bold">{link.title}</h3>
                    <h5 className="text-sm">{link.link}</h5>
                </div>
            ))}
        </div>
    )
}

export function Dialog({ onClose, onSave }: { onClose: () => void, onSave: (title: string, link: string) => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleSave = () => {
        onSave(title, link)
        setTitle('')
        setLink('')
    };

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
            onClick={onClose}
        >
            <div
                className="w-96 p-6 bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Link</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="text"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    onClick={handleSave}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
