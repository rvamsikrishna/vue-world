<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head is-white">
        <p class="modal-card-title has-text-centered">
          <slot name="title" v-if="$slots.title"></slot>
        </p>
        <button @click="hideModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer" v-if="$slots.footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import toggle from '@/mixins/toggle'
export default {
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
