<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <DeckListing :decks="decks"></DeckListing>
        </div>
        <div class="col-6">

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DeckListing from "../decks/DeckListing";

export default {
  name: 'DrawerEditor',
  components: {DeckListing},
  methods: {},
  mounted() {
    let currentDecks = localStorage.getItem('decks');
    if (currentDecks != null) {
      currentDecks = JSON.parse(currentDecks);
    }
    this.decks = currentDecks ? currentDecks : null;
    this.currently_editing = this.decks != null ? Object.keys(this.decks).length : 0;
  },
  data() {
    return {
      currently_editing: 0,
      decks: {}
    }
  }
}
</script>