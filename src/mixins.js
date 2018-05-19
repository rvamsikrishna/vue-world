export const UserMixin = {
  computed: {
    user() {
      return this.$store.getters.user
    },
    isLoggedIn() {
      return this.user !== null
    }
  }
}

export const LoadingMixin = {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading
    }
  }
}

export const ValidateMixin = {
  props: ['error'],
  methods: {
    performSubmit(func) {
      func()
    }
  }
}
