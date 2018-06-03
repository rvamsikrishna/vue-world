<template>
  <div class="container">
    <div class="columns">
      <template v-if="event">
        <div class="column is-10-mobile is-offset-1-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
          <BaseCard v-if="event.organizer.uid !== userId &&event.timestamp > Date.now()">
            <template v-if="!userAttending">
              <p class="is-size-7 has-text-weight-bold">Are you going? <span class="is-size-7 has-text-grey">{{event.attendeesCount}} people going</span></p>
              <template slot="cardFooter">
                  <a @click="attendEvent" class="card-footer-item has-background-primary has-text-white">Yes</a>
                  <a class="card-footer-item has-background-grey-light has-text-white">No</a>
              </template>
            </template>
            
            <template v-else>
              <p class="is-size-5 has-text-weight-bold">You are attending this event. Do you want to bail out?</p>
              <template slot="cardFooter">
                <a @click="quitEvent" class="card-footer-item has-background-danger has-text-white">Quit</a>
              </template>
            </template>

          </BaseCard>
          <p class="has-text-grey">{{event.date}} @ {{event.time}}</p>
          <h1 class="title">{{event.title}}</h1>
          <div class="columns has-text-primary has-text-weight-bold">
            <div class="column is-narrow">
              <BaseAvatar :src="event.organizer.photoURL"/>
            </div>
            <div class="column">
              <p class="is-size-7 ">hosted by: {{event.organizer.name}}</p>
              <p class="is-size-7">categories: <span v-for="(v, k) in event.categories" :key="k" class="tag">{{k}}</span></p>
            </div>
          </div>
          <p class="is-size-4 has-text-black has-text-weight-bold">
            Location
          <BaseIcon :icon="icon"/>
          </p>
          <p class="has-text-grey">{{event.address}}</p>
          <p class="has-text-grey">{{event.location}}</p>
          <p class="is-size-4 has-text-black has-text-weight-bold">Event Description</p>
          <p class="has-text-grey">{{event.description}}</p>
          <Attendees :organizer="event.organizer" :attendeesCount="event.attendeesCount" :attendees="event.recentAttendees"/>
          <Comments :eventId="event.id" :commentsSize="event.commentsSize" :comments="event.recentComments"/>
        </div>
      </template>
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
    currentEventType() {
      return this.$store.getters['events/currentEventType']
    },
    event() {
      const { id } = this.$route.params
      return this.$store.getters['events/selectedEvent'](
        id,
        this.currentEventType
      )
    },
    userId() {
      const user = this.$store.getters['user/user']
      return user ? user.uid : null
    },
    userAttending() {
      console.log('user', this.userId)
      return !!this.event.attendees[this.userId]
    }
  },
  methods: {
    attendEvent() {
      if (!this.userId) {
        this.$store.commit('user/openAuthModal', 'login')
      } else {
        this.$store.dispatch('events/attendEvent', this.event)
      }
    },
    quitEvent() {
      this.$store.dispatch('events/quitEvent', this.event)
    }
  },
  created() {
    let id = this.$route.params.id
    console.log('event created', id)
    this.$store.dispatch('events/addEventRealtimeUpdate', id)
  },
  beforeDestroy() {
    console.log('event destroyed')

    this.$store.dispatch('events/removeEventRealtimeUpdate')
  }
}
</script>

<style lang="sass" >
  .container
    margin-top: 1.5em
    padding-top: 1em

  p.is-size-4
    margin-top: 1.2em
    margin-bottom: .5em

</style>
