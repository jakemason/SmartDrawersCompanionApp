<template>
  <div class="deck-listing">
    <ul>
      <li class="top-level-list" v-for="deck in this.decks" :key="deck.index">
        <DeckPreview @changeDeck="changeDeck" :deck="deck"></DeckPreview>
      </li>
      <li v-if='this.showNewDeckButton === true && this.decks != null && Object.keys(this.decks).length > 0'
          class="top-level-list">
        <div class="deck-preview" @click="newDeck">
          <div class="add-new-deck-button">
            Add New Deck <i class="fa fa-user-plus"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import DeckPreview from "./DeckPreview";

export default {
  name: 'DeckListing',
  props: ['decks', 'showNewDeckButton'],
  components: {
    DeckPreview
  },
  watch: {
    deep: true,
    decks: function (newVal) {
      this.$props.decks = newVal;
    }
  },
  methods: {
    changeDeck(index) {
      this.$emit('changeDeck', index);
    },
    newDeck(index) {
      this.$emit('newDeck', index);
    }
  }
}
</script>