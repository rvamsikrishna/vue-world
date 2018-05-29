<template>
  <div>
    <p class="is-size-4 has-text-black has-text-weight-bold">Comments <span class="tag is-primary">{{commentsSize}}</span></p>
    <BaseTextInput v-validate="'required'" :error="errors.first('Respond')" @keydown.enter="submitComment" label="Respond" v-model="comment" placeholder="Add a response..." :rightIcon="icon" type="text"/>  
    <Comment v-if="commentsSize !== 0" v-for="comment in comments" :comment="comment" :key="comment.timestamp"/>
    <p v-else>No comments yet!</p>
    <button  @click="showMoreComments" class="button is-primary">see all comments</button>
  </div>
</template>

<script>
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid/'
import Comment from '@/components/Comment.vue'
export default {
  props: {
    commentsSize: Number,
    comments: Array,
    eventId: String
  },
  components: { Comment },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    icon() {
      return faPaperPlane
    }
  },
  methods: {
    submitComment() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$store
            .dispatch('events/submitComment', {
              comment: this.comment,
              eventId: this.eventId
            })
            .then(() => {
              this.comment = ''
              this.$validator.reset()
            })
        }
      })
    },
    showMoreComments() {
      this.$store.dispatch('events/showMoreComments', {
        type: 'comments',
        eventId: this.eventId
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  button.button
    display: block
    margin: 0 auto
</style>
