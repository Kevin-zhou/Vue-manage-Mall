<template>

    <div class="table-warp">

          <!-- 面包屑 -->
          <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
          </el-breadcrumb>
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" label-width="90px" size="small" :model="filters" ref="filters">
                <el-form-item label="分类名称:">
                <el-input placeholder="请输入" v-model="filters.categoryName">
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
                <el-form-item label="分类编号:">
                <el-input placeholder="请输入" v-model="filters.categoryNo">
                    <i class="el-icon-search el-input__icon" slot="suffix"></i>
                </el-input>
                </el-form-item>
                
                <div style="padding-left:60px;">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-plus" size="small" @click="toAddCategory">新增</el-button>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="getList">查询</el-button>
                    <el-button type="primary" icon="el-icon-delete" size="small" @click="resetFilter">重置</el-button>
                </el-form-item>
                </div>
            </el-form>
          </el-col>


        <el-table :data="dataList" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column label="序号" type="index">
            </el-table-column>
            <el-table-column prop="categoryName" label="分类名称">
            </el-table-column>
            <el-table-column prop="categoryNo" label="分类编号" >
            </el-table-column>
            <el-table-column prop="categorySort" label="排序">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="100">
            </el-table-column>
            <el-table-column prop="createdName" label="创建人" width="90" >
            </el-table-column>
            <el-table-column prop="creationTime" label="创建时间" width="180">
                <template slot-scope="scope">
                    <p>{{filterTime(scope.row.creationTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="lastUpdateTime" label="最后更新时间" width="180" >
                <template slot-scope="scope">
                    <p>{{filterTime(scope.row.lastUpdateTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button type="primary" size="small" @click="getUp(scope.$index, scope.row)"><i class="fa fa-arrow-up"></i></el-button>

                        <el-button type="primary" size="small" @click="getDown(scope.$index, scope.row)" ><i class="fa fa-arrow-down"></i></el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="small" >编辑</el-button>
                        <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <!--<el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="small" >删除</el-button>-->
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

    <!-- 分页 -->
    <div class="pagination center">
        <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum" 
            :page-size="pageSize" 
            :page-sizes="pageSizes"
            layout="prev, pager, next, jumper, total, sizes" 
            :total="total">
        </el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" width="50%" center close-on-click-modal:false title="新增分类" :visible.sync="dialogFormVisible">
        <el-form :model="addCate" :rules="addCateRules" label-width="100px" ref="addCate">
            <el-form-item label="分类名称：" prop="categoryName">
                <el-row>
                    <el-col :span="8"><el-input v-model="addCate.categoryName" :maxlength='4' placeholder="分类名称最多4个字" auto-complete="off"></el-input></el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="分类编号：" prop="categoryNo">
                <el-row>
                    <el-col :span="8"><el-input v-model="addCate.categoryNo" :maxlength='20' placeholder="分类编号最多20个字" auto-complete="off"></el-input></el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="addCate.remark" :maxlength='100'></el-input>
            </el-form-item>
        </el-form>
        <div class="footer" style="text-align:center">
            <el-button type="primary" @click.native="addSubmit" :loading="loading">添加</el-button>
            <el-button @click.native="dialogFormVisible = false">取消</el-button>
        </div>
    </el-dialog>
  </div>
  
</template>




<script>
import { mapState, mapActions, mapMutations } from "vuex";
import store from '../../vuex'

export default {
    data() {
        var checkNo = (rule, value, callback) => {
            if(!(/^[0-9a-zA-Z]+$/.test(value.trim()))){
                callback(new Error('只支持英文数字'));
            }
            callback();
        };
        return {
            listLoading: true,
            loading: false,
            filters: {
                categoryName: "",
                categoryNo: "",
                createStartTime: "",
                createEndTime: ""
            },
            total: null,
            pageSize: 10,
            pageNum:1,
            dataList: [],
            //分页
            pageSizes: [10, 20, 50, 100],
            dialogFormTitle: "",
            dialogFormVisible: false,
            //新增分类
            addCate: {
                categoryName: '',
                categoryNo: '',
                remark:''
            },
            addCateRules: {
                categoryName: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ],
                categoryNo: [
                    { required: true, message: '请输入分类编号', trigger: 'blur' },
                    { validator: checkNo, trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getProductCategoryList: 'product/getProductCategoryList',
            deleteProductCategory: 'product/deleteProductCategory',
            descendProductCategoryById: 'product/descendProductCategoryById',
            ascendProductCategoryById: 'product/ascendProductCategoryById',
            addProductCategory: 'product/addProductCategory',
            getProductCategoryById: 'product/getProductCategoryById',
            
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
                categoryName: this.filters.categoryName.trim(),
                categoryNo: this.filters.categoryNo,
                createStartTime: this.filters.createStartTime,
                createEndTime: this.filters.createEndTime,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            };
            //this.loading = true;            
            this.getProductCategoryList(para).then(res => {
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
        //上移
        getUp: function (row, column){
            let para = Number(column.id)
            console.log(column.categorySort)
            if(column.categorySort == 1){
                this.$message({
                    message: '当前菜单已经是第一位了',
                    type: 'warning'
                });
            }else{
                this.descendProductCategoryById(para).then((res) => {
                    if(res.success){
                        this.listLoading = false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.loading = true;
                        this.getList();
                    }
                })
            }
            
        },
        //下移
        getDown: function(row, column){
            let para = Number(column.id)
            this.ascendProductCategoryById(para).then((res) => {
                if(res.success){
                    this.listLoading = false;
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.loading = true;
                    this.getList();
                }
            })
        },
        //新增
        toAddCategory: function(){
            this.dialogFormVisible = true ;
            this.addCate.categoryName = "";
            this.addCate.categoryNo = "";
            this.addCate.remark = "";
        },
        //跳转编辑
        handleEdit: function(row,colum){
            this.$router.push({ path: '/editCate', query: { id: colum.id }})
        },

        //跳转查看
        handleView: function(row,colum){
            this.$router.push({ path: '/viewCate', query: { id: colum.id }})
        },
        //删除
        handleDel: function(row,colum){
            this.$confirm('确认要删除该数据吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = Number(colum.id);
                this.deleteProductCategory(para).then((res) => {
                    if(res.success){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList();
                    }
            });
            })
        },
        //重置查询条件
        resetFilter: function() {
            this.filters.categoryName = "";
            this.filters.categoryNo = "";
            this.filters.createStartTime = "";
            this.filters.createEndTime = "";
        },
        //新增取消
        addSubmitFasle: function(){
            this.dialogFormVisible = false ;
            this.addCate.categoryName = "";
            this.addCate.categoryNo = "";
            this.addCate.remark = "";
        },
        //新增分类
        addSubmit: function(){
            let para = this.addCate

            if(para.categoryName == ""){
                this.$message.error('请填写分类名称');
            }else if(para.categoryNo == ""){
                this.$message.error('请填写分类编号');
            }else{
                this.$refs.addCate.validate((valid) => {
                    if(valid){
                        this.addProductCategory(para).then((res) => {
                            if(res.success){
                                this.loading = false;
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.loading = true;
                                this.getList()
                            }
                        })
                    }
                });
            }
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