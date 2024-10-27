import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    query: {
      user: {
        create: async ({ args, query }) => {
          const result = await query(args)

          await prisma.profile.create({
            data: {
              userId: result.id as string,
              name: '',
              bio: '',
            }
          })
          
          return result
        }
      }
    }
  })

  return prisma
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma  = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma