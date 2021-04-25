import Vue from 'vue'
import Router from 'vue-router'

// Components
//import FourOhFour from './components/global/404';

// This allows async loading, but also creates additional bundle.js files
// that need to be individually enqueued by WordPress. Need to see how we can work
// around that.
const DeckEditing = () => import('./components/pages/DeckEditing.vue')
const DrawerEditor = () => import('./components/pages/DrawerEditor.vue')

Vue.use(Router);

const router = new Router({
    mode: 'history',
    //base: '/mtg/', //used for testing w/ Jonny
    routes: [
        // 404 above regex captures to preserve priority
        //{path: '/404', name: '404', component: FourOhFour},
        {path: '/', name: 'Home', component: DeckEditing},
        {path: '/drawer-editor', name: 'Drawer Editor', component: DrawerEditor}
    ],

    // Prevents window from scrolling back to top
    // when navigating between components/views
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

export default router;
