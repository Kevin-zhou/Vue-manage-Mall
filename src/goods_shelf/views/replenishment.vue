<template>
    <div class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>货架管理</el-breadcrumb-item>
      <el-breadcrumb-item>补货管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="replenishment" :inline="true"  size="small">
        <el-form-item label="补货单号:">
          <el-input placeholder="补货单号" v-model="replenishment.applyNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="补货状态:">
              <el-select v-model="replenishment.status" clearable placeholder="请选择状态">
                <el-option
                    v-for="item in selects"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="申请时间:">
                    <el-col :span="11">
                        <el-date-picker v-model="startTime"
                            type="date"  placeholder="选择日期"
                            style="width: 100%;" @change="TimeChange"
                        format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-col>
                    <el-col class="line center" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="endTime"
                        @change="TimeChange" type="date"
                        placeholder="选择日期" style="width: 100%;"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </el-col>
        </el-form-item>

        <el-form-item label="当前处理人:">
          <el-input placeholder="当前处理人" v-model="replenishment.currentOwner" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <div style="padding-left:50px;">
          <el-form-item class="fl">
            <el-button type="primary" icon="el-icon-search" size="small"  @click="getAll">搜索</el-button>
             <el-button type="primary" icon="el-icon-plus"  size="small"  @click="addReplenishment">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
       <!-- 列表 -->
    <el-table  v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            prop="applyNo"
            label="补货单号"
            fixed
            width="130"
            >

        </el-table-column>
         <el-table-column
            prop="replenishmentName"
            label="补货单名称"
            width="130"
            ></el-table-column>
        <!-- <el-table-column
            prop="applicant"
            label="补货人"
            width="140"
           >
        </el-table-column> -->

        <el-table-column
            prop="status"
            label="补货状态"
           :formatter ="formatStatus"
            width="100"
           >
        </el-table-column>

        <el-table-column label="补货申请时间"
            width="160">
           <template scope="scope">
                    <p>{{filterTime(scope.row.replenishmentTime)}}</p>
                </template>
        </el-table-column>

        <el-table-column
            prop="currentOwner"
            label="当前处理人"
            width="100">
        </el-table-column>

        <el-table-column
            prop="applicant"
            label="申请人"
            width="100">
        </el-table-column>

       <el-table-column label="操作"  fixed="right"
            width="420">
            <template slot-scope="scope">
                <el-button type="primary" v-if="scope.row.status==1"
                    @click.stop="TouUpdateApply(scope.row.id)"
                    size="small">审核通过</el-button>
                <el-button type="primary" v-if="scope.row.status==1"
                    @click.stop="TouUpdateReject(scope.row.id)"
                    size="small">驳回</el-button>
                <el-button type="primary" v-if="scope.row.status==2"
                    @click.stop="TouUpdateDestribution(scope.row.id)"
                    size="small">配送</el-button>
                <el-popover
                    ref="popover4"
                    placement="top"
                    width="200"
                    trigger="click" >
                     <el-form ref="Replenish" :model="Replenish" :inline="true"  size="small">
                        <el-form-item label=" ">
                            <el-select
                                v-model="Replenish.currentOwnerBy"
                                @change="currentOwnerByChange"
                                placeholder="请选择配送人">
                                <el-option
                                v-for="item in SysUserList"
                                :key="item.id"
                                :label="item.userName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                     </el-form>
                </el-popover>
                <el-button type="primary" v-if="scope.row.status==1 || scope.row.status==2 || scope.row.status==4"
                    @click="ToUpdateReplenish(scope.row.id)"
                    size="small" v-popover:popover4>修改配送人</el-button>
                <el-button type="primary"  @click.stop="particulars(scope.row.id)"
                    size="small">详情</el-button>
                 <el-button v-if="scope.row.status!==5" type="primary"  @click.stop="updateNumber(scope.row.id)"
                    size="small">修改</el-button>

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

    <!-- 详情列表 -->
    <el-dialog  width="50%" center title="详情" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="ToParticulars"  :inline="true"  size="small">
            <el-form-item label="补货单名称:">
                <el-input readonly  v-model="ToParticulars.ToParticulasName" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <el-table  v-loading="particularsLoading"
            :data="particularsData"
            style="width: 100%">
            <el-table-column
                prop="productName"
                label="商品名"
                fixed
                >
            </el-table-column>

             <el-table-column
                prop="shelfName"
                label="货架名称" >
            </el-table-column>

            <el-table-column
                prop="quantity"
                label="补货数量"
            >
            </el-table-column>

            <el-table-column
                prop="status"
                label="补货状态"
            :formatter ="particularsFormatStatus"
            >
            </el-table-column>

        </el-table>
    </el-dialog>

    <!-- 修改列表 -->
    <el-dialog  width="50%" center title="修改" :visible.sync="dialogReplenishmentList">
        <el-form ref="form" :model="updateShelfList" :inline="true"  size="small">
            <el-form-item label="补货单名称:">
                <el-input readonly  v-model="updateShelfList.replenishmentName" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <el-table height="300" v-loading="ReplenishmentListLoading"
            :data="updateData"
            style="width: 100%">
            <el-table-column
                prop="productName"
                label="商品名"
                fixed
                >
            </el-table-column>

            <el-table-column
                prop="quantity"
                label="补货数量"
            >
                <template slot-scope="scope">
                    <el-input  placeholder="补货数量"  v-model="scope.row.quantity" ></el-input>
                </template>

            </el-table-column>

            <el-table-column
                prop="status"
                label="补货状态"
                :formatter ="particularsFormatStatus"
            >
            </el-table-column>

        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogReplenishmentList = false">取 消</el-button>
            <el-button   type="primary" @click="saveUpdate">确 定</el-button>
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
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      tableData: null,
      loading: false,
      //时间选择
      startTime: null,
      endTime: null,
      //筛选参数
      replenishment: {
        applyNo: "",
        status: "",
        currentOwner: "",
        startTime: "",
        endTime: ""
      },
      selects: [
        {
          label: "已提交",
          value: "1"
        },
        {
          label: "审核通过",
          value: "2"
        },
        {
          label: "驳回",
          value: "3"
        },
        {
          label: "配送中",
          value: "4"
        },
        {
          label: "配送完成",
          value: "5"
        }
      ],
      //详情
      dialogFormVisible: false,
      particularsLoading: false,
      ToParticulars: {
        ToParticulasName: ""
      },
      particularsData: [],
      //修改补货人
      Replenish: {
        id: null,
        currentOwnerBy: null
      },
      //所有补货人
      SysUserList: [],
      //修改
      //修改补货数量
      ReplenishmentListLoading: false,
      dialogReplenishmentList: false,
      //表单数据
      updateData: [],
      //保存数据格式
      updateShelfList: {
        replenishmentName: "", //补货单名称
        shelfReplenishmentId: null, //补货单id
        remark: "",
        product: []
      }
    };
  },

  methods: {
    //搜索时间判断
    TimeChange() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime();
      if (start > end && end !== 0) {
        // this.search.stocktakeEndTime = this.search.stocktakeStartTime;
        this.$message.error("开始时间不能大于结束时间");
      }
    },
    ...mapActions({
      //补货信息
      getShelfReplenishmentList: "shelf/getShelfReplenishmentList",
      //详情
      getShelfReplenishment: "shelf/getShelfReplenishment",
      // 2、	修改补货状态 // 功能：审核通过
      updateApply: "shelf/updateApply",
      // 2、	修改补货状态 // 功能：配送中
      updateDestribution: "shelf/updateDestribution",
      // 2、	修改补货状态 // 驳回
      updateReject: "shelf/updateReject",
      //所有补货人
      getSysUserListByGroupNo: "shelf/getSysUserListByGroupNo",
      //修改补货
      updateReplenish: "shelf/updateReplenish",
      //修改补货数量
      updateShelfReplenishmentList: "shelf/updateShelfReplenishmentList"
    }),

    //状态过滤
    formatStatus(row, column) {
      return row.status == 1
        ? "已提交"
        : row.status == 2
          ? "审核通过"
          : row.status == 3
            ? "驳回"
            : row.status == 4 ? "配送中" : row.status == 5 ? "配送成功" : "未知";
    },

    filterTime(time) {
      return __filterTime(time);
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
    getAll() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime() + 86399000;

      if (this.startTime) {
        this.replenishment.startTime = __filterTime(start);
      } else {
        this.replenishment.startTime = null;
      }

      if (this.endTime) {
        this.replenishment.endTime = __filterTime(end);
      } else {
        this.replenishment.endTime = null;
      }

      Object.assign(this.replenishment, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfReplenishmentList(this.replenishment).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    //详情
    particulars(val) {
      this.dialogFormVisible = true;
      this.getReplenishment(val);
    },
    //详情状态过滤
    particularsFormatStatus(row, column) {
      return row.status == 0 ? "未补货" : row.status == 1 ? "补货完成" : "未知";
    },
    //获取详情
    getReplenishment(val) {
      this.particularsLoading = true;
      this.getShelfReplenishment(val).then(data => {
        this.particularsLoading = false;
        this.ToParticulars.ToParticulasName = data.data.replenishmentName;
        this.particularsData = data.data.replenishmentItems;
      });
    },
    //点击修改
    updateNumber(val) {
      this.dialogReplenishmentList = true;
      this.ReplenishmentListLoading = true;
      this.getShelfReplenishment(val).then(data => {
        this.ReplenishmentListLoading = false;
        this.updateShelfList.replenishmentName = data.data.replenishmentName;
        this.updateShelfList.shelfReplenishmentId = data.data.id;
        this.updateShelfList.remark = data.data.remark;
        this.updateData = data.data.replenishmentItems;
      });
    },
    //确定修改
    saveUpdate() {
      this.updateShelfList.product = [];
      this.updateData.map(el => {
        this.updateShelfList.product.push({
          shelfReplenishmentItemId: el.id, //补货商品id
          quantity: el.quantity, //补货数量
          shelfProductId: el.shelfProductId //货架商品id
        });
      });
      this.updateShelfReplenishmentList(this.updateShelfList).then(data => {
        if (data.success) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogReplenishmentList = false;
        }
      });
    },
    //审核
    TouUpdateApply(val) {
      this.updateApply(val).then(data => {
        this.getAll();
      });
    },
    // 功能：配送中
    TouUpdateDestribution(val) {
      this.updateDestribution(val).then(data => {
        this.getAll();
      });
    },
    // 功能：驳回
    TouUpdateReject(val) {
      this.updateReject(val).then(data => {
        this.getAll();
      });
    },
    //修改配送人
    ToUpdateReplenish(val) {
      this.Replenish.id = val;
    },
    //修改配送人ajax
    currentOwnerByChange() {
      this.updateReplenish(this.Replenish).then(data => {
        if (data.success) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getAll();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    //所有补货人
    TogetSysUserListByGroupNo() {
      this.getSysUserListByGroupNo().then(data => {
        this.SysUserList = data.data;
      });
    },

    //跳转到新增页面
    addReplenishment: function() {
      this.$router.replace({ path: "/addReplenishment" });
    }
  },
  computed: {},

  created() {
    //所有补货人
    this.TogetSysUserListByGroupNo();
    this.getAll();
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~scss_index";
</style>
