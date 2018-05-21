<template>
    <div class="notification has-text-centered has-text-weight-bold" v-show="show">
      <button @click="toggleActive" class="delete"></button>
      <p :class="toastClass">{{msg}}</p>
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
      default: 2000
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
          return 'has-text-success'
        case 'error':
          return 'has-text-danger'
        default:
          return 'has-text-black'
      }
    }
  },
  watch: {
    isActive(newVal) {
      if (this.show !== !!newVal) {
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
</style>
