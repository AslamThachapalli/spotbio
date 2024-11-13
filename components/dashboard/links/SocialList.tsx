'use client'

import SocialIcon from "@/components/SocialIcon";
import { useSocial } from "@/contexts/SocialsContext";

export default function SocialsList() {
    const { handleEdit, socials } = useSocial()

    return (
        <div className="my-5">
            {socials.map((social) => (
                <div
                    key={social.id}
                    className="bg-white px-8 py-4 w-full my-4 rounded-sm shadow-sm flex items-start justify-between cursor-pointer"
                    onClick={() => handleEdit(social)}
                >
                    <p className="font-semibold flex items-center gap-2">
                        <SocialIcon type={social.platform.type} />
                        {social.platform.type}
                    </p>
                    <p className="text-gray-500 font-semibold">{social.link}</p>
                </div>
            ))}
        </div>
    )
}