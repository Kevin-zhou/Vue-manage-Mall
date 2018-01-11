<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>货架管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/goodsCheck">货架盘点</el-breadcrumb-item>
            <el-breadcrumb-item>盘点明细</el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->
        <el-form ref="form" :model="search" label-width="78px" :inline="true"size="small">

            <el-form-item label="货架名称:">
                <el-input style="width:190px;" placeholder="货架名称" v-model="search.shelfName" >
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <el-form-item label="货架编号:">
                <el-input style="width:190px;"  placeholder="货架编号" v-model="search.shelfNo" >
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <el-form-item label="商品名称:">
                <el-input style="width:190px;"  placeholder="商品名称" v-model="search.productName" >
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <el-form-item label="商品编号:">
                <el-input style="width:190px;"  placeholder="商品编号" v-model="search.productNo" >
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
                </el-input>
            </el-form-item>

            <div style="padding-left:50px;">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-search" size="small"  @click="getAll">搜索</el-button>
                </el-form-item>
            </div>
        </el-form>
         <!-- 列表 -->
        <el-table  v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">


            <el-table-column
                prop="shelfName"
                label="货架名称">
            </el-table-column>

            <el-table-column
                prop="shelfNo"
                label="货架编号" >
            </el-table-column>

            <el-table-column
                prop="productName"
                label="商品名称" >
            </el-table-column>

            <el-table-column
                prop="productNo"
                label="商品编号">
            </el-table-column>

            <el-table-column
                prop="currentQuantity"
                label="商品数量">
            </el-table-column>

            <el-table-column
                prop="creationTime"
                label="创建时间" >
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.creationTime)}}</P>
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
      dialogFormVisible: false,
      tableData: null,
      loading: false,
      search: {
        stocktakeId: "",
        shelfName: "", //货架名称
        shelfNo: "", //货架编号
        productName: "", //商品名称
        productNo: "" //商品编号
      }
    };
  },

  methods: {
    ...mapActions({
      // 4、根据条件查询货架盘点明细列表
      getShelfStocktakeItemList: "shelf/getShelfStocktakeItemList"
    }),

    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
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

    //查询列表
    getAll() {
      Object.assign(this.search, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfStocktakeItemList(this.search).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    }
  },
  computed: {},
  // 页面开始获取用户列表
  created() {
    this.search.stocktakeId = this.$route.query.stocktakeId;
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
.shelfName {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
