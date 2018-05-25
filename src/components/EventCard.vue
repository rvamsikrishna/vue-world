<template>
  <BaseCard>
    <p class="has-text-primary has-text-weight-bold is-size-7 has-text-right">@{{event.time}}</p>
    <P class="is-size-6">{{event.organizer.name}}</P>
    <p class="is-size-5 has-text-weight-bold">{{event.title}}</p>    
    <p class="attendees-count is-size-7 has-text-grey">
      <span class="icon is-small"><BaseIcon :icon="icon"/></span>
      {{event.attendeesCount}} people going
    </p>
  </BaseCard>
</template>

<script>
import { faUserFriends } from '@fortawesome/fontawesome-free-solid/'

export default {
  props: ['event'],
  computed: {
    icon() {
      return faUserFriends
    }
  }
}
</script>

<style lang="sass" scoped>
  .attendees-count
    margin-top: .25em
</style>
