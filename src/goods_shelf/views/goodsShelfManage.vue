<template>
    <div class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>货架管理</el-breadcrumb-item>
      <el-breadcrumb-item>货架信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
      <el-form ref="form" :model="shelf" :inline="true" label-width="60px" size="small">
        <el-form-item label="货架:">
          <el-input placeholder="货架名称" v-model.trim="shelf.shelfName" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="货架ID:">
          <el-input placeholder="货架ID" v-model.trim="shelf.id" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="状态:">
          <el-select v-model="shelf.status" clearable placeholder="请选择状态">
                <el-option
                    v-for="item in selects"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="编号:">
          <el-input placeholder="货架编号" v-model.trim="shelf.shelfNo" >
            <i class="el-icon-shelf el-input__icon" slot="suffix" @click="getAll"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="代理商:">

           <el-select v-model="shelf.agentId" clearable placeholder="请选择代理商">
                <el-option
                    v-for="item in  AgentLists"
                    :key="item.id"
                    :label="item.agentName"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <div style="padding-left:50px;">
          <el-form-item class="fl">
            <el-button type="primary" icon="icon-shelf" size="small"  @click="getAll">搜索</el-button>
            <el-button type="primary" icon="icon-plus" size="small"  @click="changeShelf('add')">新增</el-button>
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
            width="90" >
             <template slot-scope="scope">
                 <span @click="ToGoodsShelf(scope.row.id)" class="shelfName">{{scope.row.shelfName}}</span>
             </template>
        </el-table-column>

        <el-table-column
            prop="id"
            label="货架ID"
            width="70">
        </el-table-column>

        <el-table-column
            prop="shelfNo"
            label="货架编号"
            width="80">
        </el-table-column>

        <el-table-column
            prop="agentName"
            label="货架代理商"
            width="92">
        </el-table-column>

        <el-table-column
            prop="replenishByName"
            label="补货员"
            width="78">
        </el-table-column>

        <el-table-column
            prop="stocktakeByName"
            label="盘点员"
            width="78">
        </el-table-column>

        <el-table-column
            prop="shelfLocation"
            label="货架地区"
            width="140">
        </el-table-column>

        <el-table-column
            prop="shelfCompanyName"
            label="货架公司"
            width="100">
        </el-table-column>

        <el-table-column
            prop="shelfCompanyIndustry"
            label="公司行业"
            width="100">
        </el-table-column>

        <el-table-column
            prop="status"
            label="状态"
            :formatter="formatStatus"
            width="60">
        </el-table-column>

        <el-table-column
            prop="remark"
            label="货架备注"
            width="120">
        </el-table-column>

        <el-table-column
            prop="creationTime"
            label="创建时间"
            width="160">
            <template slot-scope="scope">
                <P>{{filterTime(scope.row.creationTime)}}</P>
            </template>
        </el-table-column>



        <el-table-column label="操作"  fixed="right"
            width="240"
           >
            <template slot-scope="scope">
                <el-button v-if="scope.row.status==0" @click.stop="enableDict(scope.row.id)" type="primary"   size="small">启用</el-button>
                <el-button v-if="scope.row.status==1" @click.native.prevent="disableDict(scope.row.id)" type="primary"   size="small">停用</el-button>
                <el-button type="primary" @click.stop="changeShelf(scope.row)"   size="small">编辑</el-button>
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
    <el-dialog :close-on-click-modal="false" width="70%" center close-on-click-modal:false :title="dialogFormTitle" :visible.sync="dialogFormVisible">
        <el-form :rules="rules"  ref="RefAddshelf"  :inline="true" label-position="right" label-width="120px" :model="updateShelfs">

            <el-form-item prop="shelfName" style="width:45%" label="货架名称:">
                <el-input style="width:300px;" v-model="updateShelfs.shelfName"></el-input>
            </el-form-item>
            <el-form-item  prop="shelfNo"  style="width:45%" label="货架编号:">
                <el-input style="width:300px;" v-model="updateShelfs.shelfNo"></el-input>
            </el-form-item>
            <el-form-item prop="agentId"  style="width:45%"  label="代理商:">
                <el-select style="width:300px;" clearable v-model="updateShelfs.agentId" placeholder="请选择">
                    <el-option
                    v-for="item in  AgentLists"
                    :key="item.id"
                    :label="item.agentName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="replenishBy"  style="width:45%"  label="补货员:">
                <el-select style="width:300px;" clearable v-model="updateShelfs.replenishBy" placeholder="请选择">
                    <el-option
                    v-for="item in  SysUserLists"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="stocktakeBy"  style="width:45%"  label="盘点员:">
                <el-select style="width:300px;" clearable v-model="updateShelfs.stocktakeBy" placeholder="请选择">
                    <el-option
                    v-for="item in  SysUserLists"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item   style="width:45%"  label="货架备注:">
                <el-input style="width:300px;"  v-model="updateShelfs.remark"></el-input>
            </el-form-item>
            <el-form-item  prop="companyName"  style="width:45%"   label="公司名称:">
                <el-input style="width:300px;"  v-model="updateShelfs.companyName"></el-input>
            </el-form-item>
            <el-form-item  prop="companyIndustry"  style="width:45%"   label="公司行业:">
                <el-input style="width:300px;"  v-model="updateShelfs.companyIndustry"></el-input>
            </el-form-item>
            <el-form-item  prop="districtCode"  style="width:45%"   label="货架地区:">
                <!-- <el-input style="width:300px;"  v-model="updateShelfs.districtCode"></el-input> -->
                 <el-select style="width:99px;" clearable  @change="provinceChange(province)" v-model="province" placeholder="选择省">
                    <el-option
                    v-for="item in  provinceList"
                    :key="item.id"
                    :label="item.districtName"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select style="width:99px;" clearable @change="cityChange(city)"  v-model="city" placeholder="选择市">
                    <el-option
                    v-for="item in  cityList"
                    :key="item.id"
                    :label="item.districtName"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select style="width:99px;" clearable v-model="updateShelfs.districtCode" placeholder="选择区">
                    <el-option
                    v-for="item in  districtList"
                    :key="item.districtCode"
                    :label="item.districtName"
                    :value="item.districtCode">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item  prop="detailAddress"  style="width:45%"   label="货架详细地址:">
                <el-input style="width:300px;"  v-model="updateShelfs.detailAddress"></el-input>
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
      Btnloading: false,
      pageNum: 1, //当前页数
      pageSize: 10, //没页条数
      //分页
      pageSizes: [10, 20, 50, 100],
      layout: "prev, pager, next, jumper, total, sizes",
      total: null,
      tableData: null,
      loading: false,

      shelf: {
        id: null, //id
        shelfName: "", //货架名称 模糊查询
        shelfNo: "", //货架编号
        status: null, //状态 0停用 1启用
        agentId: null //代理商id
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
      //新增
      updateShelfs: {
        shelfName: "", //货架名称
        shelfNo: "", //货架编号
        agentId: null, //代理商
        replenishBy: null, //补货员
        stocktakeBy: null, //盘点员
        remark: "", //货架备注
        companyName: "", //公司名称
        companyIndustry: "", //公司行业
        districtCode: "", //货架地区行政编码（区/县）
        detailAddress: "" //货架详细地址
      },
      //检验
      rules: {
        shelfName: [
          { required: true, message: "请输入货架名称", trigger: "blur,change" }
        ],
        shelfNo: [
          { required: true, message: "请输入货架编号", trigger: "blur,change" }
        ],
        agentId: [
          { required: true, message: "请选择代理商", trigger: "blur,change" }
        ],
        stocktakeBy: [
          { required: true, message: "请选择盘点员", trigger: "blur,change" }
        ],
        replenishBy: [
          { required: true, message: "请选择补货员", trigger: "blur,change" }
        ],

        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur,change" }
        ],

        companyIndustry: [
          { required: true, message: "请输入公司行业", trigger: "blur,change" }
        ],

        districtCode: [
          { required: true, message: "请选择货架地区", trigger: "blur,change" }
        ],

        detailAddress: [
          { required: true, message: "货架详细地址", trigger: "blur,change" }
        ]
      },
      //编辑的id
      ShelfId: null,
      //标题
      dialogFormTitle: "",
      //新增编辑弹出
      dialogFormVisible: false,
      // 代理商
      AgentLists: [],
      //补货人员
      SysUserLists: [],
      //   省
      province: null,
      provinceList: [],
      //   市
      city: null,
      cityList: [],
      //区
      districtList: []
    };
  },

  methods: {
    ...mapActions({
      getShelfList: "shelf/getShelfList",
      enableShelf: "shelf/enableShelf",
      disableShelf: "shelf/disableShelf",
      addShelf: "shelf/addShelf",
      deleteShelf: "shelf/deleteShelf",
      updateShelf: "shelf/updateShelf",
      getEnabledAgentList: "shelf/getEnabledAgentList",
      getDistrictListByParentId: "shelf/getDistrictListByParentId",
      getSysUserListByGroupNo: "shelf/getSysUserListByGroupNo",
      getShelfById: "shelf/getShelfById"
    }),
    //状态过滤
    formatStatus(row, column) {
      return row.status == 1 ? "启用" : row.status == 0 ? "停用" : "未知";
    },

    // 时间戳转换
    filterTime(val) {
      return __filterTime(val);
    },

    // 启用
    enableDict(val) {
      this.enableShelf(val).then(data => {
        this.getAll();
      });
    },
    // 停用
    disableDict(val) {
      this.disableShelf(val).then(data => {
        this.getAll();
      });
    },
    open2(val) {
      this.$confirm("此操作将永久删除该货架, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteShelf(val).then(data => {
            if (data.success) {
              this.getAll();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            // else {
            //   this.$message.error(data.returnMsg);
            //   this.$message.error("错了哦，这是一条错误消息");
            // }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除
    ToDelete(val) {
      this.open2(val.id);
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
      Object.assign(this.shelf, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      this.loading = true;
      this.getShelfList(this.shelf).then(data => {
        this.loading = false;
        this.tableData = data.data.dataList;
        this.total = data.data.total;
      });
    },
    // 编辑货架
    changeShelf(val) {
      // 如果是新增按钮
      if (val == "add") {
        this.dialogFormTitle = "新增货架";
        this.ToAddShelf(val);
      } else {
        this.dialogFormTitle = "编辑货架";
        this.TochangeShelf(val);
      }
      this.dialogFormVisible = true;
    },
    //新增
    ToAddShelf(val) {
      if (this.ShelfID) {
        this.$refs.RefAddshelf.resetFields();
      }
      this.province = this.city = null;
      this.cityList = this.districtList = [];
      this.ShelfID = null;
      this.updateShelfs = {
        shelfName: "", //货架名称
        shelfNo: "", //货架编号
        agentId: null, //代理商
        replenishBy: null, //补货员
        stocktakeBy: null, //盘点员
        remark: "", //货架备注
        companyName: "", //公司名称
        companyIndustry: "", //公司行业
        districtCode: "", //货架地区行政编码（区/县）
        detailAddress: "" //货架详细地址
      };
    },
    //编辑方法
    TochangeShelf(val) {
      this.ShelfID = val.id;
      this.ToGetShelfById(this.ShelfID);
    },
    //根据货架id获取货架信息
    ToGetShelfById(val) {
      this.getShelfById(val).then(data => {
        if (data.success) {
          this.updateShelfs = {
            shelfName: data.data.shelfName, //货架名称
            shelfNo: data.data.sheflNo, //货架编号
            agentId: data.data.agentId, //代理商
            replenishBy: data.data.replenishBy, //补货员
            stocktakeBy: data.data.stocktakeBy, //盘点员
            remark: data.data.remark, //货架备注
            companyName: data.data.companyIndustry, //公司名称
            companyIndustry: data.data.companyName, //公司行业
            districtCode: data.data.districtCode, //货架地区行政编码（区/县）
            detailAddress: data.data.detailAddress, //货架详细地址
            shelfDistrictId: data.data.shelfDistrictId, //货架地区ID
            shelfCompanyId: data.data.shelfCompanyId //货架公司ID
          };

          this.provinceList.map(el => {
            if (data.data.provinceCode == el.districtCode) {
              this.province = el.id;
            }
          });

          let cityCode = data.data.cityCode;

          this.getDistrictListByParentId(this.province).then(data => {
            this.cityList = data.data;

            this.cityList.map(el => {
              if (cityCode == el.districtCode) {
                this.city = el.id;
                this.cityChange(this.city);
              }
            });
          });
        }
      });
    },
    //编辑和新增的保存
    saveChangeShelf() {
      this.$refs.RefAddshelf.validate(valid => {
        // 判断表单校验是否成功
        if (valid) {
          // 有id就是编辑没有就是新增
          this.Btnloading = true;
          if (this.ShelfID) {
            let val = {
              id: this.ShelfID
            };
            Object.assign(val, this.updateShelfs);
            this.updateShelf(val).then(res => {
              this.Btnloading = false;
              if (res.success) {
                this.getAll();
                this.dialogFormVisible = false;
              }
            });
          } else {
            this.addShelf(this.updateShelfs).then(res => {
              this.Btnloading = false;
              if (res.success) {
                this.getAll();
                this.dialogFormVisible = false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 代理商
    ToGetEnabledAgentList() {
      this.getEnabledAgentList().then(data => {
        this.AgentLists = data.data;
      });
    },
    // 根据父id查询地区列表
    ToGetDistrictListByParentId(val) {
      this.getDistrictListByParentId(val).then(data => {
        this.provinceList = data.data;
      });
    },
    // 盘点人和补货人为同一接口
    ToGetSysUserListByGroupNo() {
      this.getSysUserListByGroupNo().then(data => {
        this.SysUserLists = data.data;
      });
    },
    //省选择选择
    provinceChange(val) {
      this.getDistrictListByParentId(val).then(data => {
        this.cityList = data.data;
        this.districtList = [];
        this.city = this.updateShelfs.districtCode = null;
      });
    },
    //市省选择
    cityChange(val) {
      this.getDistrictListByParentId(val).then(data => {
        this.districtList = data.data;
      });
    },
    //跳转至货架商品
    ToGoodsShelf(val) {
      this.$router.push({ path: "/userGoodsShelf", query: { id: val } });
    }
  },
  computed: {},
  // 页面开始获取用户列表
  created() {
    // 代理商
    this.ToGetEnabledAgentList();
    // 根据父id查询地区列表
    this.ToGetSysUserListByGroupNo();
    // 盘点人和补货人
    this.ToGetDistrictListByParentId(0);
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
</style>
