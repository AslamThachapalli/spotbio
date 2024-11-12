import { ReturnType } from "@/lib/return-type";
import { Social } from "@prisma/client";

export type SocialType = {
    id?: string;
    platformId: string;
    link: string;
    position: number;
}

export type ReturnTypeCreateSocial = ReturnType<SocialType, Social>
export type ReturnTypeUpdateSocial = ReturnTypeCreateSocial