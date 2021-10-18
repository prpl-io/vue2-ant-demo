<template>
    <a-layout-sider breakpoint="sm">
        <div :style="{ margin: '16px' }">
            <router-link to="/">
                <h3 :style="{ color: '#fff', textAlign: 'center' }">
                    Vue2 Demo
                </h3>
            </router-link>
        </div>

        <a-menu theme="dark" mode="inline" :selected-keys="[currentKey]">
            <a-menu-item v-for="item in items" :key="item.link">
                <router-link :to="item.link">
                    <a-icon :type="item.icon" />
                    <span class="nav-text">{{ item.text }}</span>
                </router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            isAdmin: 'auth/isAdmin'
        }),

        items() {
            const allUsers = [
                {
                    text: 'Dashboard',
                    link: '/',
                    icon: 'project'
                },
                {
                    text: 'Tasks',
                    link: '/tasks',
                    icon: 'unordered-list'
                }
            ];

            if (!this.isAdmin) {
                return allUsers;
            }

            return [
                ...allUsers,
                {
                    text: 'Users',
                    link: '/users',
                    icon: 'team'
                }
            ];
        },

        currentKey() {
            const [, path] = this.$route.path.split('/');

            return `/${path}`;
        }
    }
};
</script>
