import '../styles/globals.css'
import css from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return (
    // Component : 호출된 페이지
    // _app.js 에서는 공통된 레이아웃을 적용시킬 수 있다. 네비, 푸터 등등 변동되는 요소는 컴포넌트 관리
    <Component className="h-full">
    </Component>
  );
}

export default MyApp