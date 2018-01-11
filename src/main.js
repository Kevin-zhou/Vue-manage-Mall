import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'

import 'font-awesome/css/font-awesome.min.css'

import api from "./api";

import appUtils from "./base_app/common/js/util";

import store from './base_app/vuex/index'

import adminModule from './admin_app/vuex';

import router from './base_app/router/routes'

import 'element-ui/lib/theme-chalk/index.css'

import msg from './base_app/config/msg'

Vue.use(ElementUI)

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

