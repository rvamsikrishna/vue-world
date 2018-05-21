import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import shared from './modules/shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared
  },
  plugins: [
    createPersistedState({
      // paths: ["user.user"]
    })
  ]
})
