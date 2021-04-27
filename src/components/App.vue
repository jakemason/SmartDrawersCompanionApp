<template>
  <div>
    <Spinner></Spinner>
    <Navigation></Navigation>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from "./global/Navigation";
import Spinner from "./global/Spinner";

export default {
  components: {
    Navigation,
    Spinner
  },
  data() {
    return {}
  }
}
</script>