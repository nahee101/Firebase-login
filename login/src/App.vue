<template>
  <v-app>
    <v-navigation-drawer clipped app value="true">
      <v-list>
        <!-- items 배열을 읽어와 메뉴로 바인딩 -->
        <v-list-item 
        v-for="(item, i) in fnGetMenuItem" :key="i"
        to="item.to">
          <v-list-item-action>
            <!--v-html을 사용하면 그 값이 html 형식으로 들어간다-->
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item>

        <!-- 로그인이 된 경우에만 로그아웃 버튼을 표시한다 -->
        <v-list-item
        v-if="fnGetAuthStatus"
        @click="fnDoLogOut">
          <v-list-item-action>
            <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- app-bar 시작 -->
    <v-app-bar app clipped-left color="primary" dark>
      <!-- class를 통해 sm(중단점)보다 크면 nav-icon을 숨김-->
      <v-app-bar-nav-icon 
      @click="drawer= !drawer" 
      class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <router-link to="/">
        <!-- icon을 눌렀을 때 메인 페이지로 이동 -->
        <!-- class를 통해 xs(중단점)일 때만 icon 숨김-->
        <v-icon class="hidden-xs-only">mdi-home</v-icon>
      </router-link>
      <v-toolbar-title class="headline">이메일 - 구글 인증 로그인</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text
        v-for="(item, i) in fnGetMenuItem" :key="i"
        :to="item.to">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- 로그인 된 경우에만 로그아웃 버튼 표시 -->
        <v-btn text 
        v-if="fnGetAuthStatus"
        @click="fnDoLogout">
          <v-icon left>mdi-arrow-right-bold-box-outline</v-icon>
          로그아웃
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer>
      <div class="mx-auto">&copy; CODE-DESIGN.web.app</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      login: false
    }
  },
  computed: {
    fnGetAuthStatus() {
      /* 스토어에서 현재 인증상태인지 반환(로그인) */
      return this.$store.getters.fnGetAuthStatus
    },
    /* 로그인 여부에 따라 
      탐색 서랍과 툴바메뉴명의 항목 배열이 달라진다 */
    fnGetMenuItem() {
      //fn은 내가 만든 함수라는 의미
      /* 로그인 하지 않았을 때 */
      if(!this.login) {
        return [
          {title: '회원가입', to: '/register', icon: 'mdi-lock-open-outline'},
        ]
      } else { /* 로그인 했을 때 */
        return [
          {title: '메인 페이지', to: '/main', icon: 'mdi-account'}
        ]
      }
    }
  },
  methods: {
    fnDoLogout() {
      this.$store.dispatch('fnDoLogout')
    }
  }
}

</script>