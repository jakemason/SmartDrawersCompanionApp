<!-- This assumes you will only have one level of nesting -->
<!-- A different solution is required for a mega-menu, etc -->
<template>
    <nav class="navigation">
        <ul class="menu">
            <li v-for="item in nav_tree">
                <NavigationItem :item="item"></NavigationItem>
                <ul class="submenu" v-if="item.children">
                    <li v-for="child in item.children">
                        <NavigationItem :item="child"></NavigationItem>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
    import NavigationItem from "./NavigationItem";

    export default {
        components: {
            NavigationItem
        },
        data() {
            return {
                nav_tree: null
            }
        },
        mounted() {
            let url = window.SETTINGS.SITE_URL + window.SETTINGS.API_WPVUE_BASE + 'navigation';
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    this.nav_tree = result;
                });
        }
    }
</script>