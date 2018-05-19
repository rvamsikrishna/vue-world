<template>
    <div class="field">
        <label v-if="label" class="label">{{label}}</label>
        <div class="control" :class="{'has-icons-left': leftIcon, 'has-icons-right': rightIcon}">
            <textarea
              v-if="textarea"
              class="textarea"
              :class="inputClass"
              v-bind="$attrs"
              :value="value"
              v-on="inputListeners"
            ></textarea>
            <input
              v-else 
              class="input" 
              :class="inputClass"
              v-bind="$attrs"
              :value="value"
              v-on="inputListeners"
            >
            <span v-if="leftIcon" class="icon is-small is-left">
              <BaseIcon :icon="leftIcon" />
            </span>
            <span v-if="rightIcon" class="icon is-small is-right">
              <BaseIcon :icon="rightIcon" />
            </span>
        </div>
        <p class="help is-danger">{{error}}</p>
    </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    name: String,
    // type: {
    //   type: String,
    //   default: 'text',
    //   validator: val => {
    //     const accepted = ['text', 'password', 'email']
    //     return accepted.indexOf(val) !== -1
    //   }
    // },
    value: {
      type: String
    },
    label: {
      type: String,
      default: null
    },
    textarea: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: Object,
      default: null
    },
    rightIcon: {
      type: Object,
      default: null
    },
    error: String
  },
  computed: {
    inputClass() {
      return this.error ? 'is-danger' : 'is-success'
    },
    inputListeners() {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
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
