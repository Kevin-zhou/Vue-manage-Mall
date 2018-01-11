<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>查看商品</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form class=" " :model="viewProd" label-width="110px">
                    <h3>查看商品</h3>
                    <el-form-item label="商品名称：">
                        <span>{{viewProd.productName}}</span>
                    </el-form-item>
                    <el-form-item label="商品编号：">
                        <span>{{viewProd.productNo}}</span>
                    </el-form-item>
                    <el-form-item label="条形码：">
                        <span>{{viewProd.barCode}}</span>
                    </el-form-item>
                    <el-form-item label="商品图片：">
                        <img class="avatar" :src="viewProd.thumbnail"/>
                    </el-form-item>
                    <el-form-item label="商品描述：">
                        <span>{{viewProd.productDescription}}</span>                    
                    </el-form-item>
                    <el-form-item label="备注：">
                        <span>{{viewProd.remark}}</span>  
                    </el-form-item>


                    <el-form-item label="创建人：" prop="createdName">
                        <el-row>
                            <span>{{viewProd.createdName}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="创建时间：" prop="creationTime">
                        <el-row>
                            <span>{{filterTime(viewProd.creationTime)}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="最后更新人：" prop="lastUpdatedName">
                        <el-row>
                            <span>{{viewProd.lastUpdatedName}}</span>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="最后更新时间：" prop="lastUpdateTime">
                        <el-row>
                            <span>{{filterTime(viewProd.lastUpdateTime)}}</span>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align:center">
                    <el-button @click.native="returnBtn">返回</el-button>
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
            imageUrls: "",
            loading: false,
            viewProd: {
                productName: '',
                productNo: '',
                barCode: '',
                thumbnail: '',
                remark: '',
                productDescription: '',
                createdName: '',
                creationTime:'',
                lastUpdatedName: '',
                lastUpdateTime:''
            }
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            getProductById: "product/getProductById"
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取商品信息
        getInfo: function(id){
            this.getProductById(id).then(res => {
                if(res.success){
                    this.viewProd = res.data
                }
            })
        },
        // 返回列表
        returnBtn: function(){
            this.$router.replace('/productList');
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
        this.getInfo(this.$route.query.id)
    }
}

</script>
<style lang="scss">
@import '~scss_index';
.addBox {
    width: 72%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>