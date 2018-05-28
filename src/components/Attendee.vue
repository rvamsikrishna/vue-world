<template>
      <BaseCard class="is-shadowless">
      <div class="columns">
        <div class="column is-narrow">
          <BaseAvatar :src="attendee.photoURL"/>
        </div>
        <div class="column">
          <p class="is-size-6 has-text-black">{{attendee.name}}</p>
          <p class="is-size-7 has-text-grey">{{organizer ? 'Organizer' : 'Member'}}</p>
        </div>
      </div>
    </BaseCard>
</template>

<script>
export default {
  props: {
    attendee: Object,
    organizer: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
