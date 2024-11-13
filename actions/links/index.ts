'use server'

import db from "@/client/db"
import { LinkType, ReturnTypeCreateLink, ReturnTypeUpdateLink } from "./types"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ReturnType } from "@/lib/return-type"


export const getLinks = async (): Promise<ReturnType<{links: LinkType[], maxPosition: number}>> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        const links = await db.link.findMany({
            where: {
                userId
            },
            orderBy: {
                position: 'asc'
            }
        })

        const maxPosition = links.reduce((max, link) => Math.max(max, link.position), 0)

        return {
            data: {
                links,
                maxPosition
            }
        }
    } catch (e: any) {
        return {
            error: e.message || 'Failed fetching links',
        }
    }
}

export const getLinksByUsername = async (username: string): Promise<ReturnType<LinkType[]>> => {
    try {
        const user = await db.user.findUnique({
            where: { username }
        })

        if (!user) {
            return {
                error: "User not found"
            }
        }

        const links = await db.link.findMany({
            where: { userId: user.id },
            orderBy: {
                position: 'asc'
            }
        })

        return {
            data: links
        }
    } catch (e: any) {
        console.log('getLinksByUsername error', e)
        return {
            error: e.message || 'Failed fetching links',
        }
    }
}

export const createLink = async (link: LinkType): Promise<ReturnTypeCreateLink> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        const newLink = await db.link.create({
            data: {
                ...link,
                userId,
            }
        })

        
        return {
            data: newLink
        }
    } catch (e: any) {
        return {
            error: e.message || 'Failed creating link',
        }
    }
}

export const updateLink = async (link: LinkType): Promise<ReturnTypeUpdateLink> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }   

        const updatedLink = await db.link.update({
            where: {
                id: link.id,
                userId
            },
            data: link
        })

        return {
            data: updatedLink
        }
        
    } catch (e: any) {
        return {
            error: e.message || 'Failed updating link',
        }
    }
}

export const deleteLink = async (id: string): Promise<ReturnType<boolean>> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        if (!userId) {
            return {
                error: "Unauthorized"
            }
        }

        await db.link.delete({
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
            error: e.message || 'Failed deleting link',
        }
    }
}