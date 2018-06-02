import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  fetchAllEvents({ commit }) {
    commit('shared/showLoading', null, { root: true })
    firebase
      .firestore()
      .collection('events')
      .orderBy('timestamp')
      .startAt(Date.now())
      .get()
      .then(snap => {
        commit('setupEvents', { type: 'all', snap: snap })
        commit('shared/closeLoading', null, { root: true })
      })
  },
  fetchOrganizingEvents({ commit, rootState }) {
    commit('shared/showLoading', null, { root: true })

    firebase
      .firestore()
      .collection('events')
      .where('organizer.uid', '==', rootState.user.user.uid)
      .orderBy('timestamp')
      // .startAt(Date.now())
      .get()
      .then(snap => {
        commit('setupEvents', { type: 'organizing', snap: snap })
        commit('shared/closeLoading', null, { root: true })
      })
  },
  fetchAttendingEvents({ commit, rootState }) {
    commit('shared/showLoading', null, { root: true })
    const user = rootState.user.user
    firebase
      .firestore()
      .collection('events')
      .where(`attendees.${user.uid}`, '==', true)
      .orderBy('timestamp')
      .startAt(Date.now())
      .get()
      .then(snap => {
        commit('setupEvents', { type: 'attending', snap: snap })
        commit('shared/closeLoading', null, { root: true })
      })
  },
  addEventToDb({ commit, rootState }, event) {
    const user = rootState.user.user
    console.log('user', user)
    const data = {
      ...event,
      attendees: {},
      attendeesCount: 0,
      recentAttendees: [],
      commentsSize: 0,
      recentComments: [],
      organizer: {
        name: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        uid: user.uid
      }
    }
    firebase
      .firestore()
      .collection('events')
      .add(data)
      .then(docRef => {
        commit('addEvent', { ...event, id: docRef.id })
        commit(
          'shared/showToast',
          {
            message:
              'Successfully added your event. Starting inviting people to your amazing event.',
            timeout: 4000,
            toastType: 'success'
          },
          { root: true }
        )
      })
      .catch(err => {
        commit('shared/showToast', {
          message: err,
          timeout: 5000,
          toastType: 'error'
        })
      })
  },
  attendEvent({ commit, rootState }, event) {
    let user = rootState.user.user
    let userObj = {
      name: user.name || user.email.split('@')[0],
      avatar: user.photoURL,
      uid: user.uid
    }

    firebase
      .firestore()
      .collection('events')
      .doc(event.id)
      .collection('attendees')
      .doc(user.uid)
      .set(userObj)
      .then(() => {
        commit('addAttending', { event, userObj })
      })
  },
  quitEvent({ commit, rootState }, event) {
    let user = rootState.user.user
    firebase
      .firestore()
      .collection('events')
      .doc(event.id)
      .collection('attendees')
      .doc(user.uid)
      .delete()
      .then(() => {
        commit('removeAttending', { event, userId: user.uid })
      })
  },
  submitComment({ rootState }, { comment, eventId }) {
    let user = rootState.user.user
    return firebase
      .firestore()
      .collection('events')
      .doc(eventId)
      .collection('comments')
      .add({
        name: user.displayName || user.email.split('@')[0],
        avatar: user.photoURL,
        comment: comment,
        uid: user.uid,
        timestamp: Date.now()
      })
  },
  addEventRealtimeUpdate({ commit, getters }, eventId) {
    let currentEventType = getters.currentEventType
    let query = firebase
      .firestore()
      .collection('events')
      .doc(eventId)
      .onSnapshot(doc => {
        commit('updateEvent', { doc, eventId, currentEventType })
        commit('addEventListener', query)
      })
  },
  removeEventRealtimeUpdate({ commit, state }) {
    //unsubscribe yo realtime listener
    state.listener()
    commit('removeEventListener')
  },
  showMoreComments({ commit, state }, { type, eventId }) {
    let eventType = state.currentEventType
    let event = state[eventType].events.find(ev => ev.id === eventId)
    let recentComments = event.recentComments
    firebase
      .firestore()
      .collection('events')
      .doc(eventId)
      .collection(type)
      .orderBy('timestamp', 'desc')
      .startAfter(recentComments[recentComments.length - 1].timestamp)
      .limit(5)
      .get()
      .then(snap => {
        commit('addMore', { eventType, type, eventId, snap, event })
        snap.forEach(doc => {
          console.log('more coments', doc.data())
        })
      })
  }
}
