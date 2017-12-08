const config={
    dev:{
        qrcode_src:"http://192.168.3.202/QRCodeFile/",
        action_url:"http://192.168.3.202/MemberCenter/ThirdPay.aspx",
        imgRoot:"http://192.168.3.202/image/",
        static:"/",
        resource:"/static/",
        messageCenter:"http://192.168.3.209:6060/signalr"
    },
    td:{
        qrcode_src:"http://192.168.3.202/QRCodeFile/",
        action_url:"http://192.168.3.202/MemberCenter/ThirdPay.aspx",
        imgRoot:"https://tbv3.tengbo6888.com/image/",
        static:"http://tbh5.tengbo6888.com/",
        resource:"http://tbh5.tengbo6888.com/static/",
        messageCenter:"https://tbv3.tengbo6888.com/signalr/hubs"
    },
    pd:{
        qrcode_src:"http://192.168.3.202/QRCodeFile/",
        action_url:"http://192.168.3.202/MemberCenter/ThirdPay.aspx",
        imgRoot:"https://static.tb5632.com:7443/tb2d1/image/",
        static:"https://static.tb5632.com:7443/",
        resource:"https://static.tb5632.com:7443/static/",
        messageCenter:""
    }
}

let _export ;
if (process.env.NODE_ENV === 'development' ) {
    _export = config.dev;
}else if(process.env.NODE_ENV === "production_td"){
    _export = config.td;
}else{
    _export = config.pd;
}

export default _export;