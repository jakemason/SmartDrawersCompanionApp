<template>
  <div>
    <DeckEditor @save="onDeckSave" :deck-index="currently_editing"></DeckEditor>
    <DeckListing :decks="decks"></DeckListing>
  </div>
</template>

<script>
import DeckEditor from "../decks/DeckEditor";
import DeckListing from "../decks/DeckListing";

export default {
  name: 'DeckEditing',
  components: {DeckEditor, DeckListing},
  methods: {
    onDeckSave(deckAsJson) {
      let deck = JSON.parse(deckAsJson);
      let currentDecks = localStorage.getItem('decks');
      if (currentDecks == null) {
        currentDecks = {};
      } else {
        currentDecks = JSON.parse(currentDecks);
      }

      currentDecks[this.currently_editing] = deck;
      this.decks = currentDecks;
      localStorage.setItem('decks', JSON.stringify(currentDecks));
    }
  },
  data() {
    return {
      currently_editing: 0,
      decks: {}
    }
  }
}
</script>