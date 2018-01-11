<template>

    <div class="table-warp">
      
          <!-- 面包屑 -->
          <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" label-width="90px" size="small" :model="filters" ref="filters">
                <el-form-item label="商品名称:">
                <el-input placeholder="请输入" v-model="filters.productName">
                    <i class="el-icon-search el-input__icon" slot="suffix"></i>
                </el-input>
                </el-form-item>
                <el-form-item label="创建时间:">
                    <el-col :span="11">
                    <el-date-picker v-model="filters.createStartTime"  type="date"  placeholder="选择日期" style="width: 100%;" @change="checkBegin"></el-date-picker>
                    </el-col>
                    <el-col class="line center" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker v-model="filters.createEndTime" @change="checkLast" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品编号:">
                <el-input placeholder="请输入" v-model="filters.productNo">
                    <i class="el-icon-search el-input__icon" slot="suffix"></i>
                </el-input>
                </el-form-item>
                
                <div style="padding-left:60px;">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-plus" size="small" @click="toAddProd">新增</el-button>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="getList">查询</el-button>
                    <el-button type="primary" icon="el-icon-delete" size="small" @click="resetFilter">重置</el-button>
                </el-form-item>
                </div>
            </el-form>
          </el-col>

        <el-table :data="dataList" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column label="序号" type="index">
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productNo" label="商品编号" >
            </el-table-column>
            <el-table-column prop="barCode" label="条形码">
            </el-table-column>
            <el-table-column prop="thumbnail" label="缩略图" width="100">
                <template slot-scope="scope">
                    <img style="display:inline-block;width:50px;height:50px" v-bind:src="scope.row.thumbnail">
                </template>
            </el-table-column>
            <el-table-column prop="createdName" label="创建人" width="90" >
            </el-table-column>
            <el-table-column prop="creationTime" label="创建时间" width="180">
                <template scope="scope">
                    <p>{{filterTime(scope.row.creationTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="lastUpdatedName" label="最后更新人" width="100">
            </el-table-column>
            <el-table-column prop="lastUpdateTime" label="最后更新时间" width="180" >
                <template scope="scope">
                    <p>{{filterTime(scope.row.lastUpdateTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template scope="scope">
                    <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="small" >编辑</el-button>
                    <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <!--<el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="small" >删除</el-button>-->
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
    </div>
</template>




<script>
import { mapState, mapActions, mapMutations } from "vuex";
import store from '../../vuex'

export default {
    data() {
        return {
            listLoading: false,
            loading: false,
            filters: {
                productName: "",
                productNo: "",
                createStartTime: "",
                createEndTime: ""
            },
            total: null,
            pageSize: 10,
            pageNum:1,
            dataList: [],
            //分页
            pageSizes: [10, 20, 50, 100],
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getProdList: 'product/getProdList',
            deleteProduct: 'product/deleteProduct'
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //校验时间
        checkLast: function(){
            if(this.filters.createEndTime != ''){
                var lastTime = new Date(this.filters.createEndTime).getTime()+86399000;
                this.filters.createEndTime = __filterTime(lastTime)
                if(this.filters.createStartTime != ''){
                    this.filters.createStartTime = __filterTime(this.filters.createStartTime)
                    if(this.filters.createEndTime < this.filters.createStartTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },
        checkBegin: function(){
            if(this.filters.createStartTime != ''){
                this.filters.createStartTime = __filterTime(this.filters.createStartTime)
                if(this.filters.createEndTime != ''){
                    this.filters.createEndTime = __filterTime(this.filters.createEndTime)
                    if(this.filters.createEndTime < this.filters.createStartTime){
                        this.$message({
                            message: '开始时间不能大于结束时间',
                            type: 'error'
                        });
                    }
                }
            }
        },
        //获取列表
        getList: function(){
            let para = {
                productName: this.filters.productName.trim(),
                productNo: this.filters.productNo,
                createStartTime: this.filters.createStartTime,
                createEndTime: this.filters.createEndTime,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            };
            //this.loading = true;            
            this.getProdList(para).then(res => {
                if(res.success){
                    this.loading = false;
                    this.dataList = res.data.dataList;
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
        //跳转新增
        toAddProd: function(){
            this.$router.push('/addProduct');
        },
        //跳转编辑
        handleEdit: function(row,colum){
            this.$router.push({ path: '/editProduct', query: { id: colum.id }})
        },
        //跳转查看
        handleView: function(row,colum){
            this.$router.push({ path: '/viewProduct', query: { id: colum.id }})
        },
        //删除
        handleDel: function(row,colum){
            this.$confirm('确认要删除该数据吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = Number(colum.id);
                console.log(para)
                this.deleteProduct(para).then((res) => {
                    if(res.success){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        console.log(res)
                        this.getList();
                    }
            });
            })
        },
        //重置查询条件
        resetFilter: function() {
            this.filters.productName = "";
            this.filters.productNo = "";
            this.filters.createStartTime = "";
            this.filters.createEndTime = "";
        },

        // 时间戳转换
        filterTime(val) {
            return __filterTime(val);
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