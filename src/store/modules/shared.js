export default {
  namespaced: true,
  state: {
    toast: {
      isShowing: false,
      message: '',
      toastType: null,
      timeout: null
    }
  },
  getters: {
    toast(state) {
      return state.toast
    }
  },
  mutations: {
    showToast(state, payload) {
      state.toast.isShowing = true
      state.toast.message = payload.message
      if (payload.toastType) state.toast.toastType = payload.toastType
      if (payload.timeout) state.toast.timeout = payload.timeout
    },
    hideToast(state) {
      state.toast.isShowing = false
      state.toast.message = ''
      state.toast.toastType = null
      state.toast.timeout = null
    }
  },
  actions: {}
}
