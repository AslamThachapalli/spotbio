import { ReturnTypeWrapper } from "@/lib/return-type";
import { Social } from "@prisma/client";

export type SocialType = {
    id?: number;
    platformId: number;
    link: string;
    position: number;
}

export type ReturnTypeCreateSocial = ReturnTypeWrapper<SocialType, Social>
export type ReturnTypeUpdateSocial = ReturnTypeCreateSocial