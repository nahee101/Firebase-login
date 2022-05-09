/* 구글 인증 관련 내용을 따로 작성한 store module*/

/* 파이어베이스 앱 객체 모듈 */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/* 라우터 사용을 위한 */
import router from "@/router";

export default {
    state: {
        /* 사용자 정보를 담을 객체 */
        oUser: null
    },
    mutations: {
        /* 사용자 객체 저장 */
        fnSetUser(state, payload) {
            console.log(payload)
            state.oUser = payload;
        }
    },
    getters: {
        /* 사용자 객체 반환 */
        fnGetUser(state) {
            return state.oUser;
        },
        fnGetAuthStatus(state) {
            return state.oUser != null;
        }
    },
    actions: {
        /* 이메일 회원 가입 처리 */
        fnRegisterUser( {commit}, payload) {
            // 스토어에 시간 지연으로 바꿈
            commit('fnSetLoading', true);
            // 파이어베이스에 이메일 회원 생성 및 저장
            firebase.auth()
            .createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then((pUserInfo) => {
                // 신규 회원 이메일 정보를 스토어에 저장한다
                commit('fnSetUser', {
                    //7버전은 fnSetUser.email로 접근할 수 있지만,
                    //9버전은 pUserInfo.user.email을 통해 접근한다
                    email: pUserInfo.user.email
                });
                commit('fnSetLoading', false); //로딩 완료
                //스토어에 에러메시지 없음 저장 -> 에러가 발생하지 않았다는 의미
                commit('fnSetErrorMessage', ''); 
                router.push('/main');
            })
            .catch((err) => {
                commit('fnSetErrorMessage', err.message);
                commit('fnSetLoading', false)
            });
        },

        fnDoLogin( {commit}, payload) {
            commit('fnSetLoading', true);
            // 스토어에 시간 지연으로 바꿈
            //파이어베이스에 이메일 회원 로그인 인증처리 요청
            firebase.auth()
            .signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then((pUserInfo) => {
                //로그인이 성공하면 store에 계정정보 저장
                commit('fnSetUser', {
                    id: pUserInfo.user.uid,
                    name: pUserInfo.user.displayName,
                    email: pUserInfo.user.email,
                    photoURL: pUserInfo.user.photoURL
                });
                commit('fnSetLoading', false);
                commit('fnSetErrorMessage', '');
                router.push('/main');
            })
            .catch((err) => {
                commit('fnSetErrorMessage', err.message);
                commit('fnSetLoading', false);
            })
        },

        /* 구글 계정 회원 로그인(팝업) */
        fnDoGoogleLogin_Popup( {commit} ) {
            commit('fnSetLoading', true);
            //파이어베이스에 구글 회원 로그인 인증 처리 요청
            //로그인 제공자 객체 생성
            const oProvider = new firebase.auth.GoogleAuthProvider();
            //오픈 계정의 범위(가져오는 값)
            oProvider.addScope('profile');
            oProvider.addScope('email');

            firebase.auth().signInWithPopup(oProvider)
            .then((pUserInfo) => {
                //로그인이 성공하면 스토어에 계정의 정보를 저장한다
                commit('fnSetUser', {
                    id: pUserInfo.user.uid,
                    name: pUserInfo.user.displayName,
                    email: pUserInfo.user.email,
                    photoURL: pUserInfo.user.photoURL
                });
                commit('fnSetLoading', false);
                commit('fnSetErrorMessage', '');
                router.push('/main')
            }).catch((err) => {
                commit('fnSetErrorMessage', err.message);
                commit('fnSetLoading', false);
            })
        },

        /* 로그아웃 */
        fnDoLogout({ commit }) {
            firebase.auth().signOut();
            commit('fnSetUser', null);
            router.push("/");
        },

        /* 회원 탈퇴 */
        fnDoDelete({ commit }) {
            //파이어베이스에 회원탈퇴를 요청한다
            const user = firebase.auth().currentUser;
            user.delete()
            .then(() => {
                //스토어의 '회원'에 빈 값을 넣는다
                commit('fnSetUser', null);
                router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        },

        /* 자동 로그인 처리 */
        fnDoLoginAuto({ commit }, pUserInfo) {
            commit('fnSetUser', {
                id: pUserInfo.uid,
                name: pUserInfo.displayName,
                email: pUserInfo.email,
                photoURL: pUserInfo.photoURL,
            });
            commit('fnSetLoading', false);
            commit('fnSetErrorMessage', '');
        }
    }
}