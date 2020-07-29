<template>
  <div>
    <el-card shadow="never">
      <div>
        <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline">
          <el-form-item label="位置:" prop="value">
            <el-input v-model="searchData.locatname" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="search('searchData')">查 询</el-button>
            <el-button size="mini" type="default" @click="dialogadd = true">添 加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <br>
      <el-table
        empty-text="暂无数据"
        border
        stripe
        size="mini"
        :data="LocationData.locations"
        style="width: 100%"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column sortable prop="label" label="位置"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button @click="beforeEdit(scope.row)" type="warning" size="mini">编 辑</el-button>
            <el-button @click="del(scope.row.value)" type="danger" size="mini">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="LocationData.count"
          :page-size="LocationData.pagesize"
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogedit" width="30%" :before-close="handleClose">
          <el-form
            :model="LocationDetail"
            status-icon
            ref="LocationDetail"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="位置：" prop="label">
              <el-input
                v-model="LocationDetail.label"
                :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="editsubmitForm('LocationDetail')">修 改</el-button>
              <el-button size="mini" @click="dialogedit = false">关 闭</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="dialogadd" width="30%" :before-close="handleClose">
          <el-form
            :model="LocationaddDetail"
            status-icon
            ref="LocationaddDetail"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="位置：" prop="label">
              <el-input
                v-model="LocationaddDetail.locatname"
                :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="addsubmitForm('LocationaddDetail')">添 加</el-button>
              <el-button size="mini" @click="dialogadd = false">关 闭</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getLocationData,
  deleteLocationData,
  updateLocationData,
  addLocationData
} from "@/api/table";
export default {
  data() {
    return {
      searchData: {
        pagesize: 10,
        curpage: 1,
        locatname: ""
      },
      dialogedit: false,
      dialogadd: false,
      LocationDetail: {},
      LocationaddDetail: {
        locatname: ""
      },
      LocationData: {}
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
    del(Location_id) {
      this.$confirm("确认删除？")
        .then(_ => {
          deleteLocationData({ Locationid: Location_id })
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
      this.LocationDetail = val;
      this.dialogedit = true;
    },
    editsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateLocationData({
            locatname: this.LocationDetail.label,
            locatid: this.LocationDetail.value
          })
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
          addLocationData(this.LocationaddDetail)
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
        this.addLocationData.Location_url = file.response;
        this.LocationDetail.Location_url = file.response;
      }
    },
    handleCurrentChange(val) {
      console.log(val);

      this.searchData.curpage = val;
      this.getData();
    },
    getData() {
      // this.$store.dispatch('getLocationData', this.searchData)
      console.log(this.searchData);
      
      getLocationData(this.searchData)
        .then(result => {
          console.log(result);
          this.LocationData = result.data;
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
