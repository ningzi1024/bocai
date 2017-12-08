<template>
    <img :src="src" :original="original">
</template>

<script type="text/babel">
    export default {
        name: 'tf-lightbox-img',
        props: {
            src: String,
            original: String
        }
    }
</script>
