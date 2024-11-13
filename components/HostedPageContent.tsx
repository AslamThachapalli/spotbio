import { getLinksByUsername } from "@/actions/links"
import { getProfileByUsername } from "@/actions/profile"
import { getSocialPlatforms, getSocialsByUsername } from "@/actions/socials"
import SocialIcon from "@/components/SocialIcon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { SocialPlatform } from "@prisma/client"

import Link from 'next/link'    

export async function HostedPageContent({ username, isPreview = false }: { username: string, isPreview?: boolean }) {
    const { data: profile, error } = await getProfileByUsername(username)
    const { socials } = await getSocialsByUsername(username)
    const { data: links } = await getLinksByUsername(username)
    const socialPlatforms: SocialPlatform[] = await getSocialPlatforms() as SocialPlatform[]

    const getPlatformType = (id: string) => {
        return socialPlatforms.find(platform => platform.id === id)?.type!
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>
    }

    return (
        <div className={cn(
            "mx-auto text-center max-w-3xl",
            !isPreview && "sm:mt-10 p-2 sm:p-4",
            isPreview && "p-2",
        )}>
            <div className={cn(
                "flex h-12",
            )}>
                {/* TODO: Add Share Button */}
            </div>

            <div className="mb-4 flex flex-col items-center gap-1">
                <Avatar className={cn(
                    !isPreview && "w-16 sm:w-32 h-16 sm:h-32 mb-2",
                    isPreview && "w-16 h-16 mb-2"
                )}>
                    <AvatarImage src={profile?.avatar || ""} />
                    <AvatarFallback>
                        {profile?.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <h1 className={cn(
                    "text-center font-bold",
                    !isPreview && "text-xl sm:text-4xl",
                    isPreview && "text-xl"
                )}>
                    {profile?.name}
                </h1>

                <p className={cn(
                    "text-center font-bold -mt-1",
                    !isPreview && "text-sm sm:text-base",
                    isPreview && "text-sm"
                )}>
                    {profile?.bio}
                </p>
            </div>

            <div className="flex justify-center mb-10">
                <div className="flex flex-wrap gap-4 justify-center">
                    {socials.map(social => (
                        <Link key={social.id} href={social.link} target="_blank">
                            <SocialIcon
                                type={getPlatformType(social.platformId)}
                                width="32px"
                                height="32px"
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <ul className={cn(
                    "list-none flex flex-col gap-4",
                    !isPreview && "px-2 sm:px-4",
                    isPreview && "px-2"
                )}>
                    {links?.links.map(link => (
                        <li key={link.id} className="border rounded-full shadow-md transition-transform transform hover:scale-105">
                            <Link href={link.link} target="_blank" className="block w-full">
                                <h3 className={cn(
                                    "font-semibold text-center",
                                    !isPreview && "p-2 sm:p-4 text-lg sm:text-xl",
                                    isPreview && "p-2 text-lg"
                                )}>{link.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}