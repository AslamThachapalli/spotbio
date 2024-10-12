import DashboardHeader from "@/components/DashboardHeader";
import React from "react";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    if (!session?.user) {
        redirect('/')
    }

    return (
        <div>
            <DashboardHeader/>
            {children}
        </div>
    )
}