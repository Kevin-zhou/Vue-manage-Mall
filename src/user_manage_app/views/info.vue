<template>
  <div  class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="search" :inline="true" label-width="48px" size="small">

        <el-form-item label="账户:">
          <el-input placeholder="账户名称" v-model.trim="search.userName" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="状态:">
          <el-select v-model="search.userStatus" clearable placeholder="请选择状态">
            <el-option
                v-for="item in selects"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>

        </el-form-item>
        <el-form-item label="部门:">
           <el-select style="width:202px;" clearable  v-model.trim="search.userDepartment" placeholder="请选择部门">
                    <el-option
                        v-for="item in userDepartment"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
        </el-form-item>

        <el-form-item label="职位:">
          <el-select style="width:202px;" clearable v-model.trim="search.userPosition">
                    <el-option
                        v-for="item in region"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
        </el-form-item>

        <div >
          <el-form-item  label="创建时间:"  label-width="72px">
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
        </div>
        <div style="padding-left:50px;">
          <el-form-item class="fl">
            <el-button type="primary" icon="el-icon-search" size="small"  @click="getAll">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" size="small"  @click="addUser">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    <!-- 列表 -->
    <el-table  v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            prop="userName"
            label="账户"
            width="180">
        </el-table-column>

        <el-table-column
            prop="userNickname"
            label="昵称">
        </el-table-column>
       <el-table-column
                  prop="userDepartment"
                  label="部门" :formatter="userDepartmentStatus">
      </el-table-column>

        <el-table-column
            prop="userPosition"
            label="职位" :formatter="userPositionStatus">
        </el-table-column>


        <el-table-column
            prop="userStatus"
            label="状态"
            :formatter="formatStatus">
        </el-table-column>
           <el-table-column label="创建时间"
            width="200">
           <template scope="scope">
                    <p>{{filterTime(scope.row.creationTime)}}</p>
                </template>
        </el-table-column>
      </el-table-column>
           <el-table-column label="修改时间"
            width="200">
           <template scope="scope">
                    <p>{{filterTime(scope.row.lastUpdateTime)}}</p>
                </template>
        </el-table-column>

        <el-table-column label="操作" >
            <template slot-scope="scope">
                <el-button v-if="scope.row.userStatus==0" @click.stop="enableDict(scope.row.id)" type="primary"   size="small">启用</el-button>
                <el-button v-if="scope.row.userStatus==1" @click.native.prevent="disableDict(scope.row.id)" type="primary"   size="small">停用</el-button>
                <!-- <el-button type="primary" @click.stop="showDialog(scope.row)"   size="small">编辑</el-button> -->
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
    <!-- <add v-if="dialogFormVisible" :dialog="dialogFormVisible" ></add> -->
     <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form ref="ToaddInfo" :model="addInfo" @keyup.13.native="AddInfo"  :inline="true" label-width="120px" :rules="rules">
            <el-form-item prop="userName" label="账号" label-width="85px">
                <el-input v-model.trim="addInfo.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="userPassword" label="密码" label-width="85px">
                <el-input  type="password" v-model.trim="addInfo.userPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="agentId" label="代理商" label-width="85px">
                <!-- <el-input v-model.trim="addInfo.agentId" auto-complete="off"></el-input> -->
                <el-select style="width:202px;"  v-model.trim="addInfo.agentId" placeholder="请选择代理商">
                    <el-option
                        v-for="item in agentId"
                        :key="item.id"
                        :label="item.agentName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门" label-width="85px">
                <!-- <el-input v-model.trim="addInfo.userDepartment" auto-complete="off"></el-input> -->
                <el-select style="width:202px;"  v-model.trim="addInfo.userDepartment" placeholder="请选择部门">
                    <el-option
                        v-for="item in userDepartment"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" label-width="85px">
                <!-- <el-input v-model.trim="addInfo.userPosition" auto-complete="off"></el-input> -->
                <el-select style="width:202px;"  v-model.trim="addInfo.userPosition" placeholder="请选择职位">
                    <el-option
                        v-for="item in region"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="昵称" label-width="85px">
                <el-input v-model.trim="addInfo.userNickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email"  label="邮箱" label-width="85px">
                <el-input v-model.trim="addInfo.userEmail" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="85px">
                <el-input :maxlength="11" v-model.trim="addInfo.userTelphone" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddInfo">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../vuex";

export default {
  data() {
    // var checkphone = (rule, value, callback) => {
    //   if (!/^1[34578]\d{9}$/.test(value)) {
    //     console.log(value);
    //     callback(new Error("请填写正确的手机号码3333"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(Number(value))) {
    //       callback(new Error("请填写正确的手机号码4444"));
    //     } else {
    //       callback();
    //     }
    //   }, 500);
    // };
    return {
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      //时间选择
      startTime: null,
      endTime: null,
      //   筛选参数
      search: {
        userName: "", //账户名称
        userStatus: "", //状态 0停用 1启用
        userDepartment: "", //部门
        userPosition: "", //职位
        startTime: null, //创建时间  开始时间
        endTime: null //创建时间 结束时间
      },
      selects: [
        {
          label: "启用",
          value: "1"
        },
        {
          label: "停用",
          value: "0"
        }
      ],
      tableData: null,
      loading: false,
      //新增
      dialogFormVisible: false,
      addInfo: {
        userName: "", //账户 必填
        userPassword: "", //密码 必填
        agentId: "", //代理商id 必填
        userDepartment: null, //部门 选填
        userPosition: null, //职位  选填
        userNickname: "", //昵称 选填
        userEmail: "", //邮箱 选填
        userTelphone: "" //电话 选填
      },
      //供应商id选择项
      agentId: [],
      //部门选择项
      userDepartment: [
        {
          label: "研发中心",
          value: 1
        },
        {
          label: "仓库管理",
          value: 2
        }
      ],
      //职位选择项
      region: [
        {
          label: "研发人员",
          value: 1
        },
        {
          label: "仓库盘点员",
          value: 2
        },
        {
          label: "配送员",
          value: 3
        }
      ],
      //检验
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur,change" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur,change" }
        ],
        agentId: [
          { required: true, message: "请输入代理商id", trigger: "blur,change" }
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
          { max: 50, message: "请输入正确的邮箱地址", trigger: "blur" }
        ]
        // userTelphone: [
        //   //   { required: true, message: "请输入正确的手机号码2222", trigger: "blur,change" },
        //   //   { max: 11, message: "请填写正确的手机号码111", trigger: "blur,change" },
        //   { validator: checkphone }
        // ]
      }
    };
  },

  methods: {
    ...mapActions({
      getSysUserList: "user/getSysUserList",
      enableSysUser: "user/enableSysUser",
      disableSysUser: "user/disableSysUser",
      addSysUser: "user/addSysUser",
      getEnabledAgentList: "user/getEnabledAgentList"
    }),
    //搜索时间判断
    TimeChange() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime();
      if (start > end && end !== 0) {
        this.$message.error("开始时间不能大于结束时间");
      }
    },
    //状态过滤
    formatStatus(row, column) {
      return row.userStatus == 1 ? "启用" : row.userStatus == 0 ? "停用" : "未知";
    },
    //部门状态
    userDepartmentStatus(row, column) {
      return row.userDepartment == 1
        ? "研发中心"
        : row.userDepartment == 2 ? "仓库管理" : "未知";
    },
    userPositionStatus(row, column) {
      return row.userPosition == 1
        ? "研发人员"
        : row.userPosition == 2
          ? "仓库盘点员"
          : row.userPosition == 3
            ? "配送员"
            : row.userPosition == 4 ? "仓库管理员" : "未知";
    },
    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
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

    //查询列表
    getAll() {
      let start = new Date(this.startTime).getTime();
      let end = new Date(this.endTime).getTime() + 86399000;

      if (this.startTime) {
        this.search.startTime = __filterTime(start);
      } else {
        this.search.startTime = null;
      }

      if (this.endTime) {
        this.search.endTime = __filterTime(end);
      } else {
        this.search.endTime = null;
      }

      Object.assign(this.search, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getSysUserList(this.search).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    //新增用户
    addUser() {
      if (this.addInfo.userName) {
        this.$refs.ToaddInfo.resetFields();
      }
      this.dialogFormVisible = true;
      this.addInfo = {
        userName: "", //账户 必填
        userPassword: "", //密码 必填
        agentId: "", //代理商id 必填
        userDepartment: null, //部门 选填
        userPosition: null, //职位  选填
        userNickname: "", //昵称 选填
        userEmail: "", //邮箱 选填
        userTelphone: "" //电话 选填
      };
    },
    AddInfo() {
      this.$refs.ToaddInfo.validate(valid => {
        // 判断表单校验是否成功
        if (valid) {
          // 新增
          //判断手机号码
          if (
            !/^1[34578]\d{9}$/.test(this.addInfo.userTelphone) &&
            this.addInfo.userTelphone !== ""
          ) {
            this.$message.error("手机号码格式不正确");
          } else {
            this.GetAddSysUser();
          }
        } else {
          return false;
        }
      });
    },
    //新增方法
    GetAddSysUser() {
      this.addSysUser(this.addInfo).then(data => {
        if (data.success) {
          this.dialogFormVisible = false;
          this.getAll();
        } else {
          this.$message.error(data.returnMsg);
        }
      });
    },
    // 获取供应商id
    TogetEnabledAgentList() {
      this.getEnabledAgentList().then(data => {
        this.agentId = data.data;
      });
    }
  },
  components: {
    // add: r => {
    //   require(["./addInfo"], r);
    // }
  },
  computed: {},
  // 页面开始获取用户列表
  created: function() {
    this.TogetEnabledAgentList();
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
