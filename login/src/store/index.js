import Vue from 'vue';
import Vuex from 'vuex';
import VuePersistence from 'vuex-persist';
import modProvider from '@/store/provider';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    provider: modProvider
  },
  plugins: [
    (new VuePersistence({
      storage: window.localStorage
    }) ).plugin
  ]
})
