import Vue from 'vue'
import Vuex from 'vuex'
const order = {
    getOrderList: { url: "/order/getOrderList", method: "POST" },
    getOrderItemInfo: { url: '/order/getOrderItemInfo', params: "?id=", method: "GET" },
    getOrderPayInfo: { url: '/order/getOrderPayInfo', params: "?orderNo=", method: "GET" },
    getOrder: { url: '/order/getOrder', method: "POST" }
}
__api.register({ "order": order });

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
  page: {},
  user:null
}
const getters = {

}
// 异步方法
const actions = {
    //获取列表
    getOrderList: function ({ state }, data) {
        return __utils.ajax('getOrderList', data);
    },
    //订单商品明细
    getOrderItemInfo: function ({ state }, data) {
        return __utils.ajax('getOrderItemInfo', data);
    },
    //订单支付明细
    getOrderPayInfo: function ({ state }, data) {
        return __utils.ajax('getOrderPayInfo', data);
    },
    //导出订单
    getOrder: function ({ state }, data) {
        return __utils.ajax('getOrder', data);
    },

}

// 同步方法
const mutations = {

}

const orderModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

//注册当前模块
__store.registerModule("order", orderModule)


