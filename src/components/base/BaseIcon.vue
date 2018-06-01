<template>
    <font-awesome-icon :icon="icon" v-bind="$attrs" />
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  props: ['icon'],
  components: {
    FontAwesomeIcon
  }
}
</script>

<style>
</style>
