'use server'

import db from "@/db"
import { LinkType, ReturnTypeCreateLink, ReturnTypeUpdateLink } from "./types"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

var cachedLinks: LinkType[] | null = null

export const getLinks = async (): Promise<{links: LinkType[], maxPosition: number}> => {
    try {
        if (cachedLinks) {
            return {
                links: cachedLinks,
                maxPosition: cachedLinks.reduce((max, link) => Math.max(max, link.position), 0)
            }
        }

        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)

        if (!userId) {
            return {
                links: [],
                maxPosition: 0
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
        cachedLinks = links

        const maxPosition = links.reduce((max, link) => Math.max(max, link.position), 0)

        return {
            links,
            maxPosition
        }
    } catch (e: any) {
        return {
            links: [],
            maxPosition: 0
        }
    }
}

export const createLink = async (link: LinkType): Promise<ReturnTypeCreateLink> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)

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

        cachedLinks = [...(cachedLinks || []), newLink]
        
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
        const userId = Number(session?.user?.id)

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

        cachedLinks = (cachedLinks || []).map((l) => l.id === updatedLink.id ? updatedLink : l)
        cachedLinks = cachedLinks.sort((a, b) => a.position - b.position)

        return {
            data: updatedLink
        }
        
    } catch (e: any) {
        return {
            error: e.message || 'Failed updating link',
        }
    }
}

export const deleteLink = async (id: number): Promise<boolean> => {
    try {
        const session = await getServerSession(authOptions)
        const userId = Number(session?.user?.id)

        if (!userId) {
            return false
        }

        await db.link.delete({
            where: {
                id,
                userId
            }
        })

        cachedLinks = (cachedLinks || []).filter((l) => l.id !== id)
        cachedLinks = cachedLinks.sort((a, b) => a.position - b.position)
        
        return true
    } catch (e: any) {
        return false
    }
}