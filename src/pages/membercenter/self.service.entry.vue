<!--
* 自助入账
-->
<template>
    <div class="container newapp-tab">
        <tf-tab class="self-in" :change="tabChange">
            <tf-tab-panel tabkey="1" label="支付宝转银行卡">
                <!-- <tf-notice title="温馨提示：" content="支付宝转银行卡自助入账目前只支持农业银行！"></tf-notice> -->
                <div class="self-RZtishi">支付宝转银行卡自助入账目前只支持农业银行！</div>
                <div class="Cont-Spacing-02">
                    <tf-cell-group>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                付款人
                            </span>
                            <span class="right" slot="right">
                                <tf-input v-model="payerName" ref="payerName" :required="true" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" slot="right" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入付款的姓名"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                收款人
                            </span>
                            <span class="right" slot="right">
                                <tf-input ref="Payee" v-model="Payee" :required="true" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" slot="right" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入收款的姓名"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                收款卡号
                            </span>
                            <span class="right" slot="right">
                                <tf-input v-model="Card" ref="Card" :required="true" regex="^\d{4}$" slot="right" type="number" max="4" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="银行卡后4位"></tf-input>
                            </span>
                        </tf-cell-item>

                    </tf-cell-group>
                </div>

                <div class="Cont-Spacing-02">
                    <tf-cell-group>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                支付金额
                            </span>
                            <span class="right" slot="right">
                                <tf-input ref="CashAmount" v-model="CashAmount" :required="true" max="5" regex="^[1-9]\d{2,8}$" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入支付金额"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item arrow>
                            <span class="left" slot="left">
                                入账时间
                            </span>
                            <span class="right blueColor" slot="right">
                                <span @click="selectTime" v-if="OrderTime=== ''">选择入账时间</span>
                                <tf-datetime v-else ref="OrderTime" :startYear="currentYear-1" :endYear="currentYear" v-model="OrderTime"></tf-datetime>
                            </span>

                        </tf-cell-item>

                        <tf-cell-item>
                            <span class="left" slot="left">
                                验证码
                            </span>
                            <span class="right" slot="right" style="position: relative;">
                                <tf-input style="width:3.2rem;" ref="vcode" v-model="vcode" :required="true" max="4" regex="^\d{4}$" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入验证码"></tf-input>
                                <img class="vcode" @click="refreshVcode" :src="vcode_img" alt="">
                            </span>
                        </tf-cell-item>
                    </tf-cell-group>
                </div>
                
                <tf-button size="large" @click.native="SelfServiceEntry" class="btnOk" type="primary">确定</tf-button>

            </tf-tab-panel>
            <tf-tab-panel tabkey="2" label="银行卡转银行卡">
                <!-- <tf-notice title="温馨提示：" content="银行卡转银行卡自助入账目前支持农行转农行！"></tf-notice> -->
                <div class="self-RZtishi">银行卡转银行卡自助入账目前支持农行转农行！</div>
                <div class="Cont-Spacing-02">
                    <tf-cell-group>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                付款人
                            </span>
                            <span class="right" slot="right">
                                <tf-input v-model="payerName1" ref="payerName1" :required="true" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" slot="right" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入付款的姓名"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                付款卡号
                            </span>
                            <span class="right" slot="right">
                                <tf-input v-model="PayerAccount1" ref="PayerAccount1" :required="true" regex="^\d{4}$" slot="right" type="number" max="4" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="银行卡后4位"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                支付金额
                            </span>
                            <span class="right" slot="right">
                                <tf-input ref="CashAmount1" v-model="CashAmount1" :required="true" max="5" regex="^[1-9]\d{1,4}$" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="支付金额"></tf-input>
                            </span>
                        </tf-cell-item>
                    </tf-cell-group>
                </div>

                <div class="Cont-Spacing-02">
                    <tf-cell-group style="">
                        <tf-cell-item>
                            <span class="left" slot="left">
                                收款人
                            </span>
                            <span class="right" slot="right">
                                <tf-input ref="Payee1" v-model="Payee1" :required="true" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" slot="right" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入收款的姓名"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                收款卡号
                            </span>
                            <span class="right" slot="right">
                                <tf-input v-model="Card1" ref="Card1" :required="true" regex="^\d{4}$" slot="right" type="number" max="4" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="银行卡后4位"></tf-input>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item arrow>
                            <span class="left" slot="left">
                                入账时间
                            </span>
                            <span class="right blueColor" slot="right">
                                <span @click="selectTime" v-if="OrderTime === ''">选择入账时间</span>
                                <tf-datetime v-else ref="OrderTime1" :startYear="currentYear-1" :endYear="currentYear" v-model="OrderTime1"></tf-datetime>
                            </span>
                        </tf-cell-item>
                        <tf-cell-item>
                            <span class="left" slot="left">
                                验证码
                            </span>
                            <span class="right" slot="right" style="position: relative;">
                                <tf-input style="width:3.2rem;" ref="vcode1" v-model="vcode1" :required="true" max="4" regex="^\d{4}$" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入验证码"></tf-input>
                                <img class="vcode" @click="refreshVcode" :src="vcode_img" alt="">
                            </span>
                        </tf-cell-item>
                    </tf-cell-group>
                </div>
                <tf-button size="large" @click.native="SelfServiceEntry" class="btnOk" type="primary">确定</tf-button>
            </tf-tab-panel>

        </tf-tab>
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import api from "@/api/User"
import apiNames from "@/api/API.list"
import { Tab, TabPanel } from '@/tf-ui/components/tab';
import { DateTime } from '@/tf-ui/components/datetime';
import notice from "@/components/notice"
import moment from "moment"
export default {
    components: {
        [Tab.name]: Tab,
        [TabPanel.name]: TabPanel,
        [notice.name]: notice,
        [DateTime.name]: DateTime
    },
    data() {
        return {
            currentKey: "",
            payerName: "",
            PayerAccount: "",
            Amount: "",
            transferTime: "",
            currentTime: "",
            Payee: "",
            Card: "",
            OrderTime: "",
            CashAmount: "",
            vcode: "",
            currentKey1: "",
            payerName1: "",
            PayerAccount1: "",
            Amount1: "",
            transferTime1: "",
            currentTime1: "",
            Payee1: "",
            Card1: "",
            OrderTime1: "",
            CashAmount1: "",
            vcode1: "",
            vcode_img: ""
        }
    },
    watch: {
        error_satus(value) {
            this.sysErrCheck(value);
        },
        isLoading(value) {
            if (value) {
                this.loading();
            } else {
                this.loadingClose();
            }
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"]),
        ...mapActions(["initChannel"]),
        //提交自助入账
        SelfServiceEntry() {

            console.log(this.channel.aliscan.type)
            if (this.checkInput()) {
                let inputData = {}
                if (this.currentKey == 2) {
                    inputData = {
                        n1: this.channel.ali2card.type,
                        LogType: this.channel.ali2card.type,
                        n5: this.payerName1,//付款人
                        Payer: this.payerName1,//付款人
                        PayerAccount: this.PayerAccount1,
                        n8: this.Payee1,//收款人
                        Payee: this.Payee1,//收款人
                        n6: this.Card1,//收款卡号
                        Card: this.Card1,//收款卡号
                        n3: this.CashAmount1,//支付金额
                        CashAmount: this.CashAmount1,//支付金额
                        OrderTime: this.OrderTime1,//到账时间
                        vcode: this.vcode1
                    }
                    // inputData.n3 = this.PayerAccount;//付款卡号
                    // inputData.PayerAccount = this.PayerAccount;//付款卡号
                    // inputData.n1 = this.channel.ali2card.type
                    // inputData.LogType = this.channel.ali2card.type
                } else {
                    inputData = {
                        n1: this.channel.aliscan.type,
                        LogType: this.channel.aliscan.type,
                        n5: this.payerName,//付款人
                        Payer: this.payerName,//付款人
                        n8: this.Payee,//收款人
                        Payee: this.Payee,//收款人
                        n6: this.Card,//收款卡号
                        Card: this.Card,//收款卡号
                        n3: this.CashAmount,//支付金额
                        CashAmount: this.CashAmount,//支付金额
                        OrderTime: this.OrderTime,//到账时间
                        vcode: this.vcode
                    }
                }
                console.log(inputData)
                api[apiNames.SelfServiceEntry](inputData).then(rep => {
                    this.refreshVcode();
                    let data = rep.data;
                    if (data.Status === 1) {
                        // this.currentTime = data.row["Year"] + "-" + data.row["Month"] + "-" + data.row["Day"] + " " + data.row["Hour"] + ":" + data.row["Minute"]

                    } else {
                        this.sysErrCheck(data.Status).then(canrun => {
                            if (canrun) {
                                this.alert({ mes: data.CNMessage, })
                            }
                        });
                    }
                }).catch(err => {
                    this.refreshVcode();
                    this.sysErrCheck(-9);
                })
            }
        },
        checkInput() {
            debugger
            if (this.currentKey == "1") {
                if (!this.$refs.payerName.valid) {
                    this.showTip("请输入付款的姓名");
                    return false;
                }
                if (!this.$refs.Payee.valid) {
                    this.showTip("请输入收款的姓名")
                    return false;
                }
                if (!this.$refs.Card.valid) {
                    this.showTip("请输入收款卡号")
                    return false;
                }
                if (!this.$refs.CashAmount.valid) {
                    this.showTip("请输入支付金额")
                    return false;
                }
                if (!this.OrderTime) {
                    this.showTip("选择入账时间")
                    return false;
                }
                // if (!this.$refs.PayerAccount.valid) {
                //     this.showTip("请输入付款卡号")
                //     return false;
                // }
                if (!this.$refs.vcode.valid) {
                    this.showTip("请输入验证码")
                    return false;
                }
            } else {
                if (!this.$refs.payerName1.valid) {
                    this.showTip("请输入付款的姓名");
                    return false;
                }
                if (!this.$refs.PayerAccount1.valid) {
                    this.showTip("请输入付款卡号")
                    return false;
                }
                if (!this.$refs.CashAmount1.valid) {
                    this.showTip("请输入支付金额")
                    return false;
                }
                if (!this.$refs.Payee1.valid) {
                    this.showTip("请输入收款的姓名")
                    return false;
                }
                if (!this.$refs.Card1.valid) {
                    this.showTip("请输入收款卡号")
                    return false;
                }
                if (!this.OrderTime1) {
                    this.showTip("选择入账时间")
                    return false;
                }
                if (!this.$refs.vcode1.valid) {
                    this.showTip("请输入验证码")
                    return false;
                }
            }

            return true;
        },
        showTip(msg) {
            this.$toast({
                mes: msg,
                timeout: 1500,
                icon: 'error'
            })
        },
        GetServerDateCommand() {
            api[apiNames.GetServerDateCommand]().then(rep => {
                let data = rep.data;
                if (data.Status === 1) {

                } else {
                    this.sysErrCheck(data.Status).then(canrun => {
                        if (canrun) {
                            this.alert({ mes: data.CNMessage, })
                        }
                    });
                }
            }).catch(err => {
                this.sysErrCheck(-9);
            })

        },
        refreshVcode() {
            api[apiNames.GetVerifyCode]().then(rep => {
                let data = rep.data;
                if (data.Status == 1) {
                    this.vcode_img = "data:image/png;base64," + data.row.imgdata;
                }
            }).catch(err => {
                this.$toast({
                    mes: '获取验证码失败',
                    timeout: 1500,
                    icon: 'error'
                });
            });
        },
        selectTime() {
            this.OrderTime = moment().format("YYYY-MM-DD HH:mm");
            this.$nextTick(() => {
                this.$nextTick(() => {
                    // console.log(this.$refs)
                    this.$refs.OrderTime.open();
                });
            })

        },
        tabChange(label, tableKey) {
            this.currentKey = tableKey;
            // console.log(label, tableKey)
            this.resetData();
        },
        resetData() {
            this.payerName = ""
            this.PayerAccount = ""
            this.Amount = ""
            this.transferTime = ""
            this.currentTime = ""
            this.Payee = ""
            this.Card = ""
            this.OrderTime = ""
            this.CashAmount = ""
        }
    },
    computed: {
        ...mapState({
            "error_status": state => state.paycenter.error_status,
            "isLoading": state => state.paycenter.isLoading,
            "updateTime": state => state.paycenter.updateTime,
            "channel": state => state.paycenter.channel
        }),
        currentYear: function() {
            return moment().year();
        },
        dataTime01: {
            get: function() {
                // if(this.transferTime === ""){
                //     return moment().format("YYYY-MM-DD HH:mm");
                // }else{
                //     return this.transferTime;
                // }

                return this.transferTime;

            },
            set: function(val) {
                this.transferTime = val
            }
        }
    },
    created() {
        this.initChannel();
        //GetServerDateCommand 获取服务器时间
        this.GetServerDateCommand();
        this.refreshVcode();
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
            vm.$store.commit('setSiteConfig', { title: "自助入账", showMenu: false, showBack: true, showNav: false, showChat: false });
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
        next();
    },
    destroyed() {
    }
}
</script>
<style lang="less" scoped>
.self-in {
    .tab-panel {
        background-color: #f5f5f5 !important;
    }
}

.container {
    .btnOk {
        width: 96%;
        margin-left: 2%;
        margin-top: .25rem;
        height: .88rem;
    }
    .left {
        width: 1.2rem;
        font-size: .24rem;
    }
    .right {
        color: #699deb;
        text-align: left;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        padding-left: .5rem;
        .vcode {
            width: 1.5rem;
            height: .6rem;
            position: absolute;
            top: .18rem;
            right: .24rem;
            border-radius: 5px;
        }
    }
    .componets-notice-wrap{
        background: none;
        height: .36rem;
        line-height: .5rem;
        font-size: .24rem;
        color: #bbb;
        position: relative;
        margin-bottom: -3px;
    }
    /*.Cont-Spacing-02{
        border-color:#f0f0f0;
        box-shadow: 0 0 .5rem rgba(0,0,0,.12); 
    }*/
    .self-RZtishi{
        overflow: hidden;
        clear: both;
        height:.42rem;
        line-height:.46rem;
        width:100%;
        text-align:center;
        position:relative;
        margin-bottom:-.2rem;
        font-size:.22rem;
        color:#999;
        opacity: .68;
    }
}


</style>
