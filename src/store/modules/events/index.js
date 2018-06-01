import mutations from './mutations'
import actions from './actions'

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
    currentEventType: '',
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
    searchedEvent: null,
    listener: null
  },
  getters: {
    currentEventType(state) {
      return state.currentEventType
    },
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
        if (type === 'search') {
          return state.searchedEvent
        } else {
          return state[type].events.find(event => event.id === id)
        }
      }
    }
  },
  mutations: mutations,
  actions: actions
}
