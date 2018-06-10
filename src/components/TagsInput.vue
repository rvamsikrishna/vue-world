<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      newTag: ''
    }
  },
  methods: {
    addTag() {
      let obj = {}
      let newTag = this.newTag.trim()
      if (newTag.length === 0 || this.value[newTag]) {
        return
      }
      obj[newTag] = true
      this.$emit('input', { ...this.value, ...obj })
      this.newTag = ''
    },
    removeTag(tag) {
      let obj = { ...this.value } // obj[tag] = false
      this.$delete(obj, tag)
      this.$emit('input', obj)
    }
  },

  render() {
    return this.$scopedSlots.default({
      tags: this.value,
      addTag: this.addTag,
      removeTag: this.removeTag,
      inputAttrs: { value: this.newTag },
      inputEvents: {
        input: eventData => {
          this.newTag = eventData
        },
        keydown: e => {
          if (e.keyCode === 13) {
            e.preventDefault()
            this.addTag()
          }
        }
      }
    })
  }
}
</script>

<style>
</style>
