import { PrismaClient } from "@prisma/client";
import * as userCrypto from "./createUser";

export default async (req, res) => {    
    let prisma = new PrismaClient();
    
    const password = (await userCrypto.createEnPassWord(req.body.usr_pwd)).hashedPassword;
    
    
    let user = await prisma.user.findFirst({
        where: {
            usr_mail: req.body.usr_mail,
        },
    });
    
    const encryptoPassword = await (await userCrypto.pbkdf2(req.body.usr_pwd, user.salt, 104906, 64, 'sha512')).toString('base64');
    if (encryptoPassword == user.usr_pwd) {
        console.log('로그인 성공');
    }
}