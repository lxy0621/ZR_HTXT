<template>
  <div>
    <h3>{{title}}</h3>
    <el-divider style="margin: 10px 0;"></el-divider>
    <div
      :gutter="20"
      style="overflow:hidden;"
    >
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <p class="tips">选择</p>
          <div style="border:1px solid #DCDFE6;padding:20px;">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              clearable
              size="small"
            >
            </el-input>
            <div style="height:500px;overflow:auto;margin-top:10px;">
              <el-tree
                :data="organizationData"
                show-checkbox
                default-expand-all
                :default-checked-keys="checkedData"
                node-key="id"
                ref="tree"
                :expand-on-click-node="false"
                accordion
                highlight-current
                :props="defaultProps"
                v-loading="loading"
                @check-change="TreeCheckChange"
                style="background:transparent;"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                >
                  <span>{{ node.label }}</span>
                  <span v-if="data.children && data.children.length > 0">
                    <el-button
                      size="mini"
                      type="text"
                      style="color:#1e9fff;"
                      @click="() => removeCurrent(data, node)"
                    >
                      不包括该节点
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
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
                <el-button
                  @click="centerDialogVisible = false"
                  v-waves
                >取 消</el-button>
                <el-button
                  type="primary"
                  v-waves
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
                <span>{{item.title}}</span>
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
            type="primary"
            @click="submitTreeData"
          >确定</el-button>
          <el-button @click="cancel">取消</el-button>
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
      default: "树型查找带回"
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
    removeCurrent(data, node) {
      var that = this;
      if (node.checked) {
        for (var i = 0; i < that.orignalData.length; i++) {
          if (that.orignalData[i].id == data.id) {
            that.orignalData.splice(i, 1);
          }
        }
      }
    },
    isInclude(el, node) {
      console.log(el);
      el.cancelBubble = true;
      console.log(node);
    },
    getCheckedNodes() {
      // console.log(this.$refs.tree.getCheckedNodes());
    },
    resetChecked() {
      if (this.checkedData.length == 0) {
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
      this.checkedData = [];
      this.orignalData = [];
      this.$refs.tree.setCheckedKeys([]);
    },
    // 左侧点选
    TreeCheckChange(data, isCheck) {
      var that = this;
      if (isCheck) {
        var res = that.orignalData.some(item => {
          if (item.id == data.id) {
            return true;
          }
        });
        if (!res) {
          that.$set(that.checkedData, that.checkedData.length, data.id);
          that.$set(that.orignalData, that.orignalData.length, {
            title: data.title,
            id: data.id,
            pid: data.pid,
            spread: data.spread,
            checked: data.checked,
            disabled: data.disabled,
            checkArr: data.checkArr,
            activityCenter: data.activityCenter,
            canAccess: data.canAccess
          });
        }
      } else {
        for (var i = 0; i < that.checkedData.length; i++) {
          if (that.checkedData[i] == data.id) {
            that.checkedData.splice(i, 1);
          }
        }
        for (var i = 0; i < that.orignalData.length; i++) {
          if (that.orignalData[i].id == data.id) {
            that.orignalData.splice(i, 1);
          }
        }
      }
    },
    // 右侧删除
    removeItem(id) {
      var that = this;
      for (var i = 0; i < that.orignalData.length; i++) {
        if (that.orignalData[i].id == id) {
          that.$delete(that.orignalData, i);
        }
      }
      for (var i = 0; i < that.checkedData.length; i++) {
        if (that.checkedData[i] == id) {
          that.$delete(that.checkedData, i);
        }
      }
      that.$refs.tree.setCheckedKeys(that.checkedData);
    },
    // 关闭弹框
    cancel() {
      this.$emit("changeTreeVisible", "false");
    },
    // 关闭弹框渲染input
    submitTreeData() {
      this.$emit("renderTreeInput", this.orignalData);
      this.$emit("changeTreeVisible", "false");
    }
  },
  mounted() {
    this.findTreeData();
  },
  data() {
    return {
      centerDialogVisible: false,
      filterText: "",
      organizationData: [],
      checkedData: [4, 14, 76, 119, 61],
      orignalData: [
        {
          title: "直营综合支持部",
          id: "76",
          pid: "43",
          spread: false,
          checked: false,
          disabled: false,
          checkArr: "checkArr",
          activityCenter: true,
          canAccess: true
        },
        {
          title: "成都紫东",
          id: "4",
          pid: "1",
          spread: false,
          checked: false,
          disabled: false,
          checkArr: "checkArr",
          activityCenter: true,
          canAccess: true
        },
        {
          title: "重庆谢家湾",
          id: "14",
          pid: "11",
          spread: false,
          checked: false,
          disabled: false,
          checkArr: "checkArr",
          activityCenter: true,
          canAccess: true
        },
        {
          title: "公主坟",
          id: "119",
          pid: "79",
          spread: false,
          checked: false,
          disabled: false,
          checkArr: "checkArr",
          activityCenter: true,
          canAccess: true
        },
        {
          title: "创意科教研究院",
          id: "61",
          pid: "75",
          spread: false,
          checked: false,
          disabled: false,
          checkArr: "checkArr",
          activityCenter: true,
          canAccess: true
        }
      ],
      loading: false,
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.el-col-12,
.el-col-24 {
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
  height: 542px;
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
