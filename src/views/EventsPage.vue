<template>
    <div class="container">
      <div class="columns">
        <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
          <h1 class="title has-text-weight-bold">Event search</h1>
          <Search />
          <EventsTabs :currentTab="currentEventType"/>
          <EventsSlot :events="events">
            <EventCard 
              slot-scope="{event}" 
              @click.native="navigateToEvent(event)" 
              class="event-card" 
              :event="event"
            />
          </EventsSlot>
        </div>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search.vue'
import EventsTabs from '@/components/EventsTabs.vue'
import EventCard from '@/components/EventCard.vue'
import EventsSlot from '@/components/EventsSlot.vue'
import { mapActions } from 'vuex'

export default {
  // props: ['type'],
  components: {
    Search,
    EventsTabs,
    EventCard,
    EventsSlot
  },
  computed: {
    currentEventType() {
      return this.$store.getters['events/currentEventType']
    },
    events() {
      return this.$store.getters[`events/${this.currentEventType}`]
    },
    initialFetch() {
      return this.$store.getters['events/initialFetched'](this.currentEventType)
    }
  },
  watch: {
    $route: {
      handler: function(to) {
        let type = to.params.type
        this.$store.commit('events/setCurrentEventType', type)
        if (!this.initialFetch) this.fetchAllEvents()
        else if (type === 'organizing') this.fetchOrganizingEvents()
        else if (type === 'attending') this.fetchAttendingEvents()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('events', [
      'fetchAllEvents',
      'fetchOrganizingEvents',
      'fetchAttendingEvents'
    ]),
    navigateToEvent(event) {
      this.$router.push(`/event/${this.currentEventType}/${event.id}`)
    }
  }
}
</script>

<style lang="sass" scoped>
  .event-card
    &:hover
      cursor: pointer
</style>
