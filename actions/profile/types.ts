import { ReturnTypeWrapper } from "@/lib/return-type"
import { Profile } from "@prisma/client"

export type ProfileType = {
    id?: string
    name: string
    bio: string
}

export type ReturnTypeProfile = ReturnTypeWrapper<ProfileType, Profile>