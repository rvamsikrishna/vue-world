<template>
    <font-awesome-icon :icon="icon" />
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  functinal: true,
  props: ['icon'],
  components: {
    FontAwesomeIcon
  }
}
</script>

<style>
</style>
