import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import config from '../config/app_config'
import { Loading } from 'element-ui';

// 导入各app内的路由文件
import LoginRoutes from '../../admin_app/router/routes.js';
import UserManageRoutes from '../../user_manage_app/router/routes.js';
import goodsShelfManage from '../../goods_shelf/router/routes.js';
import ProductManageRoutes from '../../product_manage_app/router/routes.js'
import OrderManageRoutes from '../../order_manage_app/router/routes.js'
import AgentControllerRoutes from '../../agent_controller/router/routes.js'
import channel from '../../channel/router/routes.js'

let routes = [
    {
        path: '/',
        redirect: '/manage',
        hidden: true
    },

];

// 合并全部路由路径
routes = routes.concat(LoginRoutes);
routes = routes.concat(UserManageRoutes);
routes = routes.concat(goodsShelfManage);
routes = routes.concat(ProductManageRoutes);
routes = routes.concat(OrderManageRoutes);
routes = routes.concat(AgentControllerRoutes);
routes = routes.concat(channel);
// routes = routes.concat(dictionaries);
// 实例化vue路由
const router = new VueRouter({
    mode: config.mode,
    base: config.base,
    routes,
})


router.beforeEach((to, from, next) => {
    const isLogin = __isLogin();
    if (!isLogin && to.path != '/login') {
        next({ path: '/login' })
    }

    if (isLogin && to.path == '/login') {
        next({ path: '/' })
    } else {
        next();
    }

})

export default router;
