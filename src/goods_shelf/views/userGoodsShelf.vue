<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item  >货架管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/goodsShelfManage">货架信息</el-breadcrumb-item>
            <el-breadcrumb-item>货架商品信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->

      <el-form ref="form" :model="shelfGoods" :inline="true" label-width="60px" size="small">
        <el-form-item label="名称:">
          <el-input placeholder="商品名称" v-model.trim="shelfGoods.productName" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="状态:">
          <el-select v-model="shelfGoods.isShelf" clearable placeholder="请选择状态">
                <el-option
                    v-for="item in selects"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

        </el-form-item>

        <el-form-item label="编号:">
          <el-input placeholder="商品编号" v-model.trim="shelfGoods.productNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="分类:">
          <!-- <el-input placeholder="商品分类" v-model.trim="shelfGoods.productNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input> -->

            <el-select   v-model="shelfGoods.categoryId" clearable placeholder="请选择">
                <el-option
                    v-for="itin in AllCategoryList"
                    :key="itin.id"
                    :label="itin.categoryName"
                    :value="itin.id">
                </el-option>
            </el-select>

        </el-form-item>


        <div style="padding-left:50px;">
          <el-form-item class="fl">
            <el-button type="primary" icon="icon-shelf" size="small"  @click="getAll">搜索</el-button>
            <el-button type="primary" icon="icon-plus" size="small"  @click="addShelfGoods">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
       <!-- 列表 -->
        <el-table  v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="productName"
                label="商品名称"
                fixed
                width="120" >
            </el-table-column>

            <el-table-column
                prop="productNo"
                label="商品编号"
                width="85">
            </el-table-column>

            <el-table-column
                prop="shelfProductCategoryName"
                label="商品分类"
                width="120">
            </el-table-column>

            <el-table-column
                prop="shelfProductPrice"
                label="商品价格"
                width="85">
            </el-table-column>

            <el-table-column
                prop="shelvesTime"
                label="上架时间"
                width="160">
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.shelvesTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="unshelveTime"
                label="下架时间"
                width="160">
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.unshelveTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="remark"
                label="货架备注"
                width="110">
            </el-table-column>

            <el-table-column
                prop="creationTime"
                label="创建时间"
                width="160" >
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.creationTime)}}</P>
                </template>
            </el-table-column>

            <!-- <el-table-column
                prop="createdBy"
                label="创建人ID"
                width="92">
            </el-table-column>

            <el-table-column
                prop="createdByName"
                label="创建人名称"
                width="90">
            </el-table-column> -->

            <el-table-column
                prop="isShelf"
                label="状态"
                :formatter="formatStatus"
                width="80">
            </el-table-column>

            <el-table-column label="操作"  fixed="right"
                width="220">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isShelf==0" @click.stop="enableDict(scope.row.id)" type="primary"   size="small">上架</el-button>
                    <el-button v-if="scope.row.isShelf==1" @click.native.prevent="disableDict(scope.row.id)" type="primary"   size="small">下架</el-button>
                    <el-button type="primary" @click.stop="ToupdateShelfGoods(scope.row)"   size="small">编辑</el-button>
                    <el-button type="danger" @click.stop="ToDelete(scope.row)"   size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :layout="layout"
                :total="total">
            </el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog :close-on-click-modal="false" width="70%" center close-on-click-modal:false title="编辑" :visible.sync="dialogFormVisible">
            <el-form :rules="rules"  ref="updateShelfGoods"  :inline="true" label-position="right" label-width="120px" :model="updateShelfGoods">

                <el-form-item prop="shelfProductPrice"  style="width:45%" label="商品价格:">
                    <el-input type="Number" style="width:300px;" v-model="updateShelfGoods.shelfProductPrice"></el-input>
                </el-form-item>

                <el-form-item prop="toplimitQuantity"  style="width:45%"  label="商品上限:">
                    <el-input type="Number" style="width:300px;"  v-model="updateShelfGoods.toplimitQuantity"></el-input>
                </el-form-item>

                <el-form-item prop="warningQuantity"  style="width:45%"   label="预警数量:">
                    <el-input type="Number" style="width:300px;"  v-model="updateShelfGoods.warningQuantity"></el-input>
                </el-form-item>

                <el-form-item  style="width:45%"   label="商品备注:">
                    <el-input style="width:300px;"  v-model="updateShelfGoods.remark"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button :loading="Btnloading" type="primary" @click="saveChangeShelf">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../vuex";
export default {
  data() {
    return {
      shelfGoods: {
        shelfId: null, //货架id,必传
        productName: "", //商品名称
        productNo: null, //商品编号
        isShelf: null, //上下架状态，1上架，0下架,
        categoryId:null
      },
      Btnloading: false,
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      tableData: null,
      loading: false,
      selects: [
        {
          label: "上架",
          value: "1"
        },
        {
          label: "下架",
          value: "0"
        }
      ],
      //编辑
      dialogFormVisible: false,
      updateShelfGoods: {
        shelfProductId: null, //货架商品ID
        shelfProductInventoryId: null, //货架商品库存ID
        productId: null, //商品ID
        shelfProductPrice: null, //货架商品价格
        toplimitQuantity: null, //货架商品最大上限数量
        warningQuantity: null, //货架商品补货预警数量
        remark: "" //货架商品备注
      },
      //检验
      rules: {
        shelfProductPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur,change" }
        ],
        toplimitQuantity: [
          { required: true, message: "请输入商品上限", trigger: "blur,change" }
        ],
        warningQuantity: [
          { required: true, message: "请输入预警数量", trigger: "blur,change" }
        ]
      },
      //新增
      //分类
      AllCategoryList: []
    };
  },

  methods: {
    ...mapActions({
      getShelfProductList: "shelf/getShelfProductList",
      addShelfProducts: "shelf/addShelfProducts",
      updateShelfProduct: "shelf/updateShelfProduct",
      deleteShelfProduct: "shelf/deleteShelfProduct",
      enableShelfProduct: "shelf/enableShelfProduct",
      disableShelfProduct: "shelf/disableShelfProduct",
      getShelfProductById: "shelf/getShelfProductById",
      getProductListByShelfId: "shelf/getProductListByShelfId",
      getEnabledCategoryList: "shelf/getEnabledCategoryList"
    }),
    //状态过滤
    formatStatus(row, column) {
      return row.isShelf == 1 ? "上架" : row.isShelf == 0 ? "下架" : "未知";
    },
    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
    },

    // 启用
    enableDict(val) {
      this.enableShelfProduct(val).then(data => {
        this.getAll();
      });
    },
    // 停用
    disableDict(val) {
      this.disableShelfProduct(val).then(data => {
        this.getAll();
      });
    },
    //删除
    ToDelete(val) {
      this.open2(val);
    },
    open2(val) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteShelfProduct(val.id).then(data => {
            if (data.success) {
              this.getAll();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页
    // 每页条数size
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAll();
    },
    // 当前页currentPage
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAll();
    },
    //获取商品列表
    getAll() {
      Object.assign(this.shelfGoods, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfProductList(this.shelfGoods).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },

    //新增商品
    addShelfGoods() {
      this.$router.push({
        path: "/addGoodsShelf",
        query: { id: this.shelfGoods.shelfId }
      });
    },
    //修改
    ToupdateShelfGoods(val) {
      this.updateShelfGoods.shelfProductId = val.id;
      this.updateShelfGoods.shelfProductInventoryId =
        val.shelfProductInventoryId;
      this.updateShelfGoods.productId = val.productId;
      this.updateShelfGoods.shelfProductPrice = val.shelfProductPrice;
      this.updateShelfGoods.toplimitQuantity = val.toplimitQuantity;
      this.updateShelfGoods.warningQuantity = val.warningQuantity;
      this.updateShelfGoods.remark = val.remark;

      this.dialogFormVisible = true;
    },
    //保存编辑
    saveChangeShelf() {
      this.$refs.updateShelfGoods.validate(valid => {
        // 判断表单校验是否成功
        if (valid) {
          this.Btnloading = true;
          this.updateShelfProduct(this.updateShelfGoods).then(data => {
            this.Btnloading = false;
            this.dialogFormVisible = false;
            this.getAll();
          });
        } else {
          return false;
        }
      });
    },
    //获取有效商品分类
    TogetEnabledCategoryList() {
      this.getEnabledCategoryList().then(data => {
        this.AllCategoryList = data.data;
      });
    }
  },
  computed: {},
  //   components: {
  //     addGoods: r=>{
  //         require(["./addGoodsShelf"],r)
  //     }
  //   },
  // 页面开始获取用户列表
  created() {
    this.shelfGoods.shelfId = this.$route.query.id;
    //获取商品列表
    this.getAll();
    //获取有效商品
    this.TogetEnabledCategoryList();
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~scss_index";
.el-input__icon {
  cursor: pointer;
}
</style>
