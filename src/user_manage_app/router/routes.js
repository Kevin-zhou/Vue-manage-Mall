import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = resolve => require(['../../base_app/views/manage_home.vue'], resolve);
const UserInfo = resolve => require(['../views/info.vue'], resolve);

let routes = [
    {
        path: '/manage',
        components: {
            default: ManageHome
        },
        name: '首页',
        iconCls: 'fa fa-address-book',
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                component: UserInfo,
                name: '首页管理',
            },

        ]
    },
];

export default routes;
