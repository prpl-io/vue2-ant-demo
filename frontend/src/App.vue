<template>
    <div id="app">
        <component :is="`${layout}-layout`">
            <router-view :key="$route.fullPath" />
        </component>
    </div>
</template>

<script>
import Layout from '@/layouts/main';
import AuthLayout from '@/layouts/auth';
import ErrorLayout from '@/layouts/error';
import LoaderLayout from '@/layouts/loader';

export default {
    components: {
        'default-layout': Layout,
        AuthLayout,
        ErrorLayout,
        LoaderLayout
    },

    data() {
        return {
            layout: 'loader'
        };
    },

    watch: {
        '$route.fullPath'() {
            this.checkLayout();
        }
    },

    mounted() {
        setTimeout(() => {
            this.checkLayout();
        }, 1000);
    },

    methods: {
        checkLayout() {
            const {
                meta: { layout = 'default' }
            } = this.$route;

            this.layout = layout;
        }
    }
};
</script>
