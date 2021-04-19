<template>
  <div class="toast">
    <div v-if="isError" class="error">
      <p>{{ message }}</p>
    </div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['message', 'isError', 'lastTriggered'],
  methods: {
    onToastChange() {
      let toast = document.querySelector('.toast');
      toast.classList.remove('animate');
      setTimeout(function () {
        toast.classList.add('animate');
      }, 1);  //forces reflow
    }
  },
  watch: {
    lastTriggered: function () {
      this.onToastChange();
    }
  },
  data() {
    return {}
  }
}
</script>