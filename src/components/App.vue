<template>
  <div>
    <Navigation></Navigation>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from "./global/Navigation";

export default {
  components: {
    Navigation
  },
}
</script>