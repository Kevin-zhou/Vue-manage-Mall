<template>
    <!-- <div class="bg login-bg"> -->
        <el-form :model="ruleForm2"
         @keyup.13.native="handleSubmit" :rules="rules2" ref="ruleForm2"
         label-position="right" label-width="15px"
         class="demo-ruleForm login-container">
            <h3 class="title">{{loginTitle}}</h3>
            <el-form-item prop="account">

                <el-input type="text" :maxlength='11'
                 v-model.trim="ruleForm2.account"
                 auto-complete="off" placeholder="请输入账户名">
                    <i class="icon-user" slot="suffix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" :maxlength='16'
                v-model.trim="ruleForm2.checkPass"
                auto-complete="off" placeholder="密码">
                    <i class="icon-pwd" slot="suffix"></i>
                </el-input>
            </el-form-item>
            <el-form-item class=" forgetPassword"  style="width:100%;">
                <el-button type="primary" style="width:100%;font-size:18px;"
                @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    <!-- </div> -->
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          // { max: 11, message: '请输入正确手机号', trigger: 'change,blur' },
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { max: 16, message: '密码过长', trigger: 'change,blur' },
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      login: "admin/postLogin"
    }),
    ...mapMutations({
      save: "admin/saveLogin"
    }),
    // 登录按钮
    handleSubmit(ev) {
      this.$refs.ruleForm2.validate(valid => {
        // 判断表单校验是否成功
        if (!valid) return;
        this.logining = true;
        // 登录
        this.Tologin();
      });
    },
    // 登录
    Tologin() {
      let pas = {
        userName: this.ruleForm2.account,
        userPassword: this.ruleForm2.checkPass
      };
      this.login(pas).then(res => {
        this.logining = false;
        if (res.success) {
          this.save(res);
          this.$router.push("/");
        }
      });
    }
  },
  computed: {
    loginTitle: function() {
      return __message.loginTitle;
    }
  },
  created: function() {}
};
</script>

<style lang="scss" scoped>
// @import '../style/index';
// .bg {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-size: cover;
// }

// .login-bg {
//     background: #e5eaee url(https://www.tapd.cn/img/login/bg-login-new.jpg) no-repeat top center;
// }

// .forgetPassword {
//     user-select: none;
//     cursor: pointer;
//     position: relative;
//     span {
//         margin-left: 25px;
//         vertical-align: top;
//         color: #65C3DF;
//     }
//     .profile-solid.icon {
//         color: #65C3DF;
//         position: absolute;
//         margin-left: 3px;
//         margin-top: 18px;
//         width: 14px;
//         height: 6px;
//         border-left: solid 1px currentColor;
//         border-right: solid 1px currentColor;
//         border-top: solid 1px currentColor;
//         border-bottom: solid 1px transparent;
//         background-color: currentColor;
//         border-radius: 6px 6px 0 0;
//     }

//     .profile-solid.icon:before {
//         content: '';
//         position: absolute;
//         left: 2px;
//         top: -10px;
//         width: 8px;
//         height: 8px;
//         border-radius: 50%;
//         border: solid 1px currentColor;
//         background-color: currentColor;
//     }
// }

// .icon-user {
//     background: url(https://www.tapd.cn/sprite/login.sprite+1498703319819.png)no-repeat center;
//     display: inline-block;
//     vertical-align: middle;
//     background-position: -70px -72px;
//     width: 17px;
//     height: 19px;
// }
// .icon-pwd {
//     background: url(https://www.tapd.cn/sprite/login.sprite+1498703319819.png)no-repeat center;
//     display: inline-block;
//     vertical-align: middle;
//         background-position: -52px -72px;
//     width: 16px;
//     height: 22px;
// }

.login-container {
//   background: url(../../assets/img/bg1.jpg) center !important;

  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}

.forgetPassword {
  user-select: none;
  cursor: pointer;
  position: relative;
  span {
    margin-left: 25px;
    vertical-align: top;
    color: #65c3df;
  }
  .profile-solid.icon {
    color: #65c3df;
    position: absolute;
    margin-left: 3px;
    margin-top: 18px;
    width: 14px;
    height: 6px;
    border-left: solid 1px currentColor;
    border-right: solid 1px currentColor;
    border-top: solid 1px currentColor;
    border-bottom: solid 1px transparent;
    background-color: currentColor;
    border-radius: 6px 6px 0 0;
  }

  .profile-solid.icon:before {
    content: "";
    position: absolute;
    left: 2px;
    top: -10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: solid 1px currentColor;
    background-color: currentColor;
  }
}
</style>
