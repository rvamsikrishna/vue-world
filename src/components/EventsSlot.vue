<template>
  <div>
    <div class="group" v-for="(group, groupIndex) in events" :key="group[0].date">
      <h1 class="title has-text-black">{{group[0].date}}</h1>
      <template v-for="(event, eventIndex) in group">
        <slot :event="{...event, gI: groupIndex, eI: eventIndex}"></slot>
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
