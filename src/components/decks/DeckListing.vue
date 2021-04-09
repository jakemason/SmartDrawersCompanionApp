<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="center" v-if='Object.keys(decks).length > 0'>Select A Deck To Edit:</h2>
          <ul>
            <li v-for="deck in this.decks" :key="deck.deck_name">
              {{ deck.deck_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeckListing',
  props: ['decks'],
}
</script>