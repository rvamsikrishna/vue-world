<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
            <img class="logo" src="../assets/vue-world-logo.jpg">
            <span class="is-size-5 has-text-primary has-text-weight-bold">Vue World</span>
        </router-link>                    
    </div>

    <div class="navbar-menu">
        <div class="navbar-end">
            <router-link class="navbar-item has-text-primary has-text-weight-bold" to="/create-event">
                Create an event
            </router-link>
            <div class="navbar-item has-dropdown is-hoverable">
                <BaseAvatar :src="userProfilePic" class="navbar-avatar" />
                <div class="navbar-dropdown is-right">
                    <template v-if="!isLoggedIn">
                        <a @click="showAuthModal('login')" class="navbar-item">
                            Log in
                        </a>
                        <a @click="showAuthModal('signup')" class="navbar-item">
                            Sign up
                        </a>
                    </template>
                    <template v-else>
                        <a @click="logout" class="navbar-item">
                            Log out
                        </a>
                    </template>
                </div>
            </div>
         </div>
        </div>
    </nav>
</template>

<script>
import auth from '@/auth'
export default {
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    userProfilePic() {
      return this.user ? this.user.photoURL : null
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    showAuthModal(type) {
      this.$emit('show-auth-modal', type)
    },
    logout() {
      auth.logout()
    }
  }
}
</script>

<style lang="sass" scoped>
    .logo
        margin-right: .5em
        background: red

    .navbar-avatar
        padding-top: 0.8em
        margin-right: 1em

        + div.navbar-dropdown
            margin-right: 1em
</style>
