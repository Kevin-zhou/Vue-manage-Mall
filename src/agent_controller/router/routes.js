import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = resolve => require(['../../base_app/views/manage_home.vue'], resolve);
const AgenttList = resolve => require(['../views/list.vue'], resolve);
const EditAgent = resolve => require(['../views/editAgent.vue'], resolve);
const ViewAgent = resolve => require(['../views/viewAgent.vue'], resolve);

let routes = [
    {
        path: '/manage',
        components: {
            default: ManageHome
        },
        name: '代理商管理',
        iconCls: 'fa fa-address-book',
        redirect: '/agenttList',
        children: [
            {
                path: '/agenttList',
                component: AgenttList,
                name: '代理商列表',
            },
            {
                path: '/editAgent',
                component: EditAgent,
                name: 'viewProd',
                hidden: true
            },   
            {
                path: '/viewAgent',
                component: ViewAgent,
                name: 'ViewAgent',
                hidden: true
            },
        ]
    },  
];

export default routes;
