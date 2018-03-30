<template>
    <div class="container">
        <!--header-->
        <headerBar></headerBar>
        <!--侧边栏组件-->
        <asideMenu v-bind:menus="asideMenus"></asideMenu>
        <loginDialogConfirm v-bind:dialogVisible="loginDialogVisible"></loginDialogConfirm>
        <!--右侧主视窗区域-->
        <div class="table-outer">
                <section class="content-container bg-purple-light">

                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>

                </section>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import baseModule from "../vuex/base";
const headerBar = require('../components/header_bar.vue')
const asideMenu = require('../components/aside_menu.vue')
const loginDialogConfirm = require('../components/login_confirm.vue')


export default {
    data() {
        return {
            breadcrumbs: [{ name: '首页', path: '/' }],
        }
    },
    components: {
        headerBar,
        asideMenu,
        loginDialogConfirm
    },
    methods: {
        // 将VUEX中的mutations方法映射到页面
        ...mapMutations({
            updateLoginDialog: 'base/updateLoginDialog',
        }),
    },
    computed: {
        ...mapState('base', [
            'loginDialogVisible'
        ]),
        asideMenus: function() {
            return this.$router.options.routes;
        }
    },
    created: function() {
        const isLogin = __isLogin();
        // if (isLogin) this.updateLoginDialog(false);
        // else this.updateLoginDialog(true);

        // __Events.subscribe('toggleLoginDialog', res => {
        //     this.updateLoginDialog(res)
        // })
    }
}

</script>

<style lang="scss">
.container {
    top: 0px;
    bottom: 0px;
    width: 100%;
    min-width: 900px;

    position: relative;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;

    .content-container {
        top: 80px;
        left: 250px;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        position: absolute;
        max-height: 100%;
        .breadcrumb-container {
            .title {
                width: 200px;
                float: left;
                color: #475669;
            }
            .breadcrumb-inner {
                float: right;
            }
        }
        .content-wrapper {
            width: 90%;
            background-color: #fff;
            box-sizing: border-box;
            position: relative;
        }
    }
}
</style>
