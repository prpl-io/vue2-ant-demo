<template>
    <div>
        <page-header :title="title" :items="items" />

        <a-layout-content class="content-wrapper">
            <tabs
                :items="sections"
                :active-item="section"
                @item-change="section = $event"
            >
                <template :slot="section.value">
                    <component :is="section.value" />
                </template>
            </tabs>
        </a-layout-content>
    </div>
</template>

<script>
import Tabs from '@/components/elements/Tabs';
import Profile from '@/components/account/Profile';
import Password from '@/components/account/Password';

export default {
    components: {
        Profile,
        Password,
        Tabs
    },

    data() {
        return {
            title: 'My Account',
            items: [
                {
                    text: 'Vue2 Demo',
                    path: '/'
                },
                {
                    text: 'My account'
                }
            ],
            sections: [
                {
                    value: 'profile',
                    text: 'Update your account'
                },
                {
                    value: 'password',
                    text: 'Change your password'
                }
            ],
            section: {
                value: 'profile'
            }
        };
    }
};
</script>
