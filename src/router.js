import Vue from 'vue'
import Router from 'vue-router'

// Components
//import FourOhFour from './components/global/404';

// This allows async loading, but also creates additional bundle.js files
// that need to be individually enqueued by WordPress. Need to see how we can work
// around that.
// const Home = () => import('./components/singles/Home.vue')
// const PostSingle = () => import('./components/singles/Post')
// const PageSingle = () => import('./components/singles/Page')
// const SearchSingle = () => import('./components/singles/Search')
// const PostArchive = () => import('./components/archives/Post')
// const FourOhFour = () => import('./components/global/404')


Vue.use(Router);

const router = new Router({
    routes: [
        // 404 above regex captures to preserve priority
        //{path: '/404', name: '404', component: FourOhFour},
    ],
    mode: 'history',

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
