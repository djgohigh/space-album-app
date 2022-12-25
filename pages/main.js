import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoginBtn from "../components/login-btn"

export default function main(pageProps) {

    const session = useSession();
    let router = useRouter();
    
    if (session.status == 'unauthenticated') {
        alert('로그인 후 사용해주세요.');
        router.push('/auth/credentials-signin');
    }
    
    return (
        <>
            <LoginBtn/>
            <div>메인화면</div>
        </>
    )
}