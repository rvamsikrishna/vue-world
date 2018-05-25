<template>
  <div>
    <div class="group" v-for="(group) in events" :key="group[0].date">
      <h1 class="title has-text-black">{{group[0].date}}</h1>
      <template v-for="(event) in group">
        <slot :event="event"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: Array
  }
}
</script>

<style lang="sass" scoped>
  .group
    padding-top: 1.5em
</style>
