<template>
    <a-modal
        v-model="visible"
        :title="title"
        ok-text="Confirm"
        @ok="$emit('confirm')"
        @cancel="$emit('cancel')"
    >
        <p>
            {{ message }}
        </p>
    </a-modal>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Are you sure?'
        },
        message: {
            type: String,
            required: false,
            default: 'Do you want to deleted this item?'
        }
    },

    data() {
        return {
            visible: true
        };
    }
};
</script>
