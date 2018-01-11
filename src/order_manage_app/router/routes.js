import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = resolve => require(['../../base_app/views/manage_home.vue'], resolve);
const OrderList = resolve => require(['../views/orderList.vue'], resolve);


let routes = [
    {
        path: '/manage',
        components: {
            default: ManageHome
        },
        name: '订单管理',
        iconCls: 'fa fa-address-book',
        redirect: '/orderList',
        children: [
            {
                path: '/orderList',
                component: OrderList,
                name: '订单列表',
            },      
        ]
    },  
];

export default routes;
