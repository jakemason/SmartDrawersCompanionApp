<template>
  <router-link :class="active" v-if="item.is_relative_link" :to="{ path: item.url }">
    <i class="fa" :class="item.icon"></i> {{ item.title }}
  </router-link>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      active: false
    }
  }
}
</script>
