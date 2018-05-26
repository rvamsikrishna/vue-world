<template>
    <div class="container">
      <div class="columns">
        <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
          <EventsTabs :currentTab="type"/>
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
import EventsTabs from '@/components/EventsTabs.vue'
import EventCard from '@/components/EventCard.vue'
import EventsSlot from '@/components/EventsSlot.vue'

export default {
  props: ['type'],
  components: {
    EventsTabs,
    EventCard,
    EventsSlot
  },
  computed: {
    events() {
      return this.$store.getters[`events/${this.type}`]
    }
  },
  watch: {
    $route: {
      handler: function(to) {
        let type = to.params.type
        if (!this.events.length)
          if (type === 'all') this.$store.dispatch('events/fetchAllEvents')
          else if (type === 'organizing')
            this.$store.dispatch('events/fetchOrganizingEvents')
          else if (type === 'attending')
            this.$store.dispatch('events/fetchAttendingEvents')
      },
      immediate: true
    }
  },
  methods: {
    navigateToEvent(event) {
      this.$router.push(`/event/${this.type}/${event.id}`)
    }
  }
}
</script>

<style lang="sass" scoped>
  .event-card
    &:hover
      cursor: pointer
</style>
