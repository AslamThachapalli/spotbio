import { LinkProvider } from "@/contexts/LinkContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { SocialProvider } from "@/contexts/SocialsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LinkProvider>
                <SocialProvider>
                    <ProfileProvider>
                        {children}
                    </ProfileProvider>
                </SocialProvider>
            </LinkProvider>
        </>
    )
}