import prisma from "../client/db"
import { PlatformType } from "@prisma/client"

const seedSocialPlatforms = async () => {
    const socialPlatforms = [
        { type: PlatformType.INSTAGRAM },
        { type: PlatformType.LINKEDIN },
        { type: PlatformType.GITHUB },
        { type: PlatformType.X },
        { type: PlatformType.YOUTUBE },
        { type: PlatformType.TIKTOK },
        { type: PlatformType.WEBSITE },
        { type: PlatformType.FACEBOOK },
    ]

    for (const socialPlatform of socialPlatforms) {
        await prisma.socialPlatform.upsert({
            where: { type: socialPlatform.type },
            update: socialPlatform,
            create: socialPlatform,
        })
    }
}

const seed = async () => {
    try {
        await seedSocialPlatforms()
    } catch (error) {
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

seed().catch((error) => {
    console.error('Error seeding', error)
    process.exit(1)
})