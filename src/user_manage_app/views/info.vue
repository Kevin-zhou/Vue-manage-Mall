<template>
  <div  class="Alltemplate">
    <!-- 面包屑 -->
    <el-breadcrumb class="mb20" separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>首页管理</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "../vuex";

export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions({})
  },
  components: {
    // add: r => {
    //   require(["./addInfo"], r);
    // }
  },
  computed: {},
  // 页面开始获取用户列表
  created: function() {}
};
</script>
<style lang="scss"  >
@import "~scss_index";

.el-input__icon {
  cursor: pointer;
}
</style>
