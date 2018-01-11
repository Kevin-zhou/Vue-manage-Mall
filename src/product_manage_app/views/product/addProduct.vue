<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增商品</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form class=" " :model="addProd" :rules="addProdRules" label-width="100px" ref="addProd">
                    <h3>新增商品</h3>
                    <el-form-item label="商品名称：" prop="productName">
                        <el-row>
                            <el-col :span="8"><el-input v-model="addProd.productName" :maxlength='50' auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="productNo">
                        <el-row>
                            <el-col :span="8"><el-input v-model="addProd.productNo" :maxlength='20' auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="条形码：" prop="barCode">
                        <el-row>
                            <el-col :span="8"><el-input v-model="addProd.barCode" :maxlength='50' auto-complete="off" @blur="getProdInfo(addProd.barCode)"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品图片：" prop="thumbnail">
                        <el-upload
                            class="avatar-uploader"
                            v-bind:action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccessful"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrls" :src="imageUrls" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>只能上传 jpg/png 文件，且不超过 500kb</span>
                    </el-form-item>

                    <el-form-item label="商品描述：" prop="productDescription">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="addProd.productDescription" :maxlength='50'></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="addProd.remark" :maxlength='100'></el-input>
                    </el-form-item>
                </el-form>
                <div class="footer" style="text-align:center">
                    <el-button type="primary" @click.native="addSubmit">添加</el-button>
                    <el-button @click.native="addSubmitFasle">取消</el-button>
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
            imageUrls: "",
            // loading: false,
            addProd: {
                productName: '',
                productNo: '',
                barCode: '',
                thumbnail: '',
                remark: '',
                productDescription: ''
            },
            addProdRules: {
                productName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                productNo: [
                    { required: true, message: '请输入商品编号', trigger: 'blur' },
                    { validator: checkNo, trigger: 'blur' }
                ],
                thumbnail: [
                    { required: true, message: '请上传商品图片', trigger: 'change' },
                ],
                productDescription: [
                    { required: true, message: '请输入商品描述', trigger: 'blur' },
                ]
            }
        }
    },

    methods: {
        // 将VUEX中的action方法映射到页面
        ...mapActions({
            addProduct: "product/addProduct",
            getProductByBarcode: "product/getProductByBarcode"
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据条形码获取商品信息
        getProdInfo: function(data){

            if(null == data || data === '')
            {
                return;
            }

            this.getProductByBarcode(data).then(res => {
                if(res.success){
                    if(null != res.data && null != res.data.id && this.$route.query.id != res.data.id)
                    {
                        this.$message({
                        message: '条形码已存在',
                        type: 'warning'
                        });
                    }
                }
            })
        },
        //新增商品
        addSubmit: function(){
            let para = this.addProd;
            
            this.$refs.addProd.validate((valid) => {
                if(valid){
                    // this.loading = true;   
                    this.addProduct(para).then((res) => {
                        if(res.success){
                            // this.loading = false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.replace({ path: '/productList'})
                        }
                    })
                }
            });
        },
        //新增取消
        addSubmitFasle: function(){
            this.$router.replace('/productList');
        },
        //判断图片上传
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt500K = file.size / 1024 < 500;

            if (!isJPG) {
            this.$message.error('上传图片只能是 JPG或 PNG 格式!');
            }
            if (!isLt500K) {
            this.$message.error('上传图片大小不能超过 500Kb!');
            }
            return isJPG && isLt500K;
        },
        //上传图片
        handleAvatarSuccessful(res, file) {
             this.imageUrls = URL.createObjectURL(file.raw);
             if(res.success){              
                  this.addProd.thumbnail=res.data;
             }                 
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
    // 页面开始获取列表
    created: function() {
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