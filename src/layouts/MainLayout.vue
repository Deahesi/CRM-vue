<template>
    <div>
        <Loader v-if="loading"/>
        <div v-else class="app-main-layout">
            <NavBar @click="isOpen=!isOpen"/>
            <SideBar v-model="isOpen" :key="locale"/>

            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view/>
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link to="/record" class="btn-floating btn-large blue" href="#" v-tooltip="tooltipText" data-position="left">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/app/NavBar";
    import SideBar from "../components/app/SideBar";
    import messages from "../utils/messages";
    import localizeFilter from "../filters/localize.filter";

    export default {
        name: "main-layout",
        data: () => ({
            isOpen:false,
            loading: true,
            tooltipText: localizeFilter('newRecord')
        }),
        async mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                await this.$store.dispatch('fetchInfo')
            }

            this.loading = false
        },
        components: {
            NavBar, SideBar
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            locale() {
                return this.$store.getters.info.locale
            }
        },
        watch: {
            error(fbError) {
                console.log(fbError)
                this.$error(messages[fbError.code] || 'Что-то пошло не так')
            },
        }
    }
</script>

<style scoped>

</style>