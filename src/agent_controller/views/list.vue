<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
            <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" label-width="90px" size="small" :model="filters" ref="filters">
                <el-form-item label="代理商名称:">
                <el-input placeholder="请输入" v-model="filters.agentName">
                    <i class="el-icon-search el-input__icon" slot="suffix"></i>
                </el-input>
                </el-form-item>
                <el-form-item label="创建时间:">
                    <el-col :span="11">
                    <el-date-picker v-model="filters.createStartTime"  type="date"  placeholder="选择日期" style="width: 100%;" @change="checkBegin"></el-date-picker>
                    </el-col>
                    <el-col class="line center" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker v-model="filters.createEndTime" @change="checkLast" type="date" placeholder="选择日期" style="width: 100%;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="代理商编号:">
                <el-input placeholder="请输入" v-model="filters.agentNo">
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
        </div>

        <el-table :data="dataList" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column label="序号" type="index">
            </el-table-column>
            <el-table-column prop="agentName" label="代理商名称" width="90">
            </el-table-column>
            <el-table-column prop="agentNo" label="代理商编号" width="90">
            </el-table-column>
            <el-table-column prop="agentAddress" label="代理商地址">
            </el-table-column>
            <el-table-column prop="agentContact" label="代理商联系人">
            </el-table-column>
            <el-table-column prop="agentContactPhone" label="代理商电话" width="114">
            </el-table-column>
            <el-table-column prop="isVerify" label="审核状态" :formatter="formatVerify" width="90">
            </el-table-column>
            <el-table-column prop="createdName" label="创建人" width="80" >
            </el-table-column>
            <el-table-column prop="creationTime" label="创建时间" width="170">
                <template slot-scope="scope">
                    <p>{{filterTime(scope.row.creationTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="small" >编辑</el-button>
                        <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button type="danger" @click="handleDel(scope.$index, scope.row)" size="small" >删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrap block center">
        <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum" 
            :page-size="pageSize" 
            :page-sizes="pageSizes"
            layout="prev, pager, next, jumper, total, sizes" 
            :total="total">
        </el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" width="50%" center close-on-click-modal:false title="新增代理商" :visible.sync="dialogFormVisible">
        <el-form :model="addAgent" :rules="addAgentRules" label-width="130px" ref="addAgent">
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="代理商名称：" prop="agentName">
                        <el-input v-model="addAgent.agentName" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理商编号：" prop="agentNo">
                        <el-input v-model="addAgent.agentNo" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="代理商地址：" prop="agentAddress">
                        <el-input v-model="addAgent.agentAddress" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人：" prop="agentContact">
                        <el-input v-model="addAgent.agentContact" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="固定电话：" prop="agentContactPhone">
                        <el-input v-model="addAgent.agentContactPhone" :maxlength='12' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人手机：" prop="agentContactTelephone">
                        <el-input v-model="addAgent.agentContactTelephone"  :maxlength='11' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="联系人邮箱：" prop="agentContactEmail">
                <el-input v-model="addAgent.agentContactEmail" :maxlength='50' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="addAgent.remark" :maxlength='100'></el-input>
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
import store from '../vuex'

export default {
    data() {
        var checkNo = (rule, value, callback) => {
            if(!(/^[0-9a-zA-Z]+$/.test(value.trim()))){
                callback(new Error('只支持英文数字'));
            }
            callback();
        };
        var checkTel = (rule, value, callback) => {
            if(value != ''){
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value.trim()))){
                    callback(new Error('请输入正确手机号'));
                }
            }
            callback();
        };
        var checkPhone = (rule, value, callback) => {
            if(value != ''){
                if(!(/^[0-9]*$/.test(value.trim()))){
                    callback(new Error('请输入正确固定电话'));
                }
            }
            callback();
        };
        var checkEmail = (rule, value, callback) => {
            if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value.trim()))){
                callback(new Error('请输入正确邮箱号'));
            }
            callback();
        };
        return {
            listLoading: true,
            loading: false,
            filters: {
                agentName: "",
                agentNo: "",
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
            //新增代理商
            addAgent: {
                agentName: '',
                agentNo: '',
                agentAddress: '',
                agentContact: '',
                agentContactPhone:'',
                agentContactTelephone:'',
                agentContactEmail:'',
                remark:''
            },
            addAgentRules: {
                agentName: [
                    { required: true, message: '请输入代理商名称', trigger: 'blur' },
                ],
                agentNo: [
                    { required: true, message: '请输入代理商编号', trigger: 'blur' },
                    { validator: checkNo, trigger: 'blur' }
                ],
                agentAddress: [
                    { required: true, message: '请输入代理商地址', trigger: 'blur' },
                ],
                agentContact: [
                    { required: true, message: '请输入代理商联系人', trigger: 'blur' },
                ],
                agentContactPhone: [
                    {  validator: checkPhone, trigger: 'blur' },
                ],
                agentContactTelephone: [
                    {  validator: checkTel, trigger: 'blur' },
                ],
                agentContactEmail: [
                    { required: true, validator: checkEmail, trigger: 'blur' },
                ]
            }
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getAgentList: 'agent/getAgentList',
            addAgentCon: 'agent/addAgent',
            deleteAgent: 'agent/deleteAgent',
            
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        formatVerify: function(row, column) {
                return row.isVerify == 1 ? '通过' : row.isVerify == 0 ? '停用' : '未知';
        },
        //获取列表
        getList: function(){
            let para = {
                agentName: this.filters.agentName.trim(),
                agentNo: this.filters.agentNo,
                createStartTime: this.filters.createStartTime,
                createEndTime: this.filters.createEndTime,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            };
            //this.loading = true;            
            this.getAgentList(para).then(res => {
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
        //新增
        toAddCategory: function(){
            this.dialogFormVisible = true ;
            this.addAgent.agentName = "";
            this.addAgent.agentNo = "";
            this.addAgent.agentAddress = "";
            this.addAgent.agentContact = "";
            this.addAgent.agentContactPhone = "";
            this.addAgent.agentContactTelephone = "";
            this.addAgent.agentContactEmail = "";
            this.addAgent.remark = "";
        },
        //跳转编辑
        handleEdit: function(row,colum){
            this.$router.push({ path: '/editAgent', query: { id: colum.id }})
        },

        //跳转查看
        handleView: function(row,colum){
            this.$router.push({ path: '/viewAgent', query: { id: colum.id }})
        },
        //删除
        handleDel: function(row,colum){
            this.$confirm('确认要删除该数据吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = Number(colum.id);
                this.deleteAgent(para).then((res) => {
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
            this.filters.agentName = "";
            this.filters.agentNo = "";
            this.filters.createStartTime = "";
            this.filters.createEndTime = "";
        },
        //新增取消
        addSubmitFasle: function(){
            this.dialogFormVisible = false ;
            this.addAgent.agentName = "";
            this.addAgent.agentNo = "";
            this.addAgent.agentAddress = "";
            this.addAgent.agentContact = "";
            this.addAgent.agentContactPhone = "";
            this.addAgent.agentContactTelephone = "";
            this.addAgent.agentContactEmail = "";
            this.addAgent.remark = "";
        },
        //新增分类
        addSubmit: function(){
            let para = this.addAgent

            if(para.agentName == ""){
                this.$message.error('请填写代理商名称');
            }else if(para.agentNo == ""){
                this.$message.error('请填写代理商编号');
            }else if(para.agentAddress == ""){
                this.$message.error('请填写代理商地址');
            }else if(para.agentContact == ""){
                this.$message.error('请填写代理商联系人');
            }else if(para.agentContactPhone == "" &&para.agentContactTelephone == ""){
                this.$message.error('请至少填写一个联系方式');
            }else if(para.agentContactEmail == "" ){
                this.$message.error('请填写联系人邮箱');
            }
            else{
                this.$refs.addAgent.validate((valid) => {
                    if(valid){
                        this.addAgentCon(para).then((res) => {
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