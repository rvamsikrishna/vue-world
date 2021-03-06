import firebase from 'firebase'
import { config } from './firebase-config'

const auth = {
  context: null,

  init(context) {
    this.context = context
    firebase.initializeApp(config)
    const settings = { /* your settings... */ timestampsInSnapshots: true }
    firebase.firestore().settings(settings)

    firebase.auth().onAuthStateChanged(user => {
      // console.log(uer)
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
    this.context.$store.commit('events/clearEvents')
    this.context.$store.commit('shared/showToast', {
      message: 'Logged out.... See you soon!',
      toastType: 'success',
      timeout: 2000
    })
  }
}

export default auth
