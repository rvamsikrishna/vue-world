const state = {
  user: null
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.user !== null
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  }
}

const actions = {
  setCurrentUser: ({ commit }, user) => {
    commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
