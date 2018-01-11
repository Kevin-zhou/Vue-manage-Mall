import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = r => require(['../../base_app/views/manage_home.vue'], r);
const apply = r => require(['../views/apply.vue'], r);


let routes = [
    {
        path: '/',
        components: {
            default: ManageHome
        },
        name: '渠道管理',
        iconCls: 'fa fa-address-book',
        // redirect: '/apply',
        children: [
            {
                path: '/apply',
                component: apply,
                name: '渠道申请',
            },
        ]
    },
];

export default routes;
