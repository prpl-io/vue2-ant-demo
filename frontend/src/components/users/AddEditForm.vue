<template>
    <div>
        <a-form-item
            label="Role"
            has-feedback
            :validate-status="getError('role') && 'error'"
            :help="getError('role')"
        >
            <a-select
                :value="user.role"
                :options="allRoles"
                :disabled="editMode"
                :style="{ width: '100%' }"
                @change="handleChange"
            />
        </a-form-item>

        <a-form-item
            label="Email"
            has-feedback
            :validate-status="getError('email') && 'error'"
            :help="getError('email')"
        >
            <a-input id="email" v-model="user.email" type="text" />
        </a-form-item>

        <a-form-item
            label="First name"
            has-feedback
            :validate-status="getError('firstName') && 'error'"
            :help="getError('firstName')"
        >
            <a-input
                id="firstName"
                v-model="user.firstName"
                type="text"
                dir="auto"
            />
        </a-form-item>
        <a-form-item
            label="Last name"
            has-feedback
            :validate-status="getError('lastName') && 'error'"
            :help="getError('lastName')"
        >
            <a-input
                id="lastName"
                v-model="user.lastName"
                type="text"
                dir="auto"
            />
        </a-form-item>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        value: {
            type: Object,
            required: false,
            default: () => ({})
        },
        editMode: {
            type: Boolean,
            required: false,
            default: false
        },
        validation: {
            type: Object,
            required: true
        },
        serverErrors: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            user: {}
        };
    },

    computed: {
        ...mapGetters({
            USER: 'roles/USER',
            ADMIN: 'roles/ADMIN'
        }),

        isUser() {
            return (
                this.user.roles &&
                this.user.roles.some(role => role.name === this.USER)
            );
        },

        allRoles() {
            return [
                {
                    label: 'Admins',
                    value: this.ADMIN
                },
                {
                    label: 'Users',
                    value: this.USER
                }
            ];
        }
    },

    watch: {
        user() {
            this.$emit('input', this.user);
        }
    },

    mounted() {
        this.user = { ...this.value };
    },

    methods: {
        getError(key) {
            return this.$getValidationErrorMessageHandler.handle(
                this.validation.user,
                this.serverErrors,
                key
            );
        },

        handleChange(value) {
            this.user.role = value;
        }
    }
};
</script>
