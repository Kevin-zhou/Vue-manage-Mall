import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const ManageHome = resolve => require(['../../base_app/views/manage_home.vue'], resolve);
const ProductList = resolve => require(['../views/product/productList.vue'], resolve);
const AddProduct = resolve => require(['../views/product/addProduct.vue'], resolve);
const EditProduct = resolve => require(['../views/product/editProduct.vue'], resolve);
const ViewProduct = resolve => require(['../views/product/viewProduct.vue'], resolve);
const CategoryList = resolve => require(['../views/category/list.vue'], resolve);
const EditCate = resolve => require(['../views/category/editCate.vue'], resolve);
const ViewCate = resolve => require(['../views/category/viewCate.vue'], resolve);

let routes = [
    {
        path: '/manage',
        components: {
            default: ManageHome
        },
        name: '商品管理',
        iconCls: 'fa fa-address-book',
        redirect: '/productList',
        children: [
            {
                path: '/productList',
                component: ProductList,
                name: '商品列表',
            }, 
            {
                path: '/categoryList',
                component: CategoryList,
                name: '商品分类',
            },
            {
                path: '/editCate',
                component: EditCate,
                name: 'editCate',
                hidden: true
            }, 
            {
                path: '/viewCate',
                component: ViewCate,
                name: 'viewCate',
                hidden: true
            }, 
            {
                path: '/addProduct',
                component: AddProduct,
                name: 'addProd',
                hidden: true
            },     
            {
                path: '/editProduct',
                component: EditProduct,
                name: 'editProd',
                hidden: true
            },
            {
                path: '/viewProduct',
                component: ViewProduct,
                name: 'viewProd',
                hidden: true
            },   
            
        ]
    },  
];

export default routes;
