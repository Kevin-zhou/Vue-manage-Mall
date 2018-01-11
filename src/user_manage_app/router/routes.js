import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = resolve => require(['../../base_app/views/manage_home.vue'], resolve);
const UserInfo = resolve => require(['../views/info.vue'], resolve);
const SysGroupInfo = resolve => require(['../views/sysGroupInfo.vue'], resolve);
const UserShelfInfo = resolve => require(['../views/userShelf.vue'], resolve);
let routes = [
    {
        path: '/manage',
        components: {
            default: ManageHome
        },
        name: '用户管理',
        iconCls: 'fa fa-address-book',
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                component: UserInfo,
                name: '用户信息',
            },
            {
                path: '/sysGroupInfo',
                component: SysGroupInfo,
                name: '用户组信息',
            },
            {
                path:'/userShelf',
                component:UserShelfInfo,
                name:"用户货架"
            }
        ]
    },
];

export default routes;
