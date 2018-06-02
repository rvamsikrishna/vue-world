<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header v-if="!!$slots.title" class="modal-card-head is-white">
        <p class="modal-card-title has-text-centered">
          <slot name="title"></slot>
        </p>
        <button v-if="closeable" @click="hideModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-card-foot" v-if="$slots.footer">
        <slot name="footer" ></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import toggle from '@/mixins/toggle'
export default {
  props: {
    closeable: {
      type: Boolean,
      default: true
    }
  },
  mixins: [toggle],
  methods: {
    hideModal() {
      this.$emit('hide-modal')
      this.toggleActive()
    }
  }
}
</script>

<style>
</style>
