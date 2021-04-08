<template>
    <router-link v-if="item.is_relative_link" :attr="item.attr_title" :to="{ path: item.url }">
        {{ item.title }}
    </router-link>
    <a v-else :href="item.url" :attr="item.attr_title" :target="item.target">
        {{ item.title }}
    </a>
</template>

<script>
    export default {
        props: ['item']
    }
</script>
