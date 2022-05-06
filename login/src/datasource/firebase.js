/* 파이어베이스 앱 객체 모듈 가져오기 */
/* 파이어베이스 9버전이기 때문에 /compat을 함께 작성하여 사요한다 */
/* Compat - 버전 8 SDK와 완전히 호환되는 친숙한 API 표면으로 
    모든 Firebase 코드를 한 번에 변경하지 않고도 버전 9로 업그레이드할 수 있습니다 */
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* 파이어베이스 초기화 */
const oFirebase = firebase.initializeApp({
    apiKey: "AIzaSyCsJStq7vESsiMZuqiPQGB1j1hTSYquDGU",
    authDomain: "login-e3091.firebaseapp.com"
});

/* 파이어베이스 인증 객체 모듈로 사용 */
export const oFirebaseAuth = oFirebase.auth();