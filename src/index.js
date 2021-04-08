window.SETTINGS = {
    IS_DEV: true, //TODO: Maybe we can get this from somewhere else
};

import Vue from 'vue';
import router from './router';
import App from './components/App.vue';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');
