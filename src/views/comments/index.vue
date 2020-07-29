<template>
  <div>
    <el-card shadow="never">
      <div>
        <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline">
          <el-form-item label="用户名:" prop="value">
            <el-input v-model="searchData.username" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="评论内容:" prop="value">
            <el-input v-model="searchData.comment" placeholder="请输入内容"></el-input>
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
        :data="commentData.comments"
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="avatar" label="头像" width="80px">
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
        <el-table-column sortable prop="username" label="用户名"></el-table-column>
        <el-table-column sortable prop="comment" label="内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="beforeEdit(scope.row)" type="warning" size="mini">编 辑</el-button>
            <el-button @click="del(scope.row.commentid)" type="danger" size="mini">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="commentData.count"
          :page-size="commentData.pagesize"
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogedit" width="30%" :before-close="handleClose">
           <el-form :model="commentDetail" status-icon ref="commentDetail" label-width="120px" class="demo-ruleForm">
              <el-form-item label="用户：" prop="username">
                <el-input :disabled="true" v-model="commentDetail.username"></el-input>
              </el-form-item>
              <el-form-item label="评论内容：" prop="comment" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
                <el-input v-model="commentDetail.comment"></el-input>
              </el-form-item> 
              <el-form-item>
                <el-button type="primary" size="mini" @click="editsubmitForm('commentDetail')">修 改</el-button>
                <el-button size="mini" @click="dialogedit = false">关 闭</el-button>
              </el-form-item>
          </el-form> 
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getcommentData, deletecommentData,updatecommentData } from "@/api/table";
export default {
  data() {
    return {
      searchData: {
        pagesize: 10,
        curpage: 1,
        nickname: "",
        starttime: "",
        endtime: "",
        catname: "",
        locatname: ""
      },
      dialogedit: false,
      dialogadd: false,
      commentDetail: {},
      commentData: {}
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
    del(comment_id) {
      this.$confirm("确认删除？")
        .then(_ => {
          deletecommentData({ commentid: comment_id })
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
      this.commentDetail = val;
      this.dialogedit = true;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updatecommentData(this.commentDetail).then(result => {
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
            .dispatch("addcomment", this.addcommentData)
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
        this.addcommentData.comment_url = file.response;
        this.commentDetail.comment_url = file.response;
      }
    },
    handleCurrentChange(val) {
      console.log(val);

      this.searchData.curpage = val;
      this.getData();
    },
    getData() {
      // this.$store.dispatch('getcommentData', this.searchData)
      getcommentData(this.searchData)
        .then(result => {
          console.log(result);
          this.commentData = result.data;
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
