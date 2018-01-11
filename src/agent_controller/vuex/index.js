import Vue from 'vue'
import Vuex from 'vuex'
const agent = {
    getAgentList: { url: "/agent/getAgentList", method: "POST" },
    addAgent: { url: "/agent/addAgent",  method: "POST" },
    deleteAgent: { url: "/agent/deleteAgent", params: "?id=", method: "GET" },
    getAgentById: { url: "/agent/getAgentById", params: "?id=", method: "GET" },
    updateAgent: { url: "/agent/updateAgent",  method: "POST" },

}
__api.register({ "agent": agent });

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
    //获取代理商列表
    getAgentList: function ({ state }, params) {      
       return __utils.ajax('getAgentList', params);
    },
    //根据id删除代理商
    deleteAgent: function ({ state }, params) {      
        return __utils.ajax('deleteAgent', params);
     },
    //新增代理商
    addAgent: function ({ state }, params) {      
        return __utils.ajax('addAgent', params);
    },
     //根据id获取代理商信息
    getAgentById: function ({ state }, params) {      
        return __utils.ajax('getAgentById', params);
    },
    //根据id更新代理商信息
    updateAgent: function ({ state }, params) {      
        return __utils.ajax('updateAgent', params);
    },

}

// 同步方法
const mutations = {

}

const agentModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

//注册当前模块
__store.registerModule("agent", agentModule)


