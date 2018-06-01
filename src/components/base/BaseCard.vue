<template>
  <div class="card">
    <div class="card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.cardFooter" class="card-footer">
      <slot name="cardFooter"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .card
    margin-bottom: 1em

</style>
