<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="require('@/assets/aaa.gif')">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <el-dropdown-item>
          <span @click="infoCheck" style="display:block;">个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="dialogpwd = true" style="display:block;">修改密码</span>
        </el-dropdown-item> -->
        <el-dropdown-item >
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="个人信息" :visible.sync="dialoginfo" width="30%" :before-close="handleClose">
      <div class="my-info">
        <el-form :model="info" status-icon ref="info" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ID：" prop="admin_id">
            <el-input :disabled="true" v-model="info.admin_id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="昵称："
            :rules="[{required: true, message: '请输入', trigger: 'blur'}]"
            prop="admin_name"
          >
            <el-input :disabled="true" v-model="info.admin_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号："
            :rules="[{required: true, message: '请输入', trigger: 'blur'}]"
            prop="admin_phone"
          >
            <el-input v-model.number="info.admin_phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="infosubmitForm('info')">修 改</el-button>
            <el-button @click="dialoginfo = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogpwd" width="30%" :before-close="handleClose">
      <div>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="admin_password">
            <el-input type="password" v-model="ruleForm2.admin_password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repwd">
            <el-input type="password" v-model="ruleForm2.repwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model.number="ruleForm2.newpassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="passsubmitForm('ruleForm2')">修 改</el-button>
            <el-button @click="dialogpwd = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Cookies from "js-cookie";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.admin_password !== "") {
          this.$refs.ruleForm2.validateField("repwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.repwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      info: {},
      dialoginfo: false,
      dialogpwd: false,
      ruleForm2: {
        admin_id: "",
        admin_password: "",
        repwd: "",
        newpassword: ""
      },
      rules2: {
        admin_password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        repwd: [{ required: true, validator: validatePass2, trigger: "blur" }],
        newpassword: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    infoCheck() {
      this.info = JSON.parse(Cookies.get("admin"));
      this.dialoginfo = true;
    },
    infosubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editadmin", this.info)
            .then(result => {
              this.$message.success("成功");
              this.dialoginfo = false;
              Cookies.set("admin", this.info, { expire: 1 });
            })
            .catch(err => {
              this.$message.error("失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          // this.resetForm(formName)
          return false;
        }
      });
    },
    passsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("updatepwd", this.ruleForm2)
            .then(result => {
              this.$store.dispatch("gettype");
              this.resetForm(formName); // 清除文本框内容
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          // this.resetForm(formName)
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   this.$store.dispatch('gettype').then((result) => {
      Cookies.remove("isLogin");
      location.reload(); // 为了重新实例化vue-router对象 避免bug
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 75px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -22px;
        top: 15px;
        font-size: 16px;
      }
    }
  }
}
</style>

