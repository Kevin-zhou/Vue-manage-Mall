<template>
  <div class="Alltemplate" >
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="search" :inline="true"size="small">

         <el-form-item label="用户组编号:">
          <el-input placeholder="用户组编号" v-model="search.groupNo" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="用户组名称:">
          <el-input placeholder="用户组名称" v-model="search.groupName" >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
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
            prop="groupNo"
            label="用户组编号"
            width="180">
        </el-table-column>
         <el-table-column
            prop="groupName"
            label="用户组名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="isActive"
            label="状态"
            :formatter="formatStatus">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注"
            width="180"
          >
        </el-table-column>
       <el-table-column label="修改时间"
            width="200">
           <template scope="scope">
                    <p>{{filterTime(scope.row.lastUpdateTime)}}</p>
                </template>
        </el-table-column>
        <el-table-column label="操作" >
            <template slot-scope="scope">
                <el-button v-if="scope.row.isActive==0" @click.stop="enableDict(scope.row.id)" type="primary"   size="small">启用</el-button>
                <el-button v-if="scope.row.isActive==1" @click.native.prevent="disableDict(scope.row.id)" type="primary"   size="small">停用</el-button>
                <el-button type="primary"  @click="showDialog(scope.row.id)"size="small">编辑用户组用户</el-button>
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
     <el-dialog title="新增用户组" :visible.sync="dialogFormVisible">
        <el-form ref="ToaddInfo" :model="addInfo" @keyup.13.native="AddInfo"  :inline="true" :rules="rules">
            <el-form-item prop="groupName" label="用户组名称：">
                <el-input v-model.trim="addInfo.groupName" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="备注:">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" style="width:300px;"  v-model="addInfo.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddInfo">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog  title="编辑用户组用户" :visible.sync="dialogUserVisible">

       <el-transfer
       v-model="value1" @change="transfer"
       :data="dataUser" :titles="['所有用户', '已选用户']"
        :button-texts="['删除', '添加']"></el-transfer>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddUserInfo">确 定</el-button>
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
      dataUser: [],
      value1: [],
      dialogUserVisible: false,
      search: {
        groupName: "", //用户组名称
        groupNo: "",
        startTime: "", //创建时间  开始时间
        endTime: "", //创建时间 结束时间
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
        groupName: "",
        remark: ""
      },

      //检验
      rules: {
        groupName: [
          { required: true, message: "请输入用户组名称", trigger: "blur,change" }
        ]
      },
      // 修改前用户组下的用户
      oldUser: [],
      //用户组id
      groupId: null,
      //删除的用户
      groupUser: [],
      //添加的用户
      sysGroupuser: []
    };
  },

  methods: {
    ...mapActions({
      getSysGroupList: "user/getSysGroupList",
      enableSysGroup: "user/enableSysGroup",
      disableSysGroup: "user/disableSysGroup",
      addSysGroup: "user/addSysGroup",
      getEnabledAgentList: "user/getEnabledAgentList",
      getAllSysUser: "user/getAllSysUser",
      getGroupUserList: "user/getGroupUserList",
      addSysGroupuser: "user/addSysGroupuser"
    }),
    //状态过滤
    formatStatus(row, column) {
      return row.isActive == 1 ? "启用" : row.isActive == 0 ? "停用" : "未知";
    },
    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
    },
    // 启用
    enableDict(val) {

      this.enableSysGroup(val).then(data => {
        this.getAll();
      });
    },
    // 停用
    disableDict(val) {

      this.disableSysGroup(val).then(data => {
        this.getAll();
      });
    },
    //transfer穿梭框
    transfer() {},
    //新增用户组用户
    showDialog(id) {
      this.groupId = id;
      let para = {
        groupId: id
      };
      this.dialogUserVisible = true;
      //所有用户
      this.getAllSysUser().then(data => {
        this.dataUser = [];
        data.data.map(el => {
          this.dataUser.push({
            key: el.id,
            label: el.userName
          });
        });
      });

      //用户组 用户
      this.getGroupUserList(para).then(data => {
        this.value1 = [];
        data.data.map(el => {
          this.value1.push(el.id);
          this.oldUser = this.value1;
        });
      });
    },
    // 新增用户组用户
    AddUserInfo() {
      let newUser = new Set(this.value1);
      let oldUser = new Set(this.oldUser);

      // 原有的用户   和先新增的用户   相同项
      let intersectionSet = new Set([...newUser].filter(x => oldUser.has(x)));

      // 新增的用户   原有的用户   和先新增的用户   不相同项
      let sysGroup = Array.from(
        new Set([...newUser].filter(x => !oldUser.has(x)))
      );

      //  删除的用户     原有的用户和先新增的用户相同项    与原有的用户的不同项
      let group = Array.from(
        new Set([...oldUser].filter(x => !intersectionSet.has(x)))
      );

      this.groupUser = [];

      group.map(el => {
        this.groupUser.push({
          groupId: this.groupId,
          userId: el
        });
      });
      this.sysGroupuser = [];
      sysGroup.map(el => {
        this.sysGroupuser.push({
          groupId: this.groupId,
          userId: el
        });
      });
      let opt = {
        groupUser: this.groupUser,
        sysGroupuser: this.sysGroupuser
      };
      this.ToaddSysGroupuser(opt);
    },
    ToaddSysGroupuser(val) {
      this.addSysGroupuser(val).then(data => {
        if (data.success) {
          this.dialogUserVisible = false;
        }
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
    //分页查询
    //查询列表
    getAll() {
        Object.assign(this.search,{
            pageNum: this.pageNum,
            pageSize: this.pageSize
        })
      this.loading = true;
      this.getSysGroupList(this.search).then(data => {
        this.loading = false;

        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    //新增用户
    AddInfo() {
      this.$refs.ToaddInfo.validate(valid => {
        // 判断表单校验是否成功
        if (valid) {
          // 新增
          this.GetAddSysUser();
        } else {
          return false;
        }
      });
    },
    //新增方法
    GetAddSysUser() {
      this.addSysGroup(this.addInfo).then(data => {
        if (data.success) {
          this.dialogFormVisible = false;
          this.getAll();
        } else {
          this.$message.error(data.returnMsg);
        }
      });
    }
  },

  components: {},
  computed: {},
  // 页面开始获取用户列表
  created: function() {
    this.getAll();
  }
};
</script>
<style lang="scss" >
@import "~scss_index";

.el-input__icon {
  cursor: pointer;
}
</style>
