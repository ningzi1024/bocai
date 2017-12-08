<template>
    <div class="mask-white-dialog">
        <div :class="{'m-loading':true,'m-loading-noTitle':title==''}">
            <div class="loading-icon"></div>
            <div class="loading-txt" v-html="title"></div>
        </div>
    </div>
</template>
<style lang="less">
.m-loading.m-loading-noTitle{
    padding:12px;
    .loading-icon{
        padding:0;
        margin:0;
    }
}
</style>

<script type="text/babel">
    export default {
        props: {
            title: String
        }
    }
</script>
