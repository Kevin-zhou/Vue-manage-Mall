<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
            <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑代理商</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form :model="editAgent" :rules="addAgentRules" label-width="130px" ref="editAgent">
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="代理商名称：" prop="agentName">
                        <el-input v-model="editAgent.agentName" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="代理商编号：" prop="agentNo">
                        <el-input v-model="editAgent.agentNo" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="代理商地址：" prop="agentAddress">
                        <el-input v-model="editAgent.agentAddress" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人：" prop="agentContact">
                        <el-input v-model="editAgent.agentContact" :maxlength='50' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row> 
                <el-col :span="12">
                    <el-form-item label="固定电话：" prop="agentContactPhone">
                        <el-input v-model="editAgent.agentContactPhone" :maxlength='12' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人手机：" prop="agentContactTelephone">
                        <el-input v-model="editAgent.agentContactTelephone"  :maxlength='11' auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="联系人邮箱：" prop="agentContactEmail">
                <el-input v-model="editAgent.agentContactEmail" :maxlength='50' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="editAgent.remark" :maxlength='100'></el-input>
            </el-form-item>
        </el-form>
                <div class="footer" style="text-align:center">
                    <el-button type="primary" @click.native="editSubmit" :loading="loading">保存</el-button>
                    <el-button @click.native="editSubmitFasle">取消</el-button>
                </div>
            </el-col>
        </template>

      </div>
    </div>
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
            //新增分类
            editAgent: {
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
            },
            loading: false,
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getAgentById: 'agent/getAgentById',
            updateAgent: 'agent/updateAgent',
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取分类信息
        getAgentInfo: function(id){
            this.getAgentById(id).then(res => {
                if(res.success){
                    this.editAgent = res.data;
                }
            })
        },

        //编辑商品
        editSubmit: function(){
            let para = {
                id: this.$route.query.id,
                agentName: this.editAgent.agentName,
                agentNo: this.editAgent.agentNo,
                agentAddress: this.editAgent.agentAddress,
                agentContact: this.editAgent.agentContact,
                agentContactPhone: this.editAgent.agentContactPhone,
                agentContactTelephone: this.editAgent.agentContactTelephone,
                agentContactEmail: this.editAgent.agentContactEmail,
                remark: this.editAgent.remark,
            }
            
            this.$refs.editAgent.validate((valid) => {
                if(valid){
                    this.updateAgent(para).then((res) => {
                        if(res.success){ 
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.replace({ path: '/agenttList'})
                        }
                    })
                }
            });
        },
        //编辑取消
        editSubmitFasle: function(){
            this.$router.replace('/agenttList');
        },
    },
    computed: {
        // 将VUEX中的state映射到页面
        ...mapState('prod', [
            'page'
        ]),
        uploadUrl: function() {
            return __uploadApi;
        },
    },
    
    created: function() {
        this.getAgentInfo(this.$route.query.id)
    }
}

</script>
<style lang="scss">
@import '~scss_index';
.addBox {
    width: 72%;
}

</style>