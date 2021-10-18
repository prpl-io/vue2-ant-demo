<template>
    <div />
</template>

<script>
import { mapActions } from 'vuex';

export default {
    async created() {
        try {
            await this.logout();
        } catch (error) {
            console.error(error);
            this.$router.push('/');
        }
    },

    methods: {
        ...mapActions({
            logout: 'auth/logout'
        })
    }
};
</script>
