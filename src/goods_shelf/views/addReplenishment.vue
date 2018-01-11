<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item  >货架管理</el-breadcrumb-item>
            <el-breadcrumb-item  to="/replenishment" >补货管理</el-breadcrumb-item>
            <el-breadcrumb-item>补货信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->
        <el-form ref="ToAllform" :model="ToAll" :inline="true"  size="small">
            <el-form-item label="货架名称:">
                <el-input placeholder="货架名称" v-model.trim="ToAll.shelfName" >
                    <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <el-form-item label="货架地址:">
                <el-input placeholder="货架地址" v-model.trim="ToAll.shelfLoaction" >
                    <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <!-- <div style="padding-left:50px;"> -->
                <el-form-item  >
                    <el-button type="primary" icon="el-icon-search" size="small"  @click="getAll">搜索</el-button>
                </el-form-item>
            <!-- </div> -->
        </el-form>

           <!-- 列表 -->
        <el-table  v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">

            <el-table-column
                prop="shelfName"
                label="货架名称"
            >
            </el-table-column>

            <el-table-column
                prop="shelfNo"
                label="货架编号"
            >
            </el-table-column>


            <el-table-column
                prop="shelfLocation"
                label="货架地址">
            </el-table-column>

            <el-table-column
                prop="totalQuantity"
                label="商品总数">
            </el-table-column>

            <el-table-column
                prop="currentQuantity"
                label="当前数量">
            </el-table-column>

            <el-table-column  label="操作"  fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary"
                    @click.stop="replenishGoods(scope.row.shelfId,scope.row)"
                    size="small">补货商品</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-dialog  width="50%" center title="补货商品" :visible.sync="dialogFormVisible">
            <!-- 列表 -->
            <el-table  height="380" v-loading="dialogLoading"
                :data="dialogData"
                stripe
                style="width: 100%">

                <el-table-column  label="选择" width="60"  fixed="left">
                    <template slot-scope="scope">
                       <el-checkbox v-model="scope.row.check" ></el-checkbox>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="productName"
                    label="商品名称"
                >
                </el-table-column>

                <el-table-column
                    prop="totalQuantity"
                    label="商品数量"
                >
                </el-table-column>

                <el-table-column
                    prop="currentQuantity"
                    label="商品当前数量">
                </el-table-column>

                <el-table-column
                    prop="replenishmentQuantity"
                    label="补货数量">
                        <template slot-scope="scope">

                            <el-input v-if="scope.row.replenishmentQuantity==0"
                                placeholder="补货数量"
                                v-model="scope.row.replenishmentQuantity" ></el-input>

                            <span v-if="scope.row.replenishmentQuantity!==0">{{scope.row.replenishmentQuantity}}</span>

                    </template>
                </el-table-column>

            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button   type="primary" @click="saveChangeShelf">确 定</el-button>
            </div>
        </el-dialog>

        <el-form :rules="rules" :model="replenishment"
                style="margin:30px 0"  ref="replenish"
                :inline="true" label-position="right" >
            <el-form-item prop="application"  label="申请人:">
                <el-input placeholder="申请人姓名" v-model.trim="replenishment.application" >
                </el-input>
            </el-form-item>
            <el-form-item prop="replenishmentName"  label="补货单名称:">
                <el-input placeholder="补货单名称" v-model.trim="replenishment.replenishmentName" >
                </el-input>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input placeholder="备注" v-model.trim="replenishment.remark" >
                </el-input>
            </el-form-item>

            <el-button  :loading="Btnloading" type="primary" @click="add" >确 定</el-button>

        </el-form>

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


    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../vuex";
export default {
  data() {
    return {
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      tableData: null,
      loading: false,
      Btnloading: false,
      //所有商品列表
      ToAll: {
        shelfName: null,
        shelfLoaction: null
      },
      //确定补货参数补货
      replenishment: {
        application: "",
        remark: "",
        replenishmentName: "",
        product: []
      },
      //补货商品
      dialogFormVisible: false,
      dialogLoading: false,
      dialogData: [],
      //选择补货
      checkShelf: [],
      //补货index
      //   checkIndex: null,
      //货架id
      shelfId: null,

      //检验
      rules: {
        application: [
          { required: true, message: "请输入申请人姓名", trigger: "blur,change" }
        ],
        replenishmentName: [
          { required: true, message: "请输入补货单名称", trigger: "blur,change" }
        ]
      }
    };
  },

  methods: {
    ...mapActions({
      // 查询所有的货架接口
      getReplenishmentShelfList: "shelf/getReplenishmentShelfList",
      // 获取补货的商品 根据货架id
      getShelfReplenishmentProductList:
        "shelf/getShelfReplenishmentProductList",
      // 1、	新增补货单
      addShelfReplenishmentList: "shelf/addShelfReplenishmentList"
    }),
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
    //all
    getAll() {
      Object.assign(this.ToAll, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getReplenishmentShelfList(this.ToAll).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    //补货商品
    replenishGoods(val, row) {
      this.shelfId = val;
      if (row.shelfStatus == 0) {
        this.$message.error("此货架正在补货");
        return;
      }
      //   this.checkIndex = index;

      this.dialogFormVisible = true;
      this.getShelfReplenishmentProductList(val).then(data => {
        this.dialogData = [];
        data.data.map(el => {
          this.dialogData.push({
            check: false,
            replenishBy: el.replenishBy,
            productId: el.id,
            productName: el.productName,
            totalQuantity: el.totalQuantity,
            currentQuantity: el.currentQuantity,
            replenishmentQuantity: el.replenishmentQuantity
          });
        });
      });
    },
    //确定补货
    saveChangeShelf() {
      this.dialogData.map(el => {
        if (el.check) {
          this.replenishment.product.push({
            replenishBy: el.replenishBy,
            shelfId: this.shelfId,
            shelfProductId: el.productId,
            quantity: el.replenishmentQuantity
          });
        }
      });
      this.dialogFormVisible = false;
    },
    add() {
      this.$refs.replenish.validate(valid => {
        // 判断表单校验是否成功
        if (valid) {
          if (this.replenishment.product.length == 0) {
            this.$message.error("请添加补货商品");
          } else {
            this.getVal();
          }
        } else {
          return false;
        }
      });
    },
    //整合参数
    getVal() {
      this.Btnloading = true;
      //去重
      let productList = [];
      let arr = [];

      this.replenishment.product.map(el => {
        arr.push(JSON.stringify(el));
      });

      let formArr = Array.from(new Set(arr));
      formArr.map(el => {
        productList.push(JSON.parse(el));
      });
      this.replenishment.product = productList;


      this.addShelfReplenishmentList(this.replenishment).then(data => {
        this.Btnloading = false;
        if (data.success) {
          this.dialogFormVisible = false;
          this.$router.push({ path: "/replenishment" });
        }
      });
    }
  },
  computed: {},

  // 页面需要补货信息
  created() {
    this.getAll();
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~scss_index";

.el-input__icon {
  cursor: pointer;
}
.footerBtn {
  text-align: right;
  margin: 30px 0;
  padding-right: 460px;
}
</style>
