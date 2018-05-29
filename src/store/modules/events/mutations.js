import Vue from 'vue'
export default {
  setCurrentEventType(state, type) {
    state.currentEventType = type
  },
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
  addMore(state, { eventType, type, eventId, snap, event }) {
    let typeName = 'recent' + type.charAt(0).toUpperCase() + type.slice(1)
    let index = state[eventType].events.findIndex(ev => ev.id === eventId)
    let updated = { ...event }
    snap.forEach(doc => {
      updated[typeName].push(doc.data())
    })
    Vue.set(state[eventType].events, index, updated)
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
}
