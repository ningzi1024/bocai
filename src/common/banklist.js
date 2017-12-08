const bankName2Icon = {
    "工商银行": "gongshangyinhang",
    "建设银行": "jiansheyinhang",
    "农业银行": "nongyeyinhang",
    "中国银行": "zhongguoyinhang",
    "招商银行": "zhaoshangyinhang",
    "交通银行": "jiaotongyinhang",
    "民生银行": "minshengyinhang",
    "华夏银行": "huaxiayinhang",
    "兴业银行": "xingyeyinhang",
    "上海浦东发展银行": "pufayinhang",
    "广发银行": "guangfayinhang",
    "中信银行": "zhongxinyinhang",
    "光大银行": "guangdayinhang",
    "邮政储蓄银行": "youzhengyinhang",
    "平安银行": "pinganyinhang",
    '恒丰银行':"hengfengyinhang",
    "其它银行": "qitayinhang",
    "威海市商业银行": "weihaishishangyeyinhang"
}
const list = [
    { "text": "工商银行", "value": "工商银行", icon: bankName2Icon["工商银行"], BankUrl: "https://mybank.icbc.com.cn/icbc/newperbank/perbank3/frame/frame_index.jsp" },
    { "text": "建设银行", "value": "建设银行", icon: bankName2Icon["建设银行"], BankUrl: "https://ibsbjstar.ccb.com.cn/CCBIS/V6/common/login.jsp" },
    { "text": "农业银行", "value": "农业银行", icon: bankName2Icon["农业银行"], BankUrl: "https://perbank.abchina.com/EbankSite/startup.do" },
    { "text": "中国银行", "value": "中国银行", icon: bankName2Icon["中国银行"], BankUrl: "https://ebsnew.boc.cn/boc15/login.html" },
    { "text": "招商银行", "value": "招商银行", icon: bankName2Icon["招商银行"], BankUrl: "https://pbsz.ebank.cmbchina.com/CmbBank_GenShell/UI/GenShellPC/Login/Login.aspx" },
    { "text": "交通银行", "value": "交通银行", icon: bankName2Icon["交通银行"], BankUrl: "https://pbank.95559.com.cn/personbank/logon.jsp" },
    { "text": "民生银行", "value": "民生银行", icon: bankName2Icon["民生银行"], BankUrl: "https://per.cmbc.com.cn/pweb/static/login.html" },
    { "text": "华夏银行", "value": "华夏银行", icon: bankName2Icon["华夏银行"], BankUrl: "https://sbank.hxb.com.cn/easybanking/jsp/login/login.jsp" },
    { "text": "兴业银行", "value": "兴业银行", icon: bankName2Icon["兴业银行"], BankUrl: "https://personalbank.cib.com.cn/pers/main/login.do" },
    { "text": "上海浦东发展银行", "value": "上海浦东发展银行", icon: bankName2Icon["上海浦东发展银行"], BankUrl: "https://ebank.spdb.com.cn/nbper/prelogin.do" },
    { "text": "广发银行", "value": "广发银行", icon: bankName2Icon["广发银行"], BankUrl: "https://ebanks.cgbchina.com.cn/perbank/" },
    { "text": "中信银行", "value": "中信银行", icon: bankName2Icon["中信银行"], BankUrl: "https://i.bank.ecitic.com/perbank6/signIn.do" },
    { "text": "光大银行", "value": "光大银行", icon: bankName2Icon["光大银行"], BankUrl: "https://www.cebbank.com/per/prePerlogin.do?_locale=zh_CN" },
    { "text": "邮政储蓄银行", "value": "邮政储蓄银行", icon: bankName2Icon["邮政储蓄银行"], BankUrl: "https://pbank.psbc.com/pweb/prelogin.do?_locale=zh_CN&BankId=9999" },
    { "text": "平安银行", "value": "平安银行", icon: bankName2Icon["平安银行"], BankUrl: "https://www.pingan.com.cn/pinganone/pa/index.screen" },
    { "text": "恒丰银行", "value": "恒丰银行", icon: bankName2Icon["恒丰银行"], BankUrl: "https://my.hfbank.com.cn/perbank/login.htm" },
    { "text": "其它银行", "value": "其它银行", icon: bankName2Icon["其它银行"] }
];

export default list;
export { bankName2Icon };
