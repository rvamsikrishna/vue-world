import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const group = (arr, property) => {
  let obj = {}
  arr.forEach(i => {
    if (!obj[i[property]]) obj[i[property]] = []
    obj[i[property]].push(i)
  })
  return Object.values(obj)
}

export default {
  namespaced: true,
  state: {
    all: {
      initialFetch: false,
      events: []
    },
    organizing: {
      initialFetch: false,
      events: []
    },
    attending: {
      initialFetch: false,
      events: []
    },
    listener: null
  },
  getters: {
    initialFetched(state) {
      return type => state[type].initialFetch
    },
    all(state) {
      return group(state.all.events, 'date')
    },
    organizing(state) {
      return group(state.organizing.events, 'date')
    },
    attending(state) {
      return group(state.attending.events, 'date')
    },
    selectedEvent(state) {
      return (id, type) => {
        return state[type].events.find(event => event.id === id)
      }
    }
  },
  mutations: {
    setupEvents(state, { type, snap }) {
      state[type].initialFetch = true
      snap.forEach(doc => {
        state[type].events.push({ ...doc.data(), id: doc.id })
      })
    },
    addEvent(state, event) {
      if (state.organizing.initialFetch) state.organizing.events.unshift(event)
    },
    addAttending(state, { event, userObj }) {
      if (state.attending.initialFetch) {
        let index = state.all.events.findIndex(ev => ev.id === event.id)
        let updatedEvent = { ...event, attendees: { ...userObj } }
        Vue.set(state.all.events, index, updatedEvent)
        state.attending.events.unshift(updatedEvent)
      }
    },
    removeAttending(state, { event, userId }) {
      if (state.attending.initialFetch) {
        let attendingIndex = state.attending.events.findIndex(
          ev => ev.id === event.id
        )
        state.attending.events.splice(attendingIndex, 1)

        let eventCopy = { ...event }
        eventCopy.attendees[userId] = false

        let allIndex = state.all.events.findIndex(ev => ev.id === event.id)
        Vue.set(state.all.events, allIndex, eventCopy)
      }
    },
    updateEvent(state, { doc, eventId }) {
      let index = state.all.events.findIndex(ev => ev.id == eventId)
      Vue.set(state.all.events, index, { ...doc.data(), id: doc.id })
    },
    clearEvents(state) {
      state.all = { initialFetch: false, events: [] }
      state.organizing = { initialFetch: false, events: [] }
      state.attending = { initialFetch: false, events: [] }
    },
    addEventListener(state, query) {
      state.listener = query
    },
    removeEventListener(state) {
      state.listener = null
    }
  },
  actions: {
    fetchAllEvents({ commit }) {
      firebase
        .firestore()
        .collection('events')
        .orderBy('timestamp')
        .startAt(Date.now())
        .get()
        .then(snap => {
          commit('setupEvents', { type: 'all', snap: snap })
        })
    },
    fetchOrganizingEvents({ commit, rootState }) {
      firebase
        .firestore()
        .collection('events')
        .where('organizer.uid', '==', rootState.user.user.uid)
        .orderBy('timestamp')
        // .startAt(Date.now())
        .get()
        .then(snap => {
          commit('setupEvents', { type: 'organizing', snap: snap })
        })
    },
    fetchAttendingEvents({ commit, rootState }) {
      const user = rootState.user.user
      firebase
        .firestore()
        .collection('events')
        .where(`attendees.${user.uid}.uid`, '==', user.uid)
        .orderBy('timestamp')
        .startAt(Date.now())
        .get()
        .then(snap => {
          commit('setupEvents', { type: 'attending', snap: snap })
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
    addEventRealtimeUpdate({ commit }, eventId) {
      let query = firebase
        .firestore()
        .collection('events')
        .doc(eventId)
        .onSnapshot(doc => {
          commit('updateEvent', { doc, eventId })
          commit('addEventListener', query)
        })
    },
    removeEventRealtimeUpdate({ commit, state }) {
      state.listener()
      commit('removeEventListener')
    }
  }
}
