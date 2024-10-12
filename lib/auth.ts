import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import db from '@/db'
import bcrypt from 'bcrypt';

interface AuthSession extends Session {
    user: {
        id: string,
        name: string,
        email: string,
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await db.user.findFirst({
                    where: {
                        username: credentials?.username
                    },
                    select: {
                        password: true,
                        id: true,
                        email: true,
                    }
                })

                if (!user) return null

                if (await bcrypt.compare(credentials?.password ?? '', user.password)) {
                    return {
                        id: String(user.id),
                        email: user.email,
                        name: credentials?.username,
                    } satisfies User
                }

                return null;
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token }) => {
            const newSession: AuthSession = session as AuthSession;

            if (newSession.user && token.sub) {
                newSession.user.id = token.sub
            }

            return newSession
        }
    },
    pages: {
        signIn: '/signin'
    }
} satisfies NextAuthOptions