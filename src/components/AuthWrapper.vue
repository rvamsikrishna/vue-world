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

    <button @click="onSubmit" class="button is-primary">{{authType}}</button>
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
  methods: {
    onSubmit() {
      this.$validator.validate().then(result => {
        if (!result) {
          return
        }
        if (this.authType === 'signup') {
          console.log('signup')
          auth.createUserWithEmail(this.email, this.password).then(() => {
            this.onAuthSuccess()
          })
        } else if (this.authType === 'login') {
          console.log('login')
          auth.loginWithEmail(this.email, this.password).then(() => {
            this.onAuthSuccess()
          })
        }
      })
    },
    googleSignin() {
      auth.loginWithGoogle().then(() => {
        this.onAuthSuccess()
      })
    },
    onAuthSuccess() {
      this.$emit('auth-successful')
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
