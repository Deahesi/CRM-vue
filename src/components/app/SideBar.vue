<template>
    <ul class="sidenav app-sidenav" :class="{open:value}">
        <router-link
            v-for="link in links"
            :key="link.link"
            tag="li"
            active-class="active"
            :to="link.link"
            :exact="link.exact"
        >
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
    import localizeFilter from "../../filters/localize.filter";

    export default {
        name: "SideBar",
        props: ['value'],
        data: () => ({
            links: [
                {title: localizeFilter('menuBill'), link: '/', exact:true},
                {title: localizeFilter('menuHistory'), link: '/history',},
                {title: localizeFilter('menuPlanning'), link: '/planning',},
                {title: localizeFilter('menuRecord'), link: '/record',},
                {title: localizeFilter('menuCategories'), link: '/categories',},
            ]
        })
    }
</script>

<style scoped>

</style>