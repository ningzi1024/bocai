<!--
* 提款
-->
<template>
    <div class="container">
        <div class="process" v-if="!isInprocess">
            <!-- <tf-notice title="温馨提示：" content="每天提款次数不限，当天提款次数超过三次的按单笔30元收取手续费 (当天北京时间 00:00:00 - 23:59:59) 敬请谅解！"></tf-notice> -->
            <!-- <tf-flexbox class="title-tip">
                <tf-flexbox-item>
                    提款所需的流水限制
                    <a class="blueColor" @click="showDetail=true" style="padding-left:.2rem">[查看明细]</a>
                </tf-flexbox-item>
            </tf-flexbox>
            <tf-flexbox class="title-tip">
                <tf-flexbox-item>
                    <span class="balance-show redColor">{{limit.Promo || '0.00'}}</span>元
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="showLimit=true" class="blueColor" style="text-align: right;">
                    <tf-icon name="question" size="0.3rem"></tf-icon>什么是流水限制
                </tf-flexbox-item>
            </tf-flexbox> -->
            <div class="AppDraw-XeMoney boxshadow">
                <tf-flexbox-item class="fl" @click.native="showLimit=true">
                    提款所需的流水限制<tf-icon name="question" size="0.3rem"></tf-icon>
                </tf-flexbox-item>
                <tf-flexbox-item class="fr">
                    <a @click="showDetail=true">
                        <span class="balance-show redColor">{{limit.Promo || '0.00'}}</span>元
                        <tf-icon name="jiantou" size="0.36rem"></tf-icon>
                    </a>
                </tf-flexbox-item>
                <!-- <div class="adapt" style="line-height: .32rem;"></div> -->
            </div>
            <!-- <tf-notice content="温馨提示：每天提款次数不限，当天提款次数超过三次的按单笔30元收取手续费 (当天北京时间 00:00:00 - 23:59:59) 敬请谅解！"></tf-notice> -->
            <div v-if="order.CreateTime !== ''" class="history-withdraw boxshadow">
                <div class="title-item">
                    <label> 历史提款申请</label>
                </div>
                <tf-flexbox class="history-withdraw-table">
                    <div>
                        <span class="table-content">{{order.CreateTime}}</span>
                        <span class="table-title">上一次申请时间</span>
                    </div>
                    <tf-flexbox-item>
                        <span class="table-content redColor">￥{{order.Amount}}</span>
                        <span class="table-title">申请提款金额</span>

                    </tf-flexbox-item>
                    <tf-flexbox-item>
                        <span class="table-content redColor">{{StateShow}}</span>
                        <span class="table-title">处理状态</span>
                    </tf-flexbox-item>
                </tf-flexbox>
                <div class="discription">
                    
                    如果对处理结果有疑问，请联系
                    <a @click="onlineService" class="blueColor">在线客服</a>
                </div>
            </div>

            <div class="boxshadow">
                <div class="title-item">
                    <label> 提款申请</label>
                </div>
                <tf-cell-group>
                    <tf-cell-item arrow @click.native="showBankList=true">
                        <span class="left" slot="left">
                            到账账户
                        </span>
                        <span class="right" slot="right">
                            <span v-if="BankComm.BankName!='' && BankComm.CanUse">
                                <tf-symbol :name="bankIcon" size=".48rem" class="fl" style="margin-right:.15rem;margin-top:.1rem;"></tf-symbol>
                                <p style="font-size: .24rem;color: #bbb;">{{BankComm.BankName}}<br/>
                                <b style="color:#666;font-weight:500;">{{BankComm.CardID}}</b>
                                </p>
                            </span>
                            <span v-else class="blueColor" style="font-size: .24rem;">
                                请选择到账账户
                            </span>
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left" slot="left">
                            提款金额
                        </span>
                        <span class="right" slot="right">
                            <tf-input :required="true" max="6" regex="^[1-9]\d{2,6}$" slot="right" ref="Amount" v-model="Amount" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入提款金额，最低金额为100元"></tf-input>
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left" slot="left">
                            安全密码
                        </span>
                        <tf-input :required="true" max="20" slot="right" ref="safePwd" v-model="safePwd" type="password" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入安全密码"></tf-input>
                    </tf-cell-item>
                    <p class="withdraw-tishi01"><b>提示：</b>每天提款次数不限，当天提款次数超过三次的按单笔30元收取手续费 (当天北京时间 00:00:00 - 23:59:59) 敬请谅解！</p>
                </tf-cell-group>
            </div>
            <tf-button size="large" @click.native="commitWithdraw" class="btnOk" type="primary">申请提款</tf-button>
        </div>
        <div v-if="isInprocess">


            <dl class="AppDraw-OK boxshadow">
                <dt><span class="ok-icon"><i class="icon tb icon-gou1"></i></span></dt>
                <dd><b>提款申请已提交</b></dd>
                <dd>我们核实完成后将为您汇款！</dd>
            </dl>
            <!-- <div class="inprocess-success">
                <tf-icon name="success" size="1.6rem" color="#3ccd94"></tf-icon>
                <p style="font-weight:600;font-size:0.32rem;padding-bottom:.1rem;">提款申请已提交</p>
                <p>我们核实完成后将为您汇款</p>
            </div> -->
            <div v-if="order.CreateTime !== ''" class="history-withdraw boxshadow">
                <div class="title-item">
                    <label> 提款申请明细</label>
                </div>
                <tf-flexbox class="history-withdraw-table">
                    <div>
                        <span class="table-content">{{order.CreateTime}}</span>
                        <span class="table-title">上一次申请时间</span>
                    </div>
                    <tf-flexbox-item>
                        <span class="table-content">￥<b>{{order.Amount}}</b></span>
                        <span class="table-title">申请提款金额</span>
                    </tf-flexbox-item>
                    <tf-flexbox-item>
                        <span class="table-content">{{StateShow}}</span>
                        <span class="table-title">处理状态</span>
                    </tf-flexbox-item>
                </tf-flexbox>
            </div>
            <tf-button size="large" @click.native="goMmberCenter" class="btnOk" color="#699deb" type="hollow">返回个人中心首页</tf-button>
        </div>
        <!-- 查看明细 -->
        <tf-popup v-model="showDetail" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="流水限额明细">
                    <a @click="showDetail=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div v-if="LimitList.length>0" class="info-content">
                    <div class="list-item" v-for="item in LimitList" :key="item.ID">
                        <div class="title-item clearfix">
                            <label> {{item.LogTypeName}}</label>
                            <span class="pull-right">创建时间：
                                <span class="blueColor">{{formatDate(item.CreateTime,"MM/DD HH:mm")}}</span>
                            </span>
                        </div>
                        <tf-flexbox>
                            <div>
                                <span class="table-content">{{item.Amount.toFixed(2)}}</span>
                                <span class="table-title">金额</span>
                            </div>
                            <tf-flexbox-item>
                                <span class="table-content redColor">{{item.Rate}}</span>
                                <span class="table-title">倍数</span>

                            </tf-flexbox-item>
                            <tf-flexbox-item>
                                <span class="table-content redColor">{{item.NeedBets}}</span>
                                <span class="table-title">流水限额</span>
                            </tf-flexbox-item>
                        </tf-flexbox>
                    </div>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 查看明细 end-->
        <!-- 流水限额说明 -->
        <tf-popup v-model="showLimit" :useLock="false" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="流水限额说明">
                    <a @click="showLimit=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="info-content">
                    <ul class="end-discription">
                        <li class="title">什么是提款限额？</li>
                        <li>会员在正常存款或者参与某些优惠活动时，其提款要求的游戏有效投注金额为提款限额。</li>
                        <li class="title">提款限额的计算方式</li>
                        <li>1.用户正常存款情况下，只要达到1倍流水即可申请提款。</li>
                        <li>2.当用户参与优惠活动时（如：首存优惠），需满足该优惠活动所要求的流水才能提款（如：首存提款要求达到本金加返利的18倍流水）</li>
                        <li class="title">示例</li>
                        <li>会员A首存100,首存优惠返送58，按照活动规则，参与该活动的用户需达到存款加红利后的18倍流水才能提款，即：(100+58)*18=2844元！</li>
                        <li>那么，该会员的总流水在未达到2844元的情况下，提款是无法审核通过的。</li>
                    </ul>
                </div>
            </tf-layout>
        </tf-popup>
        <!-- 流水限额说明 end-->
        <!-- 选择银行 -->
        <tf-popup v-model="showBankList" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="请选择银行">
                    <a @click="showBankList=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="card-wrap">
                    <tf-flexbox @click.native="bankSelect(item)" :class="{'card-item':true, 'selected':item.BankName === BankComm.BankName && item.CanUse && item.IsTive, 'disabled':!item.CanUse || !item.IsTive}" v-for="item in bankList" v-bind:key="item.CardID">
                        <div class="line-left"></div>
                        <div class="line-right"></div>
                        <div class="mask" v-if="!item.IsTive">
                            <span class="redColor fontW600 size3rem">银行卡无效</span>
                            <span class="grayColor">改卡经核实信息有误无法汇款</span>
                            <router-link class="blueColor" tag="span" to="/bankInfo">请修改卡信息</router-link>
                        </div>
                        <div class="mask" v-else>
                            <span class="redColor fontW600 size3rem">银行维护</span>
                            <span class="grayColor">暂不支持此银行卡申请提款</span>
                        </div>
                        <tf-symbol :name="getBankIcon(item.BankName)" size="0.8rem" style="margin-right:.2rem"></tf-symbol>
                        <tf-flexbox-item class="card-center">
                            <span class="inline-block fontW600 size3rem pbdot1rem">{{item.BankName}}</span>
                            <span class="inline-block grayColor pbdot1rem">{{item.Loc1+'-'+item.Loc2+' '+item.Loc3}}</span>
                            <span class="inline-block pbdot1rem">{{item.CardID}}</span>
                        </tf-flexbox-item>
                        <span>{{item.TrueName}}</span>
                    </tf-flexbox>
                </div>
            </tf-layout>
        </tf-popup>
    </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex"
import notice from "./../../components/notice"
import { FlexBox, FlexBoxItem } from '@/tf-ui/components/flexbox';
import symbolIcon from "@/components/custom-icon/icon-symbol"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import moment from "moment"
import { bankName2Icon } from "@/common/banklist"
export default {
    components: {
        [notice.name]: notice,
        [FlexBox.name]: FlexBox,
        [FlexBoxItem.name]: FlexBoxItem,
        [symbolIcon.name]: symbolIcon,
    },
    data() {
        return {
            showDetail: false,
            showLimit: false,
            showBankList: false,
            isInprocess: false,
            isGetLimitList: false,
            LimitList: [],
            Balance: "0.00",
            Amount: "",
            safePwd: "",
            order: {
                Amount: "",
                CreateTime: "",
                State: ""
            },
            WithdrawalCount: {
                Fees: "",
                TranCount: "",
                WithdrawCount: "",
            },
            BankComm: {
                BankName: "",
                CardID: "",
                Loc1: "",
                Loc2: "",
                Loc3: "",
                MemberID: "",
                TrueName: "",
                CanUse: true,
                MemberID: "",
                Index:""

            },
            limit: {
                Promo: "",
                Withdrawal: ""
            },
            bankList: []

        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"]),
        //提交取款申请
        commitWithdraw() {

            // "n7":"100","n8":"1236456","Amount":"100","SecPassword":"1236456"

            if (this.canWithdraw()) {
                debugger;
                this.$loading.open();
                api[apiNames.RequestWithdrawalCommand]({
                    Amount: this.Amount,
                    SecPassword: this.safePwd,
                    n7: this.Amount,
                    n8: this.safePwd,
                    Index:this.BankComm.Index
                }).then(rep => {
                    this.$loading.close();
                    let data = rep.data;
                    if (data.Status === 1) {
                        // this.isInprocess = true;
                        this.initData();
                    } else {
                        this.sysErrCheck(data.Status).then(rep => {
                            this.alert({ mes: data.CNMessage, })
                        });
                    }
                }).catch(err => {
                    this.$loading.close();
                    this.sysErrCheck(-9)
                });
            }
        },
        canWithdraw() {
            let isCanWithdraw = true;
            // debugger;
            if (!this.$refs.Amount.valid) {
                this.$toast({
                    mes: '请输入正确的提款金额，最低为100元',
                    timeout: 1500,
                    icon: 'error'
                });
                isCanWithdraw = false;
            } else {
                let floatAmmount = parseFloat(this.Amount)
                if (floatAmmount < 100) {
                    this.$toast({
                        mes: '请输入正确的提款金额，最低为100元',
                        timeout: 1500,
                        icon: 'error'
                    });
                    isCanWithdraw = false;
                }

                // if(floatAmmount<)
            }
            if (!this.$refs.safePwd.valid) {
                this.$toast({
                    mes: '请输入安全密码',
                    timeout: 1500,
                    icon: 'error'
                });
                isCanWithdraw = false;
            }
            if(!this.BankComm.CardID){
                this.$toast({
                    mes: '请选择到账账户',
                    timeout: 1500,
                    icon: 'error'
                });
                isCanWithdraw = false;
            }
            return isCanWithdraw;
        },
        //获取账户可用余额
        GetUserWithdrawalCount() {
            return api[apiNames.GetUserWithdrawalCount]();
        },
        //获取主账户余额
        UserBalance() {
            return api[apiNames.UserBalance]();
        },
        //获取历史提款记录
        WithdrawalUnfinishOrder() {
            return api[apiNames.WithdrawalUnfinishOrder]();
        },
        //获取银行卡信息
        GetMemberBankCommand() {
            return api[apiNames.GetMemberBankCommand]();
        },
        //获取取款流水限制
        CashLimit_GetBonusLimit() {
            return api[apiNames.CashLimit_GetBonusLimit]({ LimitType: 2 });
        },
        //获取限额明细
        CashLimit_GetLimitList() {
            // LimitType
            if (!this.isGetLimitList) {
                this.$loading.open();
                api[apiNames.CashLimit_GetLimitList]().then(rep => {

                    this.$loading.close();
                    let data = rep.data;
                    if (data.Status === 1) {
                        this.isGetLimitList = true;
                        this.LimitList = data.row.Rows;
                    } else {
                        this.sysErrCheck(data.Status).then(rep => {
                            this.alert({ mes: data.CNMessage, })
                        });;
                    }
                }).catch(err => {
                    this.$loading.close();
                    this.sysErrCheck(-9);
                });
            }
        },
        //初始化数据
        initData() {
            //获取主账户余额 UserBalance ##
            //获取账户可用余额 GetUserWithdrawalCount 213设置安全密码##
            //获取历史提款记录 WithdrawalUnfinishOrder###
            //获取银行卡信息 GetMemberBankCommand##
            //获取取款流水限制 CashLimit_GetBonusLimit##
            this.$loading.open();
            api[apiNames.SleVerification]({}).then(rep => {
                let data = rep.data;
                let isBindBank = false;

                if (data.Status === 1) {
                    let obj;
                    if (data.row) obj = JSON.parse(data.row);

                    obj.forEach(item => {
                        if (item.SecType == "5") isBindBank = true;
                    })

                    if (isBindBank) {
                        this.WithdrawalUnfinishOrder().then(rep => {
                            //判断是否在审核中
                            // debugger;
                            let data = rep.data;
                            if (data.Status === 1) {
                                if (!data.row) return this.GetUserWithdrawalCount()
                                this.order.Amount = data.row.Amount.toFixed(2)
                                this.order.CreateTime = moment(data.row.CreateTime).format("MM-DD HH:mm")
                                this.order.State = data.row.State
                                if (data.row.State === 0 || data.row.State === 1) {
                                    //在审核中，或在汇款中
                                    this.isInprocess = true;
                                } else {
                                    // 不在审核中
                                    return this.GetUserWithdrawalCount()
                                }
                            } else {
                                this.$loading.close();
                                this.sysErrCheck(data.Status);
                            }

                        }).catch(err => {
                            console.log("1", err)
                            this.$loading.close();
                            this.sysErrCheck(-9);
                        }).then(rep => {
                            if (rep && rep.data) {
                                let data = rep.data;
                                if (data.Status === 1) {

                                    this.WithdrawalCount.Fees = data.row.Fees;
                                    this.WithdrawalCount.TranCount = data.row.TranCount;
                                    this.WithdrawalCount.WithdrawCount = data.row.WithdrawCount;
                                    return Promise.all([
                                        // this.UserBalance(),
                                        this.GetMemberBankCommand(),
                                        this.CashLimit_GetBonusLimit()
                                    ]);
                                } else {
                                    this.$loading.close();
                                    this.sysErrCheck(data.Status).then(s => {
                                        if (data.Status === 213) {
                                            this.confirm({
                                                title: "未设置安全密码",
                                                mes: '请先去设置安全密码再进行操作',
                                                icon: "warn",
                                                opts: [
                                                    {
                                                        txt: "知道了",
                                                        color: false,
                                                        callback: () => {
                                                            // this.goHome();
                                                            this.$router.replace({ name: "memberCenter" });
                                                        }
                                                    },
                                                    {
                                                        txt: "前往设置",
                                                        color: true,
                                                        callback: () => {
                                                            this.$router.push("/safetyCenter/safePassCheck");
                                                        }
                                                    }
                                                ]
                                            })
                                        } else {

                                            this.alert({ mes: data.CNMessage, })

                                        }
                                    });
                                }
                            }
                        }).catch(err => {

                            console.log("2", err)
                            this.$loading.close();
                            this.sysErrCheck(-9);
                        }).then(rep => {
                            this.$loading.close();
                            // {repBalance,repBankCommand,repLimit}
                            if (rep && rep.length === 2) {
                                // let repBalance = rep[0].data;
                                    
                                let repBankCommand = rep[0];
                                let repLimit = rep[1].data;
                                // console.log(repBankCommand);
                                if (repBankCommand.data.Status === 1 && repLimit.Status === 1) {
                                    //console.log(repBankCommand);

                                    let currBank = repBankCommand.data.row.find(item=>item.IsDefault == true);
                                    // console.log(repBankCommand.data.row)console.log(repBankCommand.data.row)
                                    // repBankCommand.data.row.forEach(item => {
                                    //     debugger;
                                    //     if (item.IsDefault) {
                                    //         currBank = item;
                                    //         return false;
                                    //     }
                                    // })
                                    this.bankList = repBankCommand.data.row
                                    // this.Balance = repBalance.row;
                                    if (currBank && currBank.CanUse && currBank.IsTive) {
                                        this.BankComm.BankName = currBank.BankName
                                        this.BankComm.CardID = currBank.CardID
                                        this.BankComm.Loc1 = currBank.Loc1
                                        this.BankComm.Loc2 = currBank.Loc2
                                        this.BankComm.Loc3 = currBank.Loc3
                                        this.BankComm.MemberID = currBank.MemberID
                                        this.BankComm.TrueName = currBank.TrueName;
                                        this.BankComm.CanUse = currBank.CanUse;
                                        this.BankComm.Index = currBank.Index
                                    }

                                    this.limit.Promo = repLimit.Promo;
                                    this.limit.Withdrawal = repLimit.Withdrawal;
                                } else {
                                    this.sysErrCheck(-9);
                                }
                            }
                        }).catch(err => {

                            console.log("3", err)
                            this.$loading.close();
                            this.sysErrCheck(-9);
                        });
                    }
                } else {
                    this.$loading.close();
                    this.sysErrCheck(data.Status).then(canrun => {
                        if (!canrun) {
                            isBindBank = true;
                        }
                    });
                }
                if (!isBindBank)
                    this.$confirm({
                        title: '未绑定银行卡',
                        icon: "warn",
                        mes: '请您先绑定银行卡，再进行操作！',
                        opts: [{
                            txt: '知道了',
                            color: false,
                            callback: () => {
                                this.$router.back();
                            }
                        }, {
                            txt: '前往绑定',
                            color: true,
                            callback: () => {
                                this.$router.push("/bankInfo")
                            }
                        }]
                    });
            }).catch(err => {
                this.sysErrCheck(-9);
            })

        },
        formatDate(time, format) {
            if (time) {
                return moment(time).format(format);
            } else {
                return "";
            }
        },
        goMmberCenter() {
            // this.$router.replace({ name: "withdraw" })
            this.$router.replace({ name: "memberCenter" })
        },
        getBankIcon(name) {
            return bankName2Icon[name]
        },
        bankSelect(item) {
            if (item.CanUse && item.IsTive) {
                this.BankComm.BankName = item.BankName
                this.BankComm.CardID = item.CardID
                this.BankComm.Loc1 = item.Loc1
                this.BankComm.Loc2 = item.Loc2
                this.BankComm.Loc3 = item.Loc3
                this.BankComm.MemberID = item.MemberID
                this.BankComm.TrueName = item.TrueName;
                this.BankComm.CanUse = item.CanUse;
                this.BankComm.Index = item.Index;
                this.showBankList = false
            }
        },
        ...mapActions(["getBalance"])
    },
    watch: {
        showDetail: function(value) {
            if (value) {
                this.CashLimit_GetLimitList();
            }
        }
    },
    created() {
        this.initData();
        this.getBalance();
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
            vm.$store.commit('setSiteConfig', { title: "提款", showMenu: false, showBack: true, showNav: false, showChat: false });
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
        next();
    },
    computed: {
        StateShow() {
            switch (this.order.State) {
                case 0:
                    return "审核中"
                    break;
                case 1:
                    return "审核成功,汇款中"
                    break;
                case 2:
                    return "审核失败"
                    break;
                case 3:
                    return "汇款完成"
                    break;
                case 4:
                    return "汇款失败"
                    break;
            }
        },
        bankIcon() {
            return bankName2Icon[this.BankComm.BankName]
        }
    },
    destroyed() {
    }
}
</script>
<style lang="less" scoped>
@gray: #bbb;
.container {
    .left {
        width: 1.65rem;
    }
    .right {
        text-align: left;
        width: 100%;
        display: inline-block;
    }
    .title-tip {
        color: @gray;
        padding-top: .1rem;
        padding-left: .24rem;
        padding-right: .24rem;
        .balance-show {
            font-size: .5rem;
        }
    }
    .inprocess-success {
        text-align: center;
        color: @gray;
        padding: .3rem;
        background-color: #fff;
    }
    .title-item {
        position: relative;
        z-index: 6;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
        box-shadow: 0 2px 6px rgba(0,0,0,.03);
        >label {
            display: inline-block;
            font-size: .26rem;
            margin: .3rem 0;
            color: #666;
            padding-left: .2rem;
            border-left: 4px solid #F01924;
        }
        >.pull-right {
            display: inline-block;
            padding-right: .24rem; // line-height:.34rem;
            padding-top: .34rem;
            font-size: .22rem;
            color: @gray;
        }

    }
    .history-withdraw-table() {

        .m-flexbox{
            padding: .1rem 0 .26rem 0;
        }
        .mixinTable() {
            display: block;
            width: 100%;
            text-align: center;
        }
        .table-title {
            .mixinTable();
            color: @gray;
            padding: .08rem .3rem 0 .3rem;
            font-size: .22rem;
        }
        .table-content {
            .mixinTable();
            line-height: .3rem;
            font-size: .24rem;
            width: 100%;
            color: #333;
            font-weight: 600;
        }
    }
    .history-withdraw {
        margin-top: 0rem;
        background-color: #fff;
        font-size: .24rem;
        margin-bottom: .2rem;

        .history-withdraw-table {

            padding: .32rem 0;
            .history-withdraw-table();
        }
        .discription {
            border-top: 1px solid #f2f2f2;
            color: @gray;
            padding: .2rem .24rem;
            font-size: .22rem;
        }
    }
    .list-item {
        margin-bottom: .2rem;
        padding-top: 0;
        background-color: #fff;
        .table-content {
            color: #333;
            font-weight: 600;
        }
        .title-item {
            margin-bottom: .2rem;
        }
        .history-withdraw-table();
    }
    .btnOk {
        width: 96%;
        height: .88rem;
        border:none;
        box-shadow: 0 2px 12px rgba(0,0,0,.06);
        margin-left: 2%;
        margin-top: .2rem;
    }
    .redColor {
        color: #F11924
    }
    .blueColor {
        color: #699deb;
    }
    .info-content {
        // padding-top: .88rem;
    }
    .card-wrap {
        padding: .24rem;
        box-sizing: border-box;
        .card-item {
            position: relative;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 5px;
            padding: .24rem;
            overflow: hidden;
            align-items: normal!important;
            .card-center {
                .inline-block {
                    width: 100%;
                }
            }
            .line-left,
            .line-right,
            .mask {
                display: none;
            }
            &.selected {
                .line-left {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 5px;
                    background-color: #f01924;
                }
                .line-right {
                    display: block;
                    position: absolute;
                    bottom: -.25rem;
                    right: -.25rem;
                    height: .5rem;
                    width: .5rem;
                    background-color: #f01924;
                    transform: rotate(45deg);
                }
            }
            &.disabled {
                .mask {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding-top: .5rem;
                    background-color: rgba(255, 255, 255, .9);
                    span {
                        display: block;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
            &:not(:first-child) {
                margin-top: .2rem;
            }
        }
    }

    .AppDraw-OK{
        background: #fff;
        padding: .8rem 0;
        text-align: center;
        margin: 0 auto .2rem auto;
        dt{
          width:100%;
          margin-bottom:.16rem;
          .ok-icon{
            display: inline-block;
            width:1.28rem;
            height:1.28rem;
            background-image:-webkit-linear-gradient(to bottom, #4feabe, #42e5e9);
            background-image:linear-gradient(to bottom,#4feabe,#42e5e9);
            box-shadow: 0 .02rem .25rem rgba(66,229,233,.4);
            -webkit-border-radius:50%;
            border-radius:50%;
            text-align: center;
            i{
              font-size:.68rem;
              color: #fff;
              line-height:1.28rem;
            }
          }
        }
        dd{
          line-height:.44rem;
          color: #ccc;
          font-size: .24rem;
          b{
            color: #333;
            font-size: .26rem;
            font-weight: 500;
          }
        }

    }

    .AppDraw-XeMoney{
        background: #fff;
        margin-bottom: .18rem;
        height: 1rem;
        line-height: 1rem;
        padding: 0 .15rem 0 .24rem;
        .fl{
            color: #999;
            font-size: .24rem;
            i{
                position: relative;
                top: 1px;
                margin-left: 3px;
                color: #f01924;
            }
        }
        .fr{
            color: #bbb;
            span{
                font-size: .3rem;
                font-weight: 600;
                padding-right: 3px;
            }
            i{
                margin-left: 4px;
                color: #999;
            }
        }
    }
    .componets-notice-wrap{
        background: none;
        height: .36rem;
        line-height: .28rem;
        font-size: .22rem;
        color: #bbb;
        position: relative;
    }
    .withdraw-tishi02{
        margin: .3rem 2% .1rem 2%;
        font-size: .22rem;
        color: #808080;
        line-height: .36rem;
        b{
            color: #f01924;
            line-height: .44rem;
            font-size: .23rem;
        }
    }
    .withdraw-tishi01{
        font-size: .22rem;
        color: #aaa;
        font-weight: 400;
        line-height: .32rem;
        padding: .26rem 0;
        margin: 0 4.5%;
        b{
            color: #f01924;
        }
    }

}
</style>
<style lang="less">
.grayBG {
    background-color: #f5f5f5;
}
</style>
