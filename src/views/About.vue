<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <span class="icon has-text-primary">
      <BaseIcon :icon="spinner" spin />
    </span>
    <button @click="toast=!toast" class="button">show toast</button>
    <BaseToast :show="toast" @hide-toast="toast = false" msg="hi there"/>  
    <progress class="progress is-primary" value="50" max="100">30%</progress>
  </div>
</template>

<script>
import spinner from '@fortawesome/fontawesome-free-solid/faSpinner'
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
      return spinner
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
