<template>
  <div class="btnGroups">
    <el-button-group>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 5}"
        type="primary"
        plain
        @click="changeSelect(5)"
      >
        日
        <i v-if="isActive == 5" class="el-icon-date icon-size"></i>
      </el-button>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 4}"
        type="primary"
        plain
        @click="changeSelect(4)"
      >
        周
        <i v-if="isActive == 4" class="el-icon-date icon-size"></i>
      </el-button>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 3}"
        type="primary"
        plain
        @click="changeSelect(3)"
      >
        月
        <i v-if="isActive == 3" class="el-icon-date icon-size"></i>
      </el-button>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 2}"
        type="primary"
        plain
        @click="changeSelect(2)"
      >
        季
        <i v-if="isActive == 2" class="el-icon-date icon-size"></i>
      </el-button>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 1}"
        type="primary"
        plain
        @click="changeSelect(1)"
      >
        年
        <i v-if="isActive == 1" class="el-icon-date icon-size"></i>
      </el-button>
      <el-button
        v-waves
        class="date-select"
        :class="{'btn-active' : isActive == 10}"
        type="primary"
        plain
        @click="changeSelect(10)"
        style="width:210px;position:relative;"
      >
        {{date}}
        <el-date-picker
          v-model="date1"
          type="daterange"
          format="yyyy / MM / dd"
          :picker-options="pickerOptions"
          @change="dateChange"
          style="position:absolute;top:0;right:0;bottom:0;left:0;opacity: 0;"
        ></el-date-picker>
        <i v-if="isActive == 10" class="el-icon-date icon-size"></i>
      </el-button>
    </el-button-group>
  </div>
</template>
<script>
import { format } from "@/utils/datetime.js";
export default {
  props: {},
  data() {
    return {
      isActive: 5,
      date: "自定义",
      date1: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              this.date = format(start) + "-" + format(end);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              this.date = format(start) + "-" + format(end);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              this.date = format(start) + "-" + format(end);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    //获取图表数据
    changeSelect(val) {
      this.isActive = val;
      this.$emit("Datechange", val);
    },
    dateChange(date) {
      this.date =
        format(date[0]).split(" ")[0] + "-" + format(date[1]).split(" ")[0];

      //时间戳转换为时间
      // data.createtime= date.getFullYear() +'-'+(date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1) +'-' + (date.getDate() <10 ? '0' + date.getDate() : date.getDate()) +'   '+(date.getHours() <10 ? '0' + date.getHours() : date.getHours()) +':'+(date.getMinutes() <10 ? '0'+ date.getMinutes() : date.getMinutes()) +':'+ (date.getSeconds() <10 ? '0'+date.getSeconds() : date.getSeconds());

      let arr = [];
      let date1 = new Date(date[0]);
      let date2 = new Date(date[1]);
      arr[0] =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1 < 10
          ? "0" + (date1.getMonth() + 1)
          : date1.getMonth() + 1) +
        "-" +
        (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
      arr[1] =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1 < 10
          ? "0" + (date2.getMonth() + 1)
          : date2.getMonth() + 1) +
        "-" +
        (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
      this.$emit("Datechange", arr);
    }
  }
};
</script>
<style lang="scss" scoped>
.btnGroups{
    width: 100%;
    height: 34px;
    margin: 20px 0;
    .el-button-group{
        float: right;
    }
}
.date-select {
  padding: 0;
  width: 100px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  border-color: #1e9fff;
  background: #fff;
}
.date-select:hover {
  background: #fff;
  border-color: #1e9fff;
  color: #1e9fff;
}
.el-button-group .el-button--primary:not(:first-child):not(:last-child),
.el-button-group .el-button--primary:last-child,
.el-button-group .el-button--primary:first-child {
  border-left-color: #1e9fff;
  border-right-color: #1e9fff;
}
.btn-active {
  background: #1e9fff !important;
  color: #fff !important;
}
</style>
