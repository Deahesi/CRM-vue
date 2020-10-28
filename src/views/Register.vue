<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{'AppTitle' | localize}}</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model.trim="$v.email.$model"
                        :class="{'invalid': (($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email))}"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">{{'EmptyInputError' | localize}}</small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'CorrectEmail' | localize}}</small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        v-model.trim="$v.password.$model"
                        :class="{'invalid': (($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength))}"
                >
                <label for="password">{{'Password' | localize}}</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">{{'EmptyInputError' | localize}}</small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'MinValue' | localize}}!</small>
            </div>
            <div class="input-field">
                <input
                        id="name"
                        type="text"
                        v-model.trim="$v.name.$model"
                        :class="{'invalid': ($v.name.$dirty && !$v.name.required)}"
                >
                <label for="name">{{'Name' | localize}}</label>
                <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введите ваше имя!</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model.trim="$v.agree.$model"/>
                    <span>{{"AgreeWithTerms" | localize}}</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    {{'Register' | localize}}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{'HaveAcc?' | localize}}
                <router-link to="/login">{{'SignIn' | localize}}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "Register",
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)},
            name: {required},
            agree: {checked: v => v}
        },
        metaInfo() {
            return {
                title: this.$title('Register')
            }
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
                    name: this.name,
                }
                try {
                    await this.$store.dispatch('register', formData)
                } catch (e) {
                    return
                }


                this.$router.push('/login?message=register')
            }
        },
        data: () => ({
            email: '',
            password: '',
            name: '',
            agree: false,
        }),
    }
</script>

<style scoped>

</style>