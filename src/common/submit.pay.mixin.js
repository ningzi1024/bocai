export default {
    // data() {
    //     return {
    //         QRcode_link: "",
    //         Action_URL: "",
    //         Skip_URL: ""
    //     }
    // },
    // watch: {
    //     QRcode_link(val) {
    //         if (val.length > 0) {
    //             this.$loading.close();
    //         }
    //     },
    //     Action_URL(val) {
    //         if (val.length > 0)
    //             this.confirm({
    //                 title: "温馨提示",
    //                 icon: "success",
    //                 mes: "支付订单生成成功，即将跳往第三方支付",
    //                 opts: [{
    //                     txt: '取消',
    //                     color: false,
    //                     callback: () => {
    //                         this.Action_URL = ""
    //                     }
    //                 }, {
    //                     txt: '前往支付',
    //                     color: true,
    //                     callback: () => {
    //                         this.createFromSubmit({ actionUrl: val })
    //                         this.Action_URL = ""
    //                         setTimeout(() => {
    //                             this.finish_submit();
    //                         }, 2000);
    //                     }
    //                 }]
    //             })

    //     },
    //     Skip_URL(val) {
    //         if (val.length > 0)
    //             this.confirm({
    //                 title: "温馨提示",
    //                 icon: "success",
    //                 mes: "支付订单生成成功，即将跳往第三方支付",
    //                 opts: [{
    //                     txt: '取消',
    //                     color: false,
    //                     callback: () => {
    //                         this.Skip_URL = ""
    //                     }
    //                 }, {
    //                     txt: '前往支付',
    //                     color: true,
    //                     callback: () => {
    //                         this.open(val)
    //                         this.Skip_URL = ""
    //                         setTimeout(() => {
    //                             this.finish_submit();
    //                         }, 2000);
    //                     }
    //                 }]
    //             })
    //     }
    // },
    methods: {
        createFromSubmit({ actionUrl = "", name = "payfrom", id = "payfrom", method = "post",isGetHtml = false }) {
            let fromHtml = '<html><head></head><body><form id="' + id + '" name="' + name + '" action="' + actionUrl + '" method="' + method + '"></form></body></html>'
            let fromOut = '<form id="' + id + '" name="' + name + '" action="' + actionUrl + '" method="' + method + '"></form>'
            // this.$nextTicket(() => {
            if(isGetHtml) return fromOut;
            let win = this.openWin();
            if (!win) {
                this.alert({ mes: "打开支付页面失败，请稍候尝试" })
            } else {
                win.document.write(fromHtml);
                win.document.forms[0].submit()
            }
            // })

            // console.log(win, fromHtml)
        },
        finish_submit() {
            this.$confirm({
                title: '是否完成支付？',
                icon: "warn",
                mes: '充值后，请点击下方的“完成支付”来自动刷新您的主账户余额,若超过3分钟充值未到账，请与客服联系',
                opts: [{
                    txt: '联系客服',
                    color: true,
                    callback: () => {
                        this.onlineService();
                        this.$loading.close()
                    }
                }, {
                    txt: '支付完成',
                    color: false,
                    callback: () => {

                        this.$loading.close()
                    }
                }]
            });
        },
        /**
         * 提交第三方支付
         * @param {*} payName 
         * @param {*} payParamaters 
         */
        submitPay(payName, { id, amount, payType, bankCode = "", memberID = "", img = "", GameID = "" }) {
            this.$loading.open()
            // let this = this;
            this.$payFactory(payName, {
                "id": id,
                "amount": amount,
                "bankCode": bankCode,
                "memberID": memberID,
                "payType": payType,
                "GameID": GameID
            }).then(rep => {
                let data = rep.data;
                console.log(data)
                if (data.Status === 1) {
                    if (!data.row.Status) {
                        // debugger;
                        if (data.row.H5Type == "form") {
                            this.$loading.close()
                            //创建表单提交
                            let submitUrl = [];
                            for (let key in data.row) {
                                submitUrl.push(key + "=" + encodeURIComponent(data.row[key]))
                            }
                            let actionUrl = data.row.ReqURL_onLine + "?" + submitUrl.join("&")
                            // this.Action_URL = actionUrl;

                            this.$router.push({
                                name: "payorder", params: {
                                    type: 0,
                                    value: actionUrl
                                }
                            })
                        } else if (data.row.H5Type == "url") {
                            this.$loading.close()
                            if (data.row.QrCode) {
                                //跳网页
                                // this.Skip_URL = data.row.QrCode;
                                this.$router.push({
                                    name: "payorder", params: {
                                        type: 1,
                                        value: data.row.QrCode
                                    }
                                })
                            } else if (data.row.codeUrl) {
                                this.$loading.close()
                                //显示二维码
                                // this.QRcode_link = data.row.codeUrl;

                                this.$router.push({
                                    name: "payorder", params: {
                                        type: 2,
                                        value: data.row.codeUrl
                                    }
                                })
                            } else {
                                this.$loading.close()
                                this.alert({ mes: "获取二维码失败，请稍候重试" })
                            }
                        } else if (data.row.H5Type == "image") {
                            if (data.row.codeUrl) {
                                this.$loading.close()
                                //显示二维码
                                // this.QRcode_link = data.row.codeUrl;

                                this.$router.push({
                                    name: "payorder", params: {
                                        type: 2,
                                        value: "data:image/jpeg;base64," + data.row.codeUrl
                                    }
                                })
                            } else {
                                this.$loading.close()
                                this.alert({ mes: "获取二维码失败，请稍候重试" })
                            }

                        } else {
                            this.$loading.close()
                            this.alert({ mes: "支付时发生错误，未知的支付类型，请重试" })
                        }
                    } else {
                        this.$loading.close()
                        this.sysErrCheck(data.Status).then(canrun => {
                            if (canrun) {
                                this.alert({ mes: data.CNMessage })
                            }
                        });
                    }

                } else {
                    this.$loading.close()
                    this.sysErrCheck(data.Status).then(canrun => {
                        if (canrun) {
                            this.alert({ mes: data.CNMessage })
                        }
                    });
                }
            }).catch(err => {
                console.log(err)
                this.$loading.close()
                this.sysErrCheck(-9);
            })
        },

    }
}