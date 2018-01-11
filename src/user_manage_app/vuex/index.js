import Vue from 'vue'
import Vuex from 'vuex'

const user = {
    // 用户管理
    // 1、查询用户列表
    getSysUserList: { url: "/sysUser/getSysUserList", method: "post" },
    // 新增用户
    addSysUser: { url: "/sysUser/addSysUser", method: "POST" },
    //     3、停用用户
    //     接口：http://192.168.16.16:8000/sysUser/disableSysUser?id=1
    disableSysUser: { url: "/sysUser/disableSysUser", params: "?id=", method: "get" },

    // 4、启用用户
    //     接口：http://192.168.16.16:8000/sysUser/enableSysUser?id=1
    enableSysUser: { url: "/sysUser/enableSysUser", params: "?id=", method: "get" },
    //代理商id /agent/getEnabledAgentList
    getEnabledAgentList: { url: "/agent/getEnabledAgentList", method: "get" },

    // 用户组管理
    //查询用户组列表  /sysGroup/getSysGroupList
    // 查询条件：
    // {
    //   "groupName":"test", //用户组名称
    //   "groupNo":"123456", //用户组编号
    //   "isActive":"1" //用户组状态
    // }
    getSysGroupList: { url: "/sysGroup/getSysGroupList", method: "post" },

    //新增用户组 /sysGroup/addSysGroup
    //    参数
    //      {
    //          "groupName":"test",//用户组名称 必填
    //          "remark":"test" //备注
    // }
    addSysGroup: { url: "/sysGroup/addSysGroup", method: "POST" },

    //停用
    disableSysGroup: { url: "/sysGroup/disableSysGroup", params: "?id=", method: "get" },

    //启用
    enableSysGroup: { url: "/sysGroup/enableSysGroup", params: "?id=", method: "get" },

    //根据用户组id查询不属于此用户组下的用户
    getAllSysUser: { url: "/sysUser/getAll", method: "get" },

    //根据用户组id查询属于此用户组下的用户
    getGroupUserList: { url: "/sysGroup/getGroupUserList", method: "post" },

    //新增用户组用户  /sysGroup/addSysGroupuser
    // 参数：
    //  {
    //   "groupUser": [{"groupId": "1", "userId": "1"}],//要删除的参数
    //   "sysGroupuser": [{"groupId": "1", "userId": "2"}] //要添加的参数
    // }
    addSysGroupuser: { url: "/sysGroup/addSysGroupuser", method: "post" },
    //查询用户组用户货架
    getUserShelfList:{url: "/userShelf/getUserShelfList",method:"post"}

}

__api.register({ "user": user });



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
    // 获取用户列表
    getSysUserList: function ({ state }, params) {
        return __utils.ajax("getSysUserList", params);
    },
    //新增
    addSysUser: function ({ state }, params) {
        return __utils.ajax("addSysUser", params);
    },
    // 启用用户
    enableSysUser: function ({ state }, params) {
        return __utils.ajax("enableSysUser", params);
    },
    // 停用用户
    disableSysUser: function ({ state }, params) {
        return __utils.ajax("disableSysUser", params);
    },
    //代理商id
    getEnabledAgentList: function ({ state }, params) {
        return __utils.ajax("getEnabledAgentList", params);
    },


    //查询用户组列表
    getSysGroupList: function ({ state }, params) {
        return __utils.ajax("getSysGroupList", params);
    },
    //新增用户组
    addSysGroup: function ({ state }, params) {
        return __utils.ajax("addSysGroup", params);
    },
    // 启用用户组
    enableSysGroup: function ({ state }, params) {
        return __utils.ajax("enableSysGroup", params);
    },
    // 停用用户组
    disableSysGroup: function ({ state }, params) {
        return __utils.ajax("disableSysGroup", params);
    },
    //根据用户组id查询不属于此用户组下的用户
    getAllSysUser: function ({ state }, params) {
        return __utils.ajax("getAllSysUser", params);
    },
    //根据用户组id查询属于此用户组下的用户
    getGroupUserList: function ({ state }, params) {
        return __utils.ajax("getGroupUserList", params);
    },

    //新增用户组用户
    addSysGroupuser: function ({ state }, params) {
        return __utils.ajax("addSysGroupuser", params);
    },
    //查询用户货架
    getUserShelfList:function ({ state }, params) {
        return __utils.ajax("getUserShelfList", params);
    }

}

// 同步方法
const mutations = {
    // // 更新用户列表
    // updateUserList: function (state, data) {
    //     state.page = data;
    // },
    // // 更新用户
    // updateUser: function (state, data) {
    //     state.user = data;
    // },
}

const userModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//注册当前模块
__store.registerModule("user", userModule)


