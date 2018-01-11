<template>
    <div class="table-warp">

          <!-- 面包屑 -->
          <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" label-width="100px" size="small" :model="filters">
                <el-form-item label="订单账号:">
                    <el-input placeholder="请输入" v-model="filters.orderNo">
                        <i class="el-icon-search el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="用户账号:">
                    <el-input placeholder="请输入" v-model="filters.userAccount">
                        <i class="el-icon-search el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="订单类型:">
                    <el-select v-model="filters.orderType" clearable placeholder="请选择">
                        <el-option
                        v-for="itemm in oType"
                        :key="itemm.value"
                        :label="itemm.label"
                        :value="itemm.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态:">
                    <el-select v-model="filters.orderStatus" clearable placeholder="请选择">
                        <el-option
                        v-for="itemm in StatusOption"
                        :key="itemm.value"
                        :label="itemm.label"
                        :value="itemm.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建订单时间:">
                    <el-col :span="11">
                    <el-date-picker @change="checkBegin" v-model="filters.startTime"  type="date"  placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line center" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker @change="checkLast" v-model="filters.endTime" type="date" placeholder="选择时间" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付订单时间:">
                    <el-col :span="11">
                    <el-date-picker @change="checkPayBegin" v-model="filters.startPayTime"  type="date"  placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line center" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker @change="checkPayLast" v-model="filters.endPayTime" type="date" placeholder="选择时间" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <div style="padding-left:60px;">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="getList">查询</el-button>
                    <el-button type="primary" icon="el-icon-delete" size="small" @click="resetFilter">重置</el-button>
                    <el-button type="primary" icon="el-icon-download" size="small" @click="handleDownload">导出</el-button>
                </el-form-item>
                </div>
            </el-form>
          </el-col>


        <el-table :data="orderList"  highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column prop="orderNo" label="订单号"  >
            </el-table-column>
            <el-table-column prop="userAccount" label="用户账号"  width="120">
            </el-table-column>
            <el-table-column prop="orderType" label="订单类型" :formatter="formatType">
            </el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="orderPrice" label="订单价格" >
            </el-table-column>
            <el-table-column prop="orderSubmitTime" label="创建时间" width="160" >
                <template scope="scope">
                    <p>{{filterDate(scope.row.orderSubmitTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="orderPayTime" label="支付时间" width="160" >
                <template scope="scope">
                    <p v-if="scope.row.orderPayTime != null">{{filterDate(scope.row.orderPayTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="210">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="getProdInfo(scope.$index, scope.row)">详情</el-button>
                    <el-button :disabled="scope.row.orderStatus == 1" type="primary" size="small" @click="getPayInfo(scope.$index, scope.row)">支付明细</el-button>
                </template>
            </el-table-column>
        </el-table>
 
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum" 
            :page-size="pageSize" 
            :page-sizes="pageSizes"
            layout="prev, pager, next, jumper, total, sizes" 
            :total="total">
        </el-pagination>
    </div>
    <!-- 支付明细 -->
    <el-dialog :close-on-click-modal="false" width="50%" center close-on-click-modal:false title="支付明细" :visible.sync="dialogFormVisible">
        <el-form :data="payInfo"  label-width="80px" ref="addCate">
            <el-form-item label="订单号：" prop="categoryName">
                <span>{{payInfo.orderNo}}</span>
            </el-form-item>

            <el-table :data="payInfo.pay"  highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column label="序号" type="index">
                </el-table-column>
                <el-table-column prop="payType" label="支付类型" >
                    <template slot-scope="scope">
                        <p>{{filterType(scope.row.payType)}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="支付平台" prop="payPlatform">
                    <template slot-scope="scope">
                        <p>{{filterForm(scope.row.payPlatform)}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="交易号" prop="platformTransactionId">
                </el-table-column>
                <el-table-column label="支付时间" prop="payTime" width="150">
                    <template slot-scope="scope">
                        <p>{{filterDate(scope.row.payTime)}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="支付金额" prop="payValue">
                </el-table-column>
                <el-table-column label="支付单位" prop="payValueUnit">
                    <template slot-scope="scope">
                        <p>{{filterUnit(scope.row.payValueUnit)}}</p>
                    </template>
                </el-table-column>
            </el-table>

        </el-form>
        <div class="footer" style="text-align:center">
            <el-button @click.native="dialogFormVisible = false">返回</el-button>
        </div>
    </el-dialog>
    <!-- 商品明细 -->
    <el-dialog :close-on-click-modal="false" width="50%" center close-on-click-modal:false title="详情" :visible.sync="dialogProdVisible">
        <div style="height:400px;overflow:auto">
            <el-form :data="prodInfo"  label-width="150px" ref="addCate">
                <el-form-item label="订单号：" prop="categoryName">
                    <span>{{prodInfo.orderNo}}</span>
                </el-form-item>
                <el-form-item label="商品货架：" prop="categoryName">
                    <span>{{prodInfo.shelfName}}</span>
                </el-form-item>
                <el-form-item label="订单价格：" prop="categoryName">
                    <span>{{prodInfo.orderPrice}}元</span>
                </el-form-item>
                <el-form-item label="支付状态：" prop="categoryName">
                    <span>{{filterStatus(prodInfo.orderStatus)}}</span>
                </el-form-item>
            </el-form>
        
            <el-table :data="prodTable"  highlight-current-row style="width: 100%;">
                <el-table-column  label="商品名称"  prop="productName">
                </el-table-column>
                <el-table-column  label="商品单价"  width="120" prop="productUnitPrice">
                </el-table-column>
                <el-table-column  label="商品数量" prop="productQuantity">
                </el-table-column>
                <el-table-column  label="商品总价" prop="productTotalPrice">
                </el-table-column>
            </el-table>
        </div>
        <div class="footer" style="text-align:center">
            <el-button @click.native="dialogProdVisible = false">返回</el-button>
        </div>
    </el-dialog>
  </div>
  

</template>




<script>
import { mapState, mapActions, mapMutations } from "vuex";
import store from '../vuex'

export default {
    data() {
        return {
            loading: false,
            filters: {
                orderNo: "",//订单账号
                userAccount:"", //用户账号
                startPayTime:"",//订单支付开始时间
                endPayTime:"",//订单支付结束结束
                orderStatus:"",//订单状态 1表示待支付9表示已支付
                orderType:"",//订单类型 1表示虚拟10表示正常
                startTime:"",//订单生成开始时间
                endTime:""//订单生成结束时间
            },
            StatusOption: [
                {
                    label: "待支付",
                    value: 1
                },
                {
                    label: "已支付",
                    value: 9
                }
            ],
            oType: [
                {
                    label: "虚拟订单",
                    value: 1
                },
                {
                    label: "实物订单",
                    value: 10
                }
            ],
            total: null,
            pageSize: 10,
            pageNum:1,
            //分页
            pageSizes: [10, 20, 50, 100],
            orderList: [],
            dialogFormVisible: false,
            payInfo:{

            },
            dialogProdVisible: false,
            prodInfo: {
                orderNo : '',
                shelfName : '',
                orderPrice : '',
                orderStatus : ''
            },
            prodTable: []
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getOrderList: 'order/getOrderList',
            getOrderItemInfo: 'order/getOrderItemInfo',
            getOrderPayInfo: 'order/getOrderPayInfo',
            getOrder: 'order/getOrder',
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //校验时间
        checkLast: function(){
            if(this.filters.endTime != ''){
                var lastTime = new Date(this.filters.endTime).getTime()+86399000;
                this.filters.endTime = __filterTime(lastTime)
                if(this.filters.startTime != ''){
                    this.filters.startTime = __filterTime(this.filters.startTime)
                    if(this.filters.endTime < this.filters.startTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },
        checkBegin: function(){
            if(this.filters.startTime != ''){
                this.filters.startTime = __filterTime(this.filters.startTime)
                if(this.filters.endTime != ''){
                    this.filters.endTime = __filterTime(this.filters.endTime)
                    if(this.filters.endTime < this.filters.startTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },
        //导出表格
        handleDownload: function(){
            let para = {
                orderNo: this.filters.orderNo, //订单账号
                userAccount: this.filters.userAccount, //用户账号
                startPayTime:  this.filters.startPayTime, //订单支付开始时间
                endPayTime:  this.filters.endPayTime, //订单支付结束结束
                orderStatus:  this.filters.orderStatus, //订单状态 1表示待支付9表示已支付
                orderType:  this.filters.orderType, //订单类型 1表示虚拟10表示正常
                startTime:  this.filters.startTime, //订单生成开始时间
                endTime:  this.filters.endTime //订单生成结束时间
            };
            this.getOrder(para).then((res) => {
                if(res.success){
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../vendor/Export2Excel')
                        const tHeader = ['订单号', '用户账号', '订单类型', '订单状态', '商品名称', '商品数量', '商品单价', '订单总额', '创建时间', '支付时间']
                        const filterVal = ['orderNo', 'userAccount', 'orderType', 'orderStatus', 'productName', 'productNum', 'productUnitPrice', 'orderPrice', 'orderSubmitTime', 'orderPayTime']
                        const list = res.data
                        const data = this.formatJson(filterVal, list)
                        export_json_to_excel(tHeader, data, '订单列表')
                    })
                }
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },

        formatType: function(row, column) {
                return row.orderType == 1 ? '虚拟订单' : row.orderType == 10 ? '实物订单' : '未知';
        },
        formatStatus: function(row, column) {
                return row.orderStatus == 1 ? '待支付' : row.orderStatus == 9 ? '已支付' : '未知';
        },
        filterType: function(type){
            return type == 1 ? "现金支付" : type == 2 ? "积分支付" : type == 3 ? "积分+现金" : '未知';
        },
        filterForm: function(type){
            return type == 1 ? "积米平台" : type == 2 ? "微信" : type == 3 ? "支付宝" : '未知';
        },
        filterUnit :function(type){
            return type == 1 ? "元" : type == 2 ? "腾楷通用积分积米" : '未知';
        },
        filterStatus: function(type){
            return type == 1 ? "待支付" : type == 9 ? "已支付" : '未知';
        },
        //根据id获取支付明细
        getPayInfo: function(row,colum){
            let para = colum.orderNo;
            this.dialogFormVisible = true;
            this.getOrderPayInfo(para).then((res) => {
                if(res.success){
                    this.loading = false;
                    if(res.data){
                        this.payInfo = res.data;
                    }
                }
            })
        },
        //根据id获取商品详情
        getProdInfo: function(row,colum){
            let para = colum.id;
            this.dialogProdVisible = true
            this.getOrderItemInfo(para).then((res) => {
                if(res.success){
                    this.loading = false;
                    this.prodTable = res.data.item;
                    this.prodInfo.orderNo = res.data.orderNo;
                    this.prodInfo.shelfName = res.data.shelfName;
                    this.prodInfo.orderPrice = res.data.orderPrice;
                    this.prodInfo.orderStatus = res.data.orderStatus;
                }
            })
        },
        //获取列表
        getList: function(){
            let para = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                orderNo: this.filters.orderNo, //订单账号
                userAccount: this.filters.userAccount, //用户账号
                startPayTime:  this.filters.startPayTime, //订单支付开始时间
                endPayTime:  this.filters.endPayTime, //订单支付结束结束
                orderStatus:  this.filters.orderStatus, //订单状态 1表示待支付9表示已支付
                orderType:  this.filters.orderType, //订单类型 1表示虚拟10表示正常
                startTime:  this.filters.startTime, //订单生成开始时间
                endTime:  this.filters.endTime //订单生成结束时间
            };
            this.loading = true;
            this.getOrderList(para).then((res) => {
                if(res.success){
                    this.loading = false;
                    this.orderList = res.data.dataList;
                    this.total = res.data.total;
                    this.currentPage1 = res.data.pageNum;
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        //重置查询条件
        resetFilter: function() {
            this.filters.orderNo = '', //订单账号
            this.filters.userAccount = '', //用户账号
            this.filters.startPayTime = '',//订单支付开始时间
            this.filters.endPayTime = '',//订单支付结束结束
            this.filters.orderStatus = '',//订单状态 1表示待支付9表示已支付
            this.filters.orderType = '',//订单类型 1表示虚拟10表示正常
            this.filters.startTime = '',//订单生成开始时间
            this.filters.endTime = ''//订单生成结束时间
        },
        // 时间戳转换
        filterDate(val) {
            return __filterTime(val);
        },
        //校验时间
        checkPayLast: function(){
            if(this.filters.endPayTime != ''){
                var lastTime = new Date(this.filters.endPayTime).getTime()+86399000;
                this.filters.endPayTime = __filterTime(lastTime)
                if(this.filters.startPayTime != ''){
                    this.filters.startPayTime = __filterTime(this.filters.startPayTime)
                    if(this.filters.endPayTime < this.filters.startPayTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },
        checkPayBegin: function(){
            if(this.filters.startPayTime != ''){
                this.filters.startPayTime = __filterTime(this.filters.startPayTime)
                if(this.filters.endPayTime != ''){
                    this.filters.endPayTime = __filterTime(this.filters.endPayTime)
                    if(this.filters.endPayTime < this.filters.startPayTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },

    },
    computed: {
        // 将VUEX中的state映射到页面
        ...mapState('prod', [
            'page'
        ]),
    },
    // 页面开始获取列表
    created: function() {
        this.getList();
    }
}

</script>
<style lang="scss">
@import '~scss_index';
</style>