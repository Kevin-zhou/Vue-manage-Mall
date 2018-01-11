import Vue from 'vue'
import Vuex from 'vuex'

const shelf = {
    // 查询城市地区
    // GET /district/getDistrictListByCode?code="320000"
    getDistrictListByCode: { url: "/district/getDistrictListByCode", params: "?code=320000", method: "get" },

    // 渠道申请设置为已联系
    // GET /channelApply/updateChannelApplyById?id=1
    updateChannelApplyById: { url: "/channelApply/updateChannelApplyById", params: "?id=", method: "get" },

    //列表
    // /channelApply/getChannelApplyList  post
    // {
    //     "companyName": "腾楷", //公司名称
    //     "contactName": "",  //联系人
    //     "contactPhone": "",  //联系电话
    //     "cityCode":"320101",  //城市编码
    //     "isContact": 1,  //联系状态.默认1未联系，0已联系
    //     "applyOrigin": 1,  //申请来源.默认1货架页面，2货架分享
    //     "startTime":1513649716000, //申请开始时间
    //     "endTime":1513649716000 //申请结束时间
    //   }
    getChannelApplyList: { url: "/channelApply/getChannelApplyList", method: "post" },



}

__api.register({ "shelf": shelf });



Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
    page: {},
    user: null
}
const getters = {

}
// 异步方法
const actions = {
    // 1、查询列表
    getChannelApplyList: function ({ state }, params) {
        return __utils.ajax("getChannelApplyList", params);
    },
    // 渠道申请设置为已联系
    updateChannelApplyById: function ({ state }, params) {
        return __utils.ajax("updateChannelApplyById", params);
    },
    // 查询城市地区
    getDistrictListByCode: function ({ state }, params) {
        return __utils.ajax("getDistrictListByCode", params);
    },

}

// 同步方法
const mutations = {

}

const channelModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//注册当前模块
__store.registerModule("channel", channelModule)


