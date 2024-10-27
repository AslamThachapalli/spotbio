'use client'

import { getSocialPlatforms } from "@/actions/socials";
import { SocialType } from "@/actions/socials/types";
import { SocialPlatform } from "@prisma/client";
import { useEffect, useState } from "react";

export default function SocialsList({ socials, onTap }: { socials: SocialType[], onTap: (social: SocialType) => void }) {
    const [socialData, setSocialData] = useState<Array<SocialType & { platformName: string }>>([])

    useEffect(() => {
        const fetchSocialData = async () => {
            const data = await Promise.all(socials.map(async (social) => {
                const platform = await getSocialPlatforms(social.platformId) as SocialPlatform
                return { ...social, platformName: platform.name }
            }))
            setSocialData(data)
        }     

        fetchSocialData()
    }, [socials])

    return (
        <div className="my-5">
            {socialData.map((social) => (
                <div 
                key={social.id} 
                className="bg-white px-8 py-4 w-full my-4 rounded-sm shadow-sm flex items-start justify-between cursor-pointer"
                    onClick={() => onTap(social)}
                >
                    <p className="font-semibold">{social.platformName}</p>
                    <p className="text-gray-500 font-semibold">{social.link}</p>
                </div>
            ))}
        </div>
    )
}