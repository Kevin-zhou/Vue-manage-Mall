<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>货架管理</el-breadcrumb-item>
            <el-breadcrumb-item>货架盘点</el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->
        <el-form ref="form" :model="search" :inline="true"size="small">

            <el-form-item label="盘点人手机号:">
                <el-input placeholder="盘点人手机号" v-model="search.stocktakeByAccount" >
                <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
            </el-input>
            </el-form-item>

            <el-form-item  label="盘点时间:"  label-width="72px">
                <el-col :span="11">
                    <el-date-picker
                        v-model="startTime"
                        @change="TimeChange"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-col>
                <el-col class="line center" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                        v-model="endTime"
                        @change="TimeChange"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-col>
            </el-form-item>

            <div style="padding-left:50px;">
                <el-form-item class="fl">
                    <el-button type="primary" icon="el-icon-search" size="small"  @click="getAll">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="small"  @click="dialogFormVisible = true">新增</el-button>
                </el-form-item>
            </div>
        </el-form>
         <!-- 列表 -->
        <el-table  v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">

            <el-table-column
                prop="stocktakeByName"
                label="盘点人名称"
                width="120">
                <template slot-scope="scope">
                    <span @click="ToGoodcheckList(scope.row.id)" class="shelfName">{{scope.row.stocktakeByName}}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="stocktakeByAccount"
                label="盘点人账号">
            </el-table-column>

            <el-table-column
                prop="stocktakeStartTime"
                label="盘点发起时间" >
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.stocktakeStartTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="stocktakeEndTime"
                label="盘点完成时间" >
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.stocktakeEndTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="remark"
                label="备注">
            </el-table-column>

            <el-table-column
                prop="creationTime"
                label="创建时间" >
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.creationTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="createdName"
                label="创建人名称">
            </el-table-column>


            <!-- <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.userStatus==0" @click.stop="enableDict(scope.row.id)" type="primary"   size="small">启用</el-button>
                    <el-button v-if="scope.row.userStatus==1" @click.native.prevent="disableDict(scope.row.id)" type="primary"   size="small">停用</el-button>
                    <el-button type="primary" @click.stop="showDialog(scope.row)"   size="small">编辑</el-button>
                </template>
            </el-table-column> -->

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
        <el-dialog title="新增盘点" width="70%"
            :visible.sync="dialogFormVisible">
             <el-transfer
            style="width:60%;margin-left:22%"
                :titles="['盘点列表', '已选择盘点']"
                v-model="value1"
                :data="ProductList"
                @change="transfer" >
            </el-transfer>
            <div slot="footer" class="footerBtn">
                <el-form ref="remark" :model="addStocktake" size="small" label-width="60px">
                    <el-form-item label="备注:"  label-width="260px" >
                        <el-input placeholder="备注" v-model="addStocktake.remark" >
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button :loading="Btnloading" type="primary" @click="add" >确 定</el-button>
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
      Btnloading: false,
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      dialogFormVisible: false,
      tableData: null,
      loading: false,
      //时间选择
      startTime: null,
      endTime: null,
      //筛选参数
      search: {
        stocktakeByAccount: "", ////盘点人手机号
        stocktakeStartTime: "", //盘点开始时间
        stocktakeEndTime: "" //盘点完成时间
      },
      ProductList: [],
      value1: [],
      //新增盘点  参 数
      addStocktake: {
        shelfIds: [],
        remark: null
      }
    };
  },

  methods: {
    ...mapActions({
      // 1、查询货架盘点列表
      getShelfStocktakeList: "shelf/getShelfStocktakeList",
      // 2、生成盘点单
      addShelfStocktake: "shelf/addShelfStocktake",
      // 3、获取需要盘点的货架列表
      getStocktakeShelfList: "shelf/getStocktakeShelfList",
      // 4、根据条件查询货架盘点明细列表
      getShelfStocktakeItemList: "shelf/getShelfStocktakeItemList"
    }),
    //搜索时间判断
    TimeChange() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime();
      if (start > end && end !== 0) {
        // this.search.stocktakeEndTime = this.search.stocktakeStartTime;
        this.$message.error("开始时间不能大于结束时间");
      }
    },

    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
    },

    //去盘点清单
    ToGoodcheckList(val) {
      this.$router.push({
        path: "/goodsCheckList",
        query: { stocktakeId: val }
      });
    },

    // 启用
    enableDict(val) {
      this.enableSysUser(val).then(data => {
        this.getAll();
      });
    },
    // 停用
    disableDict(val) {
      this.disableSysUser(val).then(data => {
        this.getAll();
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
    // 穿梭
    transfer() {},
    //确认新增
    add() {
      this.addStocktake.shelfIds = this.value1;
      this.ToaddShelfStocktake(this.addStocktake);
    },
    //查询列表
    getAll() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime() + 86399000;

      if (this.startTime) {
        this.search.stocktakeStartTime = __filterTime(start);
      } else {
        this.search.stocktakeStartTime = null;
      }

      if (this.endTime) {
        this.search.stocktakeEndTime = __filterTime(end);
      } else {
        this.search.stocktakeEndTime = null;
      }

      Object.assign(this.search, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfStocktakeList(this.search).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    // 2、新增 生成盘点单
    ToaddShelfStocktake(val) {
      this.addShelfStocktake(val).then(data => {
        if (data.success) {
          this.dialogFormVisible = false;
          this.getAll();
        }
      });
    },
    // 3、获取需要盘点的货架列表
    TogetStocktakeShelfList() {
      this.getStocktakeShelfList().then(data => {
        data.data.map(el => {
          this.ProductList.push({
            key: el.id,
            label: el.shelfName
          });
        });
      });
    },
    // 4、根据条件查询货架盘点明细列表
    TogetShelfStocktakeItemList() {
      this.getShelfStocktakeItemList().then(data => {});
    }
  },
  computed: {},
  // 页面开始获取用户列表
  created() {
    this.TogetStocktakeShelfList();
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
  color: #409eff;
}
.footerBtn {
  text-align: right;
  padding-right: 100px;
  margin-bottom: 50px;
}
</style>
