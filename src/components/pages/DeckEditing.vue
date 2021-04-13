<template>
  <div>
    <DeckEditor @newDeck="onCreateNewDeck" @save="onDeckSave" @deleteDeck="onDelete"
                :deck_index="currently_editing"></DeckEditor>
    <DeckListing @changeDeck="onDeckChange" :decks="decks"></DeckListing>
  </div>
</template>

<script>
import DeckEditor from "../decks/DeckEditor";
import DeckListing from "../decks/DeckListing";

export default {
  name: 'DeckEditing',
  components: {DeckEditor, DeckListing},
  methods: {
    onCreateNewDeck() {
      this.currently_editing = this.decks != null ? Object.keys(this.decks).length : 0;
      console.log("New Deck being added, now editing a new deck at index: " + this.currently_editing);
    },
    onDelete(index) {
      this.$delete(this.decks, index);
      let newlyKeyedDecks = {};
      let decksAsObject = JSON.parse(JSON.stringify(this.decks));

      //have to re-key things here because JS does not reset numbered keys when items are removed
      let i = 0;
      for (const key in decksAsObject) {
        newlyKeyedDecks[i] = decksAsObject[key];
        newlyKeyedDecks[i].index = i;
        i++;
      }

      this.decks = newlyKeyedDecks;
      localStorage.setItem('decks', JSON.stringify(this.decks));
      this.currently_editing = this.decks != null ? Object.keys(this.decks).length : 0;
    },
    onDeckChange(index) {
      this.currently_editing = index;
      console.log("Now editing: " + this.currently_editing);
    },
    onDeckSave(deckAsJson) {
      let deck = JSON.parse(deckAsJson);
      deck.index = this.currently_editing;
      let currentDecks = localStorage.getItem('decks');
      if (currentDecks != null) {
        currentDecks = JSON.parse(currentDecks);
      } else {
        currentDecks = {};
      }

      currentDecks[this.currently_editing] = deck;
      this.decks = currentDecks != null ? currentDecks : null;

      console.log(this.decks);
      localStorage.setItem('decks', JSON.stringify(currentDecks));

    }
  },
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