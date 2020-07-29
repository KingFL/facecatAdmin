<template>
  <div>
    <el-card shadow="never">
      <div>
        <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline">
          <el-form-item label="用户名:" prop="value">
            <el-input v-model="searchData.username" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="建议:" prop="value">
            <el-input v-model="searchData.suggestion" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="value">
            <el-input v-model="searchData.contact" placeholder="请输入内容"></el-input>
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
        :data="reportData.reports"
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column sortable prop="username" label="用户名"></el-table-column>
        <el-table-column sortable prop="suggestion" label="建议"></el-table-column>
        <el-table-column sortable prop="contact" label="联系方式"></el-table-column>
        <el-table-column sortable prop="time" label="时间"></el-table-column>
        
        <el-table-column label="操作">
          <template slot-scope="scope"> 
            <el-button @click="del(scope.row.reportid)" type="danger" size="mini">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="reportData.count"
          :page-size="reportData.pagesize"
        ></el-pagination>
      </div>
      <div> 
      </div>
    </el-card>
  </div>
</template>
<script>
import { getreportData, deletereportData } from "@/api/table";
export default {
  data() {
    return {
      searchData: {
        pagesize: 10,
        curpage: 1,
        username: "",
        suggestion: "",
        contact: ""
      },
      dialogedit: false,
      dialogadd: false,
      reportDetail: {},
      reportData: {}
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
    del(report_id) {
      this.$confirm("确认删除？")
        .then(_ => {
          deletereportData({ reportid: report_id })
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
      this.reportDetail = val;
      this.dialogedit = true;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("editreport", this.reportDetail)
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
            .dispatch("addreport", this.addreportData)
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
        this.addreportData.report_url = file.response;
        this.reportDetail.report_url = file.response;
      }
    },
    handleCurrentChange(val) {
      console.log(val);

      this.searchData.curpage = val;
      this.getData();
    },
    getData() {
      // this.$store.dispatch('getreportData', this.searchData)
      getreportData(this.searchData)
        .then(result => {
          console.log(result);
          this.reportData = result.data;
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
