/**
 * Created by tengfa on 2017/9/5.
 */
import Api from "api/User"
import ApiNames from "api/API.list"
/**
 * api 通用模板
 * @param apiName api名
 * @param data  参数
 * @param succCode 正常返回 Status
 * @param that 传递过来的this
 */
export default function ajaxCommon(apiName,data={},succCode=1,that=null,showLoading=true){
  if(showLoading){
    that.$loading.open();
  }
  return Api[ApiNames[apiName]](data).then(res=>{
          let data = res.data;
          if(data.Status === succCode){
            that.$loading.close();
            return Promise.resolve(data);
          }else{
            that.$loading.close();
            that.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                let msg = data.CNMessage;
                if(data.Status == 1000){
                  msg = msg.replace("{0}","验证码");
                }
                that.$toast({
                  mes: msg,
                  timeout: 1500,
                  icon: 'error'
                });
              }
            })
          }
        }).catch(()=>{
          that.$loading.close();
          that.sysErrCheck(-9);
        })
}
