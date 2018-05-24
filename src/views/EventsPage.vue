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
        if (!this.events.length)
          this.$store.dispatch('events/fetchEventsFromDb', to.params.type)
      },
      immediate: true
    }
  },
  methods: {
    navigateToEvent(event) {
      console.log('event clicked', event)
    }
  }
}
</script>

<style lang="sass" scoped>
  .event-card
    &:hover
      cursor: pointer
</style>
