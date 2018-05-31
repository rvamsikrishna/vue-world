<template>
<div class="panel">
     <div class="field has-addons">
      <p class="control is-expanded">
        <BaseTextInput v-model="search" :loading="loading" placeholder="I am loooking for..." />
      </p>
      <p class="control">
        <span class="select is-primary">
          <select>
            <option>title</option>
            <option>tags</option>
          </select>
        </span>
      </p>
    </div>

    <a @click="openEventDetails(result.id)" v-for="result in searchResults" :key="result.id" class="panel-block">
      {{result.title}}
    </a>
    <a v-if="noResults" class="panel-block">
      Oops....Nothing found
    </a>
</div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  data() {
    return {
      search: '',
      loading: false,
      noResults: false
    }
  },
  computed: {
    searchResults() {
      return this.$store.getters['search/results'].filter(res => {
        return res.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
  watch: {
    search() {
      if (this.search && this.searchResults.length < 1) {
        this.loading = true
        this.noResults = false
        this.fetchResults()
      }
      if (!this.search) this.$store.commit('search/clearSearchResults')
    }
  },
  methods: {
    fetchResults: debounce(function() {
      this.$store
        .dispatch('search/fetchSearchResults', this.search)
        .then(() => {
          this.loading = false
          if (!this.searchResults.length) this.noResults = true
        })
    }, 1500),
    openEventDetails(eventId) {
      this.$store.commit('events/setCurrentEventType', 'search')
      // this.$store.dispatch('events/addEventRealtimeUpdate', eventId)
      this.$router.push(`/event/search/${eventId}`)
    }
  }
}
</script>

<style>
</style>
