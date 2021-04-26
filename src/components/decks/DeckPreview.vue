<template>
  <div class="deck-preview" @click="changeDeck(deck.index)" :class="{ double_image: deck.commander_count === 2 }">
    <p class="center deck-title">{{ deck.deck_name }} </p>
    <div class="images">
      <img :src="deck.commander_images.first" alt="">
      <img class="second-commander" :class="{ hidden: deck.commander_count === 1 }"
           :src="deck.commander_images.second" alt="">
    </div>

    <ul class="selected-colors">
      <li class="w" :class="{ hidden: !deck.w }"><img src="dist/images/W.png" alt=""></li>
      <li class="u" :class="{ hidden: !deck.u }"><img src="dist/images/U.png" alt=""></li>
      <li class="b" :class="{ hidden: !deck.b }"><img src="dist/images/B.png" alt=""></li>
      <li class="r" :class="{ hidden: !deck.r }"><img src="dist/images/R.png" alt=""></li>
      <li class="g" :class="{ hidden: !deck.g }"><img src="dist/images/G.png" alt=""></li>
      <li class="c" :class="{ hidden: !deck.c }"><img src="dist/images/C.png" alt=""></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DeckPreview',
  props: ['deck'],

  methods: {
    changeDeck(index) {
      this.$emit('changeDeck', index);
    }
  }
}
</script>