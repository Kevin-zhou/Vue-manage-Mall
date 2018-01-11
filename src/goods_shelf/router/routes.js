import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = r => require(['../../base_app/views/manage_home.vue'], r);
const goodsCheck = r => require(['../views/goodsCheck.vue'], r);
const goodsCheckList = r => require(['../views/goodsCheckList.vue'], r);
const goodsShelfManage = r => require(['../views/goodsShelfManage.vue'], r);
const replenishment = r => require(['../views/replenishment.vue'], r);
const userGoodsShelf = r => require(['../views/userGoodsShelf.vue'], r);
const goodsInventory = r => require(['../views/goodsInventory.vue'], r);
const addGoodsShelf = r => require(['../views/addGoodsShelf.vue'], r);
const addReplenishment = r => require(['../views/addReplenishment.vue'], r);

let routes = [
    {
        path: '/',
        components: {
            default: ManageHome
        },
        name: '货架管理',
        iconCls: 'fa fa-address-book',
        // redirect: '/goodsShelfManage',
        children: [
            {
                path: '/goodsShelfManage',
                component: goodsShelfManage,
                name: '货架管理',
            },
            {
                path: '/goodsCheck',
                component: goodsCheck,
                name: '盘点管理',
            },
            {
                path: '/goodsCheckList',
                component: goodsCheckList,
                hidden: true,
                name: '盘点清单',
            },
            {
                path: '/userGoodsShelf',
                component: userGoodsShelf,
                hidden: true,
                name: '货架商品',
            },
            {
                path: '/addGoodsShelf',
                component: addGoodsShelf,
                hidden: true,
                name: '新增商品',
            },
            {
                path: '/replenishment',
                component: replenishment,
                name: '补货管理',
            },
            {
                path: '/goodsInventory',
                component: goodsInventory,
                name: '库存管理',
            },
            {
                path:'/addReplenishment',
                component:addReplenishment,
                hidden:true,
                name:"新增补货"
            }
        ]
    },
];

export default routes;
