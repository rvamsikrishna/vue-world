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
    }
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
      let index = state.all.events.findIndex(ev => ev.id === event.id)
      let updatedEvent = { ...event, attendees: { ...userObj } }
      Vue.set(state.all.events, index, updatedEvent)
      if (state.attending.initialFetch)
        state.attending.events.unshift(updatedEvent)
    },
    removeAttending(state, { event, userId }) {
      let attendingIndex = state.attending.events.findIndex(
        ev => ev.id === event.id
      )
      state.attending.events.splice(attendingIndex, 1)

      let eventCopy = { ...event }
      eventCopy.attendees[userId] = false

      let allIndex = state.all.events.findIndex(ev => ev.id === event.id)
      console.log('updated event', eventCopy)
      Vue.set(state.all.events, allIndex, eventCopy)
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
        attendeesCount: 0,
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
      let userObj = {}
      userObj[user.uid] = {
        name: user.name || user.email.split('@')[0],
        photoURL: user.photoURL,
        uid: user.uid
      }

      firebase
        .firestore()
        .collection('events')
        .doc(event.id)
        .set({ attendees: userObj }, { merge: true })
        .then(() => {
          commit('addAttending', { event, userObj })
        })
    },
    quitEvent({ commit, rootState }, event) {
      let user = rootState.user.user
      let userObj = {}
      userObj[user.uid] = firebase.firestore.FieldValue.delete()
      firebase
        .firestore()
        .collection('events')
        .doc(event.id)
        .set({ attendees: userObj }, { merge: true })
        .then(() => {
          commit('removeAttending', { event, userId: user.uid })
        })
    }
  }
}
