<template>
    <a-layout-header :style="{ background: '#fff' }">
        <a-menu
            :style="{ textAlign: 'right', lineHeight: '64px' }"
            mode="horizontal"
            :selected-keys="[$route.path]"
        >
            <a-sub-menu>
                <span slot="title">
                    <a-icon type="setting" />
                    {{ loggedUser.fullName }}
                </span>
                <a-menu-item key="/account">
                    <router-link to="/account">
                        My account
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/logout">
                    <router-link to="/logout">
                        Logout
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            loggedUser: 'auth/loggedUser'
        })
    }
};
</script>
