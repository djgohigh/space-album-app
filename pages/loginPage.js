import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function login(pageProps) {
    
    let router = new useRouter();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        let usr_mail = e.target.usr_mail.value;
        let usr_pwd = e.target.usr_pwd.value;
        
        const loginResponse = await signIn('credentials', {
            usr_mail, 
            usr_pwd,
            redirect: false,
        });
        
        if (loginResponse.status == '401') {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (loginResponse.status == '200') {
            router.push('main');
        }
    }
    
    return (
        <div className="w-full h-full flex justify-center items-center">
            <style global jsx>
                {`
                    div#__next > div {
                        height : 100vh;
                    }`
                }
            </style>
            <div className="w-3/12">
                <h1 className="mb-5 text-3xl text-center font-extrabold whitespace-pre-line">로그인</h1>
                <form id="loginForm" onSubmit={submitHandler}>
                    <div className="grid gap-3 mb-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                            <input type="email" name="usr_mail" id="usr_mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="이메일" required></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                            <input type="password" name="usr_pwd" id="usr_pwd" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호" required></input>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">로그인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}