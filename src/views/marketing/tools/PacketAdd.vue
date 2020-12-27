<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <el-form ref="form" label-width="110px" :model="form" size="medium">
          <el-form-item label="红包名称:" prop="redPacketName">
            <el-input
              v-model="form.redPacketName"
              placeholder="请输入红包名称(最多20字)"
              maxlength="20"
              style="width: 569px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="红包批次名称:" prop="batchName">
            <el-input
              v-model="form.batchName"
              placeholder="请输入红包批次名称(最多20字)"
              maxlength="20"
              style="width: 569px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="红包金额:" prop="money">
            <el-input-number
              v-model="form.money"
              :precision="0"
              :min="1"
              :max="200"
              :controls="false"
              style="width: 569px;"
              placeholder="请输入红包金额(1元~200元)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="红包个数:" prop="totalCount">
            <el-input-number
              v-model="form.totalCount"
              :precision="0"
              :min="1"
              :max="1000000"
              :controls="false"
              style="width: 569px;"
              placeholder="请输入红包个数(1个~1000000个)"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="备注:" prop="memo">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.memo"
              maxlength="500"
              show-word-limit
              style="width:569px;resize:none;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
import { closeCurrentTabAndToTab } from "@/utils/iframe";

export default {
  name: "PacketAdd",
  data() {
    return {
      form: {
        batchNo: undefined,
        redPacketName: undefined,
        batchName: undefined,
        money: undefined,
        totalCount: undefined,
        memo: undefined
      }
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
  },
  methods: {
    cancel() {
      closeCurrentTabAndToTab("红包管理");
    },
    submit(form) {
      let param = {
        page: 1,
        limit: 30
      };
      if (this.form.redPacketName == undefined) {
        this.$message({
          message: "红包名称不得为空",
          type: "warning"
        });
        return false;
      } else if (this.form.batchName == undefined) {
        this.$message({
          message: "红包批次名称不得为空",
          type: "warning"
        });
        return false;
      } else if (this.form.money == undefined) {
        this.$message({
          message: "红包金额不得为空",
          type: "warning"
        });
        return false;
      } else if (this.form.totalCount == undefined) {
        this.$message({
          message: "红包个数不得为空",
          type: "warning"
        });
        return false;
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.redPacketAdminService
              .createRpBatch(this.form)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  closeCurrentTabAndToTab("红包管理");
                  this.$refs.table.getList(param);
                  this.$emit("refreshPacketGroups", this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: "error"
                  });
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 95%;
  padding: 10px;
  background-color: #fcfcfc;
}

.card {
  vertical-align: middle;
  height: 100%;
}

.content {
  width: 800px !important;
  margin: 50px auto;
}

.form {
  width: 700px;
  margin: 50px auto;
}

.desc {
  width: 100%;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.45);
}

.desc h3 {
  margin: 0 0 12px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
}

.desc h4 {
  margin: 0 0 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.desc p {
  margin-top: 0;
  margin-bottom: 12px;
  line-height: 22px;
}

.required > .el-form-item__label::before {
  padding-top: 5px;
  content: "* ";
  color: red;
}
</style>
