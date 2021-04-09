<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navigation">
          <ul class="menu">
            <li v-for="item in nav">
              <NavigationItem :item="item"></NavigationItem>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationItem from "./NavigationItem";

export default {
  components: {
    NavigationItem
  },
  data() {
    return {
      nav: [
        {is_relative_link: 'true', title: 'Commanders', url: '/'},
        {is_relative_link: 'true', title: 'Shelves', url: '/test'},
      ],
    }
  }
}
</script>