<template>
    <aside class="menu-expanded" v-bind:style="{height:height}">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
            <template v-for="(item,index) in menus" v-if="!item.hidden">
                <el-submenu :index="index+'' " v-if="!item.leaf" :key="item.path">
                    <template slot="title">
                        <i :class="item.iconCls"></i>
                        {{item.name}}
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                        {{child.name}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.children[0].path">
                    <i :class="item.iconCls"></i>
                    {{item.children[0].name}}
                </el-menu-item>
            </template>
        </el-menu>
    </aside>
</template>

<script>
export default {
  name: "asideMenu",
  data() {
    return {
      height: "200px"
    };
  },
  props: {
    menus: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(path, index) {
      // const parent=this.menus[index[0]];
      // const target = parent.children.find(res=>{
      //     return res.path == path;
      // })
      // const breadcrumb=[{name:target.name,path:target.path}];
      // this.$emit('select',breadcrumb);
    },
    getHeight: function() {
      const app$ = document.querySelector("#app");
      this.height = `${app$.clientHeight - 60}px`;
    }
  },
  created: function() {
    this.getHeight();
    window.addEventListener(
      "resize",
      () => {
        this.getHeight();
      },
      false
    );
  }
};
</script>

<style lang="scss">
aside {
  background-color: #eef1f6;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  width: 230px;
  padding-top: 60px;
  z-index: 10;
  .el-menu {
    height: 100%;
    background-color: #eef1f6;
  }
  // .el-menu .el-menu {
  //     background-color: #324057;
  // }
  .collapsed {
    width: 60px;
    .item {
      position: relative;
      // color: #fff;
    }
    .submenu {
      position: absolute;
      top: 0px;
      left: 60px;
      z-index: 99999;
      height: auto;
      display: none;
    }
  }
}

.el-submenu__title {
  // color: #e5e5e5;
  & i {
    color: #909399;
  }
}

.el-submenu__title:hover,
.el-submenu .el-menu-item:hover {
  background: #d1dbe5;
  color: #48576a;
  & i {
    color: #909399;
  }
}

.el-menu-item {
  color: #e5e5e5;
  &.is-active {
    border-left: 2px solid #fcb700;
    background: #e4e8f1;
    color: #2d2f33;
  }
}

// .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
//   color: #fff;
// }

.menu-collapsed {
  width: 60px;
}

.menu-expanded {
  width: 230px;
}
</style>
