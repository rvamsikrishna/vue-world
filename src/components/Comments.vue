<template>
  <div>
    <p class="is-size-4 has-text-black has-text-weight-bold">Comments <span class="tag is-primary">0</span></p>
    <BaseTextInput  label="Respond" v-model="comment" placeholder="Add a response..." :rightIcon="icon" type="text"/>  
  </div>
</template>

<script>
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid/'

export default {
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    icon() {
      return faPaperPlane
    }
  }
}
</script>

<style>
</style>
