<template>
    <a-page-header :style="{ margin: '24px 16px 0 16px' }" :title="title">
        <template slot="extra">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="(item, index) in items" :key="index">
                    <router-link v-if="item.path" :to="item.path">
                        {{ item.text }}
                    </router-link>
                    <span v-else>{{ item.text }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </template>
    </a-page-header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => []
        }
    }
};
</script>
