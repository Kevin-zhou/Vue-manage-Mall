<template>
  <el-dialog title="系统登录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form :model="ruleForm2" @keyup.13.native="handleSubmit" :rules="rules2" ref="ruleForm2" label-position="right" label-width="15px" class="demo-ruleForm login-container">
      <el-form-item prop="account">
        <el-input type="text" :maxlength='11' v-model.trim="ruleForm2.account" auto-complete="off" placeholder="请输入账户名"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" :maxlength='16' v-model.trim="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: 'loginDialogConfirm',
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          // { max: 11, message: '请输入正确手机号', trigger: 'change,blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { max: 16, message: '密码过长', trigger: 'change,blur' },
        ]
      },
    };
  },
  props: ['dialogVisible'],
  methods: {
    ...mapActions({
      login: 'admin/postLogin'
    }),
    ...mapMutations({
      save: 'admin/saveLogin'
    }),
    handleClose(done) {
      this.close();
      done();
    },
    close: function() {
      __logout();
      //this.$router.replace('/login');
    },
    handleSubmit: function() {
      this.$refs.ruleForm2.validate((valid) => {
        // 判断表单校验是否成功
        if (!valid) return;
        this.logining = true;
        // 登录
        this.Tologin()

      });
    },
    // 登录
    Tologin() {
      let pas = {
        "userName": this.ruleForm2.account,
        "userPassword": this.ruleForm2.checkPass
      }
      this.login(pas).then(res => {
        this.logining = false;
        if (res.success) {
          this.save(res);
          __Events.publish('toggleLoginDialog',false);
        }else{
          alert(res.returnMsg)
        }
      })
    },
  },
};
</script>
