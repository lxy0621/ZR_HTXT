<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <div class="form">
          <el-form :model="couponForm" ref="couponForm" label-width="110px" size="medium">
            <el-form-item label="优惠券名称" class="required" prop="name">
              <el-input v-model="couponForm.couponName" placeholder="请输入优惠券名称(最多20字)" maxlength="20" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="优惠券批次名" class="required" prop="name">
              <el-input v-model="couponForm.batchName" placeholder="请输入优惠券批次名(最多20字)" maxlength="20" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型" class="required" prop="couponType">
              <el-select v-model="couponForm.couponType" placeholder="请选择优惠券类型" style="width: 100%;">
                <el-option v-for="item in couponType" :key="item.value" :label="item.key"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" class="required" prop="validateRuleType">
              <el-radio-group v-model="couponForm.validateRuleType" style="width: 100%" @change="onChangeValidateRuleType">
                <el-radio label="1" value="1" style="display: block; margin-bottom: 10px;">领取当日起&ensp;
                  <el-input-number v-model="couponForm.fromCurrentDays" :precision="0" :min="1" :max="90" style="width: 419px;" :controls="false"
                                   :disabled="couponForm.validateRuleType !== '1'"></el-input-number> &ensp;天内可用
                </el-radio>
                <el-radio label="2" value="2" style="display: block; margin-bottom: 10px;">领取次日起&ensp;
                  <el-input-number v-model="couponForm.fromMorrowDays" :precision="0" :min="1" :max="90" :controls="false" style="width: 419px;"
                                   :disabled="couponForm.validateRuleType !== '2'"></el-input-number> &ensp;天内可用
                </el-radio>
                <el-radio label="3" value="3" style="display: block;">时间段&ensp;
                  <div style="display: inline-block; width: 420px;">
                    <el-date-picker v-model="dateRange" size="medium" :picker-options="pickerOption"
                                    type="daterange" range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期" format="yyyy-MM-dd"
                                    style="width: 513px;"
                                    value-format="yyyy-MM-dd 00:00:00" :disabled="couponForm.validateRuleType !== '3'"></el-date-picker>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="适用油品" class="required" prop="skuIds">
              <el-select v-model="couponForm.skuIds" placeholder="请选择适用油品" style="width: 100%;" multiple clearable>
                <el-option v-for="item in skuIds" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发放总量" class="required" prop="totalLimit">
              <el-input-number v-model="couponForm.totalLimit" :precision="0" :min="1" :controls="false" :max="100000" style="width: 569px;" placeholder="请输入发放总量">
              </el-input-number>&ensp;张
            </el-form-item>
            <el-form-item label="使用门槛" class="required" prop="consumeMoney">
              <el-row :gutter="10">
                <el-input-number v-model="couponForm.consumeMoney" :precision="2" :min="0" :max="1000000" :controls="false" style="width: 422px;" placeholder="请输入使用门槛">
                </el-input-number>&ensp;元
                <span style="color: #aaa;">&emsp;(输入0元即为无门槛)</span>
              </el-row>
            </el-form-item>
            <el-form-item label="优惠金额" class="required" prop="money">
              <el-input-number v-model="couponForm.money" :precision="0" :min="1" :max="1000000" :controls="false" style="width: 380px;" placeholder="请输入优惠金额">
              </el-input-number>&ensp;元
              <span style="color: #aaa;">&emsp;(优惠金额最少1元且为整数)</span>
            </el-form-item>
            <el-form-item label="使用说明" prop="memo">
              <el-input type="textarea" v-model="couponForm.memo" maxlength="500" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
              <el-button type="primary" style="margin-top: 12px;" @click="submit()">提交</el-button>
            </el-form-item>
            <el-divider></el-divider>
            <div class="desc">
              <h3>说明</h3>
              <h4><span>※&ensp;</span>有效期</h4>
              <p>
                1.领取当日起N天内可用：无论当日几点领取，算有效期第一天，第N天后优惠券失效
                <br>
                2.领取次日起N天内可用：领取次日算有效期第一天，第N天后优惠券失效
              </p>
              <h4><span>※&ensp;</span>使用门槛和优惠金额</h4>
              <p>
                1.使用门槛值为0，表示无门槛
                <br>
                2.优惠金额的值大于1
                <br>
                3.优惠金额不能大于使用门槛
              </p>
            </div>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import {CommonService} from "@/service/common/CommonService";
  import {closeCurrentTabAndToTab} from "@/utils/iframe";
  import {OilGunService} from "@/service/system/station/OilGunService";

  export default {
    name: "CouponAdd",
    data() {
      return {
        couponAdminService: undefined,
        couponType: [],
        skuIds: [],
        couponForm: {
          couponName: undefined,
          batchName: undefined,
          couponType: undefined,
          validateRuleType: undefined,
          fromCurrentDays: undefined,
          fromMorrowDays: undefined,
          skuIds: undefined,
          totalLimit: undefined,
          consumeMoney: undefined,
          money: undefined,
          memo: undefined,
        },
        dateRange: undefined,
        pickerOption: {
          disabledDate(time) {
            let times = Date.now() - 24 * 60 * 60 * 1000;
            return time.getTime() < times;
          }
        },
      };
    },
    mounted() {
      this.couponAdminService = new CouponAdminService();
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const that = this;

        const param = [{
          enumKey: "couponType",
          enumValue: "EnumCouponType",
        }];
        new CommonService().findEnumExcludeAll('activity.coupon', param).then(response => {
          that.couponType = response.couponType;
        });

        new OilGunService().productSkuList().then(response => {
          that.skuIds = response;
        });
      },
      cancel() {
        closeCurrentTabAndToTab('优惠券管理');
      },
      submit() {
        // 优惠券名称
        if (this.couponForm.couponName === undefined || this.couponForm.couponName === '') {
          this.$message({
            message: '优惠券名称不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.couponForm.couponName.length > 20) {
          this.$message({
            message: '优惠券名称不能超过20字',
            type: 'warning'
          });
          return false;
        }
        // 优惠券批次名
        if (this.couponForm.batchName === undefined || this.couponForm.batchName === '') {
          this.$message({
            message: '优惠券批次名不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.couponForm.batchName.length > 20) {
          this.$message({
            message: '优惠券批次名不能超过20字',
            type: 'warning'
          });
          return false;
        }
        // 优惠券类型
        if (this.couponForm.couponType === undefined) {
          this.$message({
            message: '优惠券类型不能为空',
            type: 'warning'
          });
          return false;
        }
        // 有效期
        if (this.couponForm.validateRuleType === undefined || this.couponForm.validateRuleType === '') {
          this.$message({
            message: '有效期不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.couponForm.validateRuleType === '1' && (this.couponForm.fromCurrentDays === undefined || this.couponForm.fromCurrentDays === '')) {
          // 领取当日起
          this.$message({
            message: '领取天数设置不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.couponForm.validateRuleType === '2' && (this.couponForm.fromMorrowDays === undefined || this.couponForm.fromMorrowDays === '')) {
          // 领取次日起
          this.$message({
            message: '领取天数设置不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.couponForm.validateRuleType === '3' && this.dateRange === undefined) {
          // 时间段
          this.$message({
            message: '领取时间段设置不能为空',
            type: 'warning'
          });
          return false;
        }
        // 适用油品
        if (this.couponForm.skuIds === undefined || this.couponForm.skuIds.length === 0) {
          this.$message({
            message: '适用油品不能为空',
            type: 'warning'
          });
          return false;
        }
        // 发放总量
        if (this.couponForm.totalLimit === undefined || this.couponForm.totalLimit === '') {
          this.$message({
            message: '发放总量不能为空',
            type: 'warning'
          });
          return false;
        }
        // 使用门槛
        if (this.couponForm.consumeMoney === undefined || this.couponForm.consumeMoney === '') {
          this.$message({
            message: '使用门槛不能为空',
            type: 'warning'
          });
          return false;
        }
        // 优惠金额
        if (this.couponForm.money === undefined || this.couponForm.money === '') {
          this.$message({
            message: '优惠金额不能为空',
            type: 'warning'
          });
          return false;
        }
        // 优惠金额、使用门槛比较
        if ((this.couponForm.money > this.couponForm.consumeMoney) && this.couponForm.consumeMoney !== 0) {
          this.$message({
            message: '优惠金额不能大于使用门槛',
            type: 'warning'
          });
          return false;
        }
        // 使用说明
        if (this.couponForm.memo !== undefined && this.couponForm.memo !== '' && this.couponForm.memo.length > 500) {
          this.$message({
            message: '使用说明最多不超过500字',
            type: 'warning'
          });
          return false;
        }

        // 设置值
        if (this.couponForm.validateRuleType === '1') {
          this.couponForm.validateDays = this.couponForm.fromCurrentDays;
        } else if (this.couponForm.validateRuleType === '2') {
          this.couponForm.validateDays = this.couponForm.fromMorrowDays;
        } else if (this.couponForm.validateRuleType === '3') {
          this.couponForm.fromDate = this.dateRange[0] + ' 00:00:00';
          this.couponForm.toDate = this.dateRange[1] + ' 23:59:59';
        }

        this.couponAdminService.createCouponBatch(this.couponForm)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: '新建优惠券成功',
                type: 'success',
                duration: 1600,
              });
              closeCurrentTabAndToTab('优惠券管理');
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          });
      },
      onChangeValidateRuleType(value) {
        this.couponForm.fromCurrentDays = undefined;
        this.couponForm.fromMorrowDays = undefined;
        this.dateRange = [];
      }
    }
  }
</script>

<style scoped>
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
    color: rgba(0, 0, 0, .45);
  }

  .desc h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, .45);
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
  }

  .desc h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, .45);
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
