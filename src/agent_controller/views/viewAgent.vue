<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
            <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
            <el-breadcrumb-item>查看代理商</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form :model="viewAgent" label-width="130px" ref="viewAgent">
                <h3>查看代理商</h3>
                    <el-row> 
                        <el-col :span="12">
                            <el-form-item label="代理商名称：" prop="agentName">
                                <span>{{viewAgent.agentName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="代理商编号：" prop="agentNo">
                                <span>{{viewAgent.agentNo}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row> 
                        <el-col :span="12">
                            <el-form-item label="代理商地址：" prop="agentAddress">
                                <span>{{viewAgent.agentAddress}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系人：" prop="agentContact">
                                <span>{{viewAgent.agentContact}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row> 
                        <el-col :span="12">
                            <el-form-item label="固定电话：" prop="agentContactPhone">
                                <span>{{viewAgent.agentContactPhone}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系人手机：" prop="agentContactTelephone">
                                <span>{{viewAgent.agentContactTelephone}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="联系人邮箱：" prop="agentContactEmail">
                        <span>{{viewAgent.agentContactEmail}}</span>
                    </el-form-item>
                     <el-row> 
                        <el-col :span="12">
                            <el-form-item label="创建人：" prop="createdName">
                                <span>{{viewAgent.createdName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="创建时间：" prop="creationTime">
                                <span>{{filterTime(viewAgent.creationTime)}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row> 
                        <el-col :span="12">
                            <el-form-item label="最后更新人：" prop="lastUpdatedName">
                                <span>{{viewAgent.lastUpdatedName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="最后更新时间：" prop="lastUpdateTime">
                                <span>{{filterTime(viewAgent.lastUpdateTime)}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注：" prop="remark">
                        <span>{{viewAgent.remark}}</span>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align:center">
                    <el-button @click.native="returnList">返回</el-button>
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
        return {
            //查看分类
            viewAgent: {
                agentName: '',
                agentNo: '',
                agentAddress: '',
                agentContact: '',
                agentContactPhone:'',
                agentContactTelephone:'',
                agentContactEmail:'',
                createdName:'',
                creationTime:'',
                lastUpdatedName:'',
                lastUpdateTime:'',
                remark:''
            },
            
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getAgentById: 'agent/getAgentById',
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取分类信息
        getAgentInfo: function(id){
            this.getAgentById(id).then(res => {
                if(res.success){
                    this.viewAgent = res.data;
                }
            })
        },
        
        // 时间戳转换
        filterTime(val) {
            return __filterTime(val);
        },

        // 返回代理商列表
        returnList: function(){
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