export default {
  namespaced: true,
  state: {
    toast: {
      isShowing: false,
      message: '',
      toastType: null,
      timeout: null
    },
    modal: false
  },
  getters: {
    toast(state) {
      return state.toast
    },
    modal(state) {
      return state.modal
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
    openModal(state) {
      state.modal = true
    },
    closeModal(state) {
      state.modal = false
    }
  },
  actions: {}
}
