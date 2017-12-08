<template>
  <transition name="slide-left">
    <div class="re-wrap">
    <div class="select-con">
      <div class="select-con-list">
        <span class="select-title">报表名称：</span>
        <div class="select-con-sel" @click="showSelectMenu(0)" v-bind:class="{active: showSelectIndex==0}">
          <span>{{ recordList[recordIndex] }}</span>
          <i class="icon tb icon-right-copy"></i>
        </div>
      </div>
      <div class="select-con-list" v-if="recordIndex!=7">
        <span class="select-title">查询日期：</span>
        <div class="select-con-sel date" @click="showSelectMenu(1)" v-bind:class="{active: showSelectIndex==1}" >
          <span v-if="dateList.length">{{recordIndex!=6 ? dateList[dateIndex].year + '年'+ dateList[dateIndex].month +'月' : mgDateList[mgDateIndex]}}</span>
          <i class="icon tb icon-right-copy"></i>
        </div>
      </div>
      <div v-else class="select-con-list"></div>
    </div>

    <RecordList
      :sortIndex="recordIndex"
      :list="list"
      v-show="list.length>0"
      @readMore="readMore">
    </RecordList>
    <div class="noRecord" v-show="noRecord">
      <span>--暂无记录--</span>
    </div>

    <div class="slect-menu-layer" v-show="showSelectIndex!=-1" @click="hideSelectDiv"></div>
    <div class="slect-menu">
      <ul class="sort"  v-show="showSelectIndex==0">
        <li v-for="(item, index) in recordList" v-bind:class="{ active: index==recordIndex}" @click="chooseSort(item, index)">{{item}}</li>
      </ul>
      <ul class="time" v-show="showSelectIndex==1&&recordIndex!=6">
        <li v-for="(item,index) in dateList" v-bind:class="{active: index===dateIndex}" @click="chooseDate(index)">{{item.year+'年'+item.month+'月'}}</li>
      </ul>
      <ul class="time mgtime" v-show="showSelectIndex==1&&recordIndex==6">
        <li v-for="(item,index) in mgDateList" v-bind:class="{active: index===mgDateIndex}" @click="chooseMgDate(index)">{{ item }}</li>
      </ul>
    </div>
    <div>{{recordConfig.recordIndex}}</div>
  </div>
  </transition>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import { createDate } from 'common/date'
  import RecordList from 'components/record-list/record-list'

  export default {
    name: "records",
    data(){
      return {
        list:[], //内容列表数据
        dateList:[], // 查询日期列表
        recordIndex:0, //报表名称索引
        dateIndex:0,  //当前选择日期的索引
        curYear : "", //当前年份 api
        curMonth: "", //当前获取到的月份 api
        selectYear:"",//选择的年份
        selectMonth:"", //选择的月份
        showSelectIndex:-1, // 显示下拉选择器
        isReady:false ,//是否请求到了当前时间数据
        noRecord:false,
        mgDateIndex:0 //mg国际厅索引
      }
    },
    created(){
      this.recordList = ['存款记录','洗码记录','积分记录','优惠记录','提款记录','额度记录','MG国际','优惠历史'];
      this.apiName = ['GetDepositRecordCommand','GetBetBonusRecordCommand','GetPointsRecordCommand','GetPromotionRecordCommand','GetWithdrawalRecordCommand','GetGameTranRecordCommand','MGSessionRecordCommand','GetAnniversaryBonusCommand'];
      this.mgDateList = ['今 天'];
      this.mgDateData = ['0_0'];
      this.getCurDate();
    },
    mounted(){
      this.getRecords = this.recordConfig();
      this.init();
    },
    methods:{
       init(){
         if(this.getRecords.list.length!=0){
           this.list = this.getRecords.list;
           this.mgDateData = this.getRecords.mgDateData;
           this.mgDateIndex = this.getRecords.mgDateIndex;
           this.mgDateList = this.getRecords.mgDateList;
           this.recordIndex = this.getRecords.recordIndex;
           this.dateList =  this.getRecords.dateList;
           this.dateIndex = this.getRecords.dateIndex;
           this.noRecord = false;
           return;
         }
       },
      //选择报表名称
      chooseSort(item,index){
        item = item?item:"存款记录";
        index = index?index:0;
        if(this.recordIndex == index && this.list.length!=0){
          this.showSelectIndex = -1;
          return;
        }
        this.recordIndex = index;
        this.showSelectIndex = -1;
        this.dateIndex = 0;
        this.list = [];
        this.ajaxChangeMenu();
      },

      //选择日期
      chooseDate(index){
        if(this.dateIndex == index && this.list.length!=0){
          this.showSelectIndex = -1;
          return;
        }
          this.dateIndex = index;
          this.showSelectIndex = -1;
          this.ajaxChangeMenu();
      },

      //ajax请求数据，选择条件变化
      ajaxChangeMenu(){
        if(this.recordIndex===6) {
          this.ajaxMgRecord();
          return;
        }
        this.$loading.open();
        this.noRecord = false;
        Api[this.apiName[this.recordIndex]]({
          year: this.dateList[this.dateIndex].year,
          month: this.dateList[this.dateIndex].month.toString()
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === config.ERR_OK){
            this.list = res.data.row;
//            this.list = [{"CreateTime":"2017-12-02T04:38:05.083Z","Amount":1.0,"LogTypeName":"优惠卸分"}]
            if(res.data.row.length === 0){
              this.noRecord = true;
            }
          }else{
            this.sysErrCheck(res.data.Status).then(canrun=>{
              if(canrun){
                this.sysErrCheck(-9);
              }
            })
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
        });
      },

      //mg请求数据
      ajaxMgRecord(){
        this.$loading.open();
        let mgData = this.mgDateData[this.mgDateIndex].split('_');
        Api[this.apiName[this.recordIndex]]({
          p1: mgData[0],
          p2: mgData[1],
          p3: "17"
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === config.ERR_OK){
              this.mgDateList = res.data.row.DateParaText.split(',');
              this.mgDateData = res.data.row.DateParaValue.split(',');
              this.list = typeof res.data.row.SessionList ==="string"?[]: res.data.row.SessionList;
              if(typeof res.data.row.SessionList==="string"){
                this.noRecord = true;
              }
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
        })
      },

      //mg国际选中时间
      chooseMgDate(index) {
        this.mgDateIndex = index;
        this.noRecord = false;
        this.showSelectIndex = -1;
        this.list = [];
        this.ajaxMgRecord()
      },

      //获取当前日期时间
      getCurDate(){
        Api[ApiNames.GetServerDateCommand]().then(res=>{
            if(res.data.Status === config.ERR_OK){
              this.curYear = res.data.row.Year;
              this.curMonth = res.data.row.Month;
              this.isReady = true;
            }
        })
      },

      //打开下拉框
      showSelectMenu(index){
        this.noRecord = false;
        this.showSelectIndex = index;
      },

      //创建时间选项列表数据
      creatDateList(){
        let m = this.curMonth ? this.curMonth : new Date().getMonth()+1;
        let y = this.curYear ? this.curYear : new Date().getFullYear();
        var arr = [];
        let temp = m+1;
        let temp2 = y, mm = m, yy = y;
        for(var i=0;i<3;i++){
          temp -= 1;
          temp = temp<=12?temp:1;
          yy = ((temp == 1||temp == 2)&&m==12)?temp2+1:temp2;
          mm = temp<10?'0'+temp:temp;
          arr.push({
            year:yy.toString(),
            month:mm
          })
        }
        this.dateList = arr;
      },

      //子组件派发的事件，保存数据到vuex
      readMore(sid){
          this.$store.commit('setMGRecordConfig',{
            recordIndex:this.recordIndex, //报表名称索引
            dateIndex:this.dateIndex,  //当前选择日期的索引
            mgDateIndex:this.mgDateIndex, //mg国际厅索引
            list: this.list,   //表格数据
            mgDateList: this.mgDateList,
            mgDateData: this.mgDateData,
            dateList:this.dateList //时间列表
          });
        this.$router.push({path:'/mgDetail/'+sid })
      },

      //弹出框
      alertTip(msg){
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: 'error'
        });
      },

      //点击空白处，隐藏选择器
      hideSelectDiv(){
        this.showSelectIndex = -1;
      },
      ...mapMutations([
        "setTitle",
        "setShowNav",
        "setShowHeader",
        "setSiteConfig",
        "setMGRecordConfig"
      ]),
      ...mapGetters({
        recordConfig: 'getRecords'
      })
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig', {
          title:"客户报表",
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
    watch:{
      isReady(newReady,oldReady){
        if(this.getRecords.list.length>0) return;
        if(newReady===true){
          this.creatDateList();
          this.chooseSort();
        }
      }
    },
    components:{
      RecordList
    }
  }
</script>

<style scoped lang="less">
@color-red:#f01924;
@color-blue:#09f;
@font-color:#333;
.re-wrap{
  background: #f5f5f5;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .select-con{
    height:.8rem;
    padding:.16rem .2rem;
    overflow: hidden;
    border-bottom:1px solid #e5e5e5;
    overflow: hidden;
    .select-con-list{
      /*width:50%;*/
      float: left;
      overflow: hidden;
      &:last-child{
        float: right;
      }
      span.select-title{
        font-size:.24rem;
        color: #bebebe;
        float: left;
        line-height:.5rem;
      }
      .select-con-sel{
        width: 1.8rem;
        height:.47rem;
        border: 1px solid #dcdcdc;
        border-radius:0.06rem;
        background: #fff;
        float: left;
        position: relative;
        i{
          float:right;
          position: absolute;
          padding:.1rem .1rem 0 0;
          top:0;
          right:0;
          z-index: 2;
          background: #fff;
        }
        &.active{
          border-color: #009aff;
          span, i{
            color: #009aff;
          }
        }
        &.date{
          width:2.2rem;
        }
        span{
          color: #323232;
          display: inline-block;
          font-size:.24rem;
          padding-left:0.2rem;
          line-height:.47rem;
        }
      }
    }
  }
  .slect-menu-layer{
    position: fixed;
    height:100%;
    width:100%;
    background: #fff;
    opacity:0.8;
    top:1.7rem;
    z-index:1;
  }
  .slect-menu{
    width:100%;
    background: #fff;
    z-index:2;
    position: absolute;
    top:0;
    border-bottom:0.02rem solid #d8d8d8;
    overflow: hidden;
    ul{
      padding:.28rem .25rem;
      &.mgtime{
        li{
          width:88%;
          padding:.2rem 0;
          margin-left:5%;
        }
      }
      li{
        float: left;
        width:31.3%;
        text-align: center;
        padding:0.15rem 0;
        border:1px solid #bbb;
        color: #666;
        margin:0 0.2rem .2rem 0;
        -webkit-border-radius:0.06rem;
        border-radius:0.06rem;
        &:nth-child(3),&:nth-child(6),&:nth-child(3),&:nth-child(9){
          margin-right: 0;
        }
        &.active{
          color:@color-red;
          border-color: @color-red;
        }
      }
    }
  }
  .noRecord{
    margin:0 auto;
    text-align: center;
    margin-top:0.5rem;
  }
}
</style>
