<template>
  <div class="deck-editing">
    <Toast :message="toast_message" :isError="toast_is_error" :lastTriggered="toast_last_triggered"></Toast>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="center section-title" v-if='this.decks != null && Object.keys(this.decks).length > 0'>Select A Deck
            To Edit:</h2>
          <DeckListing @newDeck="onCreateNewDeck" @changeDeck="onDeckChange" :decks="decks"
                       :showNewDeckButton="true" :showAllAlways="true"></DeckListing>
        </div>
      </div>
    </div>
    <DeckEditor id="deckEditor" @newDeck="onCreateNewDeck" @save="onDeckSave" @deleteDeck="onDelete"
                :deck_index="currently_editing"></DeckEditor>
  </div>
</template>

<script>
import DeckEditor from "../decks/DeckEditor";
import DeckListing from "../decks/DeckListing";
import Toast from "../global/Toast";

export default {
  name: 'DeckEditing',
  components: {DeckEditor, DeckListing, Toast},
  methods: {
    onCreateNewDeck() {
      this.currently_editing = this.decks != null ? Object.keys(this.decks).length : 0;
      window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
      console.log("New Deck being added, now editing a new deck at index: " + this.currently_editing);
    },
    onDelete() {
      this.toast_message = "Deleted: " + this.decks[this.currently_editing].deck_name;
      this.toast_is_error = true;
      this.toast_last_triggered = Date.now();

      console.log("Deleting deck: " + this.decks[this.currently_editing].deck_name);
      this.$delete(this.decks, this.currently_editing);
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
      console.log("Currently editing deck: " + index + " with name: " + this.decks[this.currently_editing].deck_name)
      let deckEditor = document.getElementById('deckEditor');
      window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    },
    onDeckSave(deckAsJson) {
      this.toast_message = "Your changes have been saved.";
      this.toast_is_error = false;
      this.toast_last_triggered = Date.now();

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

      localStorage.setItem('decks', JSON.stringify(currentDecks));
      window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
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
      decks: {},
      toast_message: '',
      toast_is_error: false,
      toast_last_triggered: 0
    }
  }
}
</script>