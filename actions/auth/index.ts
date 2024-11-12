'use server'

import db from '@/client/db'
import bcrypt from 'bcrypt';
import { ReturnTypeCreateUser, UserType } from './types'

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
    const user = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) return true

    return false
}

export const createUser = async (user: UserType): Promise<ReturnTypeCreateUser> => {
    try {
        const hashedPass = await bcrypt.hash(user.password, 10)

        const newUser = await db.user.create({
            data: {
                ...user,
                password: hashedPass,
            }
        })

        return {
            data: newUser
        }
    } catch (e: any) {
        return {
            error: e.message || 'Failed signing up',
        }
    }
}