'use client'

import MakeDialog from "../Dialog";
import { SocialPlatform } from "@prisma/client";
import { useEffect, useState } from "react";
import { getSocialPlatforms } from "@/actions/socials";
import { SocialType } from "@/actions/socials/types";

export default function AddSocialDialog({ onClose, onSave, socialToEdit, onDelete }: { 
    onClose: () => void, 
    onSave: (link: string, platformId: number) => void,
    socialToEdit?: SocialType | null,
    onDelete: (id: number) => void
}) {
    const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null)
    const [link, setLink] = useState(socialToEdit?.link || '')

    useEffect(() => {
        const fetchSocialPlatforms = async () => {
            const platforms = await getSocialPlatforms() as SocialPlatform[]
            setSocialPlatforms(platforms)
        }

        const fetchSelectedPlatform = async () => {
            if (socialToEdit) {
                const platform = await getSocialPlatforms(socialToEdit.platformId) as SocialPlatform
                setSelectedPlatform(platform)
            }
        }

        if (socialToEdit) {
            fetchSelectedPlatform()
        } 
        fetchSocialPlatforms()
    }, [])

    const handleAddClick = (platform: SocialPlatform) => {
        setSelectedPlatform(platform)
    }

    const handleBack = () => {
        setSelectedPlatform(null)
        setLink('')
    }

    const handleSave = async () => {
        if (!selectedPlatform) return

        onSave(link, selectedPlatform.id)
    }

    return (
        <MakeDialog
            onClose={onClose}
        >
            <div
                className="w-96 p-6 bg-white rounded-lg shadow-xl"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-500">
                        {selectedPlatform ? `Add ${selectedPlatform.name} Link` : 'Add Social'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {!selectedPlatform ? (
                    <div className="my-10">
                        {socialPlatforms.map((platform) => (
                            <div key={platform.id} className="flex justify-between items-center mb-2">
                                <span>{platform.name}</span>
                                <button
                                    onClick={() => handleAddClick(platform)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="my-10">
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder={`Enter ${selectedPlatform.name} link`}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Back
                            </button>
                            {socialToEdit && (
                                <button
                                    onClick={() => onDelete(socialToEdit.id!)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MakeDialog>
    )
}