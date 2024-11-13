'use client'

import MakeDialog from "../../Dialog";
import { SocialPlatform } from "@prisma/client";
import { useState } from "react";
import Input from "../../Input";
import { useSocial } from "@/contexts/SocialsContext";

export default function AddSocialDialog() {
    const {
        handleSave: handleSaveSocial,
        handleDelete,
        handleCloseDialog,
        socials,
        socialToEdit,
        selectedPlatform,
        socialPlatforms,
        handleBack,
        handleAddOrEditSocial
    } = useSocial()
    const [link, setLink] = useState(socialToEdit?.link || '')
    const [error, setError] = useState('')

    const handleAddClick = (platform: SocialPlatform) => {
        if (isPlatformInSocials(platform.id)) {
            handleAddOrEditSocial(platform, true)
            setLink(socials.find(social => social.platformId == platform.id)!.link)
        } else {
            handleAddOrEditSocial(platform, false)
            setLink('')
        }
        setError('')
    }

    const validateLink = (link: string): boolean => {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        return urlPattern.test(link)
    }

    const handleSave = async () => {
        if (!selectedPlatform) return

        if (!link.trim()) {
            setError('Link is required')
            return
        }

        if (!validateLink(link)) {
            setError('Please enter a valid URL')
            return
        }

        handleSaveSocial(link, selectedPlatform.id)
    }

    const isPlatformInSocials = (platformId: string) => {
        return socials.some(social => social.platformId === platformId)
    }

    return (
        <MakeDialog
            onClose={handleCloseDialog}
        >
            <div
                className="relative w-96 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto"
            >
                <div className="sticky top-0 right-0 left-0 flex items-center mb-4 px-6 py-3 border-b bg-white">
                    {(socialToEdit || selectedPlatform) && <button
                        onClick={handleBack}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>}
                    <h3 className="text-lg font-bold text-black flex-grow flex justify-center ">
                        {!selectedPlatform ? 'Add Social': `${selectedPlatform.type}`}
                    </h3>
                    <button
                        onClick={handleCloseDialog}
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
                                <span>{platform.type}</span>
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
                    <div>
                        <div className="flex flex-col gap-2 px-6 py-6">
                            <Input
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value)
                                    setError('')
                                }}
                                placeholder={`Enter ${selectedPlatform.type} link`}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {socialToEdit && (
                                <button
                                    onClick={() => handleDelete(socialToEdit!.id!)}
                                    className="text-red-500 font-semibold tracking-wide mb-3"
                                >
                                    Remove Icon
                                </button>
                            )}

                        </div>
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