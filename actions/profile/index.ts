'use server'

import db from "@/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ProfileType, ReturnTypeProfile } from "./types"

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

export const createProfile = async (profile: ProfileType): Promise<ReturnTypeProfile> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        const newProfile = await db.profile.create({
            data: {
                ...profile,
                userId,
            }
        })

        return { data: newProfile }
    } catch (e: any) {
        return { error: e.message || 'Failed to create profile' }
    }
}

export const updateProfile = async (profile: ProfileType): Promise<ReturnTypeProfile> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return { error: "Unauthorized" }
        }

        const updatedProfile = await db.profile.update({
            where: { userId },
            data: profile
        })

        return { data: updatedProfile }
    } catch (e: any) {
        return { error: e.message || 'Failed to update profile' }
    }
}

export const deleteProfile = async (): Promise<boolean> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return false
        }

        await db.profile.delete({
            where: { userId }
        })

        return true
    } catch (e: any) {
        return false
    }
}
