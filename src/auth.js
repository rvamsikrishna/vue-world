import firebase from 'firebase'
import { config } from './firebase-config'

const auth = {
  context: null,

  init(context) {
    this.context = context
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      this.context.$store.dispatch('user/setCurrentUser', user)
    })
  },
  user() {
    return this.context ? firebase.auth().currentUser : null
  },
  createUserWithEmail(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    return firebase.auth().signInWithPopup(provider)
  },
  loginWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout() {
    firebase.auth().signOut()
    this.context.$router.push('/')
    this.context.$store.commit('shared/showToast', {
      message: 'Logged out.... See you soon!',
      toastType: 'success'
    })
  }
}

export default auth
