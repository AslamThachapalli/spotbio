import { SocialType } from "@/actions/socials/types";

export default function SocialsList({ socials }: { socials: SocialType[] }) {
    return (
        <div className="my-10">
            {socials.map((social) => (
                <div key={social.id}>{social.link}</div>
            ))}
        </div>
    )
}