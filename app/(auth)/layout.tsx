import AuthHeader from "@/components/auth/AuthHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    if (session?.user) {
        redirect('/dashboard')
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-none">
                <AuthHeader />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}