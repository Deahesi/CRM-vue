<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">{{"menuHistory" | localize}}</router-link>
                <a class="breadcrumb">
                    {{record.typeText}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="record.typeClass">
                        <div class="card-content white-text">
                            <p>{{"Desc" | localize}}: {{record.description}}</p>
                            <p>{{"Sum" | localize}}: {{record.amount | currency}}</p>
                            <p>{{"Category" | localize}}: {{record.categoryName}}</p>

                            <small>{{record.date | date('date')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="center" v-else>{{"NoRecord" | localize}}</p>
    </div>
</template>

<script>
    export default {
        name: "DetailRecord",
        data: () => ({
            loading: true,
            record: null
        }),
        metaInfo() {
            return {
                title: this.$title('GetDetal')
            }
        },
        async mounted() {
            const id = this.$route.params.id
            const record = await this.$store.dispatch('fetchRecordById', id)
            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

            this.record = {
                ...record,
                categoryName: category.title,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? 'Доход' : 'Расход'
            }

            this.loading = false
        }
    }
</script>

<style scoped>

</style>