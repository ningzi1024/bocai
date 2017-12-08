const apiName = {
    //当前用户登陆状态
    LoginState: "LoginState",
    //登出
    Logout: "Logout",
    //登录
    Login: "Login",
    // 发送手机找回密码或修改银行卡的验证码
    PasswordTelCommand: "PasswordTelCommand",
    // 电话验证并修改密码
    TelResetLoginPwdCommand: "TelResetLoginPwdCommand",
    // 安全密码重置登陆密码(未登陆状态)
    SafePwdResetLoginPwdCommand: "SafePwdResetLoginPwdCommand",
    // 验证邮件链接参数
    VerfiMailParamCommand: "VerfiMailParamCommand",
    // 发送重置密码邮件
    PasswordMailCommand: "PasswordMailCommand",
    // 使用旧密码更改密码
    UpdateLoginPwdCommand: "UpdateLoginPwdCommand",
    // 周年礼金；推荐礼金；首存优惠
    GetAnniversaryBonusCommand: "GetAnniversaryBonusCommand",
    // 额度记录
    GetGameTranRecordCommand: "GetGameTranRecordCommand",
    // 存款记录
    GetDepositRecordCommand: "GetDepositRecordCommand",
    // 提款记录
    GetWithdrawalRecordCommand: "GetWithdrawalRecordCommand",
    // 洗码记录:"",
    GetBetBonusRecordCommand: "GetBetBonusRecordCommand",
    // 优惠记录
    GetPromotionRecordCommand: "GetPromotionRecordCommand",
    // 积分记录
    GetPointsRecordCommand: "GetPointsRecordCommand",
    //MG国际厅记录
    MGSessionRecordCommand: "MGSessionRecordCommand",
    //MG国际厅记录明细
    MGGameRecordCommand: "MGGameRecordCommand",
    // 是否绑定安全问题并返回
    CheckSafeQuestionCommand: "CheckSafeQuestionCommand",
    // 验证安全问题答案
    VerifySafeQuestionAnswerCommand: "VerifySafeQuestionAnswerCommand",
    // 设置安全问题、答案
    SetSafeQuestionCommand: "SetSafeQuestionCommand",
    // 获取用户主账户余额
    UserBalance: "UserBalance",
    // 用户名是否存在
    MemberExist: "MemberExist",
    // 用户注册API
    MemberRegister: "MemberRegister",
    // 取用户上次登陆时间
    GetLastLoginTime: "GetLastLoginTime",
    // 获取用户个人基本信息
    GetMemberBaseInfoCommand: "GetMemberBaseInfoCommand",
    // 获取会员升级所需流水
    GetMemberLevelUP: "GetMemberLevelUP",
    // 绑定提款银行
    UpdateMemberBankCommand: "UpdateMemberBankCommand",
    // 读取用户提款银行
    GetMemberBankCommand: "GetMemberBankCommand",
    // 手机验证码修改用户银行卡号
    SecCodeMifBankCode: "SecCodeMifBankCode",
    // 获取验证码
    GetVerifyCode: "GetVerifyCode",
    //获取支付渠道
    GetCashChannel:"GetCashChannel",
    GetAnno: "GetAnno",
    //绿色通道存款
    RequestBankDepositCommand:"RequestBankDepositCommand",
    //绿色通道，获取订单信息
    GetUnfinishOrder:"GetUnfinishOrder",
    //取消绿色通道订单
    CancelUnfinishOrder:"CancelUnfinishOrder",
    //提交支付宝转支付宝订单
    InitAutoDepositCommand:"InitAutoDepositCommand",
    //提交支付宝转银行卡订单
    AlipayBankDepositCommand:"AlipayBankDepositCommand",
    GetServerDateCommand: "GetServerDateCommand",
    //获取支付宝转银行卡二维码
    AlipayQRCodeContent: "AlipayQRCodeContent",
    //获取账户可用余额
    GetUserWithdrawalCount:"GetUserWithdrawalCount",
    //获取历史提款记录
    WithdrawalUnfinishOrder:"WithdrawalUnfinishOrder",
    //获取流水限制
    CashLimit_GetBonusLimit:"CashLimit_GetBonusLimit",
    //取消限额
    CashLimit_CancelLimit:"CashLimit_CancelLimit",
    //提交取款申请提交取款申请
    RequestWithdrawalCommand:"RequestWithdrawalCommand",
    //获取限额明细
    CashLimit_GetLimitList:"CashLimit_GetLimitList",
    //会员安全等级
    SleVerification: "SleVerification",
    //手机号是否存在--手机验证
    TelAgreement:"TelAgreement",
    //手机/邮箱 验证
    Verification: "Verification",
    //邮箱是否存在--邮箱验证
    MailAgreement:"MailAgreement",
    //转账 "gameid_0":"PT" 为转入 gameid_1:"PT" 为转出
    UserGameTran:"UserGameTran",
    //获取指定平台额度
    UserGameBalance:"UserGameBalance",
    //提交自助入账
    SelfServiceEntry:"SelfServiceEntry",
    //发送邮箱验证码
    SendPostMail: "SendPostMail",
    //发送验证码到手机
    Sendverification: "Sendverification",
    //安全密码设置
    UpdateSafePasswordCommand: "UpdateSafePasswordCommand",
    //获取用户注册时手机号
    retBindTel:"retBindTel",
    //获取手机验证码
    TelSendCodeSafetyProblemAndPassword:"TelSendCodeSafetyProblemAndPassword",
    //重置安全密码
    TelCodeUpdateSafetyProblemAndPassword:"TelCodeUpdateSafetyProblemAndPassword",
    //短信接收设置
    updateShortM:"updateShortM",
    //账号设置初始化
    selectShortM:"selectShortM",
    //游戏账号设置
    PlayGameSet:"PlayGameSet",
    //投诉建议
    Feedback:"Feedback",
    //在线客服
    OnlineServices:"OnlineServices",
    //获取认证信息
    CheckAuthBonus:"CheckAuthBonus",
    //获取自助洗码列表
    BetBonus_GetList:"BetBonus_GetList",
    //领取洗码
    BetBonus_BetsPromo:"BetBonus_BetsPromo",
    //领取洗码电游
    BetBonus_BetsPromoSlot:"BetBonus_BetsPromoSlot",
    //获取游戏分类
    GetGameCategory:"GetGameCategory",
    //获取平台游戏列表
    GetGameList:"GetGameList",
    //获取最新中奖信息
    WinRecord:"WinRecord",
    //检测是否需要更新
    ChkGameListUpdate:"ChkGameListUpdate",
    //获取收藏的游戏
    GetGameFavorite:"GetGameFavorite",
    //PT入口
    GetPTEntry:"GetPTEntry",
    //AG入口
    GetAGXINEntry:"GetAGXINEntry",
    //TTG入口
    GetTTGEntry:"GetTTGEntry",
    //MGIN入口
    GetMGINEntry:"GetMGINEntry",
    //MG入口
    GetMGEntry:"GetMGEntry",
    //BSG入口
    GetBSGEntry:"GetBSGEntry",
    //GG入口
    GetGGEntry:"GetGGEntry",
    //DT入口
    GetDTEntry:"GetDTEntry",
    //获取银联支付
    GetEcpssPayReqParamsCommand:"GetEcpssPayReqParamsCommand",
    //
    GetYZPayReqParamsCommand:"GetYZPayReqParamsCommand",
    //手机号找回密码
    TelSecCodeCommand:"TelSecCodeCommand",
    //安全密码验证-找回密码
    VerifySecPwdCommand:"VerifySecPwdCommand",
    //邮箱找回密码
    MailResetLoginPwdCommand:"MailResetLoginPwdCommand",
    //收藏游戏
    AddGameFavorite:"AddGameFavorite",
    //取消收藏游戏
    DeleteGameFavorite:"DeleteGameFavorite",
    //获取pt账户
    EgameptLogin:"EgameptLogin",
    //检验游戏是否在更新
    GameStateList:"GameStateList",
    //AG旗舰-真人娱乐
    GetAGEntry:"GetAGEntry",
    //AG国际-真人娱乐
    GetAGINEntry:"GetAGINEntry",
    //波音真人
    GetBBINEntry:"GetBBINEntry",
    //银行卡设为默认
    SetBankDefault:"SetBankDefault",
    //删除银行卡
    MemberBankCardDelete:"MemberBankCardDelete",
    //获取周勤
    GetWeekFullPromo:"GetWeekFullPromo",
    //领取周勤
    AcceptWeekFullPromo:"AcceptWeekFullPromo",
    //获取复活礼金
    CashLimit_LoseBackPromo:"CashLimit_LoseBackPromo",
    //领取复活礼金
    CashLimit_AcceptLoseBack:"CashLimit_AcceptLoseBack",
    //sw厅入口
    GetPT_SkyWindEntry:"GetPT_SkyWindEntry",
    //获取最新电游
    GetNewGameList:"GetNewGameList",
    //获取当前用户所有消息
    GetMemberMsg:"GetMemberMsg",
    //标识已读，需传入当前消息MsgID
    MemberMsgRead:"MemberMsgRead",
    //领取信息认证红利
    ApplyAuthenticationBonus:"ApplyAuthenticationBonus",
    //获取游戏平台
    GamePlatformList:"GamePlatformList"
}

export default apiName;
