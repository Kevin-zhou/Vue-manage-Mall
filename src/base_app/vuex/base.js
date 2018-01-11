import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
    loginDialogVisible: false,
}
const getters = {

}
// 异步方法
const actions = {
    // 文件上传
    upload: function ({state}, pathStr) {
        return __utils.post('upload', { path: pathStr });
    },
    //公共字典项select组件   根据dictKey查询字典项值
    getDictValue: ({ state }, params) => {
        return __utils.get("getDictValue", params);
    },
    //判断图片上传
    beforeAvatarUpload(state, file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            Message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            Message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
}

// 同步方法
const mutations = {
    // 显示隐藏登录弹框
    updateLoginDialog: function (state, data) {
        state.loginDialogVisible = data;
    },

}

const baseModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


//注册当前模块
__store.registerModule("base", baseModule)


