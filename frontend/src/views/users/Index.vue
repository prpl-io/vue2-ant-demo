<template>
    <div>
        <page-header :title="title" :items="items" />

        <a-layout-content class="content-wrapper">
            <a-form-item>
                <a-button type="primary" @click="$router.push(`/users/add`)">
                    Add new
                </a-button>
            </a-form-item>

            <a-table
                :columns="columns"
                :row-key="item => item.id"
                :data-source="users"
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: true }"
                @change="handleTableChange"
            >
                <template slot="createdAt" slot-scope="text, record">
                    <span>
                        {{ record.createdAt | formatDate }}
                    </span>
                </template>
                <template slot="actions" slot-scope="text, record">
                    <span>
                        <a @click="$router.push(`/users/${record.id}/edit`)">
                            Edit
                        </a>
                        <a-divider type="vertical" />
                        <a
                            :style="{ color: '#f5222d' }"
                            @click="confirmDelete(record.id)"
                        >
                            Delete
                        </a>
                    </span>
                </template>
            </a-table>
        </a-layout-content>

        <confirmation-modal
            v-if="idToDelete"
            @confirm="deleteUser"
            @cancel="modalCanceled"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { StatusCodes as HTTP } from 'http-status-codes';
import ConfirmationModal from '@/components/elements/ConfirmationModal';

export default {
    page: {
        title: 'Users'
    },

    components: {
        ConfirmationModal
    },

    data() {
        return {
            title: 'Users',
            items: [
                {
                    text: 'Vue2 Demo',
                    path: '/'
                },
                {
                    text: 'Users'
                }
            ],
            columns: [
                {
                    title: 'First name',
                    dataIndex: 'firstName',
                    sorter: true
                },
                {
                    title: 'Last name',
                    dataIndex: 'lastName',
                    sorter: true
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    sorter: true
                },
                {
                    title: 'Created at',
                    dataIndex: 'createdAt',
                    defaultSortOrder: 'descend',
                    sorter: true,
                    key: 'createdAt',
                    scopedSlots: { customRender: 'createdAt' }
                },
                {
                    title: 'Actions',
                    dataIndex: 'actions',
                    scopedSlots: { customRender: 'actions' }
                }
            ],
            users: [],
            loading: false,
            pagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '50', '100'],
                showSizeChanger: true
            },
            idToDelete: null
        };
    },

    created() {
        this.fetchUsers({ page: 1, perPage: 10 });
    },

    methods: {
        ...mapActions({
            index: 'users/index',
            delete: 'users/destroy'
        }),

        handleTableChange(pagination, filters, sorter) {
            this.pagination = { ...this.pagination, ...pagination };

            this.fetchUsers({
                perPage: pagination.pageSize,
                page: pagination.current,
                sortBy: sorter.field,
                descending: sorter.order === 'descend',
                ...filters
            });
        },

        async fetchUsers(params = {}) {
            try {
                this.loading = true;

                const { rows, count } = await this.index({
                    ...params,
                    search: this.search
                });

                this.users = rows;
                this.pagination = { ...this.pagination, total: count };
            } catch (err) {
                console.error(err);

                this.$toasterError();
            } finally {
                this.loading = false;
            }
        },

        confirmDelete(id) {
            this.idToDelete = id;
        },

        async deleteUser() {
            try {
                await this.delete(this.idToDelete);

                this.users = this.users.filter(
                    item => item.id !== this.idToDelete
                );
                this.pagination = {
                    ...this.pagination,
                    total: this.pagination.total--
                };
                this.idToDelete = null;

                this.$toaster('User has been deleted.');
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
        },

        modalCanceled() {
            this.idToDelete = null;
        }
    }
};
</script>
