'use client'

import MakeDialog from "../Dialog";
import { SocialPlatform } from "@prisma/client";
import { useEffect, useState } from "react";
import { getSocialPlatforms, getSocials } from "@/actions/socials";
import { SocialType } from "@/actions/socials/types";

export default function AddSocialDialog({ onClose, onSave, socialToEdit = null, onDelete }: {
    onClose: () => void,
    onSave: (link: string, platformId: number) => void,
    socialToEdit?: SocialType | null,
    onDelete: (id: number) => void
}) {
    const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null)
    const [link, setLink] = useState(socialToEdit?.link || '')
    const [existingSocials, setExistingSocials] = useState<SocialType[]>([])

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

        const fetchExistingSocials = async () => {
            const { socials } = await getSocials()
            setExistingSocials(socials)
        }

        if (socialToEdit) {
            fetchSelectedPlatform()
        }
        fetchSocialPlatforms()
        fetchExistingSocials()
    }, [])

    const handleAddClick = (platform: SocialPlatform) => {
        if (isPlatformInSocials(platform.id)) {
            const selectedSocial = existingSocials.find(social => social.platformId === platform.id)
            setLink(selectedSocial?.link || '')
        } else {
            setLink('')
        }
        setSelectedPlatform(platform)
    }

    const handleBack = () => {
        if (socialToEdit) {
            onClose()
        } else {
            setSelectedPlatform(null)
            setLink('')
        }
    }

    const handleSave = async () => {
        if (!selectedPlatform) return

        onSave(link, selectedPlatform.id)
    }

    const isPlatformInSocials = (platformId: number) => {
        return existingSocials.some(social => social.platformId === platformId)
    }

    return (
        <MakeDialog
            onClose={onClose}
        >
            <div
                className="relative w-96 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto"
            >
                <div className="sticky top-0 right-0 left-0 flex items-center mb-4 px-6 py-3 border-b bg-white">
                    {
                        selectedPlatform &&
                        <button
                            onClick={handleBack}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    }
                    <h3 className="text-lg font-bold text-black flex-grow flex justify-center ">
                        {selectedPlatform ? `${selectedPlatform.name}` : 'Add Social'}
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
                    <div className="px-6 py-1">
                        {socialPlatforms.map((platform) => (
                            <div key={platform.id} className="flex justify-between items-center mb-2 font-semibold border py-2 px-4 rounded-md">
                                <span>{platform.name}</span>
                                <button
                                    onClick={() => handleAddClick(platform)}
                                    className={isPlatformInSocials(platform.id) ? "text-yellow-500" : "text-blue-500"}
                                >
                                    {isPlatformInSocials(platform.id) ? "Edit" : "Add"}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder={`Enter ${selectedPlatform.name} link`}
                            className=" p-2 border rounded m-5"
                        />
                        {socialToEdit && (
                            <button
                                onClick={() => onDelete(socialToEdit!.id!)}
                                className="text-red-500 font-semibold tracking-wide mb-3"
                            >
                                Remove Icon
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            className="bg-default-gradient text-white px-4 py-2 hover:bg-green-600 w-full font-bold"
                        >
                            Save
                        </button>
                    </div>
                )}

                {!selectedPlatform && <div className="sticky bottom-0 right-0 left-0 h-6 bg-white" />}
            </div>
        </MakeDialog>
    )
}