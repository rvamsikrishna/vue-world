import * as firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    events: []
  },
  getters: {
    allEventts(state) {
      return state.events
    }
  },
  mutations: {
    addEvent(state, event) {
      state.events.unshift(event)
    }
  },
  actions: {
    addEventToDb({ commit }, event) {
      firebase
        .firestore()
        .collection('events')
        .add(event)
        .then(docRef => {
          commit('addEvent', { ...event, id: docRef.id })
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
