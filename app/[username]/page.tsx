import { getLinksByUsername } from "@/actions/links"
import { getProfileByUsername } from "@/actions/profile"
import { getSocialsByUsername } from "@/actions/socials"

import Link from 'next/link'

export default async function HostedPage({params: {username}}: { params: {
    username: string
}}) {
    const { data: profile, error } = await getProfileByUsername(username)
    const { socials }  = await getSocialsByUsername(username)
    const { links } = await getLinksByUsername(username)

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>
    }

    return (
        <div className="container mx-auto p-4 text-center max-w-3xl mt-10">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">{profile?.name}</h1>
                <p className="text-gray-600">{profile?.bio}</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="flex flex-wrap gap-4">
                    {socials.map(social => (
                        <Link key={social.id} href={social.link} target="_blank">
                            {social.link}
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <ul className="list-none">
                    {links.map(link => (
                        <li key={link.id} className=" border rounded-lg shadow-md">
                            <Link href={link.link} target="_blank" className="w-full">
                                <h3 className="text-xl font-semibold p-4">{link.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}