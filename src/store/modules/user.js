const state = {
  user: null,
  authModal: {
    isOpen: false,
    authType: ''
  }
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.user !== null,
  authModal(state) {
    return state.authModal
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  openAuthModal(state, authType) {
    state.authModal.isOpen = true
    state.authModal.authType = authType
  },
  closeAuthModal(state) {
    state.authModal.isOpen = false
    state.authModal.authType = ''
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
