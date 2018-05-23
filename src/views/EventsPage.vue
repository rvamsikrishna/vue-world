<template>
    <div class="container">
      <div class="columns">
        <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
          <EventsTabs :currentTab="currentTab"/>
          <EventsSlot :events="events">
            <EventCard slot-scope="props" :event="props.event"/>
            <!-- <p slot-scope="{title}">{{title}}</p> -->
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
  components: {
    EventsTabs,
    EventCard,
    EventsSlot
  },
  computed: {
    currentTab() {
      return this.$route.params.type
    },
    events() {
      return this.$store.getters[`events/${this.currentTab}`]
    }
  }
}
</script>

<style>
</style>
