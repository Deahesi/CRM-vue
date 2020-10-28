<template>
    <div>
        <div class="page-title">
            <h3>{{"menuRecord" | localize}}</h3>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">{{"NoCat" | localize}}
            <router-link to="/categories">
                {{"AddCat" | localize}}
            </router-link>
        </p>

        <form class="form" v-else @submit.prevent="submitHandler">
            <div class="input-field" >
                <select ref="select" v-model="category">
                    <option
                            v-for="c in categories"
                            :key="c.id"
                            :value="c.id"
                    >{{c.title}}</option>
                </select>
                <label>{{"ChooseCat" | localize}}</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>{{"Income" | localize}}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>{{"Outcome" | localize}}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class = "{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
                >
                <label for="amount">{{"Sum" | localize}}</label>
                <span
                        class="helper-text invalid"
                        v-if="($v.amount.$dirty && !$v.amount.minValue)"
                >{{"MinValue" | localize}}</span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model="description"
                        :class = "{invalid: ($v.description.$dirty && !$v.description.required)}"
                >
                <label for="description">{{"Desc" | localize}}</label>
                <span
                        class="helper-text invalid"
                        v-if="($v.description.$dirty && !$v.description.required)"
                >{{"EmptyInputError" | localize}}</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{"Create" | localize}}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'
    import localizeFilter from "../filters/localize.filter";

    export default {
        name: "Record",
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
            if (this.categories.length) {
                this.category = this.categories[0].id
            }

            setTimeout(() => {
                this.select = window.M.FormSelect.init(this.$refs.select)
                window.M.updateTextFields()
            }, 0)

        },
        data: () => ({
            loading: true,
            categories: [],
            select: null,
            category: null,
            type: 'outcome',
            amount: 1,
            description: ''
        }),
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        validations: {
            amount: {minValue: minValue(1)},
            description: {required}
        },
        metaInfo() {
            return {
                title: this.$title('menuRecord')
            }
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if (this.canCreateRecord) {
                    try {
                        await this.$store.dispatch('createRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            date: new Date().toJSON()
                        })
                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount

                        await this.$store.dispatch('updateInfo', {bill})
                        this.$message(localizeFilter('CreatedRec'))
                        this.$v.$reset()
                        this.amount = 1
                        this.description = ''

                    } catch (e) {
                        console.log()
                    }
                } else {
                    this.$message(`Недостаточно средств на счёте: ${this.amount-this.info.bill}`)
                }
            }
        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord() {
                if (this.type === 'income') {
                    return true
                }

                return this.info.bill >= this.amount
            }
        }
    }
</script>

<style scoped>

</style>