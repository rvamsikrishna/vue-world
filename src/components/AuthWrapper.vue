<template>
  <div>
    <div class="upper-section has-text-centered">
      <button @click="googleSignin" class="is-info button google-signin">
        <img class="image is-24x24" src="../assets/g-logo.jpeg" alt="signin with google">
        <span>Continue with Google</span>
      </button>
    </div>  

    <BaseTextInput v-validate="'email|required'" :error="errors.first('Email')" label="Email" v-model="email" placeholder="Your email" type="email"/>
    <BaseTextInput v-validate="'required'" :error="errors.first('Password')" label="Password" v-model="password" placeholder="Your password" type="password"/>

    <button @click="onSubmit" class="button is-primary" :class="{'is-loading': loading}">{{authType}}</button>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  props: {
    authType: String
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters['shared/loading']
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(result => {
        if (!result) {
          return
        }
        this.$store.commit('shared/showLoading')
        if (this.authType === 'signup') {
          auth
            .createUserWithEmail(this.email, this.password)
            .then(() => {
              this.onAuthSuccess('Welcome...')
            })
            .catch(err => {
              this.onAuthFailure(err.message)
            })
        } else if (this.authType === 'login') {
          auth
            .loginWithEmail(this.email, this.password)
            .then(() => {
              this.onAuthSuccess('Logged in successfully')
            })
            .catch(err => {
              this.onAuthFailure(err.message)
            })
        }
      })
    },
    googleSignin() {
      auth
        .loginWithGoogle()
        .then(() => {
          this.onAuthSuccess('Logged in successfully')
        })
        .catch(err => {
          this.onAuthFailure(err.message)
        })
    },
    onAuthSuccess(toastMsg) {
      this.$emit('auth-successful')
      this.$store.commit('shared/showToast', {
        message: toastMsg,
        toastType: 'success',
        timeout: 2000
      })
      this.$store.commit('shared/closeLoading')
    },
    onAuthFailure(errMsg) {
      this.$store.commit('shared/showToast', {
        message: errMsg,
        toastType: 'error',
        timeout: 5000
      })
      this.$store.commit('shared/closeLoading')
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
