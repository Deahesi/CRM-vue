<template>
    <div>
        <div class="page-title">
            <h3>{{"menuHistory" | localize}}</h3>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">{{"NoRecords" | localize}}
            <router-link to="/record">
                {{"AddRecord" | localize}}
            </router-link>
        </p>

        <section v-else>
            <HistoryTable :records="items"/>
            <Paginate
                    :page-count="pageCount"
                    :click-handler="pageChange"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :container-class="'pagination'"
                    :page-class="'waves-effect'"
                    v-model="page"
            >
                ></Paginate>
        </section>
    </div>
</template>

<script>
    import paginationMixin from '../mixins/pagination.mixin'
    import HistoryTable from "../components/HistoryTable"
    import localizeFilter from "../filters/localize.filter";

    export default {
        name: "History",
        mixins: [paginationMixin],
        data: () => ({
            records: [],
            loading: true
        }),
        metaInfo() {
            return {
                title: this.$title('menuHistory')
            }
        },
        components: {
            HistoryTable
        },
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.setupPagination(this.records.map(rec => {
                return {
                    ...rec,
                    categoryName: categories.find(c => c.id === rec.categoryId).title,
                    type: rec.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
                    typeClass: rec.type === 'income' ? 'green' : 'red'
                }
            }))

            this.loading = false
        },
    }
</script>

<style scoped>

</style>