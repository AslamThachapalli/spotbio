'use client'

import MakeDialog from "../Dialog";
import { useState } from "react";
import { LinkType } from "@/actions/links/types";

export function AddLinkDialog({ onClose, onSave, linkToEdit, onDelete }: {
    onClose: () => void,
    onSave: (title: string, link: string) => void,
    linkToEdit?: LinkType | null,
    onDelete: (id: number) => void
}) {
    const [title, setTitle] = useState(linkToEdit?.title || "");
    const [link, setLink] = useState(linkToEdit?.link || "");

    const handleSave = () => {
        onSave(title, link)
        setTitle('')
        setLink('')
    };

    return (
        <MakeDialog
            onClose={onClose}
        >
            <div
                className="w-96 bg-white rounded-lg shadow-xl"
            >
                <div className="flex justify-between items-center mb-4 px-6 py-4 border-b">
                    <h2 className="font-bold">{linkToEdit ? 'Edit Link' : 'Add New Link'}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-4 flex flex-col gap-4 mb-4 font-semibold">
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded outline-none bg-[#F3F3F4] hover:bg-[#eaeaeb] focus:bg-white focus:border-[#CF59D8]"
                    />
                    
                    <input
                        type="text"
                        placeholder="Enter link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full p-2 border rounded outline-none bg-[#F3F3F4] hover:bg-[#eaeaeb] focus:bg-white focus:border-[#CF59D8]"
                    />
                    {
                        linkToEdit &&
                        <div className="flex justify-between items-center mt-4 tracking-wider font-semibold">
                            <button
                                onClick={() => onDelete(linkToEdit.id!)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    }
                </div>
                <button
                    onClick={handleSave}
                    className="w-full p-2 bg-default-gradient text-white font-bold"
                >
                    Save
                </button>
            </div>
        </MakeDialog>
    );
}