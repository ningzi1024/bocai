<!--
* 自助优惠
-->
<template>
    <div class="container app-proStyle">
        <tf-pullrefresh :onInfinite="reload" ref="pullrefreshDemo">
            <tf-tab :change="tabChange">
                <tf-tab-panel :active="active==='1'" :onload="CheckAuthBonus" tabkey="1" label="信息认证">
                    <!-- <div class="split-gray"></div> -->
                    <div class="group-title">
                        <label>认证列表</label>
                    </div>
                    <tf-flexbox style="padding:.24rem;" class="auth-list">
                        <tf-flexbox-item @click.native="goLink(!auth.mobile,'/safetyCenter/safeCheck/mobile')" :class="{'auth-unfinish':!auth.mobile}">
                            <tf-icon class="auth-icon" style="background-color:#7165b7;padding-top: .15rem;" size=".5rem" name="shouji"></tf-icon><br/>
                            <span class="auth-name">手机认证</span><br/>
                            <span class="auth-complate">{{auth.mobile?"已完成":"未完成"}}</span>
                        </tf-flexbox-item>
                        <tf-flexbox-item @click.native="goLink(!auth.card,'/bankInfo')" :class="{'auth-unfinish':!auth.card}">
                            <tf-icon class="auth-icon" style="background-color:#24c5b5;padding-top: .2rem;" size=".4rem" name="yinhangziliao"></tf-icon><br/>
                            <span class="auth-name">银行卡验证</span><br/>
                            <span class="auth-complate">{{auth.card?"已完成":"未完成"}}</span>
                        </tf-flexbox-item>
                        <tf-flexbox-item @click.native="goLink(!auth.safepwd,'/safetyCenter/safePassCheck')" :class="{'auth-unfinish':!auth.safepwd}">
                            <tf-icon class="auth-icon" style="background-color:#246bfb;padding-top: .14rem;" size=".5rem" name="mimaguanli"></tf-icon><br/>
                            <span class="auth-name">安全密码</span><br/>
                            <span class="auth-complate">{{auth.safepwd?"已完成":"未完成"}}</span>
                        </tf-flexbox-item>
                        <tf-flexbox-item @click.native="goLink(!auth.amount,'/deposit')" :class="{'auth-unfinish':!auth.amount}">
                            <tf-icon class="auth-icon" style="background-color:#ff3334;padding-top: .18rem;padding-left: .015rem;" size=".5rem" name="zijin"></tf-icon><br/>
                            <span class="auth-name">累计存款</span><br/>
                            <span class="auth-complate">{{auth.amount?"已完成":"未完成"}}</span>
                        </tf-flexbox-item>
                    </tf-flexbox>
                    <p style="padding: .2rem .2rem .0 .2rem;font-size: .24rem;" class="redColor">历史累计存款不得低于200元才能领取</p>
                    <tf-button size="large" :disabled="!(!auth.receive&&auth.mobile && auth.card && auth.safepwd && auth.amount)" @click.native="ApplyAuthenticationBonus" class="btnOk" type="primary">{{auth.receive?'已领取' : '确定'}}</tf-button>

                </tf-tab-panel>
                <tf-tab-panel :active="active==='2'" :onload="BetBonus_GetList" tabkey="2" label="积分/洗码">

                    <div v-if="betBonus.BonusList.length > 0">
                        <div class="title-tip">
                            <div class="fl title-div1">
                                <a @click="betBonus.showLimit=true">流水限额
                                    <tf-icon name="question" size="0.32rem"></tf-icon>
                                </a>
                            </div>

                            <div class="fr title-div2">
                                <a @click="betBonus.showDetail=true">
                                    <span class="balance-show redColor">{{betBonus.Promo}}</span>
                                    <em>元</em>
                                    <tf-icon name="jiantou" size="0.36rem"></tf-icon>
                                </a>
                            </div>
                        </div>
                        <div v-for="item in betTotal" :key="item.GameTypeName" class="item-wrap">
                            <div class="split-gray"></div>
                            <div class="group-title">
                                <label>投注洗码</label>
                                <span class="red-span">1元起领</span>
                                <a @click="betBonus.betmDetail=true" class="blueColor right-detail">查看明细</a>
                            </div>
                            <tf-flexbox style="padding:.24rem;" class="auth-list">
                                <tf-flexbox-item>
                                    <span class="size4rem">{{item.totalBet}}</span><br/>
                                    <span class="grayColor">有效投注(元)</span>
                                </tf-flexbox-item>
                                <tf-flexbox-item>
                                    <span class="size4rem">{{item.Rate}}</span><br/>
                                    <span class="grayColor">洗码比率</span>
                                </tf-flexbox-item>
                                <tf-flexbox-item>
                                    <span class="size4rem">{{item.acceptBet}}</span><br/>
                                    <span class="grayColor">洗码流水</span>
                                </tf-flexbox-item>
                                <tf-flexbox-item>
                                    <span class="size4rem redclr">{{item.acceptMoney}}</span><br/>
                                    <span class="grayColor">洗码金额</span>
                                </tf-flexbox-item>
                            </tf-flexbox>
                            <!-- <p class="p24rem grayColor" style="line-height:.5rem">洗码金额
                                                                                                                        <span>{{item.totalBet}}</span>
                                                                                                                    </p> -->
                            <tf-button size="large" @click.native="BetBonus_BetsPromo" :disabled="item.acceptMoney<item.minBonus" class="btnOk" type="primary" style="margin-bottom:0;">领取洗码</tf-button>
                            <p v-if="item.acceptMoney > item.minBonus" class="p24rem grayColor" style="line-height:.26rem;padding:.15rem 2%;color:#999;">
                                <span class="redColor">提示</span>：用户申领后，当前有效投注额将归零并重新累积洗码 <!-- <br/>
                                <span class="redColor">计算方法</span>：（有效投注 - 限额抵扣）x 洗码比率<br/> --></p>
                            <p v-else class="p24rem redColor" style="line-height:.5rem">提示：当前尚未达到领取条件</p>
                        </div>
                        <div v-for="item in egameTotal" :key="item.GameTypeName" class="item-wrap">
                            <div class="split-gray"></div>
                            <div class="group-title">
                                <label>电游积分</label>
                                <span class="red-span">1元起领</span>
                                <a @click="betBonus.egameDetal=true" class="blueColor right-detail">查看明细</a>
                            </div>
                            <tf-flexbox style="padding:.24rem;" class="auth-list">
                                <tf-flexbox-item>
                                    <span class="size4rem">{{item.totalBet}}</span><br/>
                                    <span class="grayColor">有效投注(元)</span>
                                </tf-flexbox-item>
                                <tf-flexbox-item>
                                    <span class="size4rem">{{item.Rate}}</span><br/>
                                    <span class="grayColor">洗码比率</span>
                                </tf-flexbox-item>
                                <tf-flexbox-item>
                                    <span class="size4rem redclr">{{item.acceptMoney}}</span><br/>
                                    <span class="grayColor">洗码金额</span>
                                </tf-flexbox-item>
                            </tf-flexbox>
                            <tf-button size="large" @click.native="BetBonus_BetsPromoSlot" class="btnOk" :disabled="item.acceptMoney<item.minBonus" type="primary" style="margin-bottom:0;">领取洗码</tf-button>
                            <p v-if="item.acceptMoney > item.minBonus" class="p24rem grayColor" style="line-height:.26rem;padding:.15rem 2%;color:#999;">
                                <span class="redColor">提示</span>：用户申领后，当前有效投注额将归零并重新累积电游积分 <!-- <br/>
                                <span class="redColor">计算方法</span>：（有效投注 - 限额抵扣）x 洗码比率<br/> --></p>
                            <p v-else class="p24rem redColor" style="line-height:.5rem">提示：当前尚未达到领取条件<br/></p>
                        </div>
                    </div>
                    <p v-if="betBonus.isEmpty" class="grayBG grayColor size3rem" style="text-align: center; padding: 1rem .24rem;">
                        系统正在核对您的洗码，请稍后重试
                    </p>
                </tf-tab-panel>
                <tf-tab-panel class="weekhard" :onload="GetWeekFullPromo" :active="active==='3'" tabkey="3" label="周勤好礼">

                    <div class="group-title">
                        <label>上周周勤统计</label>
                        <span @click="week.showRule=true" class="yellow-span">奖励一览</span>
                        <span @click="week.showLastweek=true" class="blueColor right-detail">查看上周记录</span>
                    </div>
                    <tf-flexbox style="padding:.24rem;" class="auth-list">
                        <tf-flexbox-item>
                            <span class="size4rem">{{week.lastWeek.FinishCount}}</span><br/>
                            <span class="grayColor">上周累计出勤(天)</span>
                        </tf-flexbox-item>
                        <tf-flexbox-item>
                            <span class="size4rem">{{week.lastWeek.TotalBet}}</span><br/>
                            <span class="grayColor">上周累计投注</span>
                        </tf-flexbox-item>
                        <tf-flexbox-item>
                            <span class="size4rem">{{(week.lastWeek.CheckCode==-4 || week.lastWeek.FinishCount<4)?'0.00':week.lastWeek.actMoney}}</span><br/>
                            <span class="grayColor">周勤礼金</span>
                        </tf-flexbox-item>
                    </tf-flexbox>
                    <p class="grayColor" style="padding: 0.15rem 0.16rem 0px;font-size: .24rem;color: #aaa;">{{week.timeTip}}
                        <tf-countdown class="redColor" :callback="GetWeekFullPromo" :time="week.endTimes"></tf-countdown>
                    </p>
                    <tf-button size="large" :disabled="disableWeekBtn" @click.native="AcceptWeekFullPromo" class="btnOk" type="primary">{{weekBtnText}}</tf-button>

                    <div class="split-gray"></div>

                    <div class="txt-center title">本周已出勤
                        <span class="redColor">{{week.thisWeek.FinishCount}}</span>天！累计有效投注额
                        <span class="redColor">{{week.thisWeek.TotalBet}}</span>元
                    </div>
                    <tf-flexbox class="after-line" v-for="item in week.thisWeek.row" v-bind:key="item.weekday">
                        <span class="inline-block weeknumber">{{item.name}}</span>
                        <tf-flexbox-item>
                            <span class="grayColor">投注</span>
                            <span class="redColor">{{item.bet}}</span>
                        </tf-flexbox-item>
                        <span v-if="item.isfinish" class="inline-block states complate ">已完成</span>
                        <span v-else class="inline-block states uncomplate ">未完成</span>
                    </tf-flexbox>

                </tf-tab-panel>
                <!-- <tf-tab-panel :active="active==='4'" :onload="CashLimit_LoseBackPromo" tabkey="4" label="电游复活金">
                    <div style="    background-color: #f5f5f5;line-height:1rem;text-align:center;" v-if="!!lost.errText">{{lost.errText}}</div>
                    <template v-else>
                        <div class="group-title">
                            <label>复活礼金</label>
                            <span @click="lost.showDiscription=true" class="yellow-span">奖励一览</span>
                        </div>
                        <p class="grayColor" style="padding: .1rem .24rem;font-size: .24rem;color: #aaa;">
                            <span class="redColor">{{lost.showText}}</span>
                        </p>
                        <tf-flexbox style="padding:.24rem;" class="auth-list">
                            <tf-flexbox-item>
                                <span class="size4rem">{{lost.LostAmount}}</span><br/>
                                <span class="grayColor">当前负盈利(元)</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size4rem">{{lost.Rate}}</span><br/>
                                <span class="grayColor">赠送比率</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size4rem redColor">{{lost.AcceptMoney}}</span><br/>
                                <span class="grayColor">赠送金额(元)</span>
                            </tf-flexbox-item>
                        </tf-flexbox>

                        <tf-button size="large" :disabled="!lost.AcceptCheck" @click.native="CashLimit_AcceptLoseBack" class="btnOk" type="primary">领取复活礼金</tf-button>
                        <p class="grayColor" style="padding: 0 0.16rem .2rem;font-size: .24rem;color: #aaa;">
                            提示：用户申领复活礼金后，当前负盈利将归零并重新累计
                        </p>
                    </template>
                </tf-tab-panel> -->
            </tf-tab>
        </tf-pullrefresh>
        <!-- 查看明细 -->
        <tf-popup v-model="betBonus.showDetail" :useLock="false" contentClass="grayBG" position="right" width="100%">

            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="流水限额明细">
                    <a @click="betBonus.showDetail=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>

                <div v-if="betBonus.LimitList.length>0" class="app-preXEbutn-1">
                    <div class="item-wrap" v-for="item in betBonus.LimitList" :key="item.ID">
                        <div class="group-title">
                            <label>{{item.LogTypeName}}</label>
                            <span class="right-detail">创建时间：
                                <span class="blueColor">{{formatDate(item.CreateTime,"MM/DD HH:mm")}}</span>
                            </span>
                        </div>
                        <tf-flexbox style="padding:.24rem;" class="auth-list">
                            <tf-flexbox-item>
                                <span class="size3rem">{{item.Amount.toFixed(2)}}</span><br/>
                                <span class="grayColor">金额(元)</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size3rem">{{item.Rate}}</span><br/>
                                <span class="grayColor">倍数</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size3rem">{{item.NeedBets}}</span><br/>
                                <span class="grayColor">流水限额(元)</span>
                            </tf-flexbox-item>
                        </tf-flexbox>
                        <div class="split-gray"></div>
                    </div>
                </div>
                <div v-else style="line-height:1rem;text-align:center;">没有记录</div>

                <div class="app-preXEbutn-2 Cont-Spacing">
                    <!-- <tf-notice title="温馨提示：" content="当有效投注不足抵扣限额，并且总余额小于5元，可申请取消当前流水限额"></tf-notice> -->
                    <tf-button size="large" @click.native="CashLimit_CancelLimit" v-show="betBonus.LimitList.length>0" slot="tabbar" class="btnOk" type="primary">取消限额</tf-button>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 查看明细 end-->
        <!-- 流水限额说明 -->
        <tf-popup v-model="betBonus.showLimit" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar fontsize=".3rem" title="流水限额说明" slot="navbar">
                    <a @click="betBonus.showLimit=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="info-content">
                    <ul class="end-discription">
                        <li class="title">什么是流水限额？</li>
                        <li>会员在参与其它优惠活动时，其提款要求的游戏投注金额无法参与到洗码优惠活动中的金额为流水限额。</li>
                        <li class="title">洗码金额的计算方式</li>
                        <li>（会员所有平台总流水 - 洗码流水限额）* 洗码比率 = 洗码金额</li>
                        <li>注：
                            <span class="blueColor">【平台总流水】</span>必须大于
                            <span class="blueColor">【洗码流水限额】</span>才可进行洗码统计。</li>
                        <li class="title">示例</li>
                        <li>会员A首存100,首存优惠返送58，按照活动规则，参与该活动的用户需达到存款加红利后的18倍流水才能提款，即：(100+58)*18=2844元！那么该会员的洗码流水限额为2844元。</li>
                        <li>1.如果该会员打了5000的流水（有效投注额），那么TA应获得17.24元的洗码返水</li>
                        <li>即：(5000-2844)*0.008=17.24</li>
                        <li>2.如果该会员只打了2800的流水（有效投注额），那么TA因为不足抵扣限额而无法进行洗码统计。</li>
                        <li class="title">取消限额的条件</li>
                        <li>当会员当有效投注不足抵扣限额，并且总余额(包括平台余额)小于5元，可申请取消当前流水限额。限额取消后，之前的投注流水将被清零并重新统计。</li>
                        <li>用户可在
                            <span class="blueColor">【查看明细】</span>的窗口进行
                            <span class="blueColor">【取消限额】</span>操作</li>
                    </ul>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 流水限额说明 end-->
        <!-- 投注洗码查看明细 -->
        <tf-popup v-model="betBonus.betmDetail" :useLock="false" position="right" width="100%">

            <tf-layout :style="{'height':screen.height+'px'}">
                            <tf-navbar fontsize=".3rem" title="洗码明细" slot="navbar">
                                <a @click="betBonus.betmDetail=false" slot="left">
                                    <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                                </a>
                            </tf-navbar>
                            <div v-if="betList.length>0" class="app-preXEbutn-3">
                                <div class="item-wrap" v-for="item in betList" :key="item.index">
                                    <div class="group-title">
                                        <label>{{item.GameTypeName}}</label>
                                        <span class="right-detail grayColor">
                                            统计时间：
                                            <span class="blueColor">{{formatDate(item.StartTime,"MM/DD HH:mm")}}</span>
                                            至
                                            <span class="blueColor">{{formatDate(item.EndTime,"MM/DD HH:mm")}}</span>
                                        </span>
                                    </div>
                                    <tf-flexbox style="padding:.24rem;" class="auth-list">
                                        <tf-flexbox-item>
                                            <span class="size3rem">{{item.totalBet}}</span><br/>
                                            <span class="grayColor">有效投注(元)</span>
                                        </tf-flexbox-item>
                                        <tf-flexbox-item>
                                            <span class="size3rem">{{item.Rate}}</span><br/>
                                            <span class="grayColor">洗码比率</span>
                                        </tf-flexbox-item>
                                        <tf-flexbox-item>
                                            <span class="size3rem">{{item.acceptMoney}}</span><br/>
                                            <span class="grayColor">洗码金额</span>
                                        </tf-flexbox-item>
                                    </tf-flexbox>
                                    <div class="split-gray"></div>
                                </div>
                            </div>
                        </tf-layout>
        </tf-popup>
        <!-- 投注洗码查看明细 end -->
        <!-- 电游积分明细 -->
        <tf-popup v-model="betBonus.egameDetal" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar fontsize=".3rem" title="电游积分明细" slot="navbar">
                    <a @click="betBonus.egameDetal=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div v-if="egameList.length>0" class="app-preXEbutn-3">
                    <div class="item-wrap" v-for="item in egameList" :key="item.index">
                        <div class="group-title">
                            <label>{{item.GameTypeName}}</label>
                        </div>
                        <tf-flexbox style="padding:.24rem;" class="auth-list">
                            <tf-flexbox-item>
                                <span class="size3rem">{{formatDate(item.StartTime,"MM/DD HH:mm")}}</span><br/>
                                <span class="grayColor">开始时间</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size3rem">{{formatDate(item.EndTime,"MM/DD HH:mm")}}</span><br/>
                                <span class="grayColor">结束时间</span>
                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="size3rem">{{item.totalBet}}</span><br/>
                                <span class="grayColor">洗码金额</span>
                            </tf-flexbox-item>
                        </tf-flexbox>
                        <div class="split-gray"></div>
                    </div>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 电游积分明细 end -->
        <!-- 奖励一栏 begin -->
        <tf-popup v-model="week.showRule" :useLock="false" contentClass="whiteGB" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar fontsize=".3rem" title="奖励一览" slot="navbar">
                    <a @click="week.showRule=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <table cellpadding="0" cellspacing="0" class="week-rule">
                    <thead>
                        <th>周出勤(单日投注>300)</th>
                        <th>周有效投注(元)</th>
                        <th>周勤礼金(元)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>最低4天</td>
                            <td>5,000 至 49,999.99</td>
                            <td>
                                <b>18</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>50,000 至 99,999.99</td>
                            <td>
                                <b>58</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>100,000 至 499,999.99</td>
                            <td>
                                <b>168</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>500,000 至 999,999.99</td>
                            <td>
                                <b>688</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>1,000,000 至 4,999,999.99</td>
                            <td>
                                <b>1,588</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>5,000,000 至 9,999,999.99</td>
                            <td>
                                <b>5,888</b>
                            </td>
                        </tr>
                        <tr>
                            <td>最低4天</td>
                            <td>10,000,000以上</td>
                            <td>
                                <b>8,888</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tf-layout>
        </tf-popup>
        <!-- 奖励一栏 end -->
        <!-- 上周周勤统计  -->
        <tf-popup v-model="week.showLastweek" :useLock="false" contentClass="whiteGB" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar fontsize=".3rem" title="上周周勤统计" slot="navbar">
                    <a @click="week.showLastweek=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="weekhard" style="box-shadow: 0 2px 6px rgba(0,0,0,.06);">
                    <div class="txt-center title">上周共出勤
                        <span class="redColor">{{week.lastWeek.FinishCount}}</span>天！累计有效投注额
                        <span class="redColor">{{week.lastWeek.TotalBet}}</span>元
                    </div>
                    <tf-flexbox class="after-line" v-for="item in week.lastWeek.row" v-bind:key="item.weekday">
                        <span class="inline-block weeknumber">{{item.name}}</span>
                        <tf-flexbox-item>
                            <span class="grayColor">投注</span>
                            <span class="redColor">{{item.bet}}</span>
                        </tf-flexbox-item>
                        <span v-if="item.isfinish" class="inline-block states complate ">已完成</span>
                        <span v-else class="inline-block states uncomplate ">未完成</span>
                    </tf-flexbox>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 奖励一栏 复活 -->
        <tf-popup v-model="lost.showDiscription" :useLock="false" contentClass="whiteGB" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar fontsize=".3rem" title="上周周勤统计" slot="navbar">
                    <a @click="lost.showDiscription=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <table cellpadding="0" cellspacing="0" class="week-rule">
                    <thead>
                        <th>电游负盈利</th>
                        <th>赠送比例</th>
                        <th>最低领取标准</th>
                        <th>单日累计限额</th>
                        <th>账户余额</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>负盈利200及以上</td>
                            <td>6%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利1000及以上</td>
                            <td>7%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利3000及以上</td>
                            <td>8%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利5000及以上</td>
                            <td>9%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利10000及以上</td>
                            <td>10%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利20000及以上</td>
                            <td>11%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                        <tr>
                            <td>负盈利50000及以上</td>
                            <td>12%</td>
                            <td>5元</td>
                            <td>18888元</td>
                            <td>小于5元</td>
                        </tr>
                    </tbody>
                </table>
            </tf-layout>
        </tf-popup>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import { Tab, TabPanel } from "@/tf-ui/components/tab";
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
import { PullRefresh } from "@/tf-ui/components/pullrefresh";
import { CountDown } from "@/tf-ui/components/countdown";
import notice from "@/components/notice";
import moment from "moment";

export default {
  components: {
    [Tab.name]: Tab,
    [TabPanel.name]: TabPanel,
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,
    [PullRefresh.name]: PullRefresh,
    [notice.name]: notice,
    [CountDown.name]: CountDown
  },
  data() {
    return {
      active: "1",
      tabkey: "",
      auth: {
        isloaded: false,
        mobile: false,
        card: false,
        safepwd: false,
        amount: false,
        receive: false
      },
      betBonus: {
        isloaded: false,
        showDetail: false,
        showLimit: false,
        betmDetail: false,
        egameDetal: false,
        isEmpty: false,
        ItemDetailList: [],
        Promo: "",
        BonusList: [],
        LimitList: []
      },
      week: {
        isloaded: false,
        showLastweek: false,
        showRule: false,
        timeTip: "距离领奖截止日期还剩",
        endTimes: "",
        timeRule: false,
        weekday: 0,
        thisWeek: {
          FinishCount: 1,
          TotalBet: 0.0,
          actMoney: 0.0,
          CheckCode: -1,
          row: []
        },

        lastWeek: {
          FinishCount: 1,
          TotalBet: 0.0,
          actMoney: 0.0,
          CheckCode: -1,
          row: []
        }
      },
      lost: {
        isloaded: false,
        showDiscription: false,
        InAmount: 0.0,
        OutAmount: 0.0,
        SlotLostAmount: 0.0,
        LostAmount: 0.0,
        Rate: 0,
        AcceptMoney: 0.0,
        AcceptCheck: false,
        AcceptCode: 0,
        minBalance: 5.0,
        minLostAmount: 200.0,
        TodayAccept: 0.0,
        showText: "",
        errText: ""
      }
    };
  },
  watch: {},
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ]),
    goLink(canGo, url) {
      // debugger
      if (canGo) {
        this.$router.push(url);
      }
    },
    //获取认证状态
    CheckAuthBonus() {
      if (!this.auth.isloaded) this.$loading.open();
      api[apiNames.CheckAuthBonus]()
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            if (data.row.length > 0) {
              let arr = JSON.parse(data.row);
              arr.forEach(item => {
                if (item.SecType == "1") {
                  //安全密码
                  this.auth.safepwd = true;
                } else if (item.SecType == "4") {
                  // else if(item.SecType == "3"){//邮箱验证

                  // }
                  //手机验证
                  this.auth.mobile = true;
                } else if (item.SecType == "5") {
                  //银行卡验证
                  this.auth.card = true;
                } else if (item.AmountStatus == "True") {
                  //存款达200元
                  this.auth.amount = true;
                } else if (item.ReceiveStatus == "False") {
                  //是否已领取
                  this.auth.receive = true;
                }
              });
              this.auth.isloaded = true;
            } else {
              this.sysErrCheck(-9);
            }
          } else {
            this.$loading.close();
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    // 获取洗码
    BetBonus_GetList() {
      if (!this.betBonus.isloaded) this.$loading.open();
      api[apiNames.BetBonus_GetList]()
        .then(rep => {
          let data = rep.data;
          if (data.Status === 1) {
            // debugger;
            this.betBonus.BonusList = data.row.BonusList;
            this.betBonus.Promo = data.row.Promo;
            this.CashLimit_GetLimitList();
          } else {
            this.$loading.close();
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                if (data.Status == 1310) {
                  this.betBonus.isEmpty = true;
                } else {
                  this.alert({ mes: data.CNMessage });
                }
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    //获取流水限额明细
    CashLimit_GetLimitList() {
      api[apiNames.CashLimit_GetLimitList]({ LimitType: 1 })
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.betBonus.LimitList = data.row.Rows;
            this.betBonus.isloaded = true;
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    //取消流水限额
    CashLimit_CancelLimit() {
      this.$loading.open();
      api[apiNames.CashLimit_CancelLimit]({ LimitType: 1 })
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.confirm({
              title: "操作成功",
              mes: "您自助取消限额成功",
              icon: "success",
              opts: [{ txt: "确定", color: true }]
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                switch (data.Status) {
                  case -11:
                    this.alert({ mes: "获取平台余额失败" });
                    break;
                  case 1308:
                    this.alert({ mes: "您未达到取消条件" });
                    break;
                  default:
                    this.alert({ mes: data.CNMessage });
                }
              }
            });
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    ApplyAuthenticationBonus() {
      this.$loading.open();
      api[apiNames.ApplyAuthenticationBonus]()
        .then(rep => {
          let data = rep.data;
          this.$loading.close();
          if (data.Status === 1) {
            this.getBalance();
            this.confirm({
              title: "操作成功",
              mes: "您已成功领取" + data.row + "元的认证红利",
              icon: "success",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {
                    // debugger;
                    this.auth.isloaded = false;
                    this.CheckAuthBonus();
                  }
                }
              ]
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    //领取洗码
    BetBonus_BetsPromo() {
      this.$loading.open();
      api[apiNames.BetBonus_BetsPromo]({})
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.getBalance();
            this.confirm({
              title: "操作成功",
              mes: "您成功领取洗码" + data.row + "元",
              icon: "success",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {
                    // debugger;
                    this.betBonus.isloaded = false;
                    this.BetBonus_GetList();
                  }
                }
              ]
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.noticeMessage(data, 1);
              }
              this.betBonus.isloaded = false;
              this.BetBonus_GetList();
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    //领取洗码电游
    BetBonus_BetsPromoSlot() {
      this.$loading.open();
      api[apiNames.BetBonus_BetsPromoSlot]({})
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.getBalance();
            this.confirm({
              title: "操作成功",
              mes: "您成功领取积分" + data.row + "元",
              icon: "success",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {
                    // debugger;
                    this.betBonus.isloaded = false;
                    this.BetBonus_GetList();
                  }
                }
              ]
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.noticeMessage(data, 2);
              }
              this.betBonus.isloaded = false;
              this.BetBonus_GetList();
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    noticeMessage(data, type) {
      let message1, message2;
      switch (data.Status) {
        case 1302:
          message1 = "自助洗码已经暂停使用";
          message2 = "自助洗码已经暂停使用";
          break;
        case 1306:
          message1 = "您未达到洗码限额";
          message2 = "您未达到积分限额";
          break;
        case 1310:
          message1 = message2 = data.CNMessage;
          break;
        case 1601:
          message1 = "洗码时间已改变,需重新获取";
          message2 = "积分时间已改变,需重新获取";
          break;
        case 1601:
          message1 = "洗码时间已改变,需重新获取";
          message2 = "积分时间已改变,需重新获取";
          break;
        default:
          message1 = message2 = "系统异常";
          break;
      }
      if (type == 1) {
        this.alert({ mes: message1 });
      } else {
        this.alert({ mes: message2 });
      }
    },
    //设置周勤数据
    setWeekData(data) {
      let weekbase = [
        { name: "周一", weekday: 1, bet: "0.00", isfinish: false },
        { name: "周二", weekday: 2, bet: "0.00", isfinish: false },
        { name: "周三", weekday: 3, bet: "0.00", isfinish: false },
        { name: "周四", weekday: 4, bet: "0.00", isfinish: false },
        { name: "周五", weekday: 5, bet: "0.00", isfinish: false },
        { name: "周六", weekday: 6, bet: "0.00", isfinish: false },
        { name: "周日", weekday: 7, bet: "0.00", isfinish: false }
      ];
      //本周数据
      this.week.thisWeek.FinishCount = data.row.ThisWeek.FinishCount;
      this.week.thisWeek.TotalBet = data.row.ThisWeek.TotalBet.toFixed(2);
      this.week.thisWeek.actMoney = data.row.ThisWeek.actMoney.toFixed(2);
      this.week.thisWeek.CheckCode = data.row.ThisWeek.CheckCode;

      //上周数据
      this.week.lastWeek.FinishCount = data.row.LastWeek.FinishCount;
      this.week.lastWeek.TotalBet = data.row.LastWeek.TotalBet.toFixed(2);
      this.week.lastWeek.actMoney = data.row.LastWeek.actMoney.toFixed(2);
      this.week.lastWeek.CheckCode = data.row.LastWeek.CheckCode;

      let thisWeekRow = [];
      let lastWeekRow = [];
      //周数据
      weekbase.forEach(item => {
        let trow = Object.assign({}, item);
        let lrow = Object.assign({}, item);
        // debugger
        data.row.ThisWeek.Rows &&
          data.row.ThisWeek.Rows.forEach(titme => {
            if (titme.weekday === item.weekday) {
              trow.bet = titme.bet.toFixed(2);
              trow.isfinish = titme.isfinish;
            }
            // console.log(1);
          });

        data.row.LastWeek.Rows &&
          data.row.LastWeek.Rows.forEach(titme => {
            if (titme.weekday === item.weekday) {
              lrow.bet = titme.bet.toFixed(2);
              lrow.isfinish = titme.isfinish;
            }
          });

        thisWeekRow.push(trow);
        lastWeekRow.push(lrow);
      });

      this.week.thisWeek.row = thisWeekRow;
      this.week.lastWeek.row = lastWeekRow;

      //处理时间
      //周一不领取
      let time = moment(data.serverTime);
      // debugger;
      //   let
      // time = moment("2017-12-3 15:00:00");
      let week = time.day();
      this.week.weekday = week;
      // debugger
      if (week === 1) {
        this.week.timeTip = "距离领奖开始日期还剩";
        this.week.endTimes = time
          .add(1, "days")
          .hour(13)
          .minutes(59)
          .seconds(59)
          .format("YYYY/MM/DD HH:mm:ss");
        this.week.timeRule = false;
        console.log(this.week.endTimes);
      } else if (week === 2) {
        let diff = time.clone();
        let isBefore = diff
          .hours(13)
          .minutes(59)
          .seconds(59)
          .isAfter(time);
        if (isBefore) {
          this.week.timeTip = "距离领奖开始日期还剩";
          this.week.endTimes = diff.format("YYYY/MM/DD HH:mm:ss");
          this.week.timeRule = false;
        } else {
          this.week.timeTip = "距离领奖结束日期还有";
          this.week.endTimes = time
            .add(7 - week, "days")
            .hour(23)
            .minutes(59)
            .seconds(59)
            .format("YYYY/MM/DD HH:mm:ss");
          this.week.timeRule = true;
        }
      } else if(week === 0){
        this.week.timeTip = "距离领奖结束日期还有";
        this.week.endTimes = time
          .hour(23)
          .minutes(59)
          .seconds(59)
          .format("YYYY/MM/DD HH:mm:ss");
        this.week.timeRule = true;
      } else {
        this.week.timeTip = "距离领奖结束日期还有";
        this.week.endTimes = time
          .add(7 - week, "days")
          .hour(23)
          .minutes(59)
          .seconds(59)
          .format("YYYY/MM/DD HH:mm:ss");
        this.week.timeRule = true;
      }
    },
    //获取周勤好礼
    GetWeekFullPromo() {
      if (!this.week.isloaded) {
        this.$loading.open();
        api[apiNames.GetWeekFullPromo]({})
          .then(rep => {
            this.$loading.close();
            let data = rep.data;
            //data = {"Status":1,"row":{"ThisWeek":{"FinishCount":1,"TotalBet":1854.380000,"actMoney":0.0,"Rows":[{"weekday":1,"bet":1854.380000,"isfinish":true}],"CheckCode":0},"LastWeek":{"FinishCount":6,"TotalBet":141850.600000,"actMoney":168.0,"Rows":[{"weekday":1,"bet":21988.320000,"isfinish":true},{"weekday":2,"bet":19728.670000,"isfinish":true},{"weekday":3,"bet":11953.010000,"isfinish":true},{"weekday":4,"bet":59087.500000,"isfinish":true},{"weekday":5,"bet":3571.600000,"isfinish":true},{"weekday":7,"bet":25521.500000,"isfinish":true}],"CheckCode":-2}},"serverTime":"2017-11-28T06:10:03.0985953Z"}
            if (data.Status === 1) {
              this.setWeekData(data);
              this.week.isloaded = true;
            } else {
              this.sysErrCheck(data.Status).then(canrun => {
                if (canrun) {
                  this.alert({ mes: data.CNMessage });
                }
              });
            }
          })
          .catch(err => {
            this.$loading.close();
            // this.sysErrCheck(-9);
            console.log(err);
          });
      }
    },
    //领取周勤好礼
    AcceptWeekFullPromo() {
      this.$loading.open();
      api[apiNames.AcceptWeekFullPromo]({})
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.getBalance();
            this.alert({ mes: "领取成功" });
            this.week.isloaded = false;
            this.GetWeekFullPromo();
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$loading.close();
          // this.sysErrCheck(-9);
        });
    },

    //获取复活礼金
    CashLimit_LoseBackPromo() {
      if (!this.lost.isloaded) {
        this.$loading.open();
        api[apiNames.CashLimit_LoseBackPromo]({})
          .then(rep => {
            // debugger;
            let data = rep.data;
            // data.Status = 1309
            // debugger;
            if (data.Status === 1) {
              this.lost.InAmount = data.row.InAmount;
              this.lost.OutAmount = data.row.OutAmount;
              this.lost.SlotLostAmount = data.row.SlotLostAmount;
              this.lost.LostAmount = data.row.LostAmount;
              this.lost.Rate = data.row.Rate;
              this.lost.AcceptMoney = data.row.AcceptMoney;
              this.lost.AcceptCheck = data.row.AcceptCheck;
              this.lost.AcceptCode = data.row.AcceptCode;
              this.lost.minBalance = data.row.minBalance;
              this.lost.minLostAmount = data.row.minLostAmount;
              this.lost.TodayAccept = data.row.TodayAccept;
              if (this.lost.AcceptCode == -1) {
                this.lost.showText = "您的账户负盈利小于200元";
              } else if (this.lost.AcceptCode == -2) {
                this.lost.showText = "您的账户总余额大于5元";
              } else if (this.lost.AcceptCode == -3) {
                this.lost.showText = "存款未在指定电游平台游戏";
              }

              this.lost.isloaded = true;
            } else if (data.Status === -10) {
              let dataArray = JSON.parse(data.Message);
              this.lost.errText =
                dataArray.platform + "游戏厅维护中，暂时无法领取。请留意网站公告，谢谢！";
            } else if (data.Status === 1309) {
              console.log(data.CNMessage);
              this.lost.errText = data.CNMessage;
            } else {
              this.sysErrCheck(data.Status).then(canrun => {
                if (canrun) {
                  this.alert({ mes: data.CNMessage });
                }
              });
            }
            this.$loading.close();
          })
          .catch(err => {
            this.sysErrCheck(-9);
          });
      }
    },
    //领取复活礼金
    CashLimit_AcceptLoseBack() {
      this.$loading.open();
      api[apiNames.CashLimit_AcceptLoseBack]({})
        .then(rep => {
          let data = rep.data;
          this.$loading.close();
          if (data.Status === 1) {
            this.getBalance();
            this.confirm({
              title: "领取复活礼金",
              mes: "操作成功,您已领取成功" + data.row + "元的复活礼金",
              icon: "sucess",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {
                    this.lost.isloaded = false;
                    this.CashLimit_LoseBackPromo();
                  }
                }
              ]
            });
          } else if (data.Status === 1306) {
            this.confirm({
              title: "领取复活礼金",
              mes: "操作失败,您未达到领取条件",
              icon: "warn",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {}
                }
              ]
            });
          } else if (data.Status === -10) {
            this.confirm({
              title: "领取复活礼金",
              mes:
                "操作失败," + data.message.platform + "游戏厅维护中，暂时无法领取。请留意网站公告，谢谢！",
              icon: "warn",
              opts: [
                {
                  txt: "确定",
                  color: true,
                  callback: () => {}
                }
              ]
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    //tab切换
    tabChange(label, key) {
      this.tabkey = key;
    },
    //下拉重新刷新
    reload() {
      if (this.tabkey === "1") {
        this.auth.isloaded = false;
        this.CheckAuthBonus();
        this.$refs.pullrefreshDemo.$emit("tf.pullrefresh.finishLoad");
      } else if (this.tabkey === "2") {
        this.betBonus.isloaded = false;
        this.BetBonus_GetList();
        this.$refs.pullrefreshDemo.$emit("tf.pullrefresh.finishLoad");
      } else if (this.tabkey === "3") {
        this.week.isloaded = false;
        this.GetWeekFullPromo();
        this.$refs.pullrefreshDemo.$emit("tf.pullrefresh.finishLoad");
      } else if (this.tabkey === "4") {
        this.lost.isloaded = false;
        this.CashLimit_LoseBackPromo();
        this.$refs.pullrefreshDemo.$emit("tf.pullrefresh.finishLoad");
      }
    },
    formatDate(time, format) {
      if (time) {
        return moment(time).format(format);
      } else {
        return "";
      }
    }
  },
  created() {
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
  },
  mounted() {
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "自助优惠",
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
    next();
  },
  computed: {
    betTotal() {
      //投注洗码
      return this.betBonus.BonusList.filter(item => {
        return !item.isSlot && item.GameTypeName === "Total";
      });
    },
    betList() {
      //投注洗码明细
      return this.betBonus.BonusList.filter(item => {
        return !item.isSlot && item.GameTypeName !== "Total";
      });
    },
    egameTotal() {
      //电游积分
      return this.betBonus.BonusList.filter(item => {
        return item.isSlot && item.GameTypeName === "Total";
      });
    },
    egameList() {
      //电游积分明细
      return this.betBonus.BonusList.filter(item => {
        return item.isSlot && item.GameTypeName !== "Total";
      });
    },
    //是否禁用按钮
    disableWeekBtn() {
      //为领取时间
      //状态为0可领取
      // console.log( this.week.lastWeek.CheckCode,this.week.timeRule && this.week.lastWeek.CheckCode== 0)
      return !(this.week.timeRule && this.week.lastWeek.CheckCode == 0);
      //当天为周一或者状态不等于0 禁用按钮
      //   !(week.timeRule && this.week.lastWeek.CheckCode == 0 )
      //   return !this.week.timeRule && this.week.lastWeek.CheckCode !== 0;
    },
    weekBtnText() {
      // debugger
      let txt = "领取周勤礼金";
      switch (this.week.lastWeek.CheckCode) {
        case 0:
          break;
        case -1:
          txt = "未到领取时间";
          break;
        case -2:
          txt = "已领取首存优惠";
          break;
        case -3:
          txt = "已领过周勤";
          break;
        case -4:
          txt = "未达到领取条件";
          break;
      }
      return txt;
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
@gray: #999;
.container {
  .commstyle() {
    // display: inline-block;
    // width: 100%;
    // text-align: center;
    // padding-bottom: .02rem;
    display: inline-block;
  }
  .auth-list {
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }
  .auth-icon {
    .commstyle();
    color: #fff;
    height: 0.88rem;
    width: 0.88rem;
    border-radius: 36%;
    margin-top: 0.08rem;
    box-shadow: 0 0.02rem 0.1rem rgba(0, 0, 0, 0.12);
  }
  .auth-name {
    .commstyle();
    padding: 0.1rem 0rem 0.2rem 0rem;
    white-space: nowrap;
    font-size: 0.22rem;
    color: #666;
  }
  .auth-complate {
    .commstyle();
    width: auto;
    height: 0.32rem;
    line-height: 0.34rem;
    width: 1rem;
    font-size: 0.22rem;
    color: #fff; //
    border-radius: 0.32rem;
    background-color: #07f794;
    margin-bottom: 0.08rem;
  }
  .auth-list {
    width: 100%;
    .auth-unfinish {
      opacity: 0.4;
      .auth-complate {
        background-color: #ccc;
      }
      .auth-name {
        color: #808080;
      }
    }
    .size4rem {
      font-size: 0.28rem;
      font-weight: 500;
      &.redclr {
        color: #ff3a2b;
      }
    }
    .grayColor {
      font-size: 0.22rem;
      color: #bbb;
    }
  }

  .red-span {
    display: inline-block;
    background-color: #ff3a2b;
    color: #fff;
    height: 0.32rem;
    font-size: 0.22rem;
    line-height: 0.34rem;
    position: relative;
    top: -1px;
    margin-left: 5px;
    padding: 0 0.1rem;
    border-radius: 0.2rem;
  }
  .yellow-span {
    display: inline-block;
    background-color: #ffbb00;
    color: #fff;
    height: 0.36rem;
    font-size: 0.22rem;
    line-height: 0.38rem;
    padding: 0 0.1rem;
    border-radius: 0.36rem;
    position: relative;
    margin-left: 2px;
    top: -1px;
  }
  .right-detail {
    padding-right: 0.2rem;
    float: right;
    font-size: 0.24rem;
    line-height: 1rem;
  }
  .title-tip {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    .title-div1 {
      font-size: 0.24rem;
      color: #999;
      i {
        position: relative;
        color: #f01924;
        top: 1px;
        left: 5px;
      }
    }
    .title-div2 {
      color: #bbb;
      font-size: 0.24rem;
      span {
        position: relative;
        top: 1px;
      }
      em {
        position: relative;
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
  .balance-show {
    font-size: 0.32rem;
    font-weight: 600;
  }
  .p24rem {
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    font-size: 0.22rem;
    color: #f00;
    opacity: 0.5;
  }
  .btnOk {
    height: 0.8rem;
    width: 96%;
    margin-left: 2%;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .weekhard {
    /*border-bottom: solid 1px #f0f0f0;*/
    .title {
      line-height: 1rem;
      font-size: 0.24rem;
      color: #444;
      border-bottom: solid 1px #f0f0f0;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      span {
        font-weight: 600;
        font-size: 0.26rem;
      }
    }
    .weeknumber {
      height: 1rem;
      margin: 0 0.24rem;
      line-height: 1rem;
    }
    .states {
      height: 0.4rem;
      line-height: 0.42rem;
      padding: 0 0.12rem;
      margin: 0 0.22rem;
      font-size: 0.22rem;
      border-radius: 0.4rem;
    }
    .uncomplate {
      background-color: #dcdcdc;
      color: #fff;
    }
    .complate {
      background-color: #3bcd94;
      color: #fff;
    }
    .after-line {
      position: relative;
      font-size: 0.24rem;
      color: #444;
      &:nth-of-type(odd) {
        background: #f8f8f8;
      }
    }
    /*.after-line:after {
            content: ' ';
            display: block;
            position: absolute;
            bottom: 0;
            width: 96%;
            height: 1px;
            margin-left: 2%;
            background-color: #dcdcdc;
        }*/
  }

  .week-rule {
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
    td,
    th {
      text-align: center;
      font-size: 0.24rem;
    }
    thead {
      th {
        color: #999;
        height: 1rem;
        background-color: #fff;
        border-bottom: solid 1px #f0f0f0;
        box-shadow: 5px 2px 6px rgba(0, 0, 0, 0.03);
        box-sizing: content-box;
      }
    }
    tbody {
      tr {
        &:nth-of-type(even) {
          background: #f8f8f8;
        }
        td {
          height: 1rem;
          color: #444;
          b {
            color: #f01924;
          }
        }
      }
    }
  }

  .app-preXEbutn {
    position: fixed;
    z-index: 8;
    left: 0;
    bottom: 0;
    height: ;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.1);
  }
  .app-preXEbutn-1 {
    .item-wrap {
      background: #fff;
      .group-title {
        .right-detail {
          font-size: 0.22rem;
          color: #bbb;
          .blueColor {
            color: #699deb;
            font-size: 0.24rem;
          }
        }
      }
      &:last-child .split-gray {
        display: none;
      }
    }
  }
  .app-preXEbutn-2 {
    .componets-notice-wrap {
      background: none;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.22rem;
      color: #bbb;
    }
    .btnOk {
      margin-top: 0rem;
    }
  }
  .app-preXEbutn-3 {
    .item-wrap {
      .group-title {
      }
      &:last-child .split-gray {
        display: none;
      }
    }
  }
}
</style>
