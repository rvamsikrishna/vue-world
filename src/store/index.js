import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import shared from './modules/shared'
import user from './modules/user'
import events from './modules/events'
import search from './modules/search'

Vue.use(Vuex)
/*eslint no-undef: "off"*/

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    shared,
    search,
    events
  },
  plugins: [
    createPersistedState({
      paths: ['user.user']
    })
  ]
})
