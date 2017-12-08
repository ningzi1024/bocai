<!--
* 抢红包
-->
<template>
    <div class="hb-bg">
        <div class="hb-bg-banner">
            <div class="hb-hd-banner">
                <!--按钮操作区域-->
                <div class="adapt hbhd-bd-1">
                    <div class="hbhd-butn" @click="redpacket.show=true"></div>
                </div>
                <div class="hbhd-daojishi">
                    <h2 class="djs-bt">距离开始时间还有</h2>
                    <div class="hbhd-time">
                        <span class="hbhd-time-h fl">05</span>
                        <span class="hbhd-time-m fl">27</span>
                        <span class="hbhd-time-s fl">44</span>
                    </div>
                </div>
            </div>


            <div class="hbhd-lishi" style="margin-top: .24rem;">
                <h2 class="hbhd-wb-bt adapt"><img src="../assets/image/hongbao/hb-12-bg-02.png"></h2>
                <dl class="fl hb-ls-list">
                    <dt>第一轮</dt>
                    <dd class="list-1st">抢得<em>6.88</em>元</dd>
                    <!--<dd class="list-2nd">未参与</dd>
                    <dd class="list-3rd">谢谢参与</dd>-->
                </dl>
                <dl class="fl hb-ls-list list-margin">
                    <dt>第二轮</dt>
                    <dd class="list-1st">--</dd>
                    <!--<dd class="list-2nd">--</dd>
                    <dd class="list-3rd">--</dd>-->
                </dl>
                <dl class="fl hb-ls-list">
                    <dt>第三轮</dt>
                    <dd class="list-1st">--</dd>
                    <!--<dd class="list-2nd">--</dd>
                    <dd class="list-3rd">--</dd>-->
                </dl>
            </div>
            <div class="hbhd-lishi">
                <h2 class="hbhd-wb-bt adapt"><img src="../assets/image/hongbao/hb-12-bg-03.png"></h2>
            </div>
            <div class="hbhd-xize">
                <ol class="hbhd-xize-ol">
                    <li>活动时间：2017年07月26日 - 2017年07月28日。</li>
                    <li>活动对象：历史累计存款不低于 <b>200</b> 元的用户。</li>
                    <li>活动期间，用户每天可免费抢三次红包,分别是 <em><b>12:00:00</b></em>，<em><b>16:00:00</b></em>，<em><b>20:00:00</b></em> 这三个时间段。</li>
                    <li>若用户在规定的时间内未进行领取，则视为自动放弃。奖励不会累加到下一次或第二天的活动当中。</li>
                    <li>所有客户只能拥有一个账号：同一个IP、同一个存/提款卡、同一个手机号码、同一个邮箱都视为同一客户，如果发现同一个人拥有两个或以上的账户，重复的账户将会被冻结，【腾博会】保留索回重复账户的红利 及盈利的权利。</li>
                    <li>需要一倍流水才可提款。</li>
                    <li>该活动若存在文字理解的差异，则最终解释权归【腾博会】所有，且【腾博会】有权结束、缩短、延长该活动。</li>
                </ol>
            </div>
        </div>

        <div id="redpacket" :class="{'hb-tc':true,'opened':redpacket.opened}" v-show="redpacket.show">
            <div class="hb-tc-bg"></div>
            <div :class="{'hb-close':redpacket.step==1,'shake':redpacket.show}"></div>
            <div class="hb-open">
                <div class="hb-open-b1"></div>
                <div :class="{'hb-open-b2':true, 'show':redpacket.step==2}" v-show="redpacket.step==2">
                    <div class="hb-Win" style="display:none;">
                        <div class="hb-Win-jb"></div>
                        <div class="hb-Win-bg">
                            <h2><span>888</span>&nbsp;元</h2>
                            <h3>恭喜您获得红包</h3>
                            <p>红包金额已自动存入到您的账户中！</p>
                        </div>
                    </div>
                    <div class="hb-NotWin">
                        <h2>非常抱歉</h2>
                        <p>本轮红包已抢完，请等待下一轮开启！</p>
                    </div>
                </div>
                <div class="hb-open-b3"></div>
                <div class="hb-off-an" @click="closeRedpacket">点击关闭</div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
export default {
    components: {},
    data() {
        return {
            redpacket:{
                show:false,
                opened:false,
                step:1
            }
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"]),
        animationEnd(){
            this.redpacket.opened = true;
            this.redpacket.step = 2;
        },
        closeRedpacket(){
            this.redpacket.show=false;
            this.redpacket.opened = false;
            this.redpacket.step = 1;
        }
    }, 
    created() {
    },   
    mounted() {
        let redpacket = document.getElementById("redpacket");
      // screenDom.remove();
      // screenDom.classList.add("fadeOut");
      // mozAnimationEnd MSAnimationEnd oanimationend animationend
      if (typeof window["onanimationend"] != "undefined") {
        redpacket.addEventListener( "animationend", () => {
            // screenDom.remove();
            this.animationEnd()
          }, false );
      } else if (typeof window["onwebkitanimationend"] != "undefined") {
        redpacket.addEventListener( "webkitAnimationEnd",  () => {
            // screenDom.remove();

            this.animationEnd()
          },  false );
      } else {
        // screenDom.remove();
      }

    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "抢红包", showMenu: false, showBack: true, showNav: false, showChat: false });
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
        next();
    },
    computed: {
    },
    destroyed(){
    }
}
</script>
<style lang="less">
.hb-bg{
    overflow: hidden;
    width:100%;
    position: relative;
    margin:-.22rem 0 -.6rem 0;
    background: url("../assets/image/hongbao/hb-bg.jpg") repeat-y center center;
    background-size: contain;
    .hb-bg-banner{
        margin: 0;
        overflow: hidden;
        width: 100%;
        background: url("../assets/image/hongbao/hb-bg01.jpg") no-repeat center top;
        background-size:100% auto;

        .hbhd-bd-1{
            margin-top:4.3rem;
            .hbhd-butn{
                width:2.4rem;
                height:2.4rem;
                background:url("../assets/image/hongbao/hbhd-gb-4.png") no-repeat;
                background-size: contain;
                margin:0px auto 0 auto;
                cursor:pointer;
                -moz-animation:hbhd-butn 1.0s linear infinite;
                -webkit-animation:hbhd-butn 1.0s linear infinite;
                -o-animation:hbhd-butn 1.0s linear infinite;
                animation:hbhd-butn 1.0s linear infinite;
                }
            @keyframes hbhd-butn{
              0% {
                transform:scale(1.0) rotate(0deg);
                -webkit-transform:scale(1.0) rotate(0deg); 
                -moz-transform:scale(1.0) rotate(0deg); 
                -o-transform:scale(1.0) rotate(0deg); 
              }
              50% {
                transform:scale(0.9) rotate(0deg);
                -webkit-transform:scale(0.9) rotate(0deg); 
                -moz-transform:scale(0.9) rotate(0deg); 
                -o-transform:scale(0.9) rotate(0deg); 
              }
              100% {
                transform:scale(1.0) rotate(0deg);
                -webkit-transform:scale(1.0) rotate(0deg); 
                -moz-transform:scale(1.0) rotate(0deg); 
                -o-transform:scale(1.0) rotate(0deg); 
              }
            }
            .hbhd-butn.off{
                background:url(../assets/image/hongbao/hbhd-gb-4b.png) no-repeat;
                background-size: contain;
                -moz-animation:none;
                -webkit-animation:none;
                -o-animation:none;
                animation:none;
                transform:scale(0.9) rotate(0deg);
                -webkit-transform:scale(0.9) rotate(0deg); 
                -moz-transform:scale(0.9) rotate(0deg); 
                -o-transform:scale(0.9) rotate(0deg); 
            }
        }
        .hbhd-daojishi{
            background:url(../assets/image/hongbao/hbhd-gb-5.png) no-repeat center top;
            background-size: contain;
            width:81.5%;
            height: 1.8rem;
            margin:.2rem auto 0 auto;
            overflow:hidden;
            clear:both;
            text-align:center;
        }
        .hbhd-daojishi h2.djs-bt{
            line-height:.36rem;
            font-size:.3rem;
            color:#b80900;
            font-weight:400;
        }
        .hbhd-time{
            line-height:1.76rem;
            text-align:left;
            width:110%;
        }
        .hbhd-time span{
            font-size:.92rem;
            font-weight:400;
            font-family:Arial, Helvetica, sans-serif;
            letter-spacing:.4rem;
            color:#fff;
            &:nth-child(1){
                margin-left: .14rem;
            }
            &:nth-child(2){
                margin-left: .36rem;
            }
            &:nth-child(3){
                margin-left: .36rem;
            }
        }

    }

    .hbhd-lishi{
        padding: 0 2%;
        overflow: hidden;
        clear: both;
        .hbhd-wb-bt{
            overflow:hidden;
            clear: both;
            margin:.6rem 0 .2rem 1%;
            height: .54rem;
            img{
                height: 100%;
            }
        }
        dl.hb-ls-list{
            width:32%;
            text-align:center;
            font-weight:400;
            margin-left: 1%;
            dt{
                height:.68rem;
                width:100%;
                background: url(../assets/image/hongbao/hb-12-bg-04a.png);
                font-size:.24rem;
                line-height:.68rem;
                color:#fff;
            }
            dd{
                height:.8rem;
                width:100%;
                margin-top:1px;
                font-size:.22rem;
                height:.68rem;
                line-height:.68rem;
                color:#9d2300;
                &.list-1st{background:url(../assets/image/hongbao/hb-12-bg-04b.png);}
                &.list-2nd{background:url(../assets/image/hongbao/hb-12-bg-04c.png);}
                &.list-3rd{background:url(../assets/image/hongbao/hb-12-bg-04d.png);}
                em{
                    font-size:.24rem;
                    color: #f00;
                }
            }
        }
    }


    .hbhd-xize{
        background:rgba(255,255,255,.4);
        border-radius: 8px;
        box-shadow: 1px 1px 5px rgba(250,200,0,.4);
        width:94%;
        margin:0 auto .5rem auto;
        overflow:hidden;
        clear:both;
        .hbhd-xize-ol{
            color:#a48dc5;
            padding:.16rem 3%;
            li{
                list-style-type:decimal;
                margin-left:1.2em;
                font-weight:400;
                font-size:.22rem;
                line-height:.3rem;
                color:#9d2300;
                padding:6px 0;
                clear:both;
                em{
                    color: #f00;
                }
            }
        }
    }




/*红包活动-弹窗交互-开始*/
.hb-tc{
    position:absolute;
    display:;
    }

.hb-tc-bg{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background:#000;
    z-index: 999;
    -moz-opacity: .8;
    opacity: .8;
    filter: alpha(opacity=80);
    }

.hb-close{
    opacity:1;
    position: fixed;
    z-index:1004;
    background: url(../assets/image/hongbao/hbhd-gb-7.png) no-repeat;
    background-size: contain;
    width:80%;
    height:4.2rem;
    top:44.4%;
    left:10%;
    margin:-2.1rem 0 0 0px;
    }

.hb-close.shake{
    animation:shake 1.5s linear;
    -o-animation:shake 1.5s linear;
    -ms-animation:shake 1.5s linear;
    -moz-animation:shake 1.5s linear;
    -webkit-animation:shake 1.5s linear;
    animation-fill-mode:forwards;
    -o-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    -ms-animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
}
.hb-tc.opened .hb-open{opacity: 1;}
.hb-tc.opened .hb-close{opacity: 0; display:none;}


.hb-open{
    opacity:0;
    width:80%;
    height:438px;
    position: fixed;
    z-index:1000;
    top:50%;
    left:10%;
    margin:-115px 0 0 0px;
    }
.hb-open .hb-open-b1{
    position:absolute;
    background:url(../assets/image/hongbao/hbhd-gb-9.png) no-repeat;
    background-size: contain;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1000;
    }
.hb-open-b2{
    position:absolute;
    z-index:1001;
    width:90%;
    height:315px;
    left:5%;
    top:0%;
    margin:.1rem 0 0 0px;
    }
.hb-open-b2 .hb-Win{
    position:absolute;
    z-index:1002;
    top:0;
    left:0;
    width:100%;
    height:100%;
    
    }
.hb-open-b2 .hb-Win .hb-Win-bg{
    opacity: 0;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1002;
    background: url(../assets/image/hongbao/hbhd-gb-10.png) no-repeat;
    background-size: contain;
    text-align:center;
    }
.hb-open-b2 .hb-Win .hb-Win-jb{
    top:.24rem;
    left:0px;
    position:absolute;
    z-index:1003;
    width:100%;
    height:280px;
    background:url(../assets/image/hongbao/hbhd-gb-11.png) no-repeat;
    background-size: contain;
    opacity: 0;
    }

.hb-Win-bg h2{
    font-size:.4rem;
    font-weight:500;
    line-height:1rem;
    margin-top:.2rem;
    color:#b00;
    }
.hb-Win-bg h2 span{
    font-size:.8rem;
    position:relative;
    top:2px;
    font-weight:500;
    }
.hb-Win-bg h3{
    width: 68%;
    margin: 0 auto;
    line-height:.3rem;
    font-size:.26rem;
    color:#85200f;
    font-weight:200;
    background:url(../assets/image/hongbao/hbhd-gb-13.png) no-repeat center .12rem;
    background-size: contain;
    }
.hb-Win-bg p{
    line-height:.5rem;
    font-size:.24rem;
    color:#c7622a;
    font-weight:200;
    }

.hb-NotWin{
    position:absolute;
    width:100%;
    height:100%;
    text-align:center;
    opacity: 0;
    }
.hb-NotWin h2{
    font-size:.6rem;
    color:#ffe99c;
    line-height:.8rem;
    font-weight:500;
    margin-top:.6rem;
    text-shadow:1px 1px 4px rgba(0,0,0,.4);
    }
.hb-NotWin p{
    font-size:.3rem;
    color:#ffe99c;
    line-height:.6rem;
    font-weight:200;
    text-shadow:1px 1px 4px rgba(0,0,0,.4);
    }

.hb-open .hb-open-b3{
    position:absolute;
    background:url(../assets/image/hongbao/hbhd-gb-8.png) no-repeat;
    background-size: contain;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1003;
    }
.hb-open .hb-off-an{
    position:absolute;
    z-index:1005;
    
    left:14%;
    cursor:pointer;
    margin:3.4rem 0 0px 0;
    width:72%;
    height: 68px;
    line-height:60px;
    text-align:center;
    font-size:.4rem;
    color:#722c0a;
    font-weight:bold;
    background:url(../assets/image/hongbao/hbhd-gb-12.png) no-repeat;
    background-size: contain;
    -webkit-transition:all .1s;
    -ms-transition:all .1s;
    -moz-transition:all .1s;
    -o-transition:all .1s;
    transition:all .1s;
    }
.hb-open .hb-off-an:hover{
    transform:translate(0px ,-2px);
    transform:scale(1.02) rotate(0deg);
    -webkit-transform:scale(1.02) rotate(0deg); 
    -moz-transform:scale(1.02) rotate(0deg); 
    -o-transform:scale(1.02) rotate(0deg); 
    }
.hb-open .hb-off-an:active{
    transform:translate(0px ,0px);
    transform:scale(0.98) rotate(0deg);
    -webkit-transform:scale(0.98) rotate(0deg); 
    -moz-transform:scale(0.98) rotate(0deg); 
    -o-transform:scale(0.98) rotate(0deg); 
    }


.hb-open-b2.show .hb-Win .hb-Win-bg{
    animation:move2 .3s 0s linear;
    -o-animation:move2 .3s 0s linear;
    -ms-animation:move2 .3s 0s linear;
    -moz-animation:move2 .3s 0s linear;
    -webkit-animation:move2 .3s 0s linear;
    animation-fill-mode:forwards;
    -o-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    -ms-animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
    }
.hb-open-b2.show .hb-Win .hb-Win-jb{
    animation:move .2s 0s linear;
    -o-animation:move .2s 0s linear;
    -ms-animation:move .2s 0s linear;
    -moz-animation:move .2s 0s linear;
    -webkit-animation:move .2s 0s linear;
    animation-fill-mode:forwards;
    -o-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    -ms-animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
    }
.hb-open-b2.show .hb-NotWin{
    animation:move3 .2s 0s linear;
    -o-animation:move3 .2s 0s linear;
    -ms-animation:move3 .2s 0s linear;
    -moz-animation:move3 .2s 0s linear;
    -webkit-animation:move3 .2s 0s linear;
    animation-fill-mode:forwards;
    -o-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    -ms-animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
    }
@keyframes move {
    0% {
        transform:translate(0px ,50px);
        opacity: 0;
    }
    100% {
        transform:translate(0px ,0px);
        opacity: 1;
    }

}
@-webkit-keyframes move {
    0% {
        -webkit-transform:translate(0px ,50px);
        opacity: 0;
    }
    100% {
        -webkit-transform:translate(0px ,0px);
        opacity: 1;
    }

}

@keyframes move2 {
    0% {
       transform:translate(0px,50px);
       opacity: 0;
    }
    70% {
       transform:translate(0px,-20px);
       opacity: .7;
    }
    100% {
       transform:translate(0px,0px);
       opacity: 1;
    }
}
@-webkit-keyframes move2 {
    0% {
       -webkit-transform:translate(0px,50px);
       opacity: 0;
    }
    70% {
       -webkit-transform:translate(0px,-20px);
       opacity: .7;
    }
    100% {
       -webkit-transform:translate(0px,0px);
       opacity: 1;
    }
}

@keyframes move3 {
    0% {
        transform:translate(0px ,30px);
        opacity: 0;
    }
    100% {
        transform:translate(0px ,0px);
        opacity: 1;
    }

}
@-webkit-keyframes move3 {
    0% {
        -webkit-transform:translate(0px ,30px);
        opacity: 0;
    }
    100% {
        -webkit-transform:translate(0px ,0px);
        opacity: 1;
    }

}

@keyframes shake {
  0% {
    transform: scale(1);
    transform: scale3d(1, 1, 1);    
  }

  6%{
    transform: scale(.9) rotate(-8deg);
    transform: scale3d(1, 1, 1) rotate(0, 0, 1, -8deg);
  }

  18%, 30%,42%{
    transform: scale(1.1) rotate(8deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
  }

  12%,24%, 36%,48%{
    transform: scale(1.1) rotate(-8deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    
  }
  54%{
    transform: scale(1);
    transform: scale3d(1, 1, 1);
  }
  
  60%{
    transform: scale(1);
    transform: scale3d(1, 1, 1);
  }

  80% {
    transform: scale(1) translate(0px,80px);
    transform: scale3d(1, 1, 1) translate3d(0px,80px,0);
  }
  90% {
    transform: scale(1) translate(0px,60px);
    transform: scale3d(1, 1, 1) translate3d(0px,60px,0);
  }
  100% {
    transform: scale(1) translate(0px,80px);
    transform: scale3d(1, 1, 1) translate3d(0px,80px,0);
  }

}

@-webkit-keyframes shake {
  0% {
    transform: scale(1);
    -webkit-transform: scale3d(1, 1, 1);
    
  }

  6%{
    -webkit-transform: scale(.9) rotate(-8deg);
    -webkit-transform: scale3d(1, 1, 1) rotate(0, 0, 1, -8deg);
  }

  18%, 30%,42%{
    -webkit-transform: scale(1.1) rotate(8deg);
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    
  }

  12%,24%, 36%,48%{
    -webkit-transform: scale(1.1) rotate(-8deg);
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    
  }
  54%{
    -webkit-transform: scale(1);
    -webkit-transform: scale3d(1, 1, 1);
  }
  
  60%{
    -webkit-transform: scale(1);
    -webkit-transform: scale3d(1, 1, 1);
  }

  80% {
    -webkit-transform: scale(1) translate(0px,80px);
    -webkit-transform: scale3d(1, 1, 1) translate3d(0px,80px,0);
  }
  90% {
    -webkit-transform: scale(1) translate(0px,60px);
    -webkit-transform: scale3d(1, 1, 1) translate3d(0px,60px,0);
  }
  100% {
    -webkit-transform: scale(1) translate(0px,80px);
    -webkit-transform: scale3d(1, 1, 1) translate3d(0px,80px,0);
  }
}
/*红包活动-弹窗交互-结束*/



}
</style>
