import { useLink } from "@/contexts/LinkContext";

export default function LinksList() {
    const { links, handleTap } = useLink()

    return (
        <div className="my-10">
            {
                links.map((link) => (
                    <div
                        key={link.id}
                        className="bg-white px-8 py-4 w-full my-4 rounded-sm shadow-sm flex flex-col items-start justify-center cursor-pointer"
                        onClick={() => {
                            handleTap(link)
                        }}
                    >
                        <h3 className="text-lg font-bold leading-5">{link.title}</h3>
                        <h5 className="text-sm font-semibold">{link.link}</h5>
                    </div>
                ))
            }
        </div>
    )
}