<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{"Create" | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    Создать
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
        name: "CategoryCreate",
        data: () => ({
            title: '',
            limit: 1
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(1)}
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const category = await this.$store.dispatch('createCategory', {
                        title: this.title,
                        limit: this.limit
                    })
                    this.title = ''
                    this.limit = 1
                    this.$message(localizeFilter('CreatedCategory'))
                    this.$emit('created', category)
                    this.$v.reset()
                } catch (e) {
                    console.log()
                }

            }
        },
        mounted() {
            window.M.updateTextFields()
        }
    }
</script>

<style scoped>

</style>