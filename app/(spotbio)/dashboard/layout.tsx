'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { redirect } from "next/navigation"
import DashboardNavigator from "@/components/dashboard/DashboardNavigator";
import HostedPreview from "@/components/dashboard/HostedPreview";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isLoading: isProfileLoading, profile } = useProfile()

    useEffect(() => {
        if (!isProfileLoading && !profile) {
            redirect('/create-profile')
        }
    }, [profile, isProfileLoading])

    if (isProfileLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin" />
        </div>
    }

    return (
        <>
            <div className="fixed top-0 z-10">
                <DashboardHeader />
            </div>

            <div className="flex">
                <div className="sticky top-0 flex-[0.45] w-full h-screen bg-white">
                    <div className="h-full overflow-y-auto flex justify-center items-center">
                        <HostedPreview />
                    </div>
                </div>

                <div className="flex-[0.55] w-full h-full pt-24 px-16 pb-20 flex flex-col gap-6">
                    <DashboardNavigator />
                    <div className="max-w-[600px]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}