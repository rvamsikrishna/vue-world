<template>
  <div class="tabs is-centered">
    <ul>
      <li v-for="tab in $options.$tabs" :key="tab.name" :class="{'is-active': tab.path === currentTab}">
        <router-link :to="`/events/${tab.path}`">
          <span>{{tab.name}}</span>
          <span class="icon is-small"><BaseIcon :icon="tab.icon"/></span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  faClock,
  faCalendarAlt,
  faUserFriends
} from '@fortawesome/fontawesome-free-solid/'
export default {
  props: ['currentTab'],
  $tabs: [
    {
      name: 'All Events',
      icon: faClock,
      path: 'all'
    },
    {
      name: 'My Events',
      icon: faCalendarAlt,
      path: 'organizing'
    },
    {
      name: 'Attending',
      icon: faUserFriends,
      path: 'attending'
    }
  ]
}
</script>

<style>
</style>
