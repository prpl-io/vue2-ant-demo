<template>
    <div>
        <a-skeleton
            v-for="index in elementsCount"
            :key="index"
            animation="wave"
            active
        />
    </div>
</template>

<script>
export default {
    props: {
        elementsCount: {
            type: Number,
            required: false,
            default: parseInt(Math.random() * 2 + 4)
        }
    },

};
</script>
