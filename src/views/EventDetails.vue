<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
        <p class="has-text-grey">26 september wednesday, 2018 @ 6 : 00 pm</p>
        <h1 class="title">Orlando tech meetup</h1>
        <div class="columns has-text-primary has-text-weight-bold">
          <div class="column is-narrow">
            <BaseAvatar />
          </div>
          <div class="column">
            <p class="is-size-7 ">hosted by: organizer</p>
            <p class="is-size-7">categories: tech | iot ...</p>
          </div>
        </div>
        <p class="is-size-5 has-text-black has-text-weight-bold">
          Location
         <BaseIcon :icon="icon"/>
        </p>
        <p class="has-text-grey">address</p>
        <p class="is-size-5 has-text-black has-text-weight-bold">Event Description</p>
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
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
