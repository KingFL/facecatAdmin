<template>
  <div>
    <el-card shadow="never">
      <div>
        <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline">
          <el-form-item label="用户名:" prop="value">
            <el-input v-model="searchData.username" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- <el-form-item label="昵称:" prop="value">
            <el-input v-model="searchData.nickname" placeholder="请输入内容"></el-input>
          </el-form-item> -->
          <el-form-item label="性别:" prop="value">
            <el-input v-model="searchData.usersex" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="search('searchData')">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <br>
      <el-table
        empty-text="暂无数据"
        border
        stripe
        size="mini"
        :data="userData.users"
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column sortable prop="username" label="用户名"></el-table-column>
        <!-- <el-table-column sortable prop="nickname" label="昵称"></el-table-column> -->
        <el-table-column sortable prop="usersex" label="性别"></el-table-column>
        <el-table-column sortable prop="avatar" label="头像">
          <template slot-scope="scope">
            <img
              v-if="scope.row.avatar"
              style="width: 50px; height:50px; border-radius:50%"
              :src="scope.row.avatar "
              alt
              srcset
            >
            <img
              v-else
              style="width: 50px; height:50px; border-radius:50%"
              src="@/assets/person.png"
              alt
              srcset
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="beforeEdit(scope.row)" type="warning" size="mini">编 辑</el-button> -->
            <el-button @click="del(scope.row.username)" type="danger" size="mini">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="userData.count"
          :page-size="userData.pagesize"
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogedit" width="30%" :before-close="handleClose">
          <!-- <el-form :model="userDetail" status-icon ref="userDetail" label-width="120px" class="demo-ruleForm">
              <el-form-item label="ID：" prop="user_id">
                <el-input :disabled="true" v-model="userDetail.user_id"></el-input>
              </el-form-item>
              <el-form-item label="轮播图名：" prop="user_name" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-input v-model="userDetail.user_name"></el-input>
              </el-form-item>
              <el-form-item label="跳转的书名：" prop="user_title" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-input v-model="userDetail.user_title"></el-input>
              </el-form-item> 
              <el-form-item label="图片：" prop="user_url" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-upload
                  class="upload-demo"
                  action="/BookMall/background/fileUpLoad"
                  accept="image/jpeg"
                  :multiple="false"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :on-success="suc"
                  :on-change="handleChange">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="editsubmitForm('userDetail')">修 改</el-button>
                <el-button size="mini" @click="dialogedit = false">关 闭</el-button>
              </el-form-item>
          </el-form>-->
        </el-dialog>
        <el-dialog title="添加" :visible.sync="dialogadd" width="30%" :before-close="handleClose">
          <!-- <el-form :model="adduserData" status-icon ref="adduserData" label-width="120px" class="demo-ruleForm">
              <el-form-item label="轮播图名：" prop="user_name" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-input v-model="adduserData.user_name"></el-input>
              </el-form-item>
              <el-form-item label="跳转的书名：" prop="user_title" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-input v-model="adduserData.user_title"></el-input>
              </el-form-item>
              <el-form-item label="图片：" prop="user_url" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-upload
                  class="upload-demo"
                  action="/BookMall/background/fileUpLoad"
                  accept="image/jpeg"
                  :multiple="false"
                  :before-upload="beforeAvatarUpload"
                  :show-file-list="false"
                  :on-success="suc"
                  :on-change="handleChange">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" @click="resetForm('adduserData')">重 置</el-button>
                <el-button type="primary" size="mini" @click="addsubmitForm('adduserData')">添 加</el-button>
              </el-form-item>
          </el-form>-->
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getUserData, deleteUserData } from "@/api/table";
export default {
  data() {
    return {
      searchData: {
        pagesize: 10,
        curpage: 1,
        username: "",
        usernsex: "",
        nickname: ""
      },
      dialogedit: false,
      dialogadd: false,
      userDetail: {},
      userData: {}
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    suc() {
      this.$message.success("上传成功");
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt2M;
    },
    del(user_id) {
      this.$confirm("确认删除？")
        .then(_ => {
          deleteUserData({ username: user_id })
            .then(result => {
              this.getData();
              this.$message.success("删除成功");
            })
            .catch(err => {
              console.log(err);
              this.$message.error("删除失败");
            });
        })
        .catch(_ => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    beforeEdit(val) {
      this.userDetail = val;
      this.dialogedit = true;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("edituser", this.userDetail)
            .then(result => {
              this.dialogedit = false;
              this.getData();
              this.$message.success("修改成功");
            })
            .catch(err => {
              console.log(err);
              this.$message.error("失败");
            });
        } else {
          console.log("error submit!!");
          // this.resetForm(formName)
          return false;
        }
      });
    },
    addsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("adduser", this.adduserData)
            .then(result => {
              this.dialogadd = false;
              this.getData();
              this.$message.success("添加成功");
              this.resetForm(formName); // 清除文本框内容
            })
            .catch(err => {
              console.log(err);
              this.$message.error("失败");
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
    handleChange(file, fileList) {
      if (file.response) {
        console.log(file.response);
        this.adduserData.user_url = file.response;
        this.userDetail.user_url = file.response;
      }
    },
    handleCurrentChange(val) {
      console.log(val);

      this.searchData.curpage = val;
      this.getData();
    },
    getData() {
      // this.$store.dispatch('getuserData', this.searchData)
      getUserData(this.searchData)
        .then(result => {
          console.log(result);
          this.userData = result.data;
        })
        .catch(err => {});
    },
    search(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getData();
          // this.$refs[formName].resetFields()
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.intro {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
