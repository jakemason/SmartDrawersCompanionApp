<template>
  <div class="drawer-editor">
    <div class="container">
      <div class="row">
        <div class="col-6 scrollable-column"
             @drop="resetDeckPosition"
             @dragenter.prevent
             @dragover.prevent>
          <div class="scroll left">
            <p><i class="fa fa-angle-double-up"></i> Scroll Decks <i class="fa fa-angle-double-down"></i></p>
          </div>
          <h2>Drag Decks To Drawers</h2>
          <DeckListing @deckDragged="onDeckDrag" :decks="decks" :dragableDecks="true"></DeckListing>
        </div>
        <div class="col-6 scrollable-column">
          <div class="scroll right">
            <p><i class="fa fa-angle-double-up"></i> Scroll Drawers <i class="fa fa-angle-double-down"></i></p>
          </div>
          <div v-for="drawer in drawers_needed" class="drawer-container">
            <h2>Drawer # {{ drawer }}</h2>
            <div class="drawer">
              <div class="drawer-row" v-for="row in 3">
                <div class="drawer-column" v-for="col in 4"
                     @drop="onDeckDrop(drawer, row, col)"
                     @dragenter.prevent
                     @dragover.prevent>
                  <DeckDragable @deckDragged="onDeckDrag" v-if="getDeckAt(drawer, row,col) != null"
                                :deck="getDeckAt(drawer,row,col)"></DeckDragable>
                </div>
              </div>
              <div class="drawer-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dexie from "dexie";
import DeckListing from "../decks/DeckListing";
import DeckDragable from "../decks/DeckDragable";

export default {
  name: 'DrawerEditor',
  components: {DeckListing, DeckDragable},
  methods: {
    async loadData() { //TODO: Pull out into global mixin?
      let db = new Dexie('smartDrawersDB');
      db.version(1).stores({
        decks: ''
      });

      return await db.decks.get(0);
    },
    async saveData() { //TODO: Pull out into global mixin?
      let db = new Dexie('smartDrawersDB');
      db.version(1).stores({
        decks: ''
      });

      await db.decks.put(JSON.stringify(this.decks), 0);
    },
    getDeckAt(drawer, row, col) {
      for (let i = 0; i < Object.keys(this.decks).length; i++) {
        if (this.decks[i].drawer === drawer && this.decks[i].row === row && this.decks[i].col === col) {
          return this.decks[i];
        }
      }
      return null;
    },
    resetDeckPosition() {
      this.dragged_deck.drawer = -1;
      this.dragged_deck.row = -1;
      this.dragged_deck.col = -1;
      this.saveData();
    },
    onDeckDrag(deck, drawer, row, col) {
      this.drag_start_drawer = drawer;
      this.drag_start_row = row;
      this.drag_start_col = col;
      this.drag_start_index = deck.index;
      this.dragged_deck = deck;
    },
    onDeckDrop(drawer, row, col) {
      let swapDeck = this.getDeckAt(drawer, row, col);

      this.dragged_deck.drawer = drawer;
      this.dragged_deck.row = row;
      this.dragged_deck.col = col;
      this.decks[this.dragged_deck.index] = this.dragged_deck;

      if (swapDeck !== null) {
        this.decks[swapDeck.index].drawer = this.drag_start_drawer;
        this.decks[swapDeck.index].row = this.drag_start_row;
        this.decks[swapDeck.index].col = this.drag_start_col;
      }

      this.saveData();
    }
  },
  mounted() {
    this.loadData().then(value => {
      let currentDecks = value;
      if (currentDecks != null) {
        currentDecks = JSON.parse(currentDecks);
      }
      this.decks = currentDecks ? currentDecks : null;
      this.currently_editing = this.decks != null ? Object.keys(this.decks).length : 0;
      this.drawers_needed = parseInt(Math.ceil(Object.keys(this.decks).length / 12));
    });
  },
  data() {
    return {
      currently_editing: 0,
      decks: {},
      dragged_deck: {},
      drawers_needed: 1,

      drag_start_drawer: -1,
      drag_start_row: -1,
      drag_start_col: -1,
      drag_start_index: -1,

      drag_end_drawer: -1,
      drag_end_row: -1,
      drag_end_col: -1,
      drag_end_index: -1
    }
  }
}
</script>