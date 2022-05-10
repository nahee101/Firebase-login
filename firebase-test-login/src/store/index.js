import Vue from 'vue';
import Vuex from 'vuex';

/* 초기화한 firebase import */
import '@/datasources/firebase';

/* 9버전을 사용한 방법 */
import { 
  getAuth,
  /* 이메일 */
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

  /* Google */
  signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import router from '@/router';
/* 파이어베이스 인증을 위한 객체 */
const auth = getAuth();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oUser: null //사용자 정보를 담을 객체
  },
  getters: {
    fnGetUser(state) {
      return state.oUser; //사용자 정보 객체 반환
    },
    fnGetAuthStatus(state) {
       //oUser의 상태가 null이 아닐 경우 true
      return state.oUser != null; 
    }
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    }
  },
  actions: {
    /* 파이어베이스의 인증을 이용해서 이메일 회원 생성 및 저장 */
    fnRegisterUser({commit}, payload) {
      //createUserWithEmailAndPassword
      //신규 사용자의 이메일 주소와 비밀번호를 메소드에 전달
      createUserWithEmailAndPassword(auth, payload.pEmail)
      .then((pUserInfo) => {
        //신규 회원 이메일 정보를 스토어에 저장
        commit('fnSetUser', {
          email: pUserInfo.user.email
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      })
    },

    /*파이어베이스의 인증을 이용하여 이메일 회원 로그인 */
    fnDoLogin({commit}, payload) {
      //signInWithEmailAndPassword
      //사용자가 앱에 로그인하면 사용자의 이메일 주소와 비밀번호를 메소드에 전달
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
      .then((pUserInfo) => {
        commit('fnSetUser', {
          id: pUserInfo.user.uid,
          name: pUserInfo.user.displayName,
          email: pUserInfo.user.email,
          photoURL: pUserInfo.user.photoURL
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      });
    },

    /* 파이어베이스 구글 인증 */
    fnDoGoogleLogin_Popup({commit}) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope('profile');
      oProvider.addScope('email');

      signInWithPopup(auth, oProvider)
      .then((pUserInfo) => {
        commit('fnSetUser', {
          id: pUserInfo.user.uid,
          name: pUserInfo.user.displayName,
          email: pUserInfo.user.email,
          photoURL: pUserInfo.user.photoURL
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  },
  modules: {
  }
})
