'use client'

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { LuExternalLink } from "react-icons/lu";

export default function DashboardHeader() {
    const session = useSession()

    const username = session.data?.user?.name!

    return (
        <div className="w-screen flex justify-center items-center border-b-[1px] bg-white">
            <div className="max-width h-14 w-full px-4 flex justify-between items-center">
                <p className="font-bokor text-2xl">Spotbio</p>
                <div className="flex gap-4 items-center gap-x-4">
                    <a
                        className="text-blue-700 underline font-semibold flex items-center gap-x-1"
                        href={`https://spotbio.app/${username}`}
                        target="_blank"
                    >
                        {`spotbio.app/${username}`}
                        <LuExternalLink className="inline-block h-4 w-4 " />
                    </a>
                    <SignoutButton />
                </div>
            </div>
        </div>
    )
}

function SignoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="font-semibold px-3 py-1 border-[1px] border-slate-500 text-slate-500 rounded hover:bg-slate-500 hover:text-white transition-colors duration-300"
        >
            Signout
        </button>
    )
}