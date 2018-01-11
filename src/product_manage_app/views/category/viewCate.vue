<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>查看分类</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form :model="viewCate"  label-width="110px" >
                    <h3>查看分类</h3>
                    <el-form-item label="分类名称：" prop="categoryName">
                        <el-row>
                            <span>{{viewCate.categoryName}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="分类编号：" prop="categoryNo">
                        <el-row>
                            <span>{{viewCate.categoryNo}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="分类排序：" prop="categorySort">
                        <el-row>
                            <span>{{viewCate.categorySort}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <span>{{viewCate.remark}}</span>
                    </el-form-item>
                    <el-form-item label="创建人：" prop="createdName">
                        <el-row>
                            <span>{{viewCate.createdName}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="创建时间：" prop="creationTime">
                        <el-row>
                            <span>{{filterTime(viewCate.creationTime)}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="最后更新人：" prop="lastUpdatedName">
                        <el-row>
                            <span>{{viewCate.lastUpdatedName}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="最后更新时间：" prop="lastUpdateTime">
                        <el-row>
                            <span>{{filterTime(viewCate.lastUpdateTime)}}</span>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align:center">
                    <el-button @click.native="viewSubmitFasle">返回</el-button>
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

        return {
            //新增分类
            viewCate: {
                categoryName: '',
                categoryNo: '',
                remark:''
            },
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getProductCategoryById: 'product/getProductCategoryById',
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取分类信息
        getCateInfo: function(id){
            this.getProductCategoryById(id).then(res => {
                if(res.success){
                    this.viewCate = res.data;
                }
            })
        },
        //取消
        viewSubmitFasle: function(){
            this.$router.replace('/categoryList');
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