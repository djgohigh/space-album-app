import {useSession, signIn, signOut} from "next-auth/react";

export default function Component() {

    const { data: session } = useSession();
    console.log(useSession());
    
    if (session) {
        return (
            <>
                환영합니다! { session.user.name } 님 <br />
                <button onClick={() => signOut()}>로그아웃</button>
            </>
        );
    }
    
    return (
        <>
            로그인정보가 없습니다.
        </>
    );
}