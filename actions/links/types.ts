import { ReturnTypeWrapper } from "@/lib/return-type"
import { Link } from "@prisma/client"

export type LinkType = {
    id?: number
    title: string
    link: string
    position: number
}

export type ReturnTypeCreateLink = ReturnTypeWrapper<LinkType, Link>

export type ReturnTypeUpdateLink = ReturnTypeCreateLink