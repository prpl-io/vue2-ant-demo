<template>
    <a-tabs @change="$emit('item-change', items[$event])">
        <a-tab-pane
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'error-box': item.isError }"
            :tab="item[label]"
        >
            <slot :name="item[valueLabel]" />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: 'text'
        },
        valueLabel: {
            type: String,
            required: false,
            default: 'value'
        }
    }
};
</script>
