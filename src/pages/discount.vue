<template>
  <transition name="slide-right">
    <div class="discount">
      <div class="panel boxshadow" v-if="list.length" v-for="item in list" @click="routePath(item.routePath)">
        <div class="banner">
          <div><img v-lazy="item.imgurl" alt="">
            <span></span>
          </div>
        </div>
        <div class="con">
          <div class="left">
            <h2 class="title ov-h">{{ item.title }}</h2>
            <p class="desc">{{ item.content }}</p>
          </div>
          <div class="right">
            <tf-icon name="jiantou" size=".44rem" color="#ccc"></tf-icon>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import activeList from 'common/discount';
export default {
  name: 'discount',
  data() {
    return {
      list: [],
      data: {}
    }
  },
  created() {
    this.list = activeList;
    // console.log(activeList)
    this.data = this.memberData();
  },
  mounted() {
    if (this.data.discountScrollTop > 0) {
      document.getElementById('scrollView').scrollTop = this.data.discountScrollTop;
    }
  },
  methods: {
    routePath(path) {
      this.$router.push('/discountDetail/' + path);
    },
    ...mapMutations([
      "setDiscountScrollTop"
    ]),
    ...mapGetters({
      memberData: 'getMemberData'
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('setSiteConfig', {
        title: "优惠活动",
        showMenu: true,
        showBack: false,
        showNav: true,
        showChat: true
      });
    })
  },
  beforeRouteLeave(to, from, next) {
    let st = document.getElementById("scrollView").scrollTop;
    this.$store.commit('setDiscountScrollTop', st);
    next();
  },
}
</script>

<style scoped lang="less">
.discount {
  color: #999;
  margin-bottom: -.2rem;
  &.slide-right-enter,
  &.slide-right-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  &.slide-right-enter-active,
  &.slide-right-leave-active {
    transition: all 0.2s ease;
  }
  img[lazy="error"],
  img[lazy="loading"] {
    display: block;
    margin: 0 auto;
    height: 2rem;
    width:auto!important;
  }
  .panel {
    width: 96%;
    background: #fff;
    overflow: hidden;
    clear: both;
    margin-left: 2%;
    margin-top: 0.2rem;
    .banner {
      width: 100%;
      padding: .1rem .1rem .08rem .1rem;
      div {
        width: 100%;
        overflow: hidden;
        position: relative;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .05);
        img {
          width: 100%;
        }
        span {
          position: absolute;
          width: 100%;
          height: 1rem;
          background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .5) 100%);
          left: 0;
          bottom: 0;
        }
      }
    }
    .con {
      padding: 0.2rem;
      overflow: hidden;
      .left {
        float: left;
        width: 90%;
        .title {
          color: #333;
          font-size: .3rem;
          line-height: .4rem;
          font-weight: 500;
          display: block;
        }
        .desc {
          color: #bbb;
          font-size: .22rem;
          line-height: .32rem;
          margin-bottom: .1rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .right {
        float: right;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
