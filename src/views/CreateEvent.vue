<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12-mobile is-6-desktop is-offset-3-desktop">
          <h1 class="title is-spaced has-text-weight-bold">Create an event</h1>

          <h2 class="subtitle has-text-weight-bold">Tell us about your event</h2>
          <tags-input v-model="event.categories">
            <div class="topics" slot-scope="{ tags, addTag, removeTag, inputAttrs, inputEvents }">
              <BaseTextInput v-validate="tagInputRules" :error="errors.first('Topic')" :value="inputAttrs.value" v-on="inputEvents"  label="Topic" placeholder="Add topic..."/>
              <span v-for="(tagValue, tagKey) in tags" :key="tagKey" class="tag is-success">
                {{tagKey}}
                <button @click="removeTag(tagKey)" class="delete is-small"></button>
              </span>
            </div>
          </tags-input>

          <h2 class="subtitle has-text-weight-bold">Name & describe your event</h2>
          <BaseTextInput v-validate="'required'" :error="errors.first('Title')" label="Title" v-model="event.title" placeholder="Add an event title..." type="text"/>
          <BaseTextInput v-validate="'required'" :error="errors.first('Event description')" data-vv-as="Event description" label="Event description" v-model="event.description" placeholder="Add a description..." type="text" textarea/>
          
          <h2 class="subtitle has-text-weight-bold">Where is your event</h2>
          <BaseTextInput v-validate="'required'" :error="errors.first('Location')" label="Location" v-model="event.location" placeholder="Add location..." type="text"/>
          <BaseTextInput v-validate="'required'" :error="errors.first('Address')" data-vv-as="Address" label="Address" v-model="event.address" rows="2" placeholder="Add an address..." type="text" textarea/>

          <h2 class="subtitle has-text-weight-bold">When is your event</h2>
          <DateTimeInput date label="Date" v-validate="'required'" :error="errors.first('Date')" :value="event.date" @input="setDate" placeholder="Select a date..."/> 
          
          <DateTimeInput time label="Time" v-validate="'required'" :error="errors.first('Time')" :value="event.time" @input="setTime" placeholder="Add time"/> 

          <button @click="onSubmit" class="button is-primary">submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TagsInput from '@/components/TagsInput.vue'
import DateTimeInput from '@/components/DateTimeInput.vue'
import { isEmpty } from 'lodash'
export default {
  data() {
    return {
      event: {
        title: '',
        description: '',
        location: '',
        address: '',
        date: '',
        time: '',
        categories: {}
      },
      time: null,
      date: null
    }
  },
  components: { DateTimeInput, TagsInput },
  methods: {
    onSubmit() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$store.dispatch('events/addEventToDb', {
            ...this.event,
            timestamp: this.timeStamp
          })
        }
      })
    },
    setTime(ev) {
      this.event.time = ev.formattedStr
      this.time = ev.dateObj
    },
    setDate(ev) {
      this.event.date = ev.formattedStr
      this.date = ev.dateObj
    }
  },
  computed: {
    tagInputRules() {
      return {
        required: isEmpty(this.event.categories)
      }
    },
    timeStamp() {
      if (this.date && this.time)
        return new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate(),
          this.time.getHours(),
          this.time.getMinutes()
        ).getTime()
    }
  }
}
</script>

<style lang="sass" scoped>
  .topics
    margin-bottom: 1em
    span.tag
      margin-right: 15px
      margin-bottom: 10px
  .subtitle
    margin-top: 1.5em
</style>
