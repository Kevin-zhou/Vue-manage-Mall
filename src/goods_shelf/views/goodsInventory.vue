<template>
    <div class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>货架管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="inventory" :inline="true" label-width="60px" size="small">
        <el-form-item label="货架:">
          <el-input placeholder="货架名称" v-model.trim="inventory.shelfName" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="编号:">
          <el-input placeholder="货架编号" v-model.trim="inventory.shelfNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="商品:">
          <el-input placeholder="商品名称" v-model.trim="inventory.productName" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="编号:">
          <el-input placeholder="商品编号" v-model.trim="inventory.productNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <div style="padding-left:50px;">
          <el-form-item class="fl">
            <el-button type="primary" icon="icon-shelf" size="small"  @click="getAll">搜索</el-button>
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
            label="货架名称"
            fixed
            width="200" >
        </el-table-column>

        <el-table-column
            prop="shelfNo"
            label="货架编号"
            width="120">
        </el-table-column>

        <el-table-column
            prop="productName"
            label="商品名称"
            width="200">
        </el-table-column>

        <el-table-column
            prop="productNo"
            label="商品编号"
            width="120">
        </el-table-column>

        <el-table-column
            prop="totalQuantity"
            label="累计总数量"
            width="90">
        </el-table-column>

        <el-table-column
            prop="currentQuantity"
            label="当前数量"
            width="90">
        </el-table-column>

        <el-table-column
            prop="saleQuantity"
            label="销售数量"
            width="90">
        </el-table-column>

        <el-table-column
            prop="toplimitQuantity"
            label="上限数量"
            width="90">
        </el-table-column>

        <el-table-column
            prop="warningQuantity"
            label="预警数量"
            width="90">
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
      Btnloading: false,
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      tableData: null,
      loading: false,

      inventory: {
        shelfName: "", //货架名称 模糊查询
        shelfNo: "", //货架编号
        productName: "", //商品名称
        productNo: "" //商品编号
      }
    };
  },

  methods: {
    ...mapActions({
      getShelfProductInventoryList: "shelf/getShelfProductInventoryList"
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

    getAll() {
      Object.assign(this.inventory, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfProductInventoryList(this.inventory).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    }
  },
  computed: {},

  // 页面开始获取用户列表
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
.shelfName {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
