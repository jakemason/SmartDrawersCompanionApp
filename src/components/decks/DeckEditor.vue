<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="commander card active">
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
                       placeholder="1 - 10">
              </label>

              <div class="commander_counts">
                <div class="count" @click="setCommanderCount(1)" v-bind:class="{ active: commander_count === 1 }">
                  Single Commander
                </div>
                <div class="count" @click="setCommanderCount(2)" v-bind:class="{ active: commander_count === 2 }">
                  Dual Commanders
                </div>
              </div>

              <label for="commander_1_image">First Commander's Image</label>
              <input id="commander_1_image" name="commander_1_image" type="file" accept="image/*"
                     @change="onFileChange($event, 0)">

              <label v-bind:class="{ hidden: commander_count === 1 }"
                     for="commander_2_image"> Second Commander's Image</label>
              <input v-bind:class="{ hidden: commander_count === 1 }"
                     id="commander_2_image" name="commander_2_image"
                     type="file" accept="image/*"
                     @change="onFileChange($event, 1)">

              <label>Deck Colors</label>
              <ul class="color-selector">
                <li class="w" v-bind:class="{ active: w }" @click="toggleColor('w')">
                  <img src="dist/images/W.png" alt="">
                </li>
                <li class="u" v-bind:class="{ active: u }" @click="toggleColor('u')">
                  <img src="dist/images/U.png" alt="">
                </li>
                <li class="b" v-bind:class="{ active: b }" @click="toggleColor('b')">
                  <img src="dist/images/B.png" alt="">
                </li>
                <li class="r" v-bind:class="{ active: r }" @click="toggleColor('r')">
                  <img src="dist/images/R.png" alt="">
                </li>
                <li class="g" v-bind:class="{ active: g }" @click="toggleColor('g')">
                  <img src="dist/images/G.png" alt="">
                </li>
              </ul>

              <ul class="selected-colors">
                <li class="w" v-bind:class="{ hidden: !w }"><img src="dist/images/W.png" alt=""></li>
                <li class="u" v-bind:class="{ hidden: !u }"><img src="dist/images/U.png" alt=""></li>
                <li class="b" v-bind:class="{ hidden: !b }"><img src="dist/images/B.png" alt=""></li>
                <li class="r" v-bind:class="{ hidden: !r }"><img src="dist/images/R.png" alt=""></li>
                <li class="g" v-bind:class="{ hidden: !g }"><img src="dist/images/G.png" alt=""></li>
              </ul>

              <input type="hidden" name="w" v-model="w">
              <input type="hidden" name="u" v-model="u">
              <input type="hidden" name="b" v-model="b">
              <input type="hidden" name="r" v-model="r">
              <input type="hidden" name="g" v-model="g">
              <input type="hidden" name="deck_index" :value="$props.deck_index">
              <button>Save</button>
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
      deck_name: '',
      commander_count: 1,
      w: false,
      u: false,
      b: false,
      r: false,
      g: false,
    }
  },
  methods: {
    save(e) {
      e.preventDefault();
      this.$emit('save', JSON.stringify(this.$data));
    },
    setCommanderCount: function (num) {
      this.commander_count = num;
    },
    onFileChange(e, slot) {
      const file = e.target.files[0];
      if (slot === 0) {
        this.commander_images.first = URL.createObjectURL(file);
      } else {
        this.commander_images.second = URL.createObjectURL(file);
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
      }
    }
  }
}
</script>