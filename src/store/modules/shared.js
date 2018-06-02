export default {
  namespaced: true,
  state: {
    toast: {
      isShowing: false,
      message: '',
      toastType: null,
      timeout: null
    },
    loading: false
  },
  getters: {
    toast(state) {
      return state.toast
    },
    loading(state) {
      return state.loading
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
    },
    showLoading(state) {
      state.loading = true
    },
    closeLoading(state) {
      state.loading = false
    }
  },
  actions: {}
}
