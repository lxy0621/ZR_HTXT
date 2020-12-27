<template>
  <div>
    <!--表格内容栏-->
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="couponName" label="优惠券名称" width="180" align="center"></el-table-column>
      <el-table-column prop="activityName" label="参加活动名称" align="center"></el-table-column>
      <el-table-column prop="spenAmount" label="消费金额（元）" align="center"></el-table-column>
      <el-table-column prop="validity" label="有效期" width="90" align="center"></el-table-column>
      <el-table-column prop="getTime" label="领取时间" width="90" align="center"></el-table-column>
      <el-table-column prop="state" label="优惠券状态" align="center"></el-table-column>
      <el-table-column prop="useTime" label="使用时间" width="90" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
    </el-table>
    <el-pagination
      class="cardOper"
      small
      :current-page="currentPage4"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data() {
    return {
      currentPage4: 4,
      centerDialogVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        name: "",
        phone: "",
        src: "",
        time: ""
      },
      tableData: [
        {
          couponName: "5元CNG券",
          activityName: "端午节活动",
          spenAmount: "100.00元",
          validity: "2020.06.10-2020.06.30",
          getTime: "2020.06.10  12:02:19",
          state: "未使用",
          useTime: "2020.05.23  12:02:19",
          remarks: ""
        },
        {
          couponName: "5元CNG券",
          activityName: "端午节活动",
          spenAmount: "100.00元",
          validity: "2020.06.10-2020.06.30",
          getTime: "2020.06.10  12:02:19",
          state: "未使用",
          useTime: "2020.05.23  12:02:19",
          remarks: ""
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
// 消息提示框
.dialog-title {
  line-height: 30px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 10px;
}
.el-input {
  width: 350px;
}
.el-form-item {
  margin-top: 6px;
}
.cardOper {
  background: #ebebeb;
  text-align: right;
  padding: 6px;
}
</style>
