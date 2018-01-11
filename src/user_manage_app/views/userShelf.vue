<template>
  <div  class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户货架</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="search" :inline="true" label-width="74px" size="small">

        <el-form-item label="账户:">
          <el-input placeholder="用户账号" v-model.trim="search.account" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>
       <el-form-item label="货架名称:" >
          <el-input placeholder="货架名称" v-model.trim="search.shelfName" >
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
            prop="account"
            label="账户">
        </el-table-column>

        <el-table-column
            prop="shelfName"
            label="货架名称">
        </el-table-column>
         </el-table-column>
           <el-table-column label="最后登录时间"
            width="200">
              <template scope="scope">
                    <p>{{filterTime(scope.row.lastLoginTime)}}</p>
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
      search: {
        account: "", //账户名称
        shelfName: "" //状态 0停用 1启用
      },
      tableData: null,
      loading: false,
    };
  },

  methods: {
    ...mapActions({
      getUserShelfList: "user/getUserShelfList"
    }),

    //搜索时间判断

        filterTime: function(time) {
      let _date = new Date(time);
      //计算年
      let year = _date.getFullYear();
      let month = _date.getMonth() + 1;
      let days = _date.getDate();
      //计算出小时数
      let hours = _date.getHours();
      //计算分钟数
      let minutes = _date.getMinutes();
      //计算秒数
      let seconds = _date.getSeconds();
      seconds = seconds >= 10 ? seconds : "0" + seconds;
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      hours = hours >= 10 ? hours : "0" + hours;
      days = days >= 10 ? days : "0" + days;
      month = month >= 10 ? month : "0" + month;
      year = year >= 10 ? year : "0" + year;
      let returnDate =
        year +
        "-" +
        month +
        "-" +
        days +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return returnDate;
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
      this.getUserShelfList(this.search).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },

  },

  computed: {},
  // 页面开始获取用户列表
  created: function() {
    this.getAll();
  }
};
</script>
<style lang="scss"  >
@import "~scss_index";

.el-input__icon {
  cursor: pointer;
}
</style>
