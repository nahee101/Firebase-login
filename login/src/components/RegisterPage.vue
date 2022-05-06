<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center my-5">
                <h1 class="display-1">회원가입 페이지</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col
            class="text-center" cols="8" offset="2"
            sm="6" offset-sm="3">
                <form @submit.prevent="fnRegisterUser">
                    <!-- 이메일 -->
                    <v-text-field 
                    name="Email" label="이메일" v-model="sEmail"
                    type="email" required></v-text-field>
                    
                    <!-- 패스워드 -->
                    <v-text-field
                    name="password" label="패스워드" v-model="sPassword"
                    type="password" required>
                    </v-text-field>
                    
                    <!-- 패스워드 확인: rules 속성 -->
                    <v-text-field
                    name="ConfirmPassword" label="패스워드 확인" v-model="sConfirmPassword"
                    type="password" required
                    :rules="[fnComparePassword]">
                    </v-text-field>

                    <v-btn 
                    type="submit"
                    color="orange" dark v-if="!loading">회원가입</v-btn>

                    <!-- 시간 지연이 발생할 경우 회전 프로그레스 원 표시 -->
                    <v-progress-circular 
                    v-if="loading"
                    color="grey lighten-1" :width="7" :size="60"
                    indeterminate>
                    </v-progress-circular>

                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            sEmail: '',
            sPassword: '',
            sConfirmPassword: '',
            loading: false
        }
    },
    computed: {
        fnComparePassword() {
            if(this.sPassword == this.sConfirmPassword) {
                return true
            }else return '패스워드가 일치하지 않습니다!'
        }
    },
    methods: {
        fnRegisterUser() {
            if(this.fnComparePassword == true) {
                this.$store.dispatch('fnRegisterUser', {
                    pEmail: this.sEmail,
                    pPassword: this.sPassword
                })
            }
        }
    }
}
</script>