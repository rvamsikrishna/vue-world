import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    tags: []
  },
  getters: {},
  mutations: {
    addTags(state, snap) {
      if (!snap.exists) return
      snap.forEach(doc => {
        state.tags.push(doc.data())
      })
    },
    clearTags(state) {
      state.tags = []
    }
  },
  actions: {
    fetchTags({ commit }, tag) {
      firebase
        .firestore()
        .collection('event_tags')
        .orderBy('name')
        .startAt(tag)
        .get()
        .then(snap => {
          commit('addTags', snap)
        })
    }
  }
}
