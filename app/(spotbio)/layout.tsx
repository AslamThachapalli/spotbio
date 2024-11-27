'use client'

import { redirect } from "next/navigation";
import Providers from "./providers";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const session = useSession()

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            redirect('/')
        }
    }, [session.status])

    return (
        <Providers>
            {children}
        </Providers>
    )
}
