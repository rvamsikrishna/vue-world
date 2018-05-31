import firebase from 'firebase'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    tags: [],
    results: [],
    searchedEvent: null
  },
  getters: {
    searchedEvent(state) {
      return state.searchedEvent
    },
    results(state) {
      return state.results
    }
  },
  mutations: {
    addTags(state, snap) {
      if (!snap.exists) return
      snap.forEach(doc => {
        state.tags.push(doc.data())
      })
    },
    clearTags(state) {
      state.tags = []
    },
    addSearchResults(state, results) {
      results.forEach(res => {
        state.results.push({ title: res.title, id: res.objectID })
      })
    },
    clearSearchResults(state) {
      state.results = []
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
    },
    fetchSearchResults({ commit }, searchQuery) {
      return Vue.algoliaIndex.search({ query: searchQuery }).then(res => {
        commit('addSearchResults', res.hits)
      })
    }
  }
}
