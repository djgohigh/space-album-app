import { useSession } from "next-auth/react"
import LoginBtn from "../components/login-btn"

export default function main(pageProps) {
    return (
        <>
            <LoginBtn/>
            <div>메인화면</div>
        </>
    )
}