<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
            <el-breadcrumb-item>渠道申请</el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->

      <el-form ref="form" :model="apply" :inline="true" label-width="100px" size="small">
        <el-form-item label="名称:">
          <el-input placeholder="公司名称" v-model.trim="apply.companyName" >            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
            <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i> -->
          </el-input>
        </el-form-item>

        <el-form-item label="姓名:">
          <el-input placeholder="联系人姓名" v-model.trim="apply.contactName" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

         <el-form-item label="电话:">
          <el-input placeholder="联系人电话" v-model.trim="apply.contactPhone" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="城市:">
          <el-select v-model="apply.cityCode" clearable placeholder="请选择城市">
                <el-option
                    v-for="item in selects"
                    :key="item.districtPostcode"
                    :label="item.districtName"
                    :value="item.districtPostcode">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="联系状态:">
          <el-select v-model="apply.isContact" clearable placeholder="请选择联系状态">
                <el-option
                    v-for="item in isContact"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="渠道申请来源:">
          <el-select v-model="apply.applyOrigin" clearable placeholder="请选择渠道申请来源">
                <el-option
                    v-for="item in applyOrigin"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
            </el-select>
        </el-form-item>

        <!-- <div > -->
            <el-form-item  label="创建时间:"  >
                <el-col :span="11">
                    <el-date-picker
                    v-model="startTime"
                    @change="TimeChange"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd HH:mm:ss" >
                    </el-date-picker>
                </el-col>
                <el-col class="line center" :span="2"> -</el-col>
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
        <!-- </div> -->


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
                prop="cityName"
                label="城市"
                fixed
                width="80" >
            </el-table-column>

            <el-table-column
                prop="companyName"
                label="公司名称"
                width="160">
            </el-table-column>

            <el-table-column
                prop="companyLocation"
                label="公司地址"
                width="180">
            </el-table-column>

            <el-table-column
                prop="contactName"
                label="联系人姓名"
                width="120">
            </el-table-column>

            <el-table-column
                prop="contactPhone"
                label="联系电话"
                width="120">
            </el-table-column>

            <el-table-column
                prop="applyTime"
                label="申请时间"
                width="160">
                <template slot-scope="scope">
                    <P>{{filterTime(scope.row.applyTime)}}</P>
                </template>
            </el-table-column>

            <el-table-column
                prop="applyOrigin"
                label="渠道申请来源"
                width="110"
                :formatter="formatApplyOrigin" >
            </el-table-column>

            <el-table-column
                prop="isContact"
                label="联系状态"
                width="100"
                :formatter="formatIsContact" >

            </el-table-column>

            <el-table-column label="操作"  fixed="right"
                width="120">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isContact==1"
                        type="primary" size="small"
                        @click="updateChannel(scope.row.id)" >已联系</el-button>
                    <span v-if="scope.row.isContact!==1" >已联系</span>
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
      //时间选择
      startTime: null,
      endTime: null,
      //   筛选参数
      apply: {
        companyName: "", //公司名称
        contactName: "", //联系人
        contactPhone: "", //联系电话
        cityCode: "", //城市编码
        isContact: null, //联系状态.默认1未联系，0已联系
        applyOrigin: null, //申请来源.默认1货架页面，2货架分享
        startTime: null, //申请开始时间
        endTime: null //申请结束时间
      },
      //搜索选择select
      selects: [],
      isContact: [
        {
          name: "未联系",
          key: 1
        },
        {
          name: "已联系",
          key: 0
        }
      ],
      applyOrigin: [
        {
          name: "货架页面",
          key: 1
        },
        {
          name: "货架分享",
          key: 2
        }
      ],

      Btnloading: false,
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      //表格
      tableData: null,
      loading: false
    };
  },

  methods: {
    //搜索时间判断
    TimeChange() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime();
      if (start > end && end !== 0) {
        this.$message.error("开始时间不能大于结束时间");
      }
    },
    ...mapActions({
      // 1、查询列表
      getChannelApplyList: "channel/getChannelApplyList",
      // 渠道申请设置为已联系
      updateChannelApplyById: "channel/updateChannelApplyById",
      // 查询城市地区
      getDistrictListByCode: "channel/getDistrictListByCode"
    }),
    //状态过滤
    formatIsContact(row, column) {
      return row.isContact == 1 ? "未联系" : row.isContact == 0 ? "已联系" : "未知";
    },
    formatApplyOrigin(row, column) {
      return row.applyOrigin == 1
        ? "货架页面"
        : row.applyOrigin == 2 ? "货架分享" : "未知";
    },
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
    // 为已联系
    updateChannel(val) {
      this.updateChannelApplyById(val).then(data => {
        this.getAll();
      });
    },
    //获取商品列表
    getAll() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime() + 86399000;

      if (this.startTime) {
        this.apply.startTime = __filterTime(start);
      } else {
        this.apply.startTime = null;
      }

      if (this.endTime) {
        this.apply.endTime = __filterTime(end);
      } else {
        this.apply.endTime = null;
      }

      Object.assign(this.apply, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getChannelApplyList(this.apply).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    // 查询城市地区
    getDistrictList() {
      this.getDistrictListByCode().then(data => {
        console.data;
        this.selects = data.data;
      });
    }
  },
  computed: {},

  created() {
    //获取商品列表
    this.getAll();
    // 查询城市地区
    this.getDistrictList();
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
