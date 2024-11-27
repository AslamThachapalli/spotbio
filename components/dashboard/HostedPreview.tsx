import { useLink } from "@/contexts/LinkContext";
import { useSocial } from "@/contexts/SocialsContext";
import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import SocialIcon from "../SocialIcon";

export default function HostedPreview({ isPreview = true }: { isPreview?: boolean }) {
    const { links } = useLink()
    const { socials } = useSocial()
    const { profile } = useProfile()

    return (
        <div className="bg-white rounded-2xl shadow-xl border-black border-[9px] h-4/6 w-[300px] overflow-hidden overflow-y-auto">

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
                        {socials?.map(social => (
                            <Link key={social.id} href={social.link} target="_blank">
                                <SocialIcon
                                    type={social.platform.type}
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
                        {links?.map(link => (
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
        </div>
    )
}