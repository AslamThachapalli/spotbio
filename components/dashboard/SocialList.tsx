import { SocialType } from "@/actions/socials/types";

export default function SocialsList({ socials, onTap }: { socials: SocialType[], onTap: (social: SocialType) => void }) {
    return (
        <div className="my-10">
            {socials.map((social) => (
                <div key={social.id} 
                    onClick={() => onTap(social)}
                >
                    {social.link}
                </div>
            ))}
        </div>
    )
}