const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

admin.initializeApp(functions.config().firebase)

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key

const ALGOLIA_INDEX_NAME = 'events'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

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

exports.onEventCreated = functions.firestore
  .document('events/{eventId}')
  .onCreate((snap, context) => {
    const event = {
      title: snap.data().title,
      description: snap.data().description
    }

    event.objectID = context.params.eventId

    const index = client.initIndex(ALGOLIA_INDEX_NAME)
    return index.saveObject(event)
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

      if (attendeeData) {
        recentAttendees.unshift({
          name: attendeeData.name,
          avatar: attendeeData.avatar,
          uid: attendeeId
        })
        attendeesCount = attendeesCount + 1
      } else {
        let index = recentAttendees.findIndex(
          attendee => attendee.uid === attendeeId
        )
        if (index > -1) recentAttendees.splice(index, 1)
        attendeesCount = attendeesCount - 1
      }
      return eventRef.update({
        attendees: {
          [`${attendeeId}`]: attendeeData ? true : false
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
