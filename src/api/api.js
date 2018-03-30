import axios from 'axios';
import Vue from 'vue'
import { Message } from 'element-ui';

//__ustil.ajax('key',[params]).then()

// const baseUrl= "http://192.168.16.25/mapi/cvsm";
// const baseUrl= "http://192.168.16.25/mapi/cvsm";
const baseUrl= "http://192.168.16.25/mapi/cvsm";



export const api = {};

window['__uploadApi'] = `${baseUrl}/file/upload`;


window['__api'] = {
    api: api, base: baseUrl, register: function (_api) {
        Object.assign(this.api, _api);
    }
};

// 超时时间
//axios.defaults.timeout = 5000
// http请求拦截器

axios.interceptors.request.use(config => {
    const token = __session.getItem('accessToken');
    // console.log("token", token)
    if (token) {
        // Object.assign(config.headers, { token: token })
        config.headers.token = token;
        // console.log(config)
        // console.log(config.headers.Host)
        // alert(config.headers.token)
        // console.log("config.headers.token", token)

    }
    return config
}, error => {
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    return data
}, error => {
    return Promise.reject(error)
})


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 响应数据
    if (!response.data.success) {
        if (response.data.returnCode == "10000004" || response.data.returnCode == "11000001") {
            __logout();
            __Events.publish('toggleLoginDialog', true);

        } else {
            Message.error(response.data.returnMsg)
        }
    }

    return response;

}, function (error) {
    // 响应错误
    return Promise.reject(error);
});


