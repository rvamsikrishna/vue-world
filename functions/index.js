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

exports.modifyAttendees = functions.firestore
  .document('events/{eventId}/attendees/{attendeeId}')
  .onWrite((change, context) => {
    const eventId = context.params.eventId
    const attendeeId = context.params.attendeeId
    const attendeeData = change.after.exists ? change.after.data() : null

    const eventRef = admin
      .firestore()
      .collection('events')
      .doc(eventId)

    return eventRef.get().then(doc => {
      let recentAttendees = doc.data().recentAttendees
      let attendeesCount = doc.data().attendeesCount

      if (recentAttendees.length > 5) recentAttendees.pop()

      recentAttendees.unshift({
        name: attendeeData.name,
        avatar: attendeeData.avatar,
        uid: attendeeData.uid
      })
      attendeesCount = attendeesCount + 1

      return eventRef.update({
        attendees: {
          [`${attendeeData.uid}`]: attendeeData
            ? true
            : firebase.firestore.FieldValue.delete()
        },
        recentAttendees,
        attendeesCount
      })
    })
  })

exports.onNewComment = functions.firestore
  .document('events/{eventId}/comments/{commentId}')
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
