<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model.trim="$v.email.$model"
                        :class="{'invalid': (($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))}"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Поле Email не должно быть пустым!</small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный Email!</small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        class="validate"
                        v-model.trim="$v.password.$model"
                        :class="{'invalid': (($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength))}"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Поле пароль не должно быть пустым!</small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Введите корректный пароль!</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import messages from "../utils/messages";

    export default {
        name: "Login",
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)}
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password,
                }

                try {
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                } catch(e) {
                    console.log()
                }
            }
        },
        mounted() {
            if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
        },
        data: () => ({
            email: '',
            password: ''
        }),
        metaInfo() {
            return {
                title: this.$title('SignIn')
            }
        },
    }
</script>

<style scoped>

</style>