<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{"Edit" | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                                v-for="c of categories"
                                :key="c.id"
                                :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>{{"ChooseCat" | localize}}</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="$v.title.$model"
                            :class = "{invalid: ($v.title.$dirty && !$v.title.required)}"
                    >
                    <label for="name">{{"Title" | localize}}</label>
                    <span
                            class="helper-text invalid"
                            v-if="($v.title.$dirty && !$v.title.required)"
                    >{{"NameCat" | localize}}</span>
                </div>


                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="$v.limit.$model"
                            :class = "{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
                    >
                    <label for="limit">{{"Limit" | localize}}</label>
                    <span
                            class="helper-text invalid"
                            v-if="($v.limit.$dirty && !$v.limit.minValue)"
                    >{{"MinValue" | localize}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{"Update" | localize}}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    import localizeFilter from "../filters/localize.filter";

    export default {
        name: "CategoryEdit",
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('changeCategory', categoryData)
                    this.$message(localizeFilter('UpdatedCategory'))
                    this.$emit('updated', categoryData)
                } catch (e) {
                    console.log()
                }
            }
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.select)
            window.M.updateTextFields()
        },
        data: () => ({
            select: null,
            title: '',
            limit: 1,
            current: null
        }),
        watch: {
            current(categId) {
                const {title, limit} = this.categories.find(c => c.id === categId)
                this.limit = limit
                this.title = title
            }
        },
        created() {
            const {id, title, limit} = this.categories[0]
            this.title = title
            this.current = id
            this.limit = limit
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        validations: {
            title: {required},
            limit: {minValue: minValue(1)}
        },
    }
</script>

<style scoped>

</style>