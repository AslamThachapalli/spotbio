import { ReturnType } from "@/lib/return-type"
import { Profile } from "@prisma/client"

export type ProfileType = {
    id?: string
    name: string
    bio: string
    avatar: File | null
}

export type ReturnTypeProfile = ReturnType<Profile>