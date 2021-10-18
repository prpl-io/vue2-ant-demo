<template>
    <a-card title="Forgot password" :style="{ textAlign: 'center' }">
        <div v-if="emailSent">
            <p>
                An email has been sent. Please check for an email from company
                and click on the included link to reset your password.
            </p>
            <router-link to="/login">
                Back to login
            </router-link>
        </div>

        <div v-else>
            <p>
                Enter your email address and we'll send you an email with
                instructions to reset your password.
            </p>
            <a-form @submit.prevent="tryToSendLink">
                <a-form-item
                    has-feedback
                    :validate-status="emailErrors.length ? 'error' : ''"
                    :help="emailErrors[0]"
                >
                    <a-input
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="Enter Email"
                    />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit">
                        Send Reset Password Link
                    </a-button>
                </a-form-item>
            </a-form>

            <p>
                Already have an account?
                <router-link to="/login">
                    Log In
                </router-link>
            </p>
        </div>
    </a-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    page: {
        title: 'Forget Password'
    },

    validations: {
        email: { required, email }
    },

    data() {
        return {
            email: '',
            emailSent: false
        };
    },

    computed: {
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) {
                return errors;
            }

            !this.$v.email.required && errors.push('Email is required.');

            return errors;
        }
    },

    methods: {
        ...mapActions({
            sendResetPasswordLink: 'auth/sendResetPasswordLink'
        }),

        async tryToSendLink() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            try {
                await this.sendResetPasswordLink(this.email);

                this.email = '';
                this.emailSent = true;
            } catch (err) {
                console.error(err);

                this.$toasterError();
            }
        }
    }
};
</script>
