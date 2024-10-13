'use client'

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
    const session = useSession()

    const username = session.data?.user?.name!

    return (
        <div className="w-screen flex justify-center items-center border-b-[1px] bg-white">
            <div className="max-width h-14 w-full px-4 flex justify-between items-center">
                <p>Spotbio</p>
                <div className="flex gap-4 items-center">
                    <a
                        className="text-blue-500 underline font-semibold"
                        href={`http://localhost:3000/${username}`}
                        target="_blank"
                    >
                        {`spotbio.app/${username}`}
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
            className="font-semibold "
        >
            Signout
        </button>
    )
}