<template>
    <a-form @submit.prevent="submitChangeMyPassword">
        <a-form-item
            label="Current password"
            has-feedback
            :validate-status="getError('currentPassword') && 'error'"
            :help="getError('currentPassword')"
        >
            <a-input
                id="currentPassword"
                v-model="passwords.currentPassword"
                type="password"
            />
        </a-form-item>
        <a-form-item
            label="New password"
            has-feedback
            :validate-status="getError('password') && 'error'"
            :help="getError('password')"
        >
            <a-input
                id="password"
                v-model="passwords.password"
                type="password"
            />
        </a-form-item>
        <a-form-item
            label="Password confirmation"
            has-feedback
            :validate-status="getError('passwordConfirmation') && 'error'"
            :help="getError('passwordConfirmation')"
        >
            <a-input
                id="passwordConfirmation"
                v-model="passwords.passwordConfirmation"
                :class="{
                    'is-invalid': $v.passwords.passwordConfirmation.$error
                }"
                type="password"
            />
        </a-form-item>

        <a-form-item>
            <a-button type="primary" html-type="submit">
                <a-icon type="save" />
                Save
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { mapActions } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
    validations: {
        passwords: {
            currentPassword: { required },
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
        }
    },

    data() {
        return {
            passwords: {},
            serverErrors: []
        };
    },

    methods: {
        ...mapActions({
            updatePassword: 'auth/updatePassword'
        }),

        async submitChangeMyPassword() {
            this.serverErrors = [];

            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            try {
                await this.updatePassword(this.passwords);

                this.passwords = {};
                this.$v.$reset();

                this.$toaster('Password has been changed!');
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
                this.$v.passwords,
                this.serverErrors,
                key
            );
        }
    }
};
</script>
