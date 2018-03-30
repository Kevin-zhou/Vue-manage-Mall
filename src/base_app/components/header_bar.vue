<template>
    <div class="header">
        <el-col :span="10" class="logo logo-width">
            {{sysName}}
        </el-col>
        <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner">
                    <img :src="this.sysUserAvatar" /> {{sysUserName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>我的消息</el-dropdown-item>
                    <el-dropdown-item divided>设置</el-dropdown-item> -->
                    <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </div>
</template>

<script>

export default {
    name: 'headerBar',
    data(){
        return{
            sysName: '自定义后台管理',
            collapsed: false,
            sysUserName: '',
            sysUserAvatar: '',
            isLogin:__isLogin()||false
        }
    },
    props:{
        menus:{
            type: Array,
            default:  function () {
                return [];
            }
        }
    },
    methods: {

        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {

            }).then(() => {
                this.$store.dispatch('admin/postLogout').then(res=>{
                    if(res.success){
                        __logout();
                        _this.$router.replace('/login');
                    }else{
                        __logout();
                        // alert(res.returnMsg);
                    }
                })
            }).catch(() => {

            });
        },
    },
     mounted() {
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.name || '';
            this.sysUserAvatar = user.avatar || '';
        }
        this.sysUserAvatar = 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/3584ae0d0cd8a9483a15a342cc616eac_121_121.jpg';
    }

};
</script>

<style lang="scss">
@import '~scss_vars';
.header {
    height: 60px;
    line-height: 60px;
    // background-image: linear-gradient(90deg,lighten(#2371d1,8%) 0%,#2371d1 90%);
    // background-image: -webkit-linear-gradient(90deg,lighten(#2371d1,8%) 0%,#2371d1 90%);
    background: #20a0ff;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        line-height: 1;
        .userinfo-inner {
            cursor: pointer;
            color: #fff;
            width: 40px;
            height: 40px;
            display: block;
            text-align: center;
            margin-top: 10px;
            img {
                border-radius: 20px;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .logo {
        //width:230px;
        height: 60px;
        font-size: 21px;
        padding-left: 20px;
        padding-right: 20px;
        img {
            width: 40px;
            float: left;
            margin: 10px 10px 10px 18px;
        }
        .txt {
            color: #fff;
        }
    }
    .logo-width {
        width: 230px;
    }
    .logo-collapse-width {
        width: 60px
    }
    .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
}
</style>
