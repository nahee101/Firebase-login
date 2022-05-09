import Vue from 'vue';
import Vuex from 'vuex';
import VuePersistence from 'vuex-persist';
import modProvider from '@/store/provider';
import modCommon from '@/store/common';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    provider: modProvider,
    common: modCommon
  },
  plugins: [
    (new VuePersistence({
      storage: window.localStorage
    }) ).plugin
  ]
})
