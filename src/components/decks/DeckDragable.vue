<template>
  <div class="deck-preview" :class="{ double_image: deck.commander_count === 2 }"
       @dragstart="onDragStart(deck, deck.drawer, deck.row, deck.col)" draggable="true">
    <p class="center deck-title">{{ deck.deck_name }} </p>
    <div class="images">
      <img :src="deck.commander_images.first" alt="">
      <img class="second-commander" :class="{ hidden: deck.commander_count === 1 }"
           :src="deck.commander_images.second" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeckDragable',
  props: ['deck'],

  methods: {
    onDragStart(deck, drawer, row, col) {
      //this is for the drawer dragging
      this.$emit('deckDragged', deck, drawer, row, col);
      //this is for the drawer dragging that is nested beneath <DeckListing>
      this.$parent.$emit('deckDragged', deck, drawer, row, col);
    },
    changeDeck(index) {
      //this.$emit('changeDeck', index);
    }
  }
}
</script>