<template>
  <div class="deck-listing">
    <ul>
      <li class="top-level-list" v-for="deck in this.decks" :key="deck.index">
        <DeckPreview @changeDeck="changeDeck" :deck="deck"></DeckPreview>
      </li>
    </ul>
  </div>
</template>

<script>

import DeckPreview from "./DeckPreview";

export default {
  name: 'DeckListing',
  props: ['decks'],
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
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>