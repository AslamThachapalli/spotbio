'use server'

import db from "@/client/db";
import { ReturnTypeCreateSocial, ReturnTypeUpdateSocial, SocialType } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SocialPlatform } from "@prisma/client";

export const getSocialPlatforms = async (id?: string): Promise<SocialPlatform | SocialPlatform[]> => {
    try {

        if (id) {
            const socialPlatform = await db.socialPlatform.findUnique({
                where: {
                    id
                }
            })
            return socialPlatform!
        }

        const socialPlatforms = await db.socialPlatform.findMany()
        
        return socialPlatforms
    } catch (e: any) {
        console.error('getSocialPlatforms error', e)
        return []
    }
}

export const getSocials = async (): Promise<{socials: SocialType[], maxPosition: number}> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        if (!userId) {
            return {
                socials: [],
                maxPosition: 0
            }
        }

        const socials = await db.social.findMany({
            where: {
                userId
            },
            orderBy: {
                position: 'asc'
            }
        })

        return {
            socials,
            maxPosition: socials.reduce((max, social) => Math.max(max, social.position), 0)
        }
    } catch (e: any) {
        return {
            socials: [],
            maxPosition: 0
        }       
    }
}

export const getSocialsByUsername = async (username: string): Promise<{socials: SocialType[]}> => {
    try {
        const user = await db.user.findUnique({
            where: { username }
        })

        if (!user) {
            return { socials: [] }
        }

        const socials = await db.social.findMany({
            where: { userId: user.id },
            orderBy: {
                position: 'asc'
            }
        })

        return { socials }
    } catch (e: any) {
        console.error('getSocialsByUsername error', e)
        return { socials: [] }
    }
}

export const createSocial = async (social: SocialType): Promise<ReturnTypeCreateSocial> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        const newSocial = await db.social.create({
            data: {
                ...social,
                userId,
            }
        })
        return {
            data: newSocial
        }
    } catch (e: any) {
        return {
            error: e.message || "Error creating social",
        }
    }
}

export const updateSocial = async (social: SocialType): Promise<ReturnTypeUpdateSocial> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        const updatedSocial = await db.social.update({
            where: {
                id: social.id,
                userId
            },
            data: {
               link: social.link,
               position: social.position,
            }
        })
        return {
            data: updatedSocial
        }
    } catch (e: any) {
        return {
            error: e.message || "Error updating social",
        }
    }
}

export const deleteSocial = async (id: string): Promise<boolean> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        if (!userId) {
            false
        }

        await db.social.delete({
            where: {
                id,
                userId
            }
        })

        return true
    } catch (e: any) {
        return false
    }
}
