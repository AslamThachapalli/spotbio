'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LandingHeader() {
    const session =  useSession()
    const router = useRouter()

    return (
        <button
        onClick={() => {
            if(session.data?.user){
                router.push('/dashboard')
            } else {
                router.push('/signin')
            }
        }}
        >
            Authenticate
        </button>
    )
}