/**
 * Created by kobe on 2017/8/29.
 */
const state = {
  recordIndex:0, //报表名称索引
  dateIndex:0,  //当前选择日期的索引
  mgDateIndex:0, //mg国际厅索引
  list: [],   //表格数据
  mgDateList: ['今 天'],
  mgDateData: ['0_0'],
  dateList:[] //时间列表
}

const getters = {
    getRecords: state => state
}

const mutations = {
  setMGRecordConfig(state, {
    recordIndex = 0,
    dateIndex =0 ,
    mgDateIndex = 0,
    list = [],
    mgDateList = ['今 天'],
    mgDateData = ['0_0'],
    dateList = []
  }){
      state.recordIndex = recordIndex;
      state.dateIndex = dateIndex;
      state.mgDateIndex = mgDateIndex;
      state.list = list;
      state.mgDateList = mgDateList;
      state.mgDateData = mgDateData;
      state.dateList = dateList;
  }
}

export default {
  state,
  getters,
  mutations
}
