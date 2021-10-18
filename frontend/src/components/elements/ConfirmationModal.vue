<template>
    <b-modal :id="id" title="Are you sure?" centered no-close-on-backdrop>
        {{ title }}
        <template #modal-footer>
            <div class="col-12 d-flex justify-content-between">
                <button
                    type="button"
                    class="btn btn-danger waves-effect waves-light mr-2"
                    @click="disagree"
                >
                    Disagree
                </button>
                <button
                    type="submit"
                    class="btn btn-success waves-effect waves-light"
                    @click="agree"
                >
                    Agree
                </button>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: false,
            default: 'confirm-modal'
        },
        title: {
            type: String,
            required: false,
            default: 'Are you sure?'
        }
    },

    methods: {
        disagree() {
            this.$emit('disagree');
            this.$bvModal.hide(this.id);
        },

        agree() {
            this.$emit('agree');
            this.$bvModal.hide(this.id);
        }
    }
};
</script>
