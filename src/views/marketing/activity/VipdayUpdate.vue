<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <el-form ref="form" label-width="130px" :model="form" size="medium">
          <el-form-item prop="name" label="会员日名称：">
            <el-input v-model="form.name" autocomplete="off" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item prop="dateRange" label="会员日有效期：">
            <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOption"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="timset" label="会员日规则：">
            <template>
              <el-radio v-model="form.loopType" label="1" @change="empty">按每月设置</el-radio>
              <el-radio v-model="form.loopType" label="2" @change="empty">按每周设置</el-radio>
              <div v-if="form.loopType == 1">
                <span>每月&nbsp;</span>
                <el-select v-model="form.intervals" multiple placeholder="请选择">
                  <el-option
                    v-for="item in form.daySelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span>&nbsp;号</span>
              </div>
              <div v-if="form.loopType == 2">
                <el-checkbox-group v-model="form.intervals">
                  <el-checkbox
                    v-for="day in form.days"
                    :label="day.value"
                    :key="day.value"
                    :value="day.value"
                  >周{{day.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
          </el-form-item>
          <el-form-item prop="relation" label="关联活动：">
            <el-select v-model="form.activityId" placeholder="请选择" style="width:350px">
              <el-option
                v-for="item in activityType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="memo" label="备注：">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.memo"
              maxlength="500"
              show-word-limit
              style="width:500px;resize:none;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" @click="cancel">取消</el-button>
            <el-button size="medium" type="primary" @click="submit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { VipDayAdminService } from "@/service/marketing/activity/VipDayAdminService";
import { closeCurrentTabAndToTab } from "@/utils/iframe";

export default {
  name: "VipdayUpdate",
  data() {
    return {
      form: {
        name: undefined,
        loopType: undefined,
        dateRange: [],
        intervals: [],
        days: [
          { value: 1, label: "一" },
          { value: 2, label: "二" },
          { value: 3, label: "三" },
          { value: 4, label: "四" },
          { value: 5, label: "五" },
          { value: 6, label: "六" },
          { value: 7, label: "日" }
        ],
        daySelect: [
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
          { value: 6, label: "6" },
          { value: 7, label: "7" },
          { value: 8, label: "8" },
          { value: 9, label: "9" },
          { value: 10, label: "10" },
          { value: 11, label: "11" },
          { value: 12, label: "12" },
          { value: 13, label: "13" },
          { value: 14, label: "14" },
          { value: 15, label: "15" },
          { value: 16, label: "16" },
          { value: 17, label: "17" },
          { value: 18, label: "18" },
          { value: 19, label: "19" },
          { value: 20, label: "20" },
          { value: 21, label: "21" },
          { value: 22, label: "22" },
          { value: 23, label: "23" },
          { value: 24, label: "24" },
          { value: 25, label: "25" },
          { value: 26, label: "26" },
          { value: 27, label: "27" },
          { value: 28, label: "28" },
          { value: 29, label: "29" },
          { value: 30, label: "30" },
          { value: 31, label: "31" }
        ],
        fromDate: undefined,
        toDate: undefined,
        activityId: undefined,
        memo: undefined
      },
      postForm: {
        name: undefined,
        loopType: undefined,
        intervals: [],
        fromDate: undefined,
        toDate: undefined,
        activityId: undefined,
        memo: undefined
      },
      pickerOption: {
        disabledDate(time) {
          let times = Date.now() - 24 * 60 * 60 * 1000;
          return time.getTime() < times;
        }
      },
      activityType: []
    };
  },
  mounted() {
    this.form.id = this.$route.query.data.id;
    this.form.activityId = this.$route.query.data.activityId;
    this.form.activityName = this.$route.query.data.activityName;
    this.form.name = this.$route.query.data.name;
    this.form.dateRange = [
      this.$route.query.data.fromDate,
      this.$route.query.data.toDate
    ];
    this.form.loopType = String(this.$route.query.data.loopType);
    this.form.intervals = this.$route.query.data.intervals.split(",").map(Number);
    this.form.memo = this.$route.query.data.memo;
    this.vipDayAdminService = new VipDayAdminService();
    this.getActivity();
    this.activityType.push({id:this.form.activityId,name:this.form.activityName});
  },
  methods: {
    getActivity() {
      this.vipDayAdminService.getActivitySelect().then(response => {
        this.activityType = response.data;
      });
    },
    cancel() {
      closeCurrentTabAndToTab("会员日管理");
    },
    //提交表单
    submit(form) {
      if (String(this.form.name) == 0) {
        this.$message({
          message: "会员日名称不得为空",
          type: "warning",
          duration: 1600
        });
      } else if (String(this.form.name).length > 20) {
        this.$message({
          message: "会员日名称不得超过20字",
          type: "warning",
          duration: 1600
        });
      } else if (this.form.dateRange == null) {
        this.$message({
          message: "会员日有效期不得为空",
          type: "warning",
          duration: 1600
        });
      } else if (this.form.intervals.length == 0) {
        this.$message({
          message: "请设置会员日规则",
          type: "warning",
          duration: 1600
        });
      } else if (String(this.form.activityId) == 0) {
        this.$message({
          message: "会员日关联活动不能为空",
          type: "warning",
          duration: 1600
        });
      } else {
        this.postForm.id = form.id;
        this.postForm.name = form.name;
        this.postForm.loopType = parseInt(form.loopType);
        this.postForm.intervals = form.intervals.map(Number);
        this.postForm.fromDate = form.dateRange[0] + " 00:00:00";
        this.postForm.toDate = form.dateRange[1] + " 23:59:59";
        this.postForm.activityId = parseInt(form.activityId);
        this.postForm.memo = form.memo;
        this.vipDayAdminService
          .updateMemFestivalConfig(this.postForm)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success",
                duration: 1600
              });
              closeCurrentTabAndToTab("会员日管理");
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
      }
    },
    empty() {
      this.form.intervals = [];
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
  width: 50%;
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