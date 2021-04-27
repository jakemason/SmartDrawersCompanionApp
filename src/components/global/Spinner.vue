<template>
  <div id="loadingSpinner"><h2>Loading...</h2></div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.$root.$on('setLoadingStatus', this.loadingChange);
  },
  methods: {
    loadingChange(value) {
      console.log("OH YEAH BOY " + value);
      this.isLoading = value;
      let spinner = document.getElementById('loadingSpinner');
      if (this.isLoading) {
        spinner.classList.add('active');
      } else {
        spinner.classList.remove('active');
      }
    }
  },
  watch: {},
  data() {
    return {
      isLoading: true,
    }
  }
}
</script>