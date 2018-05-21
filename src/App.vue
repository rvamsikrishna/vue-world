<template>
  <div id="app">
    <Navbar @show-auth-modal="openAuthModal"/>
    <router-view/>
    <BaseModal v-if="authModal" :show="authModal" @hide-modal="hideAuthModal">
      <span slot="title" class="title">{{authType | uppercase}}</span>
      <AuthWrapper slot="body" :authType="authType" @auth-successful="hideAuthModal"/>
      <template slot="footer">
        <p v-if="authType === 'signup'">Already have an Account? <a @click="openAuthModal('login')">Log in</a></p>
        <p v-else>Are you new here? <a @click="openAuthModal('signup')">Sign up</a></p>
      </template>
    </BaseModal>
    <BaseToast 
      :show="toast.isShowing" 
      @hide-toast="$store.commit('shared/hideToast')" 
      :msg="toast.message"
      :toastType="toast.toastType"
    />  
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AuthWrapper from '@/components/AuthWrapper.vue'
export default {
  name: 'App',
  data() {
    return {
      authModal: false,
      authType: null,
      email: '',
      password: ''
    }
  },
  computed: {
    toast() {
      return this.$store.getters['shared/toast']
    }
  },
  components: {
    Navbar,
    AuthWrapper
  },
  methods: {
    openAuthModal(authType) {
      this.authModal = true
      this.authType = authType
    },
    hideAuthModal() {
      this.authModal = false
      this.authType = null
    },
    onSubmit() {
      console.log('validator', this.errors.any())
    }
  }
}
</script>

<style lang="sass" scoped>
  .upper-section
    margin-bottom: 1em

  .google-signin
    span
      margin-left: .75em

</style>
