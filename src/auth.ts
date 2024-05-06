import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        id?: string,
        username: string,
        role: string,
        token: string
    }

    interface Session {
        user: {
            id?: string,
            username: string,
            role: string,
            token: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string,
        username: string,
        role: string,
        token: string
    }
}

const providers: Provider[] = [
    Credentials({
        credentials: {
            username: { label: "Usuario", type: "text" },
            password: { label: "Contraseña", type: "password" }
        },
        async authorize(c) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(c),
            })

            const data = await res.json();
            if (res.ok && data) {
                return data.response;
            }

            return null;
        },
    }),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.token = user.token;
            }
            return token
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id ? token.id : "";
                session.user.username = token.username;
                session.user.role = token.role;
                session.user.token = token.token;
            }

            return session
        },
    },
})