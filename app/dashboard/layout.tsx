import DashboardHeader from "@/components/dashboard/DashboardHeader";
import React from "react";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import DashboardNavigator from "@/components/dashboard/DashboardNavigator";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    if (!session?.user) {
        redirect('/')
    }

    return (
        <>
            <div className="fixed top-0 z-10">
                <DashboardHeader />
            </div>

            <div className="flex">
                <div className="sticky top-0 flex-[0.45] w-full h-screen bg-white">
                    
                </div>
                
                <div className="flex-[0.55] w-full h-full pt-24 px-16 pb-20 flex flex-col gap-6">
                    <DashboardNavigator/>
                    <div className="max-w-[600px]">
                    {children}

                    </div>
                </div>
            </div>
        </>
    )
}