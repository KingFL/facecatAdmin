<template>
  <div>
    <el-card shadow="never">
      <div>
        <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline">
          <el-form-item label="用户名:" prop="value">
            <el-input v-model="searchData.nickname" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="猫:" prop="value">
            <el-input v-model="searchData.catname" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="位置:" prop="value">
            <el-input v-model="searchData.locatname" placeholder="请输入内容"></el-input>
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
        :data="momentData.moments"
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column sortable prop="username" label="用户名"></el-table-column>
        <el-table-column sortable prop="catname" label="猫"></el-table-column>
        <el-table-column sortable prop="locatname" label="位置"></el-table-column>
        <el-table-column sortable prop="content" label="描述"></el-table-column>
        <el-table-column sortable prop="imagepath" label="图片">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="图片" trigger="hover">
              <img style="width: 150px; height:150px; " :src="scope.row.imagepath " alt srcset>
              <img
                slot="reference"
                style="width: 20px; height:20px; "
                :src="scope.row.imagepath "
                alt
                srcset
              > 
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button @click="beforeEdit(scope.row)" type="warning" size="mini">编 辑</el-button>
            <el-button @click="del(scope.row.momentid)" type="danger" size="mini">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="momentData.count"
          :page-size="momentData.pagesize"
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogedit" width="30%" :before-close="handleClose">
          <el-form :model="momentDetail" status-icon ref="momentDetail" label-width="120px" class="demo-ruleForm">
              <el-form-item label="猫：" prop="content">
                <el-input :disabled="true" v-model="momentDetail.catname"></el-input>
              </el-form-item>    
                <el-form-item label="描述：" prop="content">
                <el-input v-model="momentDetail.content"></el-input>
              </el-form-item>  
              <el-form-item>
                <el-button type="primary" size="mini" @click="editsubmitForm('momentDetail')">修 改</el-button>
                <el-button size="mini" @click="dialogedit = false">关 闭</el-button>
              </el-form-item>
          </el-form>
        </el-dialog> 
      </div>
    </el-card>
  </div>
</template>
<script>
import { getmomentData, deletemomentData,updatemomentData } from "@/api/table";
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
      momentDetail: {},
      momentData: {}
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
    del(moment_id) {
      this.$confirm("确认删除？")
        .then(_ => {
          deletemomentData({ momentid: moment_id })
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
      this.momentDetail = val;
      this.dialogedit = true;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         updatemomentData(this.momentDetail).then(result => {
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
            .dispatch("addmoment", this.addmomentData)
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
        this.addmomentData.moment_url = file.response;
        this.momentDetail.moment_url = file.response;
      }
    },
    handleCurrentChange(val) {
      console.log(val);

      this.searchData.curpage = val;
      this.getData();
    },
    getData() {
      // this.$store.dispatch('getmomentData', this.searchData)
      getmomentData(this.searchData)
        .then(result => {
          console.log(result);
          this.momentData = result.data;
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
