'use server'

import db from "@/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ProfileType, ReturnTypeProfile } from "./types"
import { getDownloadURL, uploadBytes } from "firebase/storage"
import { ref } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { ReturnType } from "@/lib/return-type"

export const getProfile = async (): Promise<ReturnTypeProfile> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        const profile = await db.profile.findUnique({
            where: { userId }
        })

        return profile ? { data: profile } : { error: "Profile not found" }
    } catch (e: any) {
        return { error: e.message || 'Failed to get profile' }
    }
}

export const getProfileByUsername = async (username: string): Promise<ReturnTypeProfile> => {
    try {
        const user = await db.user.findUnique({
            where: { username }
        })

        if (!user) {
            return { error: "User not found" }
        }

        const profile = await db.profile.findUnique({
            where: { userId: user.id }
        })

        return profile ? { data: profile } : { error: "Profile not found" }
    } catch (e: any) {
        console.log('getProfileByUsername error', e)
        return { error: e.message || 'Failed to get profile' }
    }
}

export const uploadAvatar = async (file: File): Promise<ReturnType<string>> => {
    try {
        const storageRef = ref(storage, `spotbio/${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);

        const url = await getDownloadURL(uploadResult.ref);

        return { data: url }

    } catch (e: any) {
        return { error: e.message || 'Failed to upload avatar' }
    }
}

export const createProfile = async (formData: FormData): Promise<ReturnTypeProfile> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        let avatarUrl: string | null = null

        if (formData.get('avatar')) {
            const result = await uploadAvatar(formData.get('avatar') as File)
            if (!result.error) {
                avatarUrl = result.data!
            } else {
                return { error: result.error }
            }
        }

        const newProfile = await db.profile.create({
            data: {
                userId,
                avatar: avatarUrl!,
                name: formData.get('name') as string,
                bio: formData.get('bio') as string
            }
        })

        return { data: newProfile }
    } catch (e: any) {
        return { error: e.message || 'Failed to create profile' }
    }
}

export const updateProfile = async (formData: FormData): Promise<ReturnTypeProfile> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        let avatarUrl: string | null = null

        if (formData.get('avatar')) {
            const result = await uploadAvatar(formData.get('avatar') as File)
            if (!result.error) {
                avatarUrl = result.data!
            } else {
                return { error: result.error }
            }
        }

        const updatedProfile = await db.profile.update({
            where: { userId },
            data: {
                avatar: avatarUrl!,
                name: formData.get('name') as string,
                bio: formData.get('bio') as string
            }
        })

        return { data: updatedProfile }
    } catch (e: any) {
        return { error: e.message || 'Failed to update profile' }
    }
}

export const deleteProfile = async (): Promise<ReturnType<boolean>> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        await db.profile.delete({
            where: { userId }
        })

        return { data: true }
    } catch (e: any) {
        return { error: e.message || 'Failed to delete profile' }
    }
}
