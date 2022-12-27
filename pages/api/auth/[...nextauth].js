import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as userCrypto from "../createUser";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

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
                let user = await prisma.user.findFirst({
                    where: {
                        email: credentials.usr_mail,
                    },
                });
                
                console.log("credential", credentials);
                console.log("user", user);

                if (user === undefined || user === null) {
                    return null;
                } else {
                    const encryptoPassword = (
                        await userCrypto.pbkdf2(
                            credentials.usr_pwd,
                            user.salt,
                            104906,
                            64,
                            "sha512"
                        )
                    ).toString("base64");

                    if (encryptoPassword === user.password) {
                        return user;
                    } else {
                        return null;
                    }
                }
            },
        }),
    ],
    callbacks: {
        
    },
    pages: {
        signIn: "/auth/credentials-signin",
    },
    debug: true,
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60, // 1d
      },
      jwt: {
        secret: 'SECRET_HERE',
        encryption: true,
  },
};

export default NextAuth(authOptions);