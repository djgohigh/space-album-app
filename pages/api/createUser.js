import { PrismaClient } from "@prisma/client";
import util from "util";
import crypto from "crypto";

const randomBytes = util.promisify(crypto.randomBytes);
export const pbkdf2 = util.promisify(crypto.pbkdf2);

export const createSalt = async () => {
    const buf = await randomBytes(64);
    return buf.toString("base64");
}

export const createEnPassWord = async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2(password, salt, 104906, 64, 'sha512');
    const hashedPassword = key.toString('base64');
    return { hashedPassword, salt }
}

export default async (req, res) => {
    console.log(req.body);
    let prisma = new PrismaClient();

    const user = await prisma.User.findUnique({
        where: {
            email: req.body.usr_mail,
        },
    });
        
    if (user != null) {
        return res.status(200).json('already exist');
    } else {
        const cryptoWords = createEnPassWord(req.body.usr_pwd);
        const createUser = await prisma.User.create({
            data : {
                email : req.body.usr_mail,
                name : req.body.usr_nam,
                password : (await cryptoWords).hashedPassword,
                salt : (await cryptoWords).salt,
            }
        });
        
        if (createUser != null) {
            res.status(200).json({ message: 'success', error: false });
        }
    }
}