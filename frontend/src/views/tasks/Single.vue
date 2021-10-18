<template>
    <div>
        <page-header :title="title" :items="items" />

        <a-layout-content class="content-wrapper">
            <div v-if="!editMode || (editMode && task.id)">
                <add-edit-form
                    v-model="task"
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
                        v-if="!task.completedAt && editMode"
                        type="primary"
                        @click="completeHandler"
                    >
                        <a-icon type="check" />
                        Complete
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
import { mapActions } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import { required } from 'vuelidate/lib/validators';
import AddEditForm from '@/components/tasks/AddEditForm';

export default {
    page: {
        title: 'Manage Task'
    },

    validations: {
        task: {
            title: {
                required
            },
            description: {
                required
            }
        }
    },

    components: {
        AddEditForm
    },

    data() {
        const {
            params: { id = null }
        } = this.$route;

        return {
            title: id ? 'Edit task' : 'Add task',
            items: [
                {
                    text: 'Vue2 Demo',
                    path: '/'
                },
                {
                    text: 'Tasks',
                    path: '/tasks'
                },
                {
                    text: id ? 'Edit' : 'Add'
                }
            ],
            id,
            editMode: !!id,
            task: {},
            serverErrors: []
        };
    },

    async created() {
        if (this.editMode) {
            try {
                this.task = await this.getTask(this.id);
            } catch (error) {
                this.$toasterError();

                console.error(error);
            }

            return;
        }
    },

    methods: {
        ...mapActions({
            addTask: 'tasks/store',
            deleteTask: 'tasks/destroy',
            getTask: 'tasks/show',
            updateTask: 'tasks/update',
            complete: 'tasks/complete'
        }),

        async submitHandler() {
            this.serverErrors = [];

            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            const data = {
                ...this.task
            };

            try {
                if (!this.editMode) {
                    const added = await this.addTask(data);

                    this.$router.push(`/tasks/${added.id}/edit`);
                } else {
                    const task = await this.updateTask({
                        id: this.id,
                        data
                    });

                    this.task.updatedAt = task.updatedAt;

                    this.$toaster('Task updated!');
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
                }

                console.error(error);

                this.$toasterError();
            }
        },

        async completeHandler() {
            try {
                const { completedAt } = await this.complete(this.task.id);

                this.task.completedAt = completedAt;

                this.$toaster('Task has been completed!');
            } catch (err) {
                console.error(err);

                this.$toasterError();
            }
        },

        async deleteHandler() {
            try {
                await this.deleteTask(this.id);

                this.$router.push('/tasks');
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
