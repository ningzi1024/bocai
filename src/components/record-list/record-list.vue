<template>
  <div class="table">
    <table>
      <tr class="table-header" v-bind:class="{xima: sortIndex==1}">
        <th v-for="item in thList[sortIndex]">{{item}}</th>
      </tr>
      <tr class="table-body" v-show="sortIndex==0" v-for="item in list">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.Amount }}</td>
      </tr>
      <tr class="table-body xima" v-show="sortIndex==1" v-for="item in list">
        <td>{{ tidyDate(item.CreateTime,"MM-DD HH:MM") }}</td>
        <td>{{ item.LogTypeName }}</td>
        <td>{{ item.BetAmount }}</td>
        <td>{{ item.BetBonus }}</td>
        <td>{{ item.Amount }}</td>
      </tr>
      <tr class="table-body" v-show="sortIndex==2" v-for="item in list">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.LogTypeName }}</td>
        <td>{{ item.Amount }}</td>
        <td></td>
      </tr>
      <tr class="table-body" v-show="sortIndex==3" v-for="item in list" v-bind:class="{redTxt: item.LogTypeName=='优惠卸分'}">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.LogTypeName }}</td>
        <td>{{ item.Amount }}</td>
        <td></td>
      </tr>
      <tr class="table-body" v-show="sortIndex==4" v-for="item in list" v-bind:class="{redTxt: item.LogType==9||item.LogType==10}">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.Amount }}</td>
      </tr>
      <tr class="table-body" v-show="sortIndex==5" v-for="item in list">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.LogTypeName }}</td>
        <td>{{ item.GameName }}</td>
        <td>{{ item.Amount }}</td>
        <td>{{ item.Balance}}</td>
      </tr>
      <tr class="table-body" v-show="sortIndex==6" v-for="item in list">
        <!--<td><router-link tag="span" class="mine" :to="'/mgDetail/'+item.Session">{{ item.Session }}</router-link></td>-->
        <td><span @click="readMore(item.Session)">{{ item.Session }}</span></td>
        <td>{{ tidyDate(item.StartTime, dateFormat2) }}</td>
        <td>{{ item.StartCredits }}</td>
        <td>{{ tidyDate(item.EndTime, dateFormat2) }}</td>
        <td>{{ item.EndCredits }}</td>
      </tr>
      <tr class="table-body" v-show="sortIndex==7" v-for="item in list">
        <td>{{ tidyDate(item.CreateTime,dateFormat) }}</td>
        <td>{{ item.LogTypeName }}</td>
        <td>{{ item.Amount }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { createDate } from 'common/date'
export default {
  name:'record-list',
  props:{
    sortIndex:{
      type:Number,
      default:0
    },
   list :{
     type: Array,
     default: []
   }
  },
  data(){
    return {
      cLists:[]
    }
  },
  created(){
    console.log(this.sortIndex)
    this.thList = [
      ['存款日期','存款金额'], //存款记录
      ['洗码日期','洗码类型','有效投注额','洗码比例','洗码金额'],   //洗码记录
      ['日 期','类 型','金 额','备 注'],  //积分记录
      ['日 期','类 型','金 额','备 注'],   //优惠记录
      ['提款日期','提款金额'],  //提款记录
      ['日 期','类 型','平 台','额度变化','主账户额度'],  //额度记录
      ['明 细','开始时间','开始存款','终止时间','终止存款'], //MG国际
      ['日 期','类 型','余 额']  //历史优惠
    ];
    this.dateFormat = 'YYYY-MM-DD HH:mm:ss';
    this.dateFormat2 = 'MM-DD HH:mm';
  },
  mounted(){

  },
  methods:{
    tidyDate(){
      return createDate.apply(this, arguments);
    },

    //查看，派发事件
    readMore (sid) {
      this.$emit('readMore',sid);
    }
  }
}
</script>

<style scoped lang="less">
  @font-color:#333;
  .table{
    font-size:.24rem;
    color:@font-color;
    table{
      width:100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: left;
      tr{
        height:0.88rem;
        &.table-header{
          height:0.6rem;
          th{
            border-right:1px solid #e6e6e6;
            border-bottom:1px solid #e6e6e6;
            background: #f5f5f5;
            &:nth-child(1){
              text-align: left;
              padding-left:.25rem;
            }
          }
        }
        &.xima{
          th,td{
            padding-left:.1rem;
          }
          th{
            &:nth-child(1){
               width:28%;
             }
          }
        }
        td,th{
          background: #fff;
          padding-left:.22rem;
          span{
            color:#09f;
          }
          &:nth-child(1){
            padding-left:.25rem;
          }
        }
        td{
          border-bottom:1px solid #dcdcdc;
        }
      }
    }
    .redTxt td{
      color: #f01924;
    }
  }
</style>
