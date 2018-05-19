<template>
    <div class="field">
        <label v-if="label" class="label">{{label}}</label>
        <div class="control has-icons-left">
            <input
              class="input" 
              :class="inputClass"
              v-bind="$attrs"
              ref="dateInput"
            >
            <span class="icon is-small is-left">
              <BaseIcon :icon="leftIcon" />
            </span>
        </div>
        <p class="help is-danger">{{error}}</p>
    </div>
</template>

<script>
// import calendar from '@fortawesome/fontawesome-free-solid/faCalendar'
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/material_green.css'

export default {
  inheritAttrs: false,
  props: {
    date: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Date, String],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    leftIcon: {
      type: Object,
      default: function() {
        /*eslint no-undef: "off"*/
        let icon = require('@fortawesome/fontawesome-free-solid/faCalendar')
        if (this.time) {
          icon = require('@fortawesome/fontawesome-free-solid/faClock')
        }

        return icon
      }
    },
    error: String
  },
  computed: {
    inputClass() {
      return this.error ? 'is-danger' : 'is-success'
    }
  },
  mounted() {
    if (this.value) {
      this.$refs.dateInput.value = this.value
    }

    let config = null
    const dateConfig = {
      dateFormat: 'l, F J, Y',
      minDate: new Date(),
      noCalendar: false
    }
    const timeConfig = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'h : i K'
    }
    if (this.date) config = dateConfig
    if (this.time) config = timeConfig
    if (this.date && this.time)
      config = {
        ...timeConfig,
        ...dateConfig,
        dateFormat: 'l, F J, Y @ h : K'
      }

    this.$options.fp = new Flatpickr(this.$refs.dateInput, {
      onChange: this.fpChangeEvent,
      ...config
    })
  },
  methods: {
    fpChangeEvent(selected, datestr) {
      console.log(`selected is ${selected}`)
      this.$emit('input', datestr)
    }
  },
  beforeDestroy() {
    this.$options.fp.destroy()
    this.$options.fp = null
  },
  $fp: null,
  $_veeValidate: {
    name() {
      return this.label
    },
    value() {
      return this.value
    }
  }
}
</script>

<style>
</style>
