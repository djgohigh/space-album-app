import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import * as Prisma from "@prisma/client"
import * as userCrypto from "../createUser";

const prisma = new Prisma.PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "test@test.com",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                let prisma = new PrismaClient();
                let userData = await prisma.user.findFirst({
                    where: {
                        usr_mail: credentials.usr_mail,
                    },
                });
                
                if (userData === undefined || userData === null) {
                    return null;
                } else {
                    const encryptoPassword = (
                        await userCrypto.pbkdf2(
                            credentials.usr_pwd,
                            userData.salt,
                            104906,
                            64,
                            "sha512"
                        )
                    ).toString("base64");

                    if (encryptoPassword === userData.usr_pwd) {
                        return credentials;
                    } else {
                        return null;
                    }
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            console.log(token);
            console.log(user);
            user && (token.user = user);
            return token;
        },
        session: async ({session, token}) => {
            console.log(session);
            console.log(token);
            session.user = token.user; // Setting token in session
            return session;
        },
    },
    pages: {
        signIn: "/loginForm",
    },
};

export default NextAuth(authOptions);