import { ReturnTypeWrapper } from "@/lib/return-type";
import { Social } from "@prisma/client";

type SocialType = {
    id?: number;
    platformId: number;
    link: string;
    position: number;
}

type ReturnTypeCreateSocial = ReturnTypeWrapper<SocialType, Social>
type ReturnTypeUpdateSocial = ReturnTypeCreateSocial