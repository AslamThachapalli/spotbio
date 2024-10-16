'use server'

import db from "@/db";
import { ReturnTypeCreateSocial, ReturnTypeUpdateSocial, SocialType } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SocialPlatform } from "@prisma/client";

var cachedSocialPlatforms: SocialPlatform[] | null = null
var cachedSocials: SocialType[] | null = null

export const getSocialPlatforms = async (id?: number): Promise<SocialPlatform | SocialPlatform[]> => {
    try {
        if (cachedSocialPlatforms) {
            if (id) {
                return cachedSocialPlatforms.find((p) => p.id === id)!
            }
            return cachedSocialPlatforms
        } 

        if (id) {
            const socialPlatform = await db.socialPlatform.findUnique({
                where: {
                    id
                }
            })
            return socialPlatform!
        }
        
        const socialPlatforms = await db.socialPlatform.findMany()
        cachedSocialPlatforms = socialPlatforms
        
        return socialPlatforms
    } catch (e: any) {
        return []
    }
}

export const getSocials = async (): Promise<{socials: SocialType[], maxPosition: number}> => {
    try {
        if (cachedSocials) {
            return {
                socials: cachedSocials,
                maxPosition: cachedSocials.reduce((max, social) => Math.max(max, social.position), 0)
            }
        }

        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)
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
        cachedSocials = socials

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

export const createSocial = async (social: SocialType): Promise<ReturnTypeCreateSocial> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)
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
        cachedSocials = [...(cachedSocials || []), newSocial]
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
        const userId = Number(session?.user?.id)
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
            data: social
        })
        cachedSocials = (cachedSocials || []).map((s) => s.id === updatedSocial.id ? updatedSocial : s)
        cachedSocials = cachedSocials.sort((a, b) => a.position - b.position)
        return {
            data: updatedSocial
        }
    } catch (e: any) {
        return {
            error: e.message || "Error updating social",
        }
    }
}

export const deleteSocial = async (id: number): Promise<boolean> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)
        if (!userId) {
            false
        }

        await db.social.delete({
            where: {
                id,
                userId
            }
        })
        cachedSocials = (cachedSocials || []).filter((s) => s.id !== id)
        cachedSocials = cachedSocials.sort((a, b) => a.position - b.position)

        return true
    } catch (e: any) {
        return false
    }
}
