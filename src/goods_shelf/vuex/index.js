import Vue from 'vue'
import Vuex from 'vuex'

const shelf = {
    // 货架管理
    // 1、查询货架列表 /shelf/getShelfList  post
    // 查询条件:
    // {
    //   "shelfName":"liuyali",  //货架名称 模糊查询
    //   "shelfNo":"11111", //货架编号
    //   "status":1,//状态 0停用 1启用
    //   "agentId":1   //代理商id
    // }
    getShelfList: { url: "/shelf/getShelfList", method: "post" },

    // 2、新增货架 /shelf/addShelf   post
    // 参数:
    // {
    //   "shelfName":"liuyali",  //货架名称
    //   "shelfNo":"11111", //货架编号
    //   "agentId":1,//代理商
    //   "replenishBy":1   //补货员
    //   "stocktakeBy":1   //盘点员
    //   "remark":"111"   //货架备注
    //   "companyName":"111"   //公司名称
    //   "companyIndustry":"111"   //公司行业
    //   "districtCode":"1111111"   //货架地区行政编码（区/县）
    //   "detailAddress":"11111"   //货架详细地址
    // }
    addShelf: { url: "/shelf/addShelf", method: "post" },

    // 3、启用 /shelf/enableShelf  get
    // 参数: ?id=1
    enableShelf: { url: "/shelf/enableShelf", params: "?id=", method: "get" },

    // 4、停用 /shelf/disableShelf  get
    // 参数: ?id=1
    disableShelf: { url: "/shelf/disableShelf", params: "?id=", method: "get" },

    // 5、删除货架  /shelf/deleteShelf  get
    // 参数:  ?id=1
    deleteShelf: { url: "/shelf/deleteShelf", params: "?id=", method: "get" },

    // 6、更新货架  /shelf/updateShelf  post
    // 参数: {
    //   "id":1,//货架id
    //   "shelfName":"liuyali",  //货架名称
    //   "shelfNo":"11111", //货架编号
    //   "agentId":1,//代理商
    //   "replenishBy":1   //补货员
    //   "stocktakeBy":1   //盘点员
    //   "remark":"111"   //货架备注
    //   "companyName":"111"   //公司名称
    //   "companyIndustry":"111"   //公司行业
    //   "districtCode":"1111111"   //货架地区行政编码（区/县）
    //   "detailAddress":"11111"   //货架详细地址
    // }
    updateShelf: { url: "/shelf/updateShelf", method: "post" },

    // 7、根据ID获取货架信息 /shelf/getShelfById get
    // 参数: ?id=1
    getShelfById: { url: "/shelf/getShelfById", params: "?id=", method: "get" },


    // 8、获取有效代理商列表 /agent/getEnabledAgentList  get
    // 参数: 无
    getEnabledAgentList: { url: "/agent/getEnabledAgentList", method: "get" },

    // 9、根据父id查询地区列表 /district/getDistrictListByParentId get
    // 参数: ?parentId=0
    // 备注：省的parentId为0,市的parentId为省的id,区的parentId为市的id
    getDistrictListByParentId: { url: "/district/getDistrictListByParentId", params: "?parentId=", method: "get" },

    // 10、根据用户组编码查询用户列表(盘点人和补货人为同一接口) /sysUser/getSysUserListByGroupNo  get
    // 参数: ?groupNo=G001
    // 备注：groupNo 暂时写死 G001
    getSysUserListByGroupNo: { url: "/sysUser/getSysUserListByGroupNo", params: "?groupNo=G001", method: "get" },





    // 货架商品管理
    // 1、查询货架商品列表 /shelfProduct/getShelfProductList   post
    // 查询条件:
    // {
    //   "shelfId":1,  //货架id,必传
    //   "productName":"11111", //商品名称
    //   "productNo":1,//商品编号
    //   "isShelf":1   //上下架状态，1上架，0下架
    // }
    // 列表展示字段
    // {
    //     "id": 1,				//货架商品ID
    //     "productNo": "S001",			//货架编号
    //     "productName": "腾楷(不要删除)",	//货架名称
    //     "shelfProductCategoryName": "",		//货架商品分类名称
    //     "shelfProductPrice": 1.11,		//货架商品价格
    //     "isShelf": 1,				//上下架状态1上架，0下架
    //     "shelvesTime": 1513649716000,		//上架时间
    //     "unshelveTime": 1513649716000,		//下架时间
    //     "remark": null,				//货架备注
    //     "creationTime":1513649716000		//创建时间
    //     "createdBy": null,			//创建人ID
    //     "createdByName": null			//创建人名称
    // }
    getShelfProductList: { url: "/shelfProduct/getShelfProductList", method: "post" },

    // 2、新增货架商品 /shelfProduct/addShelfProducts  post
    // 参数:

    //     {
    //     "shelfId": 1,				//货架ID
    //     "ShelfProductCategoryId": 1,		//分类ID
    //     "shelfProductDto": [
    //         {
    //         "productId": 1,			//商品ID
    //         "shelfProductPrice": 1.11,	//货架商品价格
    //         "toplimitQuantity": 1,		//货架商品最大上限数量
    //         "warningQuantity": 1,		//货架商品补货预警数量
    //         "remark": ""			//货架商品备注
    //         }
    //     ]
    //     },
    //

    addShelfProducts: { url: "/shelfProduct/addShelfProducts", method: "post" },

    // 3、更新货架商品  /shelfProduct/updateShelfProduct   post
    // 参数:
    // {
    //     "shelfProductId": 1,		//货架商品ID
    //     "shelfProductInventoryId": 1,	//货架商品库存ID
    //     "productId": 1,			//商品ID
    //     "shelfProductPrice": 1.11,	//货架商品价格
    //     "toplimitQuantity": 1,		//货架商品最大上限数量
    //     "warningQuantity": 1,		//货架商品补货预警数量
    //     "remark": ""			//货架商品备注
    // }
    updateShelfProduct: { url: "/shelfProduct/updateShelfProduct", method: "post" },

    // 4、删除货架商品 /shelfProduct/deleteShelfProduct  get
    // 参数: ?id=1
    deleteShelfProduct: { url: "/shelfProduct/deleteShelfProduct", params: "?id=", method: "get" },

    // 5、上架 /shelfProduct/enableShelfProduct   get
    // 参数:  ?id=1
    enableShelfProduct: { url: "/shelfProduct/enableShelfProduct", params: "?id=", method: "get" },

    // 6、下架  /shelfProduct/disableShelfProduct  get
    // 参数:  ?id=1
    disableShelfProduct: { url: "/shelfProduct/disableShelfProduct", params: "?id=", method: "get" },

    // 7、修改 根据货架商品ID获取货架单个商品详细信息  /shelfProduct/getShelfProductById  get
    // 参数:  ?id=1
    getShelfProductById: { url: "/shelfProduct/getShelfProductById", params: "?id=", method: "get" },

    // 8、可选商品列表  /product/getProductListByShelfId  get
    // 参数:  ?shelfId=1
    getProductListByShelfId: { url: "/product/getProductListByShelfId", params: "?shelfId=", method: "get" },

    // 9、获取有效商品分类列表 /productCategory/getEnabledCategoryList  get
    // 参数: 无
    getEnabledCategoryList: { url: "/productCategory/getEnabledCategoryList", method: "get" },

    // 10、获取商品详细信息 cvs/product/getProductById
    // getProductById: { url: "cvs/product/getProductById", params: "?shelfId=", method: "get" },

    //货架商品库存管理
    //获取库存列表
    getShelfProductInventoryList: { url: "/shelfProductInventory/getShelfProductInventoryList", method: "post" },

    // 货架盘点管理
    // 1、查询货架盘点列表  /shelfStocktake/getShelfStocktakeList   post
    // 查询条件:
    // {
    //   "stocktakeByAccount":"18136875306", //盘点人手机号
    //   "stocktakeStartTime":"2017-01-01 12:12:12",//盘点开始时间
    //   "stocktakeEndTime":"2017-01-01 12:12:12"   //盘点完成时间
    // }
    // 列表展示字段
    // {
    //     "id": 1,				//货架盘点ID
    //     "stocktakeByName": "腾楷(不要删除)",	//盘点人名称
    //     "stocktakeByAccount": "",		//盘点人账号（手机号）
    //     "stocktakeStartTime": 1513649716000,	//盘点发起时间
    //     "stocktakeEndTime": 1513649716000,	//盘点完成时间
    //     "remark": null,				//货架盘点备注
    //     "creationTime":1513649716000		//创建时间
    //     "createdBy": null,			//创建人ID
    //     "createdName": null			//创建人名称
    // }
    getShelfStocktakeList: { url: "/shelfStocktake/getShelfStocktakeList", method: "post" },

    // 2、生成盘点单 /shelfProduct/addShelfStocktake  post
    // 参数:
    // {
    //     "shelfIds": [
    //         1,
    //         2,
    //         3
    //     ],			//货架id集合
    //     "remark": null,		//货架备注
    // }
    addShelfStocktake: { url: "/shelfStocktake/addShelfStocktake", method: "post" },

    // 3、获取需要盘点的货架列表  /shelf/getStocktakeShelfList  get
    // 参数:
    // 无
    getStocktakeShelfList: { url: "/shelf/getStocktakeShelfList", method: "get" },

    // 4、根据条件查询货架盘点明细列表 /shelfStocktakeItem/getShelfStocktakeItemList
    // post
    // 查询条件:
    // {
    //   stocktakeId:""
    //   "shelfName":""	//货架名称
    //   "shelfNo":""		//货架编号
    //   "productName":"",	//商品名称
    //   "productNo":""	//商品编号
    // }
    // 列表展示字段
    // {
    //     "id": 1,		//货架盘点明细ID
    //     "shelfName": "",	//货架名称
    //     "shelfNo": "",		//货架编号
    //     "productName": "",	//商品名称
    //     "productNo": "",	//商品编号
    //     "currentQuantity": 1,	//当前货架商品数量
    //     "creationTime":1513649716000		//创建时间
    // }
    getShelfStocktakeItemList: { url: "/shelfStocktakeItem/getShelfStocktakeItemList", method: "post" },



    // 货架补货
    //获取货架补货信息列表
    getShelfReplenishmentList: { url: "/shelfReplenishment/getShelfReplenishmentList", method: "post" },

    // 1、	新增补货单  /shelfReplenishment/addShelfReplenishmentList
    // 参数：{
    // "application":"刘亚莉",
    //  "remark":"测试",
    // replenishmentName：“补货单名称”
    //  "product":[
    //   {
    //           "shelfProductId": 3,
    //           "shelfId": 1,
    //           "quantity": 2 //补货数量
    //         },
    //         {
    //           "shelfProductId": 3,
    //           "shelfId": 1,
    //           "quantity": 2
    //         }
    //  ]
    // }
    // }
    addShelfReplenishmentList: { url: "/shelfReplenishment/addShelfReplenishmentList", method: "post" },

    // 2、	修改补货状态  /shelfReplenishment/updateStatus
    // 参数：{
    // "id":17,
    // "status":2
    // }
    // updateStatus: { url: "/shelfReplenishment/updateStatus", params: "?id=", method: "get" },
    updateStatus: { url: "/shelfReplenishment/updateStatus", method: "post" },

    // 2、 修改补货状态
    // 功能：审核通过

    // 接口：http://192.168.16.16:9000/shelfReplenishment/updateApply
    // 参数：{"id":17}
    updateApply: { url: "/shelfReplenishment/updateApply", params: "?id=", method: "get" },

    // 功能：配送中
    // 接口：http://192.168.16.16:9000/shelfReplenishment/updateDestribution?id=17
    // 参数：{“id”:17}
    updateDestribution: { url: "/shelfReplenishment/updateDestribution", params: "?id=", method: "get" },
    // 功能：驳回
    // http://192.168.16.16:9000/shelfReplenishment/updateReject?id=17
    updateReject: { url: "/shelfReplenishment/updateReject", params: "?id=", method: "get" },


    // 3、	查询补货详情  /shelfReplenishment/getShelfReplenishment?id=17
    // 3、	查询补货详情  /shelfReplenishment/getShelfReplenishment?id=17

    // getShelfReplenishmentDetail
    getShelfReplenishment: { url: "/shelfReplenishment/getShelfReplenishmentDetail", params: "?id=", method: "get" },

    // 4、	修改补货人 /shelfReplenishment/updateReplenish

    // 参数：{
    // "id":2,
    // "status":4
    // }
    updateReplenish: { url: "/shelfReplenishment/updateReplenish", method: "post" },

    // 获取补货的商品 根据货架id
    // /shelfProduct/getShelfReplenishmentProductList  get请求
    // 没有参数
    getShelfReplenishmentProductList: { url: "/shelfProduct/getShelfReplenishmentProductList", params: "?shelfId=", method: "get" },

    // 查询所有的货架接口  /shelf/getReplenishmentShelfList post请求，
    // 货架名称：shelfName 货架地址：  shelfLoaction
    getReplenishmentShelfList: { url: "/shelf/getReplenishmentShelfList", method: "post" },

    // /shelfReplenishment/updateShelfReplenishmentList  post请求
    //修改补货数量
    // {
    //     "replenishmentName":""，//补货单名称
    //     "shelfReplenishmentId"：1，//补货单id
    //     "remark":"",
    //     "product"：[
    //     "replenishmentItemId":1, //补货商品id
    //     "quantity":2,//补货数量
    //     "shelfProductId": //货架商品id
    //     ]

    //     }
    updateShelfReplenishmentList: { url: "/shelfReplenishment/updateShelfReplenishmentList", method: "post" },

}

__api.register({ "shelf": shelf });



Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


const state = {
    page: {},
    user: null
}
const getters = {

}
// 异步方法
const actions = {
    // 1、查询货架列表
    getShelfList: function ({ state }, params) {
        return __utils.ajax("getShelfList", params);
    },
    // 2、新增货架
    addShelf: function ({ state }, params) {
        return __utils.ajax("addShelf", params);
    },
    // 启用
    enableShelf: function ({ state }, params) {
        return __utils.ajax("enableShelf", params);
    },
    // 停用
    disableShelf: function ({ state }, params) {
        return __utils.ajax("disableShelf", params);
    },
    // 5、删除货架
    deleteShelf: function ({ state }, params) {
        return __utils.ajax("deleteShelf", params);
    },
    // 6、更新货架
    updateShelf: function ({ state }, params) {
        return __utils.ajax("updateShelf", params);
    },
    // 7、根据ID获取货架信息
    getShelfById: function ({ state }, params) {
        return __utils.ajax("getShelfById", params);
    },
    // 8、获取有效代理商列表
    getEnabledAgentList: function ({ state }, params) {
        return __utils.ajax("getEnabledAgentList", params);
    },
    // 9、根据父id查询地区列表
    getDistrictListByParentId: function ({ state }, params) {
        return __utils.ajax("getDistrictListByParentId", params);
    },
    // 10、盘点人和补货人为同一接口
    getSysUserListByGroupNo: function ({ state }, params) {
        return __utils.ajax("getSysUserListByGroupNo", params);
    },



    // 货架商品管理
    // 1、查询货架商品列表
    getShelfProductList: function ({ state }, params) {
        return __utils.ajax("getShelfProductList", params);
    },
    // 2、新增货架商品
    addShelfProducts: function ({ state }, params) {
        return __utils.ajax("addShelfProducts", params);
    },
    // 3、更新货架商品
    updateShelfProduct: function ({ state }, params) {
        return __utils.ajax("updateShelfProduct", params);
    },
    // 4、删除货架商品
    deleteShelfProduct: function ({ state }, params) {
        return __utils.ajax("deleteShelfProduct", params);
    },
    // 5、上架
    enableShelfProduct: function ({ state }, params) {
        return __utils.ajax("enableShelfProduct", params);
    },
    // 6、下架
    disableShelfProduct: function ({ state }, params) {
        return __utils.ajax("disableShelfProduct", params);
    },
    // 7、根据货架商品ID获取货架单个商品详细信息
    getShelfProductById: function ({ state }, params) {
        return __utils.ajax("getShelfProductById", params);
    },
    // 8、可选商品列表
    getProductListByShelfId: function ({ state }, params) {
        return __utils.ajax("getProductListByShelfId", params);
    },
    // 9、获取有效商品分类列表
    getEnabledCategoryList: function ({ state }, params) {
        return __utils.ajax("getEnabledCategoryList", params);
    },

    //货架商品库存
    //1、获取库存列表
    getShelfProductInventoryList: function ({ state }, params) {
        return __utils.ajax("getShelfProductInventoryList", params);
    },


    // 货架盘点管理
    // 1、查询货架盘点列表
    getShelfStocktakeList: function ({ state }, params) {
        return __utils.ajax("getShelfStocktakeList", params);
    },

    // 2、生成盘点单
    addShelfStocktake: function ({ state }, params) {
        return __utils.ajax("addShelfStocktake", params);
    },

    // 3、获取需要盘点的货架列表
    getStocktakeShelfList: function ({ state }, params) {
        return __utils.ajax("getStocktakeShelfList", params);
    },

    // 4、根据条件查询货架盘点明细列表
    getShelfStocktakeItemList: function ({ state }, params) {
        return __utils.ajax("getShelfStocktakeItemList", params);
    },

    //补货
    //1、补货列表
    getShelfReplenishmentList: function ({ state }, params) {
        return __utils.ajax("getShelfReplenishmentList", params);
    },

    // 1、	新增补货单
    addShelfReplenishmentList: function ({ state }, params) {
        return __utils.ajax("addShelfReplenishmentList", params);
    },

    // 2、	修改补货状态
    // updateStatus: function ({ state }, params) {
    //     return __utils.ajax("updateStatus", params);
    // },
    // 功能：配送中
    // 功能：审核通过
    updateApply: function ({ state }, params) {
        return __utils.ajax("updateApply", params);
    },
    // 功能：配送中
    updateDestribution: function ({ state }, params) {
        return __utils.ajax("updateDestribution", params);
    },
    // 功能：驳回
    updateReject: function ({ state }, params) {
        return __utils.ajax("updateReject", params);
    },



    // 3、	查询补货详情
    getShelfReplenishment: function ({ state }, params) {
        return __utils.ajax("getShelfReplenishment", params);
    },

    // 4、	修改补货人
    updateReplenish: function ({ state }, params) {
        return __utils.ajax("updateReplenish", params);
    },

    // 获取补货的商品
    getShelfReplenishmentProductList: function ({ state }, params) {
        return __utils.ajax("getShelfReplenishmentProductList", params);
    },

    // 查询所有的货架接口
    getReplenishmentShelfList: function ({ state }, params) {
        return __utils.ajax("getReplenishmentShelfList", params);
    },

    //修改补货数量
    updateShelfReplenishmentList: function ({ state }, params) {
        return __utils.ajax("updateShelfReplenishmentList", params);
    },
}

// 同步方法
const mutations = {

}

const shelfModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

//注册当前模块
__store.registerModule("shelf", shelfModule)


