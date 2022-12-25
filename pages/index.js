import { useRouter } from "next/router";


export default function home(pageProps) {

    let router = new useRouter();

    async function createUser(e) {
        let userData = await fetch('api/createUser', {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(Object.fromEntries(new FormData(document.getElementById('userForm')))),
        });
        
        return userData.json();
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if ((await createUser()).message === 'success') {
            alert('계정 생성에 성공했습니다. 로그인화면으로 이동합니다.');
            router.push('/auth/credentials-signin');
        }
    }
    
    const greet = '반가워요!\n우주인이 되어보세요';
    
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
                <h1 className="mb-5 text-3xl text-center font-extrabold bg-gradient-to-r text-transparent bg-clip-text to-emerald-600 from-sky-400 whitespace-pre-line">{greet}<span className="text-black text-3xl none"> 🚀</span></h1>    
                <form id="userForm" onSubmit={submitHandler}>
                    <div className="grid gap-3 mb-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                            <input type="email" name="usr_mail" id="usr_mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="아이디" required></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                            <input type="password" name="usr_pwd" id="usr_pwd" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호" required></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
                            <input type="password" name="usr_pwdchk" id="usr_pwdchk" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호" required></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                            <input type="text" name="usr_nam" id="usr_nam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="이름" required></input>
                        </div>  
                    </div>
                    <div className="text-center">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">등록하기</button>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={() => router.push('/auth/credentials-signin')} className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">계정이 있어요</button>
                    </div>
                </form>
            </div>
        </div>
    );
}