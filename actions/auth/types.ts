import { ReturnType } from "@/lib/return-type"
import { User } from "@prisma/client"

export type CreateUserParams = {
    email: string,
    username: string,
    password: string,
}

export type ReturnTypeCreateUser = ReturnType<User>