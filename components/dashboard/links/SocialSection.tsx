'use client'

import AddSocialDialog from "./AddSocialDialog";
import SocialsList from "./SocialList";
import { useSocial } from "@/contexts/SocialsContext";

export default function SocialSection() {
    const { showAddSocialDialog, handleAddSocial } = useSocial()

    return (
        <>
            {
                showAddSocialDialog &&
                <AddSocialDialog />
            }

            <h3 className="text-lg font-bold text-gray-500">Socials</h3>

            <SocialsList />

            <button
                className="bg-white p-3 w-full flex items-center justify-center gap-2 text-blue-500 rounded-sm shadow-sm"
                onClick={handleAddSocial}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                <p className="font-bold">Add Social</p>
            </button>
        </>
    )
}

