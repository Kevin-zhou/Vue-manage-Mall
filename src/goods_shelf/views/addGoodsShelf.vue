<template>
    <div class="Alltemplate">
        <!-- 面包屑 -->
        <el-breadcrumb class="mb20" separator="/">
            <el-breadcrumb-item to="/">货架管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/goodsShelfManage">货架信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/userGoodsShelf', query :{ id: shelfId } }">货架商品信息</el-breadcrumb-item>
            <el-breadcrumb-item >新增货架商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-transfer
            style="width:60%;margin-left:18%"
            :titles="['商品列表', '已选择商品']"
            v-model="value1"
            :data="ProductList"
            @change="transfer" >
        </el-transfer>
        <el-form :rules="rules"
                style="margin:30px 0"  ref="GoodslistShow"
                :inline="true" label-position="right"
                label-width="90px"
                v-for="(item,index) in shelfProductDtoList"
                :key="item.productId"
                :model="item">
            <!-- <div v-for="(item,index) in GoodslistShow.shelfProductDto"  :key="item.productId"> -->


                <el-form-item style="width:32%" label="商品名称:">
                    <el-input style="width:160px;" readonly  v-model="item.productName"></el-input>
                </el-form-item>

                <el-form-item prop="shelfProductCategoryId" style="width:32%" label="商品分类:">

                    <el-select style="width:260px;" v-model="item.shelfProductCategoryId" placeholder="请选择">
                        <el-option
                            v-for="itin in CategoryList"
                            :key="itin.id"
                            :label="itin.categoryName"
                            :value="itin.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="shelfProductPrice"  style="width:32%" label="商品价格:">
                    <el-input type="Number" style="width:260px;" v-model="item.shelfProductPrice"></el-input>
                </el-form-item>

                <el-form-item prop="toplimitQuantity"  style="width:32%"  label="商品上限:">
                    <el-input type="Number" style="width:260px;"  v-model="item.toplimitQuantity"></el-input>
                </el-form-item>

                <el-form-item prop="warningQuantity"  style="width:32%"   label="预警数量:">
                    <el-input type="Number" style="width:260px;"  v-model="item.warningQuantity"></el-input>
                </el-form-item>

                <el-form-item style="width:32%"   label="商品备注:">
                    <el-input style="width:260px;"  v-model="item.remark"></el-input>
                </el-form-item>
            <!-- </div> -->
        </el-form>
        <div slot="footer" class="footerBtn">
            <el-button @click="ToCancel">取 消</el-button>
            <el-button :loading="Btnloading" type="primary" @click="add" >确 定</el-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../vuex";
export default {
  data() {
    return {
      selected: null,
      Btnloading: false,
      //URL的货架id
      shelfId: null,
      //所有商品列表
      ProductList: [],
      //已选中商品
      value1: [],
      //组合已选商品的id和名称
      updateGoods: [],
      //提交最终数据格式
      GoodslistShow: {
        shelfId: this.shelfId, //货架ID
        shelfProductDto: []
      },
      shelfProductDtoList: [],
      //分类
      CategoryList: [],
      //检验
      rules: {
        shelfProductCategoryId: [
          { required: true, message: "请选中商品分类", trigger: "blur,change" }
        ],
        shelfProductPrice: [
          { required: true, message: "请输入商品价格", trigger: "blur,change" }
        ],
        toplimitQuantity: [
          { required: true, message: "请输入商品上限", trigger: "blur,change" }
        ],
        warningQuantity: [
          { required: true, message: "请输入预警数量", trigger: "blur,change" }
        ]
      }
      //   rulesTrue: []
    };
  },

  methods: {
    ...mapActions({
      getProductListByShelfId: "shelf/getProductListByShelfId",
      getEnabledCategoryList: "shelf/getEnabledCategoryList",
      addShelfProducts: "shelf/addShelfProducts"
    }),
    //all
    getAll() {
      // 8、可选商品列表
      this.getProductListByShelfId(this.shelfId).then(data => {
        data.data.map(el => {
          this.ProductList.push({
            key: el.id,
            label: el.productName
          });
        });
      });
      // 9、获取有效商品分类列表
      this.getEnabledCategoryList().then(data => {
        this.CategoryList = data.data;
      });
    },
    //穿梭框  改变
    transfer() {
      this.updateGoods = [];
      this.shelfProductDtoList = [];

      this.value1.map(val => {
        this.ProductList.map(el => {
          if (val == el.key) {
            this.updateGoods.push({
              id: el.key,
              name: el.label
            });
          }
        });
      });
      this.showList();
    },
    showList() {
      //   this.GoodslistShow = {};
      this.GoodslistShow.shelfProductDto = [];
      this.updateGoods.map(el => {
        let val = {
          shelfProductCategoryId: null, //分类ID
          productId: el.id, //商品ID
          productName: el.name,
          shelfProductPrice: null, //货架商品价格
          toplimitQuantity: null, //货架商品最大上限数量
          warningQuantity: null, //货架商品补货预警数量
          remark: "" //货架商品备注
        };
        this.shelfProductDtoList.push(val);
      });
    },
    //取消
    ToCancel() {
      this.$router.push({
        path: "/userGoodsShelf",
        query: { id: this.shelfId }
      });
    },
    //新增
    add() {
      this.GoodslistShow.shelfId = this.shelfId;
      this.GoodslistShow.shelfProductDto = this.shelfProductDtoList;
      if (this.shelfProductDtoList.length == 0) {
        this.$message.error("请选择商品");
        return;
      }
      let len = this.GoodslistShow.shelfProductDto;
      for (let i = 0; i < len.length; i++) {
        let el = len[i];
        if (el.shelfProductCategoryId == null) {
          this.$message.error("请选择已选商品的分类");
          return;
        } else if (el.shelfProductPrice == null) {
          this.$message.error("请输入已选商品的价格");
          return;
        } else if (el.toplimitQuantity == null) {
          this.$message.error("请输入已选商品的最大上限数量");
          return;
        } else if (el.warningQuantity == null) {
          this.$message.error("请输入已选商品的补货预警数量");
          return;
        } else {
          //   this.rulesTrue[i] = true;
        }
      }
      this.addShelfProducts(this.GoodslistShow).then(data => {
        if (data.success) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$router.push({
            path: "/userGoodsShelf",
            query: { id: this.shelfId }
          });
        }
      });
    }
  },
  computed: {},

  // 页面开始获取用户列表
  created() {
    this.shelfId = this.$route.query.id;
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
  padding-right: 100px;
}
</style>
