<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form :model="editCate" :rules="editCateRules" label-width="100px" ref="editCate">
                    <h3>编辑分类</h3>
                    <el-form-item label="分类名称：" prop="categoryName">
                        <el-row>
                            <el-col :span="8"><el-input v-model="editCate.categoryName" :maxlength='4' placeholder="分类名称最多4个字" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="分类编号：" prop="categoryNo">
                        <el-row>
                            <el-col :span="8"><el-input v-model="editCate.categoryNo" :maxlength='20' placeholder="分类编号最多20个字" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="分类排序：" prop="categorySort">
                        <el-row>
                            <span>{{editCate.categorySort}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="editCate.remark" :maxlength='100'></el-input>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align:center">
                    <el-button type="primary" @click.native="editSubmit">保存</el-button>
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
            //新增分类
            editCate: {
                categoryName: '',
                categoryNo: '',
                remark:''
            },
            editCateRules: {
                categoryName: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ],
                categoryNo: [
                    { required: true, message: '请输入分类编号', trigger: 'blur' },
                    { validator: checkNo, trigger: 'blur' }
                ]
            },
            // loading: false,
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getProductCategoryById: 'product/getProductCategoryById',
            updateProductCategory: 'product/updateProductCategory',
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取分类信息
        getCateInfo: function(id){
            this.getProductCategoryById(id).then(res => {
                if(res.success){
                    this.editCate = res.data;
                }
            })
        },

        //编辑商品
        editSubmit: function(){
            let para = {
                id: this.$route.query.id,
                categoryName: this.editCate.categoryName,
                categoryNo: this.editCate.categoryNo,
                
                remark: this.editCate.remark,
            }
            
            this.$refs.editCate.validate((valid) => {
                if(valid){
                    // this.loading = true;   
                    this.updateProductCategory(para).then((res) => {
                        if(res.success){
                            // this.loading = false;   
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.replace({ path: '/categoryList'})
                        }
                    })
                }
            });
        },
        //编辑取消
        editSubmitFasle: function(){
            this.$router.replace('/categoryList');
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
        this.getCateInfo(this.$route.query.id)
    }
}

</script>
<style lang="scss">
@import '~scss_index';
.addBox {
    width: 72%;
}

</style>