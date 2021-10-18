<template>
    <a-card title="Log In" :style="{ textAlign: 'center' }">
        <a-form
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
            @submit.prevent="tryToLogIn"
        >
            <a-form-item
                label="Email"
                has-feedback
                :validate-status="getError('email') && 'error'"
                :help="getError('email')"
            >
                <a-input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Email"
                />
            </a-form-item>

            <a-form-item
                label="Password"
                has-feedback
                :validate-status="getError('password') && 'error'"
                :help="getError('password')"
            >
                <a-input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    placeholder="Password"
                />
            </a-form-item>

            <a-alert
                v-if="isAuthError"
                message="Wrong credentials!"
                type="error"
                show-icon
                :style="{ marginBottom: '10px' }"
            />

            <a-form-item :wrapper-col="{ span: 24 }">
                <a-button
                    type="primary"
                    html-type="submit"
                    :style="{ width: '100%' }"
                >
                    Submit
                </a-button>
            </a-form-item>

            <router-link to="/forget-password">
                Forgot your password?
            </router-link>

            <p>
                Don't have an account?
                <router-link to="/sign-up">
                    Sign Up
                </router-link>
            </p>
        </a-form>
    </a-card>
</template>

<script>
import { mapActions } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import { required, email } from 'vuelidate/lib/validators';

export default {
    validations: {
        email: {
            required,
            email
        }
    },

    data() {
        return {
            email: '',
            password: '',
            isAuthError: false,
            serverErrors: []
        };
    },

    methods: {
        ...mapActions({
            login: 'auth/login'
        }),

        async tryToLogIn() {
            this.serverErrors = [];
            this.authError = null;

            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            try {
                await this.login({
                    email: this.email,
                    password: this.password
                });

                this.isAuthError = false;
                this.serverErrors = [];

                const { redirectFrom = '/' } = this.$route.query;

                const redirectRoute = !['/logout', '/login'].includes(
                    redirectFrom
                )
                    ? redirectFrom
                    : { name: 'dashboard' };

                this.$router.push(redirectRoute);
            } catch (error) {
                const { response } = error;

                if (response) {
                    const { data, status } = response;

                    if (status === HTTP.BAD_REQUEST && data.errors) {
                        this.serverErrors = data.errors;

                        this.$toasterError('Recheck your form.');

                        return;
                    }

                    if (status === HTTP.UNAUTHORIZED) {
                        this.isAuthError = true;

                        return;
                    }
                }

                console.error(error);

                this.$toasterError();
            }
        },

        getError(key) {
            return this.$getValidationErrorMessageHandler.handle(
                this.$v,
                this.serverErrors,
                key
            );
        }
    }
};
</script>
