import { LinkType } from "@/actions/links/types";

export default function LinksList({ links }: { links: LinkType[] }) {
    return (
        <div className="my-10">
            {links.map((link) => (
                <div 
                    key={link.id}
                    className="bg-white px-8 py-4 w-full my-4 rounded-sm shadow-sm flex flex-col items-start justify-center cursor-pointer"
                >
                    <h3 className="text-lg font-bold">{link.title}</h3>
                    <h5 className="text-sm">{link.link}</h5>
                </div>
            ))}
        </div>
    )
}