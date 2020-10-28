<template>
    <div>
        <div class="page-title">
            <h3>{{'menuPlanning' | localize}}</h3>
            <h4>{{info.bill | currency('RUB')}}</h4>
        </div>

        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">{{'noRecords' | localize}}
            <router-link to="/record">
                {{'addRecord' |localize}}
            </router-link>
        </p>
        <section v-else>
            <div v-for="categ in categories"  :key="categ.id">
                <p>
                    <strong >
                        {{categ.title}}: {{categ.spend | currency('RUB')}} из {{categ.limit | currency('RUB')}}
                    </strong>
                </p>
                <div class="progress" v-tooltip="categ.toolTip">
                    <div
                            class="determinate green"
                            :class="[categ.progressColor]"
                            :style="{width:(categ.progressPercent) + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import currencyFilter from "../filters/currency.filter";
    import localizeFilter from "../filters/localize.filter";

    export default {
        name: "Planning",
        data: () => ({
            categories: [],
            loading: true,
            records: [],
            tooltipExcess: localizeFilter('excessBy'),
            tooltipLeft: localizeFilter('left')
        }),
        metaInfo() {
            return {
                title: this.$title('menuPlanning')
            }
        },
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(categ => {
                const spend = this.records
                    .filter(r => r.categoryId === categ.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)

                const percent = (spend * 100 / categ.limit)
                const progressPercent = percent > 100 ? 100 : percent
                const progressColor = percent < 60
                    ? 'green'
                        : percent < 100
                        ? 'yellow'
                        : 'red'

                const tooltipValue = categ.limit - spend
                const toolTip = `${tooltipValue < 0 ? this.tooltipExcess : this.tooltipLeft + ':'} ${currencyFilter(Math.abs(tooltipValue))}`

                return {
                    ...categ,
                    progressPercent,
                    progressColor,
                    spend,
                    toolTip
                }
            })
            console.log(this.records)
            this.loading = false
        },
        computed: {
            ...mapGetters(['info'])
        }
    }
</script>

<style scoped>

</style>