

//登录注册 Vuex
const state = {
    isLogin:false,
}
const getters = {

}
// 异步方法
const actions = {
    postLogin({},data){       
        return __utils.ajax('login',data);
    },
    postLogout({}){       
        return __utils.ajax('logout');
    }
}

// 同步方法
const mutations = {
    saveLogin:function(state,data){
        state.isLogin=data.success;
        __session.setItem("accessToken",data.data)
    }
}

const adminModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//注册当前模块
__store.registerModule("admin", adminModule)