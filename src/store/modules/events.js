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
    all: [],
    organizing: [],
    attending: []
  },
  getters: {
    all(state) {
      return group(state.all, 'date')
    },
    organizing(state) {
      return group(state.organizing, 'date')
    },
    attending(state) {
      return group(state.attending, 'date')
    }
  },
  mutations: {
    setupEvents(state, { type, snap }) {
      snap.forEach(doc => {
        state[type].push(doc.data())
      })
    },
    addEvent(state, event) {
      state.all.unshift(event)
    }
  },
  actions: {
    fetchEventsFromDb({ commit, rootGetters }, type) {
      let path
      if (type === 'all') path = 'events'
      else if (type === 'organizing')
        path = `users/${rootGetters.user.uid}/organizing`
      else if (type === 'attending')
        path = `users/${rootGetters.user.uid}/attending`
      firebase
        .firestore()
        .collection(path)
        .orderBy('timestamp')
        .startAt(Date.now())
        // .where('timestamp', '>=', Date.now())
        // .limit(5)
        .get()
        .then(snap => {
          commit('setupEvents', { type: type, snap: snap })
        })
    },
    addEventToDb({ commit }, event) {
      firebase
        .firestore()
        .collection('events')
        .add({ ...event, attendeesCount: 0 })
        .then(() /*docRef*/ => {
          // commit('addEvent', { ...event, id: docRef.id })
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
    }
  }
}
