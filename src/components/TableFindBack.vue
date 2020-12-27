<template>
  <div style="">
    <h3>{{title}}</h3>
    <el-divider style="margin: 10px 0;"></el-divider>
    <div
      :gutter="20"
      style="overflow:hidden;"
    >
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <p class="tips">选择</p>
          <div style="border:1px solid #DCDFE6;padding:20px;">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              clearable
              size="small"
            >
              >
            </el-input>
            <div style="height:490px;overflow:auto;margin-top:10px;">
              <el-table
                ref="multipleTable"
                :data="staffData"
                :row-class-name="tableRowClassName"
                tooltip-effect="dark"
                border
                v-loading="loading"
                size="mini"
                @row-click="handleCurrentChange"
                @selection-change="handleCheckboxChange"
                style="width: 100%"
              >
                <!-- <el-table-column
                  type="selection"
                  width="40" style="text-align: center;"
                >
                </el-table-column> -->
                <el-table-column
                  prop="entrytime"
                  label="入职日期"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="post"
                  label="岗位"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号"
                >
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p class="tips">
            <span>已选</span>
            <el-button
              class="reset-checked"
              type="text"
              @click="resetChecked"
            >清空</el-button>

            <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="20%"
              center
              append-to-body
            >
              <span>确定要清空已选项吗？</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="clearChecked"
                >确 定</el-button>
              </span>
            </el-dialog>
          </p>
          <div style="border:1px solid #DCDFE6;padding:20px;">
            <ul>
              <li
                :data-id="item.id"
                v-for="(item, key) in orignalData"
                :key="key"
              >
                <span>{{item.name}}</span>
                <i
                  class="fa fa-minus-circle"
                  aria-hidden="true"
                  @click="removeItem(item.id)"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div style="margin-top:10px;text-align:right;">
          <el-button
            v-waves
            type="primary"
            @click="submitTableData"
          >确定</el-button>
          <el-button
            @click="cancel"
            v-waves
          >取消</el-button>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "表格型查找带回"
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    // 获取数据
    findTreeData: function() {
      this.loading = true;
      this.$api.organization.findOrganizationTree().then(res => {
        this.organizationData = res.data;
        this.loading = false;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      var that = this;
      for (var i = 0; i < that.orignalData.length; i++) {
        if (that.orignalData[i].id == row.id) {
          return "success-row";
        }
      }
      return "";
    },
    resetChecked() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "当前暂无已选项，请先添加！",
          type: "warning"
        });
      } else {
        this.centerDialogVisible = true;
      }
    },
    clearChecked() {
      this.centerDialogVisible = false;
      this.multipleSelection = [];
      this.orignalData = [];
      this.$refs.multipleTable.clearSelection();
    },
    // 左侧点选
    handleCurrentChange(row, event, column) {
      var that = this;
      // console.log(row);
      // console.log(event);
      // console.log(column);
      var res = that.orignalData.some(item => {
        if (item.id == row.id) {
          return true;
        }
      });
      if (!res) {
        that.$refs.multipleTable.toggleRowSelection(row, true); //点击选中
        that.$set(
          that.multipleSelection,
          that.multipleSelection.length,
          row.id
        );
        that.$set(that.orignalData, that.orignalData.length, row);
      } else {
        that.$refs.multipleTable.toggleRowSelection(row, false); //点击选中
        for (var i = 0; i < that.multipleSelection.length; i++) {
          if (that.multipleSelection[i] == row.id) {
            that.multipleSelection.splice(i, 1);
          }
        }
        for (var i = 0; i < that.orignalData.length; i++) {
          if (that.orignalData[i].id == row.id) {
            that.orignalData.splice(i, 1);
          }
        }
      }
    },
    handleCheckboxChange(val) {
      this.multipleSelection = val;
    },
    // 右侧删除
    removeItem(id) {
      var that = this;
      for (var i = 0; i < that.orignalData.length; i++) {
        if (that.orignalData[i].id == id) {
          that.$delete(that.orignalData, i);
        }
      }
      // for (var i = 0; i < that.multipleSelection.length; i++) {
      //   if (that.multipleSelection[i] == id) {
      //     that.$delete(that.multipleSelection, i);
      //   }
      // }
      // that.$refs.tree.setCheckedKeys(that.multipleSelection);
    },
    // 关闭弹框
    cancel() {
      this.$emit("changeTableVisible", "false");
    },
    // 关闭弹框渲染input
    submitTableData() {
      this.$emit("renderTableInput", this.orignalData);
      this.$emit("changeTableVisible", "false");
    }
  },
  mounted() {
    // this.findTreeData();
    var that = this;
    for (var i = 0; i < that.orignalData.length; i++) {
      for (var j = 0; j < that.staffData.length; j++) {
        if (that.orignalData[i].id == this.staffData[j].id) {
          that.$refs.multipleTable.toggleRowSelection(that.staffData[j], true);
        }
      }
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      filterText: "",
      loading: false,
      staffData: [
        {
          id: "001",
          name: "机械暴龙兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "002",
          name: "兽人加鲁鲁",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "003",
          name: "海狮兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "004",
          name: "兽人加鲁鲁qwer",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "005",
          name: "海狮兽wqer",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "006",
          name: "伽偻达兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "007",
          name: "祖顿兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "008",
          name: "花仙兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "009",
          name: "神圣天使兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "010",
          name: "神圣天女兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "011",
          name: "花仙兽wqer",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "012",
          name: "超比多兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        }
      ],
      orignalData: [
        {
          id: "001",
          name: "机械暴龙兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "005",
          name: "海狮兽wqer",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "008",
          name: "花仙兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        },
        {
          id: "012",
          name: "超比多兽",
          staffnumber: "938-3094-283",
          phone: "1752673874",
          email: "9847583726@qq.com",
          department: "直营事业IT部",
          departmentId: "101",
          post: "前端工程师",
          entrytime: "2017.12.15",
          accounttype: "正常",
          stafftype: "在职"
        }
      ],
      multipleSelection: [],
      loading: false
    };
  }
};
</script>
<style lang="scss" scoped>
.el-col-24,
.el-col-16,
.el-col-8 {
  padding: 0 10px;
}
h3 {
  margin: 0;
}
.tips {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  overflow: hidden;
  .reset-checked {
    color: #1e9fff;
    cursor: pointer;
    padding: 0;
  }
  .reset-checked:hover {
    color: #ff6c65;
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 564px;
  overflow: auto;
  li {
    display: flex;
    justify-content: space-between;
    line-height: 28px;
    padding-left: 10px;
    i {
      color: #999;
      cursor: pointer;
      padding: 8px;
    }
    i:hover {
      color: #ff6c65;
      text-shadow: #ff6c65 0px 0px 2px;
    }
  }
  li:hover {
    background-color: #f5f7fa;
  }
}
</style>
