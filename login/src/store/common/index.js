/* 에러 및 로딩 관련 store 모듈 */

export default{
    state: {
        bIsLoading: false, //처리 중 시간이 걸림
        sErrorMessage: '', //처리 중 오류 메시지의 내용
    },
    mutations: {
        //처리 중에 시간이 걸리는지 여부를 설정
        fnSetLoading(state, payload) {
            state.bIsLoading = payload;
        },
        //처리 중에 오류메시지를 저장
        fnSetErrorMessage(state, payload) {
            state.sErrorMessage = payload;
        }
    },
    getters: {
        fnGetLoading(state) {
            return state.bIsLoading;
        },

        fnGetErrorMessage(state) {
            return state.sErrorMessage;
        }
    },
    actions: {

    }
}