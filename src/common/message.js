import config from "./evn.config"
import UA from "./ua-parser"
import gVars from "./GlobalVars"

export default function MsgContent() {
  const webUA = new UA();
  let qs = {
    "BrowserInfo": window.navigator.userAgent,
    "Host": location.host,
    "BSCore": webUA.getEngine().name + "/" + webUA.getEngine().version,
    "OSVer": webUA.getOS().name + "/" + webUA.getOS().version,
    "Divice": "H5",
    "Phone": webUA.getDevice().model,
    "Terminal": webUA.getOS().name,
    "IP": "[*IP*]",
    "SID": gVars.SID,
    "Token": gVars.Token,
    "ACNT": gVars.ACNT
  }
  qs = JSON.stringify(qs)
  const htmlTmp =
    `<script src="${config.resource}/jquery-1.6.4.min.js" ><\/script>
    <script src="${config.resource}/jquery.signalR-2.2.2.min.js" ><\/script>
    <script>
        function _msgWrap(type,content){
          return {
            'type':type,
            'content':content
          }
        }
       $(function () { 
         var connection=$.hubConnection('${config.messageCenter}'); 
         var TipCenter = connection.createHubProxy('tipCenter');  
         connection.qs=${qs};
         TipCenter.on('sendMessage',function(ID,Title,Msg){
           var msgWrap = _msgWrap('msg',{'ID':ID,'SendTitle':Title,'SendContent':Msg,'CreateTime':Date.now(),'IsRead':false});
           window.parent.postMessage(msgWrap,"*")
         });
         TipCenter.on('Register',function(rep){  
           
           var data = JSON.parse(rep),msg;
           if(data.state == '0'){ 
             connection.stop();
             msg = _msgWrap('notice','the user not login,stop message')
            }else{
              msg = _msgWrap('notice','message is already')
            }

            window.parent.postMessage(msg,"*")
         }); 
         connection.start()
        
       });
    <\/script>`
  return htmlTmp;
}