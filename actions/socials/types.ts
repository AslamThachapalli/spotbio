import { ReturnType } from "@/lib/return-type";
import { PlatformType, Social } from "@prisma/client";

export type SocialWithPlatform = Social & {
    platform: {
        type: PlatformType
    }
}

export type CreateSocialParams = {
    link: string;
    position: number;
    platformId: string;
}

export type UpdateSocialParams = CreateSocialParams & { id: string }

export type ReturnTypeSocial = ReturnType<SocialWithPlatform>