<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
        <BaseCard>
          <p class="is-size-5 has-text-weight-bold">Are you going? <span class="is-size-7 has-text-grey">{{event.attendeesCount}} people going</span></p>
          <template slot="cardFooter">
            <a class="card-footer-item is-primary">Yes</a>
            <a class="card-footer-item">No</a>
          </template>
        </BaseCard>
        <p class="has-text-grey">{{event.date}} @ {{event.time}}</p>
        <h1 class="title">{{event.title}}</h1>
        <div class="columns has-text-primary has-text-weight-bold">
          <div class="column is-narrow">
            <BaseAvatar :src="event.organizer.photoUrl"/>
          </div>
          <div class="column">
            <p class="is-size-7 ">hosted by: {{event.organizer.name}}</p>
            <p class="is-size-7">categories: <span v-for="(v, k) in event.categories" :key="k" class="tag">{{k}}</span></p>
          </div>
        </div>
        <p class="is-size-5 has-text-black has-text-weight-bold">
          Location
         <BaseIcon :icon="icon"/>
        </p>
        <p class="has-text-grey">address</p>
        <p class="is-size-5 has-text-black has-text-weight-bold">Event Description</p>
        <p class="has-text-grey">{{event.description}}</p>
        <Attendees />
        <Comments />
      </div>
    </div>
  </div>
</template>

<script>
import { faMap } from '@fortawesome/fontawesome-free-solid/'

import Attendees from '@/components/Attendees.vue'
import Comments from '@/components/Comments.vue'
export default {
  components: { Attendees, Comments },
  computed: {
    icon() {
      return faMap
    },
    event() {
      const { id, type } = this.$route.params
      console.log('details', id)
      return this.$store.getters['events/selectedEvent'](id, type)
    }
  }
}
</script>

<style lang="sass" >
  .container
    margin-top: 1.5em
    padding-top: 1em

  base-card
    .button
      margin-top: 1em
</style>
