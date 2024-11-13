'use server'

import db from "@/client/db";
import { 
    CreateSocialParams, 
    ReturnTypeSocial, 
    SocialWithPlatform, 
    UpdateSocialParams 
} from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {  SocialPlatform } from "@prisma/client";
import { ReturnType } from "@/lib/return-type";

export const getSocialPlatforms = async (id?: string): Promise<ReturnType<SocialPlatform | SocialPlatform[]>> => {
    try {

        if (id) {
            const socialPlatform = await db.socialPlatform.findUnique({
                where: {
                    id
                }
            })

            if (!socialPlatform) {
                return {
                    error: "Social platform not found"
                }
            }

            return {
                data: socialPlatform
            }
        }

        const socialPlatforms = await db.socialPlatform.findMany()
        
        return {
            data: socialPlatforms
        }
    } catch (e: any) {
        console.error('getSocialPlatforms error', e)
        return {
            error: e.message || "Error fetching social platforms",
        }
    }
}

export const getSocials = async (): Promise<ReturnType<{socials: SocialWithPlatform[], maxPosition: number}>> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id
        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        const socials = await db.social.findMany({
            where: {
                userId
            },
            include: {
                platform: {
                    select: {
                        type: true
                    }
                }
            },
            orderBy: {
                position: 'asc'
            }
        })

        return {
            data: {
                socials,
                maxPosition: socials.reduce((max, social) => Math.max(max, social.position), 0)
            }
        }
    } catch (e: any) {
        return {
            error: e.message || "Error fetching socials",
        }       
    }
}

export const getSocialsByUsername = async (username: string): Promise<ReturnType<{socials: SocialWithPlatform[]}>> => {
    try {
        const user = await db.user.findUnique({
            where: { username }
        })

        if (!user) {
            return {
                error: "User not found"
            }
        }

        const socials = await db.social.findMany({
            where: { userId: user.id },
            include: {
                platform: {
                    select: {
                        type: true
                    }
                }
            },
            orderBy: {
                position: 'asc'
            }
        })

        return {
            data: {
                socials
            }
        }
    } catch (e: any) {
        console.error('getSocialsByUsername error', e)
        return {
            error: e.message || "Error fetching socials",
        }
    }
}

export const createSocial = async (social: CreateSocialParams): Promise<ReturnTypeSocial> => {
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
                userId
            },
            include: {
                platform: {
                    select: {
                        type: true
                    }
                }
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

export const updateSocial = async (social: UpdateSocialParams): Promise<ReturnTypeSocial> => {
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
            },
            include: {
                platform: {
                    select: {
                        type: true
                    }
                }
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

export const deleteSocial = async (id: string): Promise<ReturnType<boolean>> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        await db.social.delete({
            where: {
                id,
                userId
            }
        })

        return {
            data: true
        }
    } catch (e: any) {
        return {
            error: e.message || "Error deleting social",
        }
    }
}
