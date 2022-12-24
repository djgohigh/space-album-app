import "../styles/globals.css";
import css from "../styles/Home.module.css";
import {SessionProvider} from "next-auth/react";
import LoginBtn from "../components/login-btn";


function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;