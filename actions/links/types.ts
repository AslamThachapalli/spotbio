import { ReturnType } from "@/lib/return-type"
import { Link } from "@prisma/client"

export type LinkType = {
    id?: string
    title: string
    link: string
    position: number
}

export type ReturnTypeCreateLink = ReturnType<LinkType, Link>

export type ReturnTypeUpdateLink = ReturnTypeCreateLink