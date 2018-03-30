import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import config from '../config/app_config'
import { Loading } from 'element-ui';

// 导入各app内的路由文件
import LoginRoutes from '../../admin_app/router/routes.js';
import UserManageRoutes from '../../user_manage_app/router/routes.js';

let routes = [
    {
        path: '/',
        redirect: '/userInfo',
        hidden: true
    },

];

// 合并全部路由路径
routes = routes.concat(LoginRoutes);
routes = routes.concat(UserManageRoutes);

// routes = routes.concat(dictionaries);
// 实例化vue路由
const router = new VueRouter({
    mode: config.mode,
    base: config.base,
    routes,
})


router.beforeEach((to, from, next) => {
    const isLogin = __isLogin();
    // if (!isLogin && to.path != '/login') {
    //     next({ path: '/login' })
    // }

    // if (isLogin && to.path == '/login') {
    //     next({ path: '/' })
    // } else {
    next();
    // }

})

export default router;
