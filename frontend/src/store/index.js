import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import colorStore from '@/store/modules/colorStore'
import themeStore from '@/store/modules/themeStore'
import landingStore from '@/store/modules/landingStore'
import demoStore from '@/store/modules/demoStore'
import customStore from '@/store/modules/customStore'
import contentStore from '@/store/modules/contentStore'
import boxStore from '@/store/modules/boxStore'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    colorStore,
    themeStore,
    landingStore,
    demoStore,
    customStore,
    contentStore,
    boxStore,
  },
  plugins: [
    createdPersistedState({
      paths: ['landingStore', 'colorStore', 'customStore', 'contentStore']
    })
  ]
})
