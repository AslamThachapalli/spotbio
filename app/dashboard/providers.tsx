import { LinkProvider } from "@/contexts/LinkContext";
import { SocialProvider } from "@/contexts/SocialsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LinkProvider>
                <SocialProvider>
                    {children}
                </SocialProvider>
            </LinkProvider>
        </>
    )
}