<template>
  <transition name="slide-left">
  <div class="suggest">
    <!-- <tf-notice title="温馨提示：" content="您的参与将帮助我们改进产品及服务！" class="notice"></tf-notice> -->
    <div class="Cont-Spacing-02">
      <tf-cell-group class="sug-xuanzhe">
        <tf-cell-item arrow @click.native="selectShow=true">
          <span slot="left" class="title">反馈类型</span>
          <span slot="left" class="sort">{{ selectArr[sortIndex] || "选择反馈类型" }}</span>
        </tf-cell-item>
      </tf-cell-group>
    </div>
    <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item>
          <span slot="left" class="title">联系电话</span>
          <tf-input slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入手机号码，以便我们联系您！" v-model="phone"></tf-input>
        </tf-cell-item>
        <tf-cell-item  style="align-items: flex-start;">
          <span slot="left" class="title" style="padding-top:0.2rem">意见反馈</span>
          <tf-textarea slot="right" placeholder="请输入您的建议..." maxlength="400" style="height: 3rem" v-model="content"></tf-textarea>
        </tf-cell-item>
      </tf-cell-group>
    </div>
    <tf-button size="large" class="btnSubmit btn-boxshadow" type="primary" @click.native="submitSuggest()">确认</tf-button>
    <div v-if="selectShow2">
      <tf-actionsheet :items="selectItems" v-model="selectShow" cancel="取消"></tf-actionsheet>
    </div>
  </div>
  </transition>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import Notice from 'components/notice'
  import { TextArea } from '../tf-ui/components/textarea';
  import { ActionSheet } from '../tf-ui/components/actionsheet'
  export default {
    name: 'suggest',
    data(){
      return {
        selectItems:{},
        selectShow:false,
        sortIndex:-1,
        phone:"",
        content:"",
        selectItems:[],
        formData:{},
        selectShow2:false
      }
    },
    created(){
      this.selectArr= ['游戏平台','存款提款','客户服务','优惠活动','客户端','其它'];
    },
    mounted(){
      this.setSelectArr();
      setTimeout(()=>{
        this.selectShow2 = true;
      },420)
    },
    methods:{
      /**
       * 设置selectItems 数据
        */
      setSelectArr(){
        this.selectArr.map((item,index)=>{
          this.selectItems.push({
            label:item,
            method: () => {
              this.sortIndex = index;
            }
          });
        })
      },

      //表单验证
      formCheck(){
        let data = {};
        let type = this.sortIndex + 1;
        if(this.sortIndex===-1){
          this.alertTip("请选择反馈类型");
          return false;
        }else if(this.content.length<=0){
          this.alertTip("请输入你的建议内容！");
          return false;
        }else if(this.content.length>400){
          this.alertTip("建议内容应在400字以内！");
          return false;
        }
        type = type!=6?type:10;
        data.Type = type;
        data.Content = this.content;
        data.Tel = this.phone;
        this.formData = data;
        return true;
      },

      /**
       * 提交表单数据
       */
      submitSuggest(){
        if(this.formCheck()){
          this.$loading.open();
          Api[ApiNames.Feedback](this.formData).then(res=>{
            let data = res.data;
            if(data.Status === config.ERR_OK){
              this.$loading.close();
              this.alertTip("感谢您的反馈，我们会及时进行跟进","success");
              setTimeout(()=>{
                this.sortIndex = -1;
                this.content = "";
                this.phone = "";
                this.formData = {};
              },20)
            }else{
              this.sysErrCheck(data.Status).then(canrun=>{
                if(canrun){
                  this.alertTip(data.CNMessage);
                }
              })
            }
          }).catch(()=>{
            this.$loading.close();
            this.sysErrCheck(-9);
          })
        }
      },

      //弹出框
      alertTip(msg,type){
        type = type||'error';
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: type
        });
      }
      //{"Feedback":{"Type":"1","Content":"asdfasdfasdfasdfasdfa","Tel":"189698785412",
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:'投诉建议',
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('setSiteConfig', {
        showBack: false,
        showNav: true
      });
      next();
    },
    components:{
      [Notice.name]:Notice,
      [TextArea.name]:TextArea,
      [ActionSheet.name]:ActionSheet
    },
  }
</script>

<style scoped lang="less">
.suggest{
  font-size:.24rem;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  .sug-xuanzhe{
    position: relative;
    z-index: 6;
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .btnSubmit{
    width:96%;
    margin-left:2%;
    height: .88rem;
  }
  .title{
    width:1.8rem;
    display: inline-block;
  }
  .sort{
    color: #699deb;
    font-size:.26rem;
  }
}
</style>
