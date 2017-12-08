<template>
    <div class="componets-notice-wrap">
        <!-- <span class="noticeTitle"></span> -->
        <span :class="{'noticeContent':true,'plr24rem':behavior=='slide'}">
            <marquee id="affiche" :behavior="behavior" align="left" marquee-speed=0 direction="left">
                <span style="white-space:nowrap"><!-- <tf-icon class="newapp-ts-ico" name="warn" size="0.29rem"> --></tf-icon>{{content}}</span>
            </marquee>
        </span>
    </div>
</template>
<script>
export default {
    name: "tf-notice",
    data() {
        return {
            behavior: ""
        }
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        }
    },
    methods: {
        resize() {
            let marquee = this.$el.querySelector("marquee");
            let domContent = this.$el.querySelector("marquee span");
            // console.log(marquee.clientWidth,domContent.getBoundingClientRect().width)
            if (marquee.clientWidth >= domContent.getBoundingClientRect().width) {
                this.behavior = "slide"
            } else {
                this.behavior = "scroll"
            }
        }
    },
    watch: {
        content(val) {
            this.$nextTick(this.resize);
        }
    },
    mounted() {
        // console.log(this.$el)
        this.resize();
    }

}
</script>
<style lang="less">
.componets-notice-wrap {
    height: .6rem;
    width: 100%;
    line-height: .6rem;
    background-color: #fff4d7;
    box-sizing: border-box;

    color: #f85a3f; // overflow: hidden;
    >span {
        display: inline-block;
    }
    .plr24rem {
        padding-left: .15rem;
        padding-right: .15rem; // display: flex;
    }
    .noticeTitle {
        padding-left: .2rem;
    }
    .noticeContent {
        // flex: 1;
        width: 100%;
        overflow: hidden;
        position: relative;
        >span {
            white-space: nowrap; // position: absolute;
            // top: 0;
        }
    }
    .newapp-ts-ico{
        position: relative;
        margin-right: .08rem;
        top: 1px;
        color: #fd0;
        text-shadow: 0 0 5px rgba(255,220,0,.35);
    }
}
</style>


