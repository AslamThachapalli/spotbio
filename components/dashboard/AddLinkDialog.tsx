'use client'
import MakeDialog from "../Dialog";
import { useState } from "react";

export function AddLinkDialog({ onClose, onSave }: { onClose: () => void, onSave: (title: string, link: string) => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

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
                className="w-96 p-6 bg-white rounded-lg shadow-xl"
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
        </MakeDialog>
    );
}