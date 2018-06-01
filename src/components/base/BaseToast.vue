<template>
    <div class="notification has-text-centered has-text-weight-bold" v-show="show" :class="toastClass">
      <button @click="toggleActive" class="delete"></button>
      <p>{{msg}}</p>
    </div>
</template>

<script>
import toggle from '@/mixins/toggle'
export default {
  props: {
    toastType: {
      type: String
    },
    msg: {
      type: String
    },
    timeout: {
      type: Number,
      default: 2500
    }
  },
  data() {
    return {
      activeTimeout: {}
    }
  },
  mixins: [toggle],
  computed: {
    toastClass() {
      switch (this.toastType) {
        case 'success':
          return 'is-success'
        case 'error':
          return 'is-danger'
        default:
          return ''
      }
    }
  },
  watch: {
    isActive(newVal) {
      if (this.show !== newVal) {
        this.$emit('hide-toast', newVal)
      }
      this.setTimeout()
    }
  },
  methods: {
    setTimeout() {
      clearTimeout(this.activeTimeout)
      if (this.isActive) {
        this.activeTimeout = setTimeout(() => {
          this.toggleActive()
        }, this.timeout)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .notification
    width: 40%
    position: fixed
    bottom: 0
    margin-bottom: 15px
    left: 50%
    transform: translateX(-50%)
    @media screen and (max-width: 780px)
      width: 90%

  .notification.is-danger
    z-index: 10000
</style>
