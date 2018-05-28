<template>
      <BaseCard class="is-shadowless">
      <div class="columns">
        <div class="column is-narrow">
          <BaseAvatar :src="comment.avatar"/>
        </div>
        <div class="column">
          <p class="is-size-6 has-text-black">{{comment.name}}</p>
          <p class="is-size-6 has-text-grey">{{comment.comment}}</p>
          <p class="is-size-7 has-text-grey-light">{{comment.timestamp | format('h:mm a D MMM YYYY')}}</p>
        </div>
      </div>
    </BaseCard>
</template>

<script>
export default {
  name: 'SingleComment',
  props: { comment: Object }
}
</script>

<style lang="sass" scoped>
  .card
    margin-bottom: 0
    border-bottom: 1px solid lightgrey
</style>
