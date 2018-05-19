<template>
    <figure class="image is-32x32">
        <img class="is-circular" :src="profileImgPath">
    </figure>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    small: {
      type: Boolean,
      default: true
    },
    medium: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    src: {
      type: String
    }
  },
  computed: {
    profileImgPath() {
      /*eslint no-undef: "off"*/
      return this.src ? this.src : require('../../assets/user-avatar.jpg')
    }
  }
}
</script>

<style lang="sass" scoped>
    .is-circular
        border-radius: 50%
</style>
