<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <span class="icon has-text-primary">
      <BaseIcon :icon="spinner" spin />
    </span>
    <button @click="$store.dispatch('events/fetchEventsFromDb', 'all')" class="button">show toast</button>
    <div class="container">
    </div>
    <BaseToast :show="toast" @hide-toast="toast = false" :timeout="10000" msg="hi there"/>  
  </div>
</template>

<script>
import { faSpinner } from '@fortawesome/fontawesome-free-solid/'
import DateTimeInput from '@/components/DateTimeInput.vue'
export default {
  data() {
    return {
      msg: 'This is an about page',
      selDate: '6 : 00 PM',
      toast: false
    }
  },
  computed: {
    spinner() {
      return faSpinner
    }
  },
  components: {
    DateTimeInput
  }
}
</script>

<style lang="sass" scoped>
  .tag
    margin-right: 15px
</style>
