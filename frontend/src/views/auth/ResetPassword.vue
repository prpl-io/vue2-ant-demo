<template>
    <a-card title="Reset password" :style="{ textAlign: 'center' }">
        <div v-if="incorrectToken || passwordChanged">
            <p>
                {{
                    passwordChanged
                        ? 'Password has been changed.'
                        : 'Incorrect Token'
                }}
            </p>
            <router-link to="/login">
                Back to login
            </router-link>
        </div>
        <div v-else>
            <a-form @submit.prevent="tryToReset">
                <a-form-item
                    has-feedback
                    :validate-status="getError('password') && 'error'"
                    :help="getError('password')"
                >
                    <a-input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="New password"
                    />
                </a-form-item>
                <a-form-item
                    has-feedback
                    :validate-status="
                        getError('passwordConfirmation') && 'error'
                    "
                    :help="getError('passwordConfirmation')"
                >
                    <a-input
                        id="passwordConfirmation"
                        v-model="passwordConfirmation"
                        type="password"
                        placeholder="Password confirmation"
                    />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                    <a-button
                        type="primary"
                        html-type="submit"
                        :style="{ width: '100%' }"
                    >
                        Change password
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </a-card>
</template>

<script>
import { mapActions } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
    page: {
        title: 'Set Password'
    },

    validations: {
        password: {
            required,
            minLength: minLength(6),
            containDigit: v => {
                return /\d/.test(v);
            }
        },
        passwordConfirmation: {
            required,
            sameAsPassword: sameAs('password')
        }
    },

    data() {
        return {
            token: null,
            password: '',
            passwordConfirmation: '',
            passwordChanged: false,
            incorrectToken: false,
            serverErrors: []
        };
    },

    created() {
        this.token = this.$route.params.token;
        this.checkToken();
    },

    methods: {
        ...mapActions({
            checkPasswordResetToken: 'auth/checkPasswordResetToken',
            resetPassword: 'auth/resetPassword'
        }),

        async checkToken() {
            try {
                await this.checkPasswordResetToken(this.token);
            } catch (err) {
                console.error(err);
                this.incorrectToken = true;
            }
        },

        async tryToReset() {
            this.serverErrors = [];

            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            try {
                await this.resetPassword({
                    token: this.token,
                    password: this.password,
                    passwordConfirmation: this.passwordConfirmation
                });

                this.passwordChanged = true;
            } catch (error) {
                const { response } = error;

                if (response) {
                    const { data, status } = response;

                    if (status === HTTP.BAD_REQUEST && data.errors) {
                        this.serverErrors = data.errors;

                        this.$toasterError('Recheck your form.');

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
