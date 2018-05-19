export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: this.show
    }
  },
  watch: {
    show(newVal) {
      this.isActive = newVal
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
    }
  }
}
