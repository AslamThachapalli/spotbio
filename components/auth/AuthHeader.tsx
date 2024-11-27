'use client'

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="w-screen h-16 border-b-[1px] flex items-center bg-white">
            <div className="max-width w-full mx-auto flex justify-between items-center">
                <p className="font-bokor text-2xl">Spotbio</p>

                <div className="flex gap-2">
                    <p>{pathname === '/signup' ? 'Already have an account?' : "Don't have an account?"}</p>
                    <button
                        onClick={() => {
                            pathname === '/signup' ? 
                            router.push('/signin') : 
                            router.push('/signup')
                        }}
                        className="text-blue-700 font-semibold"
                    >
                        {pathname === '/signup' ? 'Signin' : 'Signup'}
                    </button>
                </div>
            </div>
        </div>
    )
}