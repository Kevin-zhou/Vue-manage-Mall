import Vue from 'vue'
import Vuex from 'vuex'
const product = {
    getProductList: { url: "/product/getProductList", method: "POST" },
    deleteProduct: { url: "/product/deleteProduct", params: "?id=", method: "GET" },
    addProduct: { url: "/product/addProduct", method: "POST" },
    getProductByBarcode: { url: "/product/getProductByBarcode", params: "?barCode=", method: "GET" },
    getProductById: { url: "/product/getProductById", params: "?id=", method: "GET" },
    updateProduct: { url: "/product/updateProduct", method: "POST" },
    getProductCategoryList: { url: "/productCategory/getProductCategoryList", method: "POST" },
    deleteProductCategory: { url: "/productCategory/deleteProductCategory", params: "?id=", method: "GET" },
    descendProductCategoryById: { url: "/productCategory/descendProductCategoryById", params: "?id=", method: "GET" },
    ascendProductCategoryById: { url: "/productCategory/ascendProductCategoryById", params: "?id=", method: "GET" },
    addProductCategory: { url: "/productCategory/addProductCategory",  method: "POST" },
    getProductCategoryById : { url : "/productCategory/getProductCategoryById", params: "?id=", method: "GET" },
    updateProductCategory: { url: "/productCategory/updateProductCategory", method: "POST" },
}
__api.register({ "product": product });

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
  page: {},
  user:null
}
const getters = {

}
// 异步方法
const actions = {
    //获取商品列表
    getProdList: function ({ state }, params) {      
       return __utils.ajax('getProductList', params);
    },
    //删除商品
    deleteProduct: function({ state }, params){
        return __utils.ajax('deleteProduct', params);
    },
    //新增商品
    addProduct: function({ state }, params){
        return __utils.ajax('addProduct', params);
    },
    //根据条形码获取商品信息
    getProductByBarcode: function({ state }, params){
        return __utils.ajax('getProductByBarcode', params);
    },
    //根据id获取商品信息
    getProductById: function({ state }, params){
        return __utils.ajax('getProductById', params);
    },
    //更新商品信息
    updateProduct: function({ state }, params){
        return __utils.ajax('updateProduct', params);
    },
    //获取商品分类列表
    getProductCategoryList: function({ state }, params){
        return __utils.ajax('getProductCategoryList', params);
    },
    //根据id删除分类
    deleteProductCategory: function({ state }, params){
        return __utils.ajax('deleteProductCategory', params);
    },
    //根据id分类排序+1
    descendProductCategoryById: function({ state }, params){
        return __utils.ajax('descendProductCategoryById', params);
    },
    //根据id分类排序-1
    ascendProductCategoryById: function({ state }, params){
        return __utils.ajax('ascendProductCategoryById', params);
    },
    //新增分类
    addProductCategory: function({ state }, params){
        return __utils.ajax('addProductCategory', params);
    },
    //根据id获取分类信息
    getProductCategoryById: function({ state }, params){
        return __utils.ajax('getProductCategoryById', params);
    },
    //根据id更新分类信息
    updateProductCategory: function({ state }, params){
        return __utils.ajax('updateProductCategory', params);
    },
}

// 同步方法
const mutations = {

}

const productModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

//注册当前模块
__store.registerModule("product", productModule)


