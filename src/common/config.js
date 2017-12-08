/**
  *  项目的公用的配置
 */
const ERR_OK = 1;
const TEL_OK = 973; //手机获取验证码 正确
const MAIL_OK = 974; //邮箱获取验证码 正确
const MAILSEND_OK = 965; //发送验证码到邮箱成功
const MOBILESEND_OK = 964; //发送验证码到手机成功
const MAILCHECK_OK = 952;
const REG_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z][^\\/#%'"".\??]{5,11}$/; //验证密码
//api返回正常的状态码
export default {
  ERR_OK,
  TEL_OK,
  MAIL_OK,
  MAILSEND_OK,
  MOBILESEND_OK,
  MAILCHECK_OK,
  REG_PASSWORD
};
