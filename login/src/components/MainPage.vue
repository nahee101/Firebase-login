<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center mt-5">
                <h1 class="display-1">로그인 후 보이는 화면</h1>
                <p class="body">로그인을 통해 인증된 사용자가 방문한 페이지</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="10" offset="1" class="text-center mt-5">
                <!-- 구글 로그인인 경우 사진 이미지 정보 표시 -->
                <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL"
                class="avatar_style">
                <!-- 계정 이름 표시 -->
                <h3 class="pt-2 mt-4 grey lighten-2">{{fnGetUser.name}}</h3>
                <!-- 계정 지메일 표시 -->
                <p class="pb-2 grey lighten-2">{{fnGetUser.email}}</p>
            </v-col>
            <v-col cols="6" offset="3" class="text-center mt-1">
                <v-btn color="orange" large dark block>
                    <v-icon>mdi-email</v-icon>
                    비밀번호 재설정
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    computed: {
        fnGetUser() {
            let oUserInfo = this.$store.getters.fnGetUser
            console.log(oUserInfo)
            return oUserInfo
        }
    }
}
</script>

<style scoped>
    .avatar_style {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
</style>