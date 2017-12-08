<template>
  <div class="mg-table">
    <table>
      <tr class="tb-header">
        <th>交易</th>
        <th>时间</th>
        <th>说明</th>
        <th>已下注</th>
        <th>奖金</th>
        <th>余额</th>
      </tr>
      <tr v-for="item in list">
        <td>{{ item.Transaction }}</td>
        <td>{{ tidyDate(item.Time,dateType) }}</td>
        <td>{{ item.Description }}</td>
        <td>{{ item.Wagered }}</td>
        <td>{{ item.Payout }}</td>
        <td>{{ item.ClosingBalance }}</td>
      </tr>
    </table>
    <div class="noRecord" v-show="noRecord">
      <span>--暂无记录--</span>
    </div>
  </div>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import { createDate } from 'common/date'
  export default{
    name: 'mgDetail',
    data(){
      return {
        list:[],
        noRecord: false
      }
    },
    created(){
      this.dateType = "MM-DD HH:mm";
    },
    mounted(){
      this.getMgDate();
    },
    methods:{
      //ajax获取数据
      getMgDate(){
        this.$loading.open();
        let sid = this.$route.params.sid;
        if(!sid){
          this.$router.push('/records');
          return;
        }
        this.noRecord = false;
        Api[ApiNames.MGGameRecordCommand]({
          p1: sid
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === config.ERR_OK){
            if(res.data.row.length>0)
              this.list = res.data.row;
            else
              this.noRecord = true;
          }else{
            this.sysErrCheck(res.data.Status).then(canrun=>{
              if(canrun){
                  this.alertTip(res.data.CNMessage);
              }
            })
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
          this.sysErrCheck(-9);
        })
      },
      tidyDate(){
        return createDate.apply(this, arguments);
      },
      //弹出框
      alertTip(msg,type){
        type = type || "error"  ;
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: type
        });
      }
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig', {
          title:"MG国际记录明细",
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        })
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('setSiteConfig', {
        showBack: false,
        showNav: true
      });
      next();
    },
  }
</script>

<style scoped lang="less">
.mg-table{
  color: #333;
  table{
    width:100%;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;
    tr.tb-header{
      /*position: fixed;*/
    }
    th{
      border-right:1px solid #e6e6e6;
      border-bottom:1px solid #e6e6e6;
      border-top:1px solid #e6e6e6;
      background: #f5f5f5;
      padding:0.15rem 0;
      padding-left:0.1rem;
      &:last-child{
        border-right:none;
      }
    }
    td{
      padding:0.25rem 0;
      padding-left:0.1rem;
      background: #fff;
      color: #666;
      border-bottom:.01rem solid #dcdcdc;
    }
  }
  .noRecord{
    margin:0 auto;
    text-align: center;
    margin-top:0.5rem;
  }
}
</style>
