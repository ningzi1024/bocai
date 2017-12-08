import ajax from "./API.base"
import { extentdData } from "./API.base"
import apiName from "./API.list"
let api = {
    /**
     * 当前用户登陆状态
     */
    [apiName.LoginState]() {
        return ajax.post("", { [apiName.LoginState]: extentdData() });
    },
    /**
     * 登出
     */
    [apiName.Logout]() {
        return ajax.post("", { [apiName.Logout]: extentdData() });
    },
    /**
     * 登录
     * @param {*} param0
     */
    [apiName.Login](obj = {}) {
        return ajax.post("", {
            [apiName.Login]: extentdData(obj)
        });
    },
    // 发送手机找回密码或修改银行卡的验证码验证码
    [apiName.PasswordTelCommand]({ Tel = "", type = "", ACNT}) {
        return ajax.post("", {
            [apiName.PasswordTelCommand]: extentdData({
                Tel: Tel,
                type: type,
                ACNT:ACNT
            })
        });
    },
    // 电话验证并修改密码
    [apiName.TelResetLoginPwdCommand]({ Tel, LoginPwd1, LoginPwd2, ACNT, Code }) {
        return ajax.post("", {
            [apiName.TelResetLoginPwdCommand]: extentdData({
                Tel: Tel,
                LoginPwd1: LoginPwd1,
                LoginPwd2: LoginPwd2,
                ACNT: ACNT,
                Code: Code
            })
        })
    },
    // 安全密码重置登陆密码(未登陆状态)
    [apiName.SafePwdResetLoginPwdCommand]({ SafePwd, LoginPwd1, LoginPwd2, vcode = "", ACNT = "" }) {
        let data = extentdData({
            SafePwd: SafePwd,
            LoginPwd1: LoginPwd1,
            LoginPwd2: LoginPwd2,
            vcode: vcode,
            ACNT: ACNT
        });
        //delete data.ACNT;
        return ajax.post("", {
            [apiName.SafePwdResetLoginPwdCommand]: data
        });
    },
    // 验证邮件链接参数
    [apiName.VerfiMailParamCommand]({ MailCode } = {}) {
        return ajax.post("", {
            [apiName.VerfiMailParamCommand]: extentdData({
                MailCode: MailCode
            })
        });
    },
    // 发送重置密码邮件
    [apiName.PasswordMailCommand]({ ACNT, Mail, URL, PageName,URL1 }) {
        return ajax.post("", {
            [apiName.PasswordMailCommand]: extentdData({
                ACNT: ACNT,
                Mail: Mail,
                URL: URL,
                PageName: PageName,
                URL1: URL1
            })
        })
    },
    // 使用旧密码更改密码
    [apiName.UpdateLoginPwdCommand]({ pwd0, pwd1, pwd2 }) {
        return ajax.post("", {
            [apiName.UpdateLoginPwdCommand]: extentdData({
                pwd0: pwd0,
                pwd1: pwd1,
                pwd2: pwd2
            })
        })
    },
    // 周年礼金；推荐礼金；首存优惠
    [apiName.GetAnniversaryBonusCommand]({ year, month }) {
        return getRecords([apiName.GetAnniversaryBonusCommand], year, month);
    },
    // 额度记录
    [apiName.GetGameTranRecordCommand]({ year, month }) {
        return getRecords([apiName.GetGameTranRecordCommand], year, month);
    },
    // 存款记录
    [apiName.GetDepositRecordCommand]({ year, month }) {
        return getRecords([apiName.GetDepositRecordCommand], year, month);
    },
    // 提款记录
    [apiName.GetWithdrawalRecordCommand]({ year, month }) {
        return getRecords([apiName.GetWithdrawalRecordCommand], year, month);
    },
    // 洗码记录:"",
    [apiName.GetBetBonusRecordCommand]({ year, month }) {
        return getRecords([apiName.GetBetBonusRecordCommand], year, month);
    },
    // 优惠记录
    [apiName.GetPromotionRecordCommand]({ year, month }) {
        return getRecords([apiName.GetPromotionRecordCommand], year, month);
    },
    // 积分记录
    [apiName.GetPointsRecordCommand]({ year, month }) {
        return getRecords([apiName.GetPointsRecordCommand], year, month);
    },
    //MG国际厅记录
    [apiName.MGSessionRecordCommand]({ p1, p2, p3 }) {
        return ajax.post("", {
            [apiName.MGSessionRecordCommand]: extentdData({
                p1: p1,
                p2: p2,
                p3: p3
            })
        });
    },
    //MG国际记录明细
    [apiName.MGGameRecordCommand]({ p1 }) {
        return ajax.post("", {
            [apiName.MGGameRecordCommand]: extentdData({
                p1: p1,
                p2: "17"
            })
        })
    },
    // 是否绑定安全问题并返回
    [apiName.CheckSafeQuestionCommand]() {
        return ajax.post("", {
            [apiName.CheckSafeQuestionCommand]: extentdData({})
        })
    },
    // 验证安全问题答案
    [apiName.VerifySafeQuestionAnswerCommand]() {

    },
    // 设置安全问题、答案
    [apiName.SetSafeQuestionCommand]({ Question, Answer, Pwd1, Pwd2 }) {
        return ajax.post("", {
            [apiName.SetSafeQuestionCommand]: extentdData({
                Question: Question,
                Answer: Answer,
                Pwd1: Pwd1,
                Pwd2: Pwd2
            })
        });
    },
    // 获取用户主账户余额
    [apiName.UserBalance]() {
        return ajax.post("", { [apiName.UserBalance]: extentdData({}) });
    },
    // 用户名是否存在
    [apiName.MemberExist]({ ACNT }) {
        return ajax.post("", {
            [apiName.MemberExist]: extentdData({
                ACNT: ACNT
            })
        });
    },
    // 用户注册API
    [apiName.MemberRegister]({ id, pwd1, pwd2, name, sex, tel, qq, mail, intro, vcode }) {
        return ajax.post("", {
            [apiName.MemberRegister]: extentdData({
                id: id,
                pwd1: pwd1,
                pwd2: pwd2,
                name: name,
                sex: sex,
                tel: tel,
                qq: qq,
                mail: mail,
                intro: intro,
                vcode: vcode
            })
        });
    },
    // 取用户上次登陆时间
    [apiName.GetLastLoginTime]() {

    },
    // 获取用户个人基本信息
    [apiName.GetMemberBaseInfoCommand]() {
        return ajax.post("", { [apiName.GetMemberBaseInfoCommand]: extentdData({}) });
    },
    // 获取会员升级所需流水
    [apiName.GetMemberLevelUP]() {
      return ajax.post("", {[apiName.GetMemberLevelUP]: extentdData({}) })
    },
    // 绑定提款银行
    [apiName.UpdateMemberBankCommand]({ AccountName, BankName, CardID, CardID2, Loc1, Loc2, Loc3, SecPwd="" }) {
        return ajax.post("", {
            [apiName.UpdateMemberBankCommand]: extentdData({
                AccountName: AccountName,
                BankName: BankName,
                CardID: CardID,
                CardID2: CardID2,
                Loc1: Loc1,
                Loc2: Loc2,
                Loc3: Loc3,
                SecPwd: SecPwd
            })
        });
    },
    // 读取用户提款银行
    [apiName.GetMemberBankCommand]() {
        return ajax.post("", {
            [apiName.GetMemberBankCommand]: extentdData({})
        });
    },
    // 手机验证码修改用户银行卡号
    [apiName.SecCodeMifBankCode]({ BankName, loc1, loc2, loc3, BankCardNO, BankCardNO2,Index,MemberID,SecPwd }) {
        return ajax.post("", {
            [apiName.SecCodeMifBankCode]: extentdData({
                BankName: BankName,
                loc1: loc1,
                loc2: loc2,
                loc3: loc3,
                BankCardNO: BankCardNO,
                BankCardNO2: BankCardNO2,
                Index: Index,
                MemberID: MemberID,
                SecPwd: SecPwd
            })
        })
    },

    //获取通知
    [apiName.GetAnno]() {
        return ajax.post("", {
            [apiName.GetAnno]: extentdData()
        });
    },
    //获取验证码
    [apiName.GetVerifyCode]() {
        let data = extentdData({ width: 75, height: 30 });
        delete data.ACNT;
        return ajax.post("", {
            [apiName.GetVerifyCode]: data
        });
    },
    //绿色通道存款
    [apiName.RequestBankDepositCommand](data) {
        return ajax.post("", {
            [apiName.RequestBankDepositCommand]: extentdData(data)
        });
    },
    //绿色通道获取订单信息
    [apiName.GetUnfinishOrder]() {
        return ajax.post("", {
            [apiName.GetUnfinishOrder]: extentdData({})
        });
    },
    //取消绿色通道订单
    [apiName.CancelUnfinishOrder](data) {
        return ajax.post("", {
            [apiName.CancelUnfinishOrder]: extentdData(data)
        });
    },
    //取消支付渠道
    [apiName.GetCashChannel](data) {
        return ajax.post("", {
            [apiName.GetCashChannel]: extentdData(data)
        });
    },
    //提交支付宝转银行卡订单
    [apiName.InitAutoDepositCommand](data) {
        return ajax.post("", {
            [apiName.InitAutoDepositCommand]: extentdData(data)
        });
    },
    //提交支付宝转银行卡订单
    [apiName.AlipayBankDepositCommand](data) {
        return ajax.post("", {
            [apiName.AlipayBankDepositCommand]: extentdData(data)
        });
    },

    //获取当前时间日期
    [apiName.GetServerDateCommand]() {
        return ajax.post("", {
            [apiName.GetServerDateCommand]: extentdData()
        });
    },

    //获取支付宝转银行卡二维码
    [apiName.AlipayQRCodeContent](obj) {
        return ajax.post("", {
            [apiName.AlipayQRCodeContent]: extentdData(obj)
        });
    },

    //获取账户可用余额
    [apiName.GetUserWithdrawalCount](obj) {
        return ajax.post("", {
            [apiName.GetUserWithdrawalCount]: extentdData(obj)
        });
    },

    //获取历史提款记录
    [apiName.WithdrawalUnfinishOrder](obj) {
        return ajax.post("", {
            [apiName.WithdrawalUnfinishOrder]: extentdData(obj)
        });
    },

    //获取绑定卡号
    [apiName.GetMemberBankCommand](obj) {
        return ajax.post("", {
            [apiName.GetMemberBankCommand]: extentdData(obj)
        });
    },

    //获取流水限制
    [apiName.CashLimit_GetBonusLimit](obj) {
        return ajax.post("", {
            [apiName.CashLimit_GetBonusLimit]: extentdData(obj)
        });
    },

    //提交取款申请
    [apiName.RequestWithdrawalCommand](obj) {
        return ajax.post("", {
            [apiName.RequestWithdrawalCommand]: extentdData(obj)
        });
    },

    //获取限额明细
    [apiName.CashLimit_GetLimitList](obj) {
        return ajax.post("", {
            [apiName.CashLimit_GetLimitList]: extentdData(obj)
        });
    },

    //取消流水限额
    [apiName.CashLimit_CancelLimit](obj) {
        return ajax.post("", {
            [apiName.CashLimit_CancelLimit]: extentdData(obj)
        });
    },

    //会员安全等级
    [apiName.SleVerification]() {
        return ajax.post("", {
            [apiName.SleVerification]: extentdData()
        });
    },

    //转账 "gameid_0":"PT" 为转入 gameid_1:"PT" 为转出
    [apiName.UserGameTran](obj) {
        return ajax.post("", {
            [apiName.UserGameTran]: extentdData(obj)
        });
    },
    //获取指定平台额度
    [apiName.UserGameBalance](obj) {
        return ajax.post("", {
            [apiName.UserGameBalance]: extentdData(obj)
        });
    },
    //获取所有平台额度
    [apiName.GetMemberBaseInfoCommand](obj) {
        return ajax.post("", {
            [apiName.GetMemberBaseInfoCommand]: extentdData(obj)
        });
    },
    //提交自助入账
    [apiName.SelfServiceEntry](obj) {
        return ajax.post("", {
            [apiName.SelfServiceEntry]: extentdData(obj)
        });
    },
    //获取认证信息
    [apiName.CheckAuthBonus](obj) {
        return ajax.post("", {
            [apiName.CheckAuthBonus]: extentdData(obj)
        });
    },
    //获取自助洗码列表
    [apiName.BetBonus_GetList](obj) {
        return ajax.post("", {
            [apiName.BetBonus_GetList]: extentdData(obj)
        });
    },
    //领取洗码
    [apiName.BetBonus_BetsPromo](obj) {
        return ajax.post("", {
            [apiName.BetBonus_BetsPromo]: extentdData(obj)
        });
    },
    //领取洗码电游
    [apiName.BetBonus_BetsPromoSlot](obj) {
        return ajax.post("", {
            [apiName.BetBonus_BetsPromoSlot]: extentdData(obj)
        });
    },

    //手机验证
    [apiName.TelAgreement]({ PhoneNumber }) {
        return ajax.post("", {
            [apiName.TelAgreement]: extentdData({
                PhoneNumber: PhoneNumber
            })
        });
    },

    //手机验证
    [apiName.Verification]({ PhoneNumber, ValidCode, SecType, MailAddress }) {
        return ajax.post("", {
            [apiName.Verification]: extentdData({
                PhoneNumber: PhoneNumber,
                ValidCode: ValidCode,
                SecType: SecType,
                MailAddress: MailAddress
            })
        });
    },

    //邮箱是否存在
    [apiName.MailAgreement]({ MailAddress }) {
        return ajax.post("", {
            [apiName.MailAgreement]: extentdData({
                MailAddress: MailAddress
            })
        });
    },

    //发送邮箱验证码
    [apiName.SendPostMail]({ MailAddress, URL, PageName }) {
        return ajax.post("", {
            [apiName.SendPostMail]: extentdData({
                MailAddress: MailAddress,
                URL: URL,
                PageName: PageName
            })
        });
    },

    //发送验证码到手机
    [apiName.Sendverification]({ PhoneNumber }) {
        return ajax.post("", {
            [apiName.Sendverification]: extentdData({
                PhoneNumber: PhoneNumber
            })
        });
    },

    //修改安全密码
    [apiName.UpdateSafePasswordCommand]({ Question, Answer, Pwd1, Pwd2 }) {
        return ajax.post("", {
            [apiName.UpdateSafePasswordCommand]: extentdData({
                Question: Question,
                Answer: Answer,
                Pwd1: Pwd1,
                Pwd2: Pwd2
            })
        });
    },

    //获取用户注册时的手机号码
    [apiName.retBindTel]() {
        return ajax.post("", {
            [apiName.retBindTel]: extentdData({})
        });
    },

    //获取验证码，无参数
    [apiName.TelSendCodeSafetyProblemAndPassword]() {
        return ajax.post("", {
            [apiName.TelSendCodeSafetyProblemAndPassword]: extentdData({})
        });
    },

    //重置安全密码
    [apiName.TelCodeUpdateSafetyProblemAndPassword]({ VerificationCode, NewSafetyProblem, NewSafetyAnswer, pwd1, pwd2 }) {
        return ajax.post("", {
            [apiName.TelCodeUpdateSafetyProblemAndPassword]: extentdData({
                VerificationCode: VerificationCode,
                NewSafetyProblem: NewSafetyProblem,
                NewSafetyAnswer: NewSafetyAnswer,
                pwd1: pwd1,
                pwd2: pwd2
            })
        });
    },

    //短信接收设置
    [apiName.updateShortM]({ Sys, Promo, Blessing }) {
        return ajax.post("", {
            [apiName.updateShortM]: extentdData({
                Sys: Sys,
                Promo: Promo,
                Blessing: Blessing
            })
        });
    },

    //账号设置初始化
    [apiName.selectShortM]() {
        return ajax.post("", {
            [apiName.selectShortM]: extentdData({})
        });
    },

    //游戏账号设置
    [apiName.PlayGameSet]({ GameID, Action }) {
        return ajax.post("", {
            [apiName.PlayGameSet]: extentdData({
                GameID: GameID,
                Action: Action
            })
        });
    },

    //投诉建议
    [apiName.Feedback]({ Type, Content, Tel }) {
        return ajax.post("", {
            [apiName.Feedback]: extentdData({
                Type: Type,
                Content: Content,
                Tel: Tel
            })
        });
    },

    //在线客服
    [apiName.OnlineServices]() {
        return ajax.post("", {
            [apiName.OnlineServices]: extentdData({})
        });
    },

    //手机号找回密码
    [apiName.TelSecCodeCommand]({ ACNT, Code, Tel, type }) {
        return ajax.post("", {
            [apiName.TelSecCodeCommand]: extentdData({
                ACNT: ACNT,
                Code: Code,
                Tel: Tel,
                type: type
            })
        })
    },

    //找回密码-安全密码验证信息
    [apiName.VerifySecPwdCommand]({ ACNT, SecPwd }) {
        return ajax.post("", {
            [apiName.VerifySecPwdCommand]: extentdData({
                ACNT: ACNT,
                SecPwd: SecPwd
            })
        })
    },

    //邮箱找回密码-设置新密码
    [apiName.MailResetLoginPwdCommand]({ ACNT, LoginPwd1, LoginPwd2, Code }) {
        return ajax.post("", {
            [apiName.MailResetLoginPwdCommand]: extentdData({
                ACNT: ACNT,
                LoginPwd1: LoginPwd1,
                LoginPwd2: LoginPwd2,
                Code: Code
            })
        })
    },

    //获取pt账户
    [apiName.EgameptLogin]() {
        return ajax.post("", {
            [apiName.EgameptLogin]: extentdData({})
        })
    },

    //检查游戏是否更新
    [apiName.GameStateList]({gameId}){
      return ajax.post("", {
        [apiName.GameStateList]: extentdData({
          gameId:gameId
        })
      })
    },

    //AG旗舰真人
    [apiName.GetAGEntry]({IsTrial}){
      return ajax.post("", {
        [apiName.GetAGEntry]: extentdData({
          IsTrial:IsTrial
        })
      })
    },
    //AG国际真人
    [apiName.GetAGINEntry]({IsTrial}){
      return ajax.post("", {
        [apiName.GetAGINEntry]: extentdData({
          IsTrial:IsTrial
        })
      })
    },
    //波音真人
    [apiName.GetBBINEntry]({page_site}){
      return ajax.post("", {
        [apiName.GetBBINEntry]: extentdData({
          page_site:page_site
        })
      })
    },
    //银行卡设置默认
    [apiName.SetBankDefault]({BankName,Index}){
      return ajax.post("", {
        [apiName.SetBankDefault]: extentdData({
          BankName:BankName,
          Index:Index
        })
      })
    },
    //删除银行卡
    [apiName.MemberBankCardDelete]({BankName,Index,SecPwd}){
      return ajax.post("", {
        [apiName.MemberBankCardDelete]: extentdData({
          BankName:BankName,
          Index:Index,
          SecPwd: SecPwd
        })
      })
    },
    //获取周勤
    [apiName.GetWeekFullPromo]({page_site}){
      return ajax.post("", {
        [apiName.GetWeekFullPromo]: extentdData({})
      })
    },
    //领取周勤
    [apiName.AcceptWeekFullPromo]({page_site}){
      return ajax.post("", {
        [apiName.AcceptWeekFullPromo]: extentdData({})
      })
    },
    //获取复活礼金
    [apiName.CashLimit_LoseBackPromo]({page_site}){
      return ajax.post("", {
        [apiName.CashLimit_LoseBackPromo]: extentdData({})
      })
    },
    //领取复活礼金
    [apiName.CashLimit_AcceptLoseBack]({page_site}){
      return ajax.post("", {
        [apiName.CashLimit_AcceptLoseBack]: extentdData({})
      })
    },
    //获取最新电游
    [apiName.GetNewGameList](obj){
      return ajax.post("", {
        [apiName.GetNewGameList]: extentdData(obj)
      })
    },
    //获取当前用户所有消息
    [apiName.GetMemberMsg](obj){
      return ajax.post("", {
        [apiName.GetMemberMsg]: extentdData(obj)
      })
    },
    //标识已读，需传入当前消息MsgID
    [apiName.MemberMsgRead](obj){
      return ajax.post("", {
        [apiName.MemberMsgRead]: extentdData(obj)
      })
    },
    //领取信息认证红利
    [apiName.ApplyAuthenticationBonus](obj){
      return ajax.post("", {
        [apiName.ApplyAuthenticationBonus]: extentdData(obj)
      })
    }
}

/**
 * 客户报表请求
 * @param api名称
 * @param year
 * @param month
 * @returns {AxiosPromise}
 */
function getRecords(api, year, month) {
    return ajax.post("", {
        [api]: extentdData({
            year: year,
            month: month
        })
    });
}

export default api;
