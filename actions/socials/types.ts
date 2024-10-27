import { ReturnTypeWrapper } from "@/lib/return-type";
import { Social } from "@prisma/client";

export type SocialType = {
    id?: string;
    platformId: string;
    link: string;
    position: number;
}

export type ReturnTypeCreateSocial = ReturnTypeWrapper<SocialType, Social>
export type ReturnTypeUpdateSocial = ReturnTypeCreateSocial