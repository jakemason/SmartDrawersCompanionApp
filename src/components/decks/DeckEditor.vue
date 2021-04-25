<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="deck-editor card active">
          <div class="image">
            <img :src="commander_images.first" alt="First Commander"/>
            <img :src="commander_images.second" class="second-commander"
                 :class="{ hidden: commander_count === 1 }" alt="Second Commander"/>
          </div>
          <div class="content">
            <h2 class="center italics">{{ deck_name }}</h2>
            <form @submit="save" action="#" enctype="multipart/form-data">
              <label for="deck_name">
                Deck Name
                <input v-model="deck_name" id="deck_name" name="deck_name" type="text"
                       placeholder="Clone-focused Riku, Combo Ghave, etc" required>
              </label>

              <label for="power_level">
                Power Level
                <input id="power_level" name="power_level" type="number"
                       placeholder="1 - 10" v-model="power_level">
              </label>

              <div class="commander_counts">
                <div class="count" @click="setCommanderCount(1)" :class="{ active: commander_count === 1 }">
                  Single-Image Commander
                </div>
                <div class="count" @click="setCommanderCount(2)" :class="{ active: commander_count === 2 }">
                  Dual-Image Commander(s)
                </div>
              </div>

              <label for="commander_1_image">First Commander's Image</label>
              <input id="commander_1_image" name="commander_1_image" type="file" accept="image/*"
                     @change="onImageUpload($event, 0)">

              <label :class="{ hidden: commander_count === 1 }"
                     for="commander_2_image"> Second Commander's Image</label>
              <input :class="{ hidden: commander_count === 1 }"
                     id="commander_2_image" name="commander_2_image"
                     type="file" accept="image/*"
                     @change="onImageUpload($event, 1)" :required="commander_count === 2">

              <label>Deck Colors</label>
              <ul class="color-selector">
                <li class="w" :class="{ active: w }" @click="toggleColor('w')">
                  <img src="dist/images/W.png" alt="">
                </li>
                <li class="u" :class="{ active: u }" @click="toggleColor('u')">
                  <img src="dist/images/U.png" alt="">
                </li>
                <li class="b" :class="{ active: b }" @click="toggleColor('b')">
                  <img src="dist/images/B.png" alt="">
                </li>
                <li class="r" :class="{ active: r }" @click="toggleColor('r')">
                  <img src="dist/images/R.png" alt="">
                </li>
                <li class="g" :class="{ active: g }" @click="toggleColor('g')">
                  <img src="dist/images/G.png" alt="">
                </li>
                <li class="g" :class="{ active: c }" @click="toggleColor('c')">
                  <img src="dist/images/C.png" alt="">
                </li>
              </ul>

              <ul class="selected-colors">
                <li class="w" :class="{ hidden: !w }"><img src="dist/images/W.png" alt=""></li>
                <li class="u" :class="{ hidden: !u }"><img src="dist/images/U.png" alt=""></li>
                <li class="b" :class="{ hidden: !b }"><img src="dist/images/B.png" alt=""></li>
                <li class="r" :class="{ hidden: !r }"><img src="dist/images/R.png" alt=""></li>
                <li class="g" :class="{ hidden: !g }"><img src="dist/images/G.png" alt=""></li>
                <li class="c" :class="{ hidden: !c }"><img src="dist/images/C.png" alt=""></li>
              </ul>

              <input type="hidden" name="w" v-model="w">
              <input type="hidden" name="u" v-model="u">
              <input type="hidden" name="b" v-model="b">
              <input type="hidden" name="r" v-model="r">
              <input type="hidden" name="g" v-model="g">
              <input type="hidden" name="c" v-model="c">
              <input type="hidden" name="deck_index" :value="$props.deck_index">

              <button v-if="!is_saved">Save</button>
              <button v-else>Update</button>

              <button v-if="show_confirm_delete_prompt" class="red" @click="deleteDeck($event)" @blur="resetDelete"
                      :disabled="!is_saved">Are you sure?
              </button>
              <button v-else class="red" @click="deleteDeck($event)" :disabled="!is_saved">Delete</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeckEditor',
  props: ['deck_index'],
  data() {
    return {
      // Frustratingly, we need to use an object here instead of an array.
      // Vue seems to have reactivity issues with arrays, see:
      // https://vuejs.org/v2/guide/reactivity.html
      // for more information. Vue.set() would NOT work for me here, either :(
      commander_images: {
        first: 'dist/images/commanderplaceholder.jpeg',
        second: 'dist/images/commanderplaceholder.jpeg',
      },
      index: 0,
      deck_name: '',
      commander_count: 1,
      power_level: null,
      w: false,
      u: false,
      b: false,
      r: false,
      g: false,
      c: false,
      is_saved: false,
      show_confirm_delete_prompt: false,
    }
  },
  watch: {
    deck_index: function (newVal, oldVal) {
      /*
      TODO: What I probably should do is define Deck as a data-only component and pass that as a prop
            rather than passing the index like this.
      */
      let currentDecks = localStorage.getItem('decks');
      if (currentDecks != null) {
        currentDecks = JSON.parse(currentDecks);
      }
      let deck = currentDecks[newVal];
      if (deck == null) {
        this.reset();
      } else {
        this.w = deck.w;
        this.u = deck.u;
        this.b = deck.b;
        this.r = deck.r;
        this.g = deck.g;
        this.c = deck.c;
        this.power_level = deck.power_level;

        this.index = deck.index;
        this.commander_images.first = deck.commander_images.first;
        this.commander_images.second = deck.commander_images.second;
        this.deck_name = deck.deck_name;
        this.commander_count = deck.commander_count;
        this.is_saved = true;
      }
      console.log("Updating editor.");
    }
  },
  methods: {
    resetDelete() {
      this.show_confirm_delete_prompt = false;
    },
    reset() {
      this.commander_images = {
        first: 'dist/images/commanderplaceholder.jpeg',
        second: 'dist/images/commanderplaceholder.jpeg',
      };
      this.index = 0;
      this.deck_name = '';
      this.commander_count = 1;
      this.w = false;
      this.u = false;
      this.b = false;
      this.r = false;
      this.g = false;
      this.c = false;
      this.power_level = null;
      this.is_saved = false;
    },
    addNewDeck(e) {
      e.preventDefault();
      this.$emit('newDeck', JSON.stringify(this.$data));
    },
    save(e) {
      e.preventDefault();
      this.is_saved = true;
      this.$emit('save', JSON.stringify(this.$data));
    },
    deleteDeck(e) {
      e.preventDefault();
      if (!this.show_confirm_delete_prompt) {
        this.show_confirm_delete_prompt = true;
        return;
      }
      this.reset();
      this.$emit('deleteDeck', this.index);
      this.show_confirm_delete_prompt = false;
    },
    setCommanderCount: function (num) {
      this.commander_count = num;
    },
    onImageUpload(e, slot) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (event) => {
        let base64data = reader.result;
        if (slot === 0) {
          this.commander_images.first = base64data;
        } else {
          this.commander_images.second = base64data;
        }
      }
    },
    toggleColor: function (color) {
      switch (color) {
        case 'w':
          this.w = !this.w;
          break;
        case 'u':
          this.u = !this.u;
          break;
        case 'b':
          this.b = !this.b;
          break;
        case 'r':
          this.r = !this.r;
          break;
        case 'g':
          this.g = !this.g;
          break;
        case 'c':
          this.c = !this.c;
          break;
      }
    }
  }
}
</script>