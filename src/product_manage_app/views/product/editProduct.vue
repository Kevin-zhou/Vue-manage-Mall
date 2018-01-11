<template>
  <div class="table-outer">
    <div class="table-warp">
      <div style="width:99%;">
        <div class="mb20 clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
          </el-breadcrumb>

        </div>

        <template>
            <el-col class="toolbar addBox">
                <el-form class=" " :model="editProd" :rules="editProdRules" label-width="100px" ref="editProd">
                    <h3>编辑商品</h3>
                    <el-form-item label="商品名称：" prop="productName">
                        <el-row>
                            <el-col :span="8"><el-input v-model="editProd.productName" :maxlength='50' auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品编号：" prop="productNo">
                        <el-row>
                            <el-col :span="8"><el-input v-model="editProd.productNo" :maxlength='20' auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="条形码：" prop="barCode">
                        <el-row>
                            <el-col :span="8"><el-input v-model="editProd.barCode" :maxlength='50' auto-complete="off" @blur="getProdInfo(editProd.barCode)"></el-input></el-col>
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
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="editProd.productDescription" :maxlength='50'></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="editProd.remark" :maxlength='100'></el-input>
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
            imageUrls: "",
            // loading: false,
            editProd: {
                productName: '',
                productNo: '',
                barCode: '',
                thumbnail: '',
                remark: '',
                productDescription: ''
            },
            editProdRules: {
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
            getProductByBarcode: "product/getProductByBarcode",
            getProductById: "product/getProductById",
            updateProduct: "product/updateProduct"
        }),
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({

        }),
        //根据id获取商品信息
        getInfo: function(id){
            this.getProductById(id).then(res => {
                if(res.success){
                    this.editProd = res.data;
                    this.imageUrls =this.editProd.thumbnail
                }
            })
        },
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
        //编辑商品
        editSubmit: function(){
            let para = this.editProd;
            para.id = this.$route.query.id
            
            this.$refs.editProd.validate((valid) => {
                if(valid){
                    // this.loading = true;   
                    this.updateProduct(para).then((res) => {
                        if(res.success){
                            // this.loading = false;   
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.replace({ path: '/productList'})
                        }
                    })
                }
            });
        },
        //新增取消
        editSubmitFasle: function(){
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
                  this.editProd.thumbnail=res.data;
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