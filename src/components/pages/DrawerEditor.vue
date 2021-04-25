<template>
  <div class="drawer-editor">
    <div class="container">
      <div class="row">
        <div class="col-6 scrollable-column">
          <DeckListing :decks="decks"></DeckListing>
        </div>
        <div class="col-6 scrollable-column">
          <div v-for="drawer in drawers_needed" class="drawer-container">
            <h2>Drawer # {{ drawer }}</h2>
            <div class="drawer">
              <div class="drawer-row" v-for="row in 3">
                <div class="drawer-column" v-for="col in 4">

                </div>
              </div>
            </div>
          </div>
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
    this.drawers_needed = parseInt(Object.keys(this.decks).length / 12) + 1;
    console.log(this.drawers_needed);
  },
  data() {
    return {
      currently_editing: 0,
      decks: {},
      drawers_needed: 1
    }
  }
}
</script>