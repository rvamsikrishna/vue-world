export default {
  namespaced: true,
  state: {
    toast: {
      isShowing: false,
      message: '',
      toastType: null,
      timeout: null
    },
    loading: {
      isShowing: false,
      text: ''
    }
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
    showLoading(state, text) {
      state.loading.isShowing = true
      state.loading.text = text
    },
    closeModal(state) {
      state.loading.isShowing = false
      state.loading.text = ''
    }
  },
  actions: {}
}
