const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.addUserToDb = functions.auth.user().onCreate(user => {
  let userData = {
    email: user.email,
    displayName: user.displayName || user.email.split('@')[0],
    photoURL: user.photoURL
  }
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(userData)
})
