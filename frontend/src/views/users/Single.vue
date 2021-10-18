<template>
    <div>
        <page-header :title="title" :items="items" />

        <a-layout-content class="content-wrapper">
            <div v-if="!editMode || (editMode && user.id)">
                <add-edit-form
                    v-model="user"
                    :edit-mode="editMode"
                    :validation="$v"
                    :server-errors="serverErrors"
                />

                <a-space>
                    <a-button type="primary" @click="submitHandler">
                        <a-icon type="save" />
                        Save
                    </a-button>
                    <a-button
                        v-if="editMode"
                        type="danger"
                        @click="deleteHandler"
                    >
                        <a-icon type="delete" />
                        Delete
                    </a-button>
                </a-space>
            </div>

            <skeleton-loader v-else />
        </a-layout-content>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import { required, email, minLength } from 'vuelidate/lib/validators';
import AddEditForm from '@/components/users/AddEditForm';

export default {
    page: {
        title: 'Manage User'
    },

    validations: {
        user: {
            email: {
                required,
                email
            },
            role: {
                required
            },
            firstName: {
                required,
                minLength: minLength(2)
            },
            lastName: {
                required,
                minLength: minLength(2)
            }
        }
    },

    components: {
        AddEditForm
    },

    data() {
        const {
            params: { id = null },
            query: { selectedRole }
        } = this.$route;

        return {
            title: id ? 'Edit user' : 'Add user',
            items: [
                {
                    text: 'Vue2 Demo',
                    path: '/'
                },
                {
                    text: 'Users',
                    path: '/users'
                },
                {
                    text: id ? 'Edit' : 'Add'
                }
            ],
            id,
            editMode: !!id,
            user: {
                role: id || !selectedRole ? null : selectedRole
            },
            serverErrors: []
        };
    },

    computed: {
        ...mapGetters({
            ALL_ROLES: 'roles/ALL_ROLES',
            ADMIN_ROLE: 'roles/ADMIN',
            USER_ROLE: 'roles/USER'
        })
    },

    async created() {
        if (this.editMode) {
            try {
                this.user = await this.getUser(this.id);

                this.user.role = this.user.roles[0].name;
            } catch (error) {
                this.$toasterError();

                console.error(error);
            }

            return;
        }

        if (!this.user.role) {
            this.user.role = this.ALL_ROLES[0].value;
        }
    },

    methods: {
        ...mapActions({
            addUser: 'users/store',
            deleteUser: 'users/destroy',
            getUser: 'users/show',
            updateUser: 'users/update'
        }),

        async submitHandler() {
            this.serverErrors = [];

            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            const data = {
                ...this.user
            };

            try {
                if (!this.editMode) {
                    const added = await this.addUser(data);

                    this.$router.push(`/users/${added.id}/edit`);
                } else {
                    const user = await this.updateUser({
                        id: this.id,
                        data
                    });

                    this.user.updatedAt = user.updatedAt;

                    this.$toaster('User updated!');
                }
            } catch (error) {
                const { response } = error;

                if (response) {
                    const { data, status } = response;

                    if (status === HTTP.BAD_REQUEST && data.errors) {
                        this.serverErrors = data.errors;

                        this.$toasterError('Recheck your form.');

                        return;
                    }

                    if (status === HTTP.UNPROCESSABLE_ENTITY && data) {
                        this.$toasterError(data);

                        return;
                    }
                }

                console.error(error);

                this.$toasterError();
            }
        },

        async deleteHandler() {
            try {
                await this.deleteUser(this.id);

                this.$router.push('/users');
            } catch (error) {
                const { response } = error;

                if (response) {
                    const { data, status } = response;

                    if (status === HTTP.UNPROCESSABLE_ENTITY && data) {
                        this.$toasterError(data);

                        return;
                    }
                }

                console.error(error);

                this.$toasterError();
            }
        }
    }
};
</script>
