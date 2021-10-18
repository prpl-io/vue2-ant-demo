<template>
    <div>
        <page-header :title="title" :items="items" />

        <a-layout-content class="content-wrapper">
            <h3> Hello {{ user.firstName }}! </h3>
        </a-layout-content>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            title: 'Dashboard',
            items: [
                {
                    text: 'Vue2 Demo',
                    path: '/'
                },
                {
                    text: 'Dashboard'
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            user: 'auth/loggedUser'
        })
    }
};
</script>
