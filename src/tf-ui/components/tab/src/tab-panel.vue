<template>
    <div class="tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'tf-tab-panel',
    props: {
        label: String,
        active: Boolean,
        tabkey: [String, Number],
        onload: Function
    },
    computed: {
        classes() {
            return this.$parent.activeIndex == this._uid ? 'tab-active' : '';
        }
    },
    watch: {
        active() {

            this.$parent.init(true);
        },
        label() {
            this.$parent.init('label')
        },
        classes(val) {
            if(val == "tab-active" && this.onload && typeof(this.onload == "function")) this.onload(this.label,this.tabkey,this._uid)
        }
    }
}
</script>
