<template>
  <component 
    :is="type" 
    :tag="tag" 
    enter-active-class="slide-in" 
    leave-active-class="slide-out" 
    v-bind="$attrs" 
    v-on="hooks"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 300
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    type() {
      return this.group ? 'transition-group' : 'transition'
    },
    hooks() {
      return {
        beforeEnter: this.setDuration,
        afterEnter: this.cleanUpDuration,
        beforeLeave: this.setDuration,
        afterLeave: this.cleanUpDuration,
        leave: this.setAbsolutePosition,
        ...this.$listeners
      }
    }
  },
  methods: {
    setDuration(el) {
      el.style.animationDuration = `${this.duration}ms`
    },
    cleanUpDuration(el) {
      el.style.animationDuration = ''
    },
    setAbsolutePosition(el) {
      if (this.group) {
        el.style.position = 'absolute'
      }
    }
  }
}
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  animation-name: fadeOut;
}
.fade-move {
  transition: transform 0.3s ease-out;
}
</style>



<style lang="sass" scoped>

  @keyframes slidein
    from
      opacity: 0
      transform: translateY(100px)
    to
      opacity: 1
      transform: translateY(0)  

  @keyframes slideout
    from
      opacity: 1
      transform: translateY(0)
    to
      opacity: 0
      transform: translateY(100px)  

  .slide-in
    animation-name: slidein

  .slide-out
    animation-name: slideout


</style>
