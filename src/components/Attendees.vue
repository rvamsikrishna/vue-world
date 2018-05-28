<template>
  <div>
    <div class="level">
      <p class="is-size-4 has-text-black has-text-weight-bold">Attendees</p>
      <a @click="showAll = !showAll" class="has-text-right has-text-primary"> {{showAll ? 'see less &#11205;' : 'see all &#11206;'}}</a>
    </div>
    <Attendee :attendee="organizer" organizer/>
    <Attendee v-for="attendee in attendeeesArr" :key="attendee.uid" :attendee="attendee"/>
  </div>
</template>

<script>
import Attendee from '@/components/Attendee.vue'
export default {
  components: { Attendee },
  props: {
    organizer: Object,
    attendees: Object
  },
  data() {
    return {
      showAll: false
    }
  },
  computed: {
    attendeeesArr() {
      let arr = Object.values(this.attendees)
      return this.showAll ? arr : arr.slice(0, 5)
    }
  }
}
</script>

<style lang="sass" scoped>
  .card
    border-bottom: 1px solid lightgrey
    margin-top: o
  .card .card-content
    padding: 0.5rem 
</style>
