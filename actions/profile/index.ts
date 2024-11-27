'use server'

import db from "@/client/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ReturnTypeProfile } from "./types"
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

export const uploadAvatar = async (file: File, userId: string): Promise<ReturnType<string>> => {
    try {
        console.log('uploading avatar', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
        const storageRef = ref(storage, `spotbio/${userId}`);
        const uploadResult = await uploadBytes(storageRef, file);

        const url = await getDownloadURL(uploadResult.ref);

        return { data: url }

    } catch (e: any) {
        console.log('uploadAvatar error', e)
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

        let avatarUrl: string

        if (formData.get('avatar')) {
            const result = await uploadAvatar(formData.get('avatar') as File, userId)
            if (!result.error) {
                avatarUrl = result.data!
            } else {
                return { error: result.error }
            }
        } else {
            return { error: "Avatar is required" }
        }

        const newProfile = await db.profile.create({
            data: {
                userId,
                avatar: avatarUrl,
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
            const result = await uploadAvatar(formData.get('avatar') as File, userId)
            if (!result.error) {
                avatarUrl = result.data!
            } else {
                return { error: result.error }
            }
        }

        const updateData: any = {
            name: formData.get('name') as string,
            bio: formData.get('bio') as string
        };

        if (avatarUrl) {
            updateData.avatar = avatarUrl;
        }

        const updatedProfile = await db.profile.update({
            where: { userId },
            data: updateData
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
