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

exports.onNewComment = functions.firestore
  .document('event_comments/{eventId}/comments/{commentId}')
  .onCreate((snap, context) => {
    const eventId = context.params.eventId
    let commentId = context.params.commentId
    const commentData = snap.data()
    const eventRef = admin
      .firestore()
      .collection('events')
      .doc(eventId)

    return eventRef.get().then(doc => {
      let recentComments = doc.data().recentComments
      let commentsSize = doc.data().commentsSize

      if (recentComments.length > 5) recentComments.pop()

      recentComments.unshift({
        name: commentData.name,
        avatar: commentData.avatar,
        comment: commentData.comment,
        uid: commentData.uid,
        timestamp: commentData.timestamp,
        commentId: commentId
      })
      commentsSize = commentsSize + 1

      return eventRef.update({ recentComments, commentsSize })
    })
  })
