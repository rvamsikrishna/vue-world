<template>
  <div id="app">
    <Navbar @show-auth-modal="openAuthModal"/>
    <router-view/>
    <BaseModal :show="authModal.isOpen" @hide-modal="hideAuthModal">
      <span slot="title" class="title">{{authModal.authType | uppercase}}</span>
      <AuthWrapper slot="body" :authType="authModal.authType" @auth-successful="hideAuthModal"/>
      <template slot="footer">
        <p v-if="authType === 'signup'">Already have an Account? <a @click="openAuthModal('login')">Log in</a></p>
        <p v-else>Are you new here? <a @click="openAuthModal('signup')">Sign up</a></p>
      </template>
    </BaseModal>

    <BaseModal :show="loading.isShowing">
      <div slot="body" class="has-text-centered">
          <BaseIcon :icon="icon" class="has-text-primary" size="5x" spin/>
          <p>{{loading.text ? loading.text :'loading..'}}</p>
      </div>
    </BaseModal>
    <BaseToast 
      :show="toast.isShowing" 
      @hide-toast="$store.commit('shared/hideToast')" 
      :msg="toast.message"
      :toastType="toast.toastType"
      :timeout="toast.timeout"
    />  
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AuthWrapper from '@/components/AuthWrapper.vue'
import { mapGetters } from 'vuex'
import { faSpinner } from '@fortawesome/fontawesome-free-solid/'

export default {
  name: 'App',
  data() {
    return {
      // authModal: false,
      authType: null,
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('shared', ['toast', 'loading']),
    ...mapGetters('user', ['authModal']),
    icon() {
      return faSpinner
    }
  },
  components: {
    Navbar,
    AuthWrapper
  },
  methods: {
    openAuthModal(authType) {
      // this.authModal = true
      this.$store.commit('user/openAuthModal', authType)
      // this.authType = authType
    },
    hideAuthModal() {
      // this.authModal = false
      this.$store.commit('user/closeAuthModal')
      // this.authType = null
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
