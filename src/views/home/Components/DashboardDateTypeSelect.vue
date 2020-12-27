<template>
  <el-radio-group
    v-model="summaryType"
    size="small"
    class="summary-type-select"
  >
    <el-radio-button
      v-for="item in summaryTypes"
      :key="item.value"
      :label="item.value"
    >
      <div v-if="item.value == groupTypeEnum.WEEK">
        <span class="type-name">
          {{ showDefaultWeekText ? item.name : weekFormatText }}
          <i
            v-if="item.isActive"
            class="el-icon-date icon-size"
          ></i>
        </span>
        <el-date-picker
          v-model="weekFormatText"
          type="week"
          format="yyyy年第WW周"
          key="week"
          class="date-picker"
          :class="{ 'input-can-visible': item.isActive }"
          :clearable="false"
          :picker-options="weekPickerOption"
          placeholder="选择周"
          @change="weekChange"
        ></el-date-picker>
      </div>

      <div v-if="item.value == groupTypeEnum.MONTH">
        <span class="type-name">
          {{ showDefaultMonthText ? item.name : monthFormatText }}
          <i
            v-if="item.isActive"
            class="el-icon-date icon-size"
          ></i>
        </span>
        <el-date-picker
          v-model="monthFormatText"
          type="month"
          key="month"
          class="date-picker"
          :clearable="false"
          :class="{ 'input-can-visible': item.isActive }"
          format="yyyy年第MM月"
          placeholder="选择月"
          :picker-options="monthPickerOptions"
          @change="monthChange"
        ></el-date-picker>
      </div>

      <div v-if="item.value == groupTypeEnum.YEAR">
        <span class="type-name">
          {{ showDefaultYearText ? item.name : yearFormatText }}
          <i
            v-if="item.isActive"
            class="el-icon-date icon-size"
          ></i>
        </span>
        <el-date-picker
          v-model="yearFormatText"
          type="year"
          key="year"
          class="date-picker"
          :clearable="false"
          :class="{ 'input-can-visible': item.isActive }"
          placeholder="选择年"
          :picker-options="yearPickerOptions"
          @change="yearChange"
        ></el-date-picker>
      </div>

      <div v-if="item.value == '999'">
        <span class="type-name self-select-left-positon__not-date">
          {{ showDefaultSelfText ? item.name : selfFormatText }}
          <i
            v-if="item.isActive"
            class="el-icon-date icon-size"
          ></i>
        </span>
        <el-date-picker
          v-model="selfFormatText"
          type="daterange"
          align="right"
          key="daterange"
          placeholder="选择日期范围"
          format="yyyy/MM/dd"
          class="date-picker date-picker-datarange input-can-visible"
          :clearable="false"
          :picker-options="pickerOptions"
          @change="selfSelectChange"
        ></el-date-picker>
      </div>
    </el-radio-button>
  </el-radio-group>
</template>

<script>
import {
  verify,
  getCurrentWeekFirst,
  getCurrentWeekLast,
  getCurrentMonthFirst,
  getCurrentMonthLast,
  getCurrentYearFirst,
  getCurrentYearLast,
  weekToDate,
  dateToWeek,
  datePickerBeforeToday
} from "@/utils/util.js";
const groupTypeEnum = {
  DAY: 1, //  日
  WEEK: 2, //  周
  MONTH: 3, //  月
  QUARTER: 4, //  季度
  YEAR: 5 //  年
};
let summaryTypes = [
  {
    value: "1",
    name: "日",
    date: "",
    isActive: false
  },
  {
    value: "2",
    name: "周",
    date: "",
    isActive: false
  },
  {
    value: "3",
    name: "月",
    date: "",
    isActive: false
  },
  {
    value: "4",
    name: "季",
    date: "",
    isActive: false
  },
  {
    value: "5",
    name: "年",
    date: "",
    isActive: false
  },
  {
    value: "999",
    name: "自定义",
    date: "",
    isActive: false
  }
];
const summaryDateTypesMap = summaryTypes.reduce((x, y) => {
  return {
    ...x,
    [y.value]: y
  };
}, {});

function getLastDate(date, byNow = false) {
  if (datePickerBeforeToday.disabledDate(date) && byNow) {
    return new Date();
  }
  return date;
}

export default {
  name: "summary-type-select",
  data() {
    return {
      summaryTypes,
      groupTypeEnum,
      showDefaultWeekText: true,
      showDefaultYearText: true,
      showDefaultMonthText: true,
      showDefaultSelfText: true,
      defaultWeek: {
        start_date: "",
        end_date: ""
      },
      defaultYear: {
        start_date: "",
        end_date: ""
      },
      defaultMonth: {
        start_date: "",
        end_date: ""
      },
      selfSetDate: {
        start_date: "",
        end_date: ""
      },
      weekPickerOption: {
        firstDayOfWeek: 1,
        disabledDate: function(time) {
          return datePickerBeforeToday.disabledDate(time);
        }
      },
      monthPickerOptions: {
        disabledDate: function(time) {
          return datePickerBeforeToday.disabledDate(time);
        }
      },
      yearPickerOptions: {
        disabledDate: function(time) {
          return datePickerBeforeToday.disabledDate(time);
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate: function(time) {
          return datePickerBeforeToday.disabledDate(time);
        }
      }
    };
  },
  computed: {
    weekFormatText: {
      get() {
        const { start_date, end_date } = this.defaultWeek;
        let weekTime;
        if (start_date && end_date) {
          weekTime = new Date(start_date);
          const week = dateToWeek(weekTime);
          return weekTime.Format(`yyyy年第${week}周`);
        }
        return "";
      },
      set(week) {
        if (!week) return;
        const start = weekToDate(week, true);
        const one_day_timestamp = 24 * 60 * 60 * 1000;
        const end = new Date(+start + 6 * one_day_timestamp);
        const start_date = start.Format("yyyy/MM/dd");
        const end_date = getLastDate(end, true).Format("yyyy/MM/dd");
        this.defaultWeek.start_date = start_date;
        this.defaultWeek.end_date = end_date;

        summaryTypes.forEach(item => {
          if (item.value == groupTypeEnum.WEEK) {
            item.date = [start_date, end_date];
          } else {
            item.date = "";
          }
        });
      }
    },
    monthFormatText: {
      get() {
        const { start_date, end_date } = this.defaultMonth;
        if (start_date && end_date) {
          return new Date(start_date).Format("yyyy/MM");
        }
        return "";
      },
      set(d) {
        if (!d) return;
        const next_month = d.getMonth() + 1;
        d.setDate(1);
        const start_date = d.Format("yyyy/MM/dd");
        const end_date_obj = d;

        end_date_obj.setMonth(next_month);
        end_date_obj.setDate(0);
        const end_date = getLastDate(end_date_obj, true).Format("yyyy/MM/dd");
        this.defaultMonth.end_date = end_date;
        this.defaultMonth.start_date = start_date;

        summaryTypes.forEach(item => {
          if (item.value == groupTypeEnum.MONTH) {
            item.date = [start_date, end_date];
          } else {
            item.date = "";
          }
        });
      }
    },
    yearFormatText: {
      get() {
        const { start_date, end_date } = this.defaultYear;
        if (start_date && end_date) {
          return new Date(start_date).Format("yyyy");
        }
        return "";
      },
      set(d) {
        if (!d) return;
        const val = new Date(
          Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
        );
        const curren_end_day = new Date(Date.UTC(val.getUTCFullYear(), 11, 31));
        const curren_start_day = new Date(Date.UTC(val.getUTCFullYear(), 0, 1));
        const start_date = curren_start_day.Format("yyyy/MM/dd");
        const end_date = getLastDate(curren_end_day, true).Format("yyyy/MM/dd");

        this.defaultYear.end_date = end_date;
        this.defaultYear.start_date = start_date;
        summaryTypes.forEach(item => {
          if (item.value == groupTypeEnum.YEAR) {
            item.date = [start_date, end_date];
          } else {
            item.date = "";
          }
        });
      }
    },
    selfFormatText: {
      get() {
        if (this.selfSetDate.start_date && this.selfSetDate.end_date)
          return `${this.selfSetDate.start_date}-${this.selfSetDate.end_date}`;
        return "";
      },
      set(date_arr) {
        if (
          Array.isArray(date_arr) &&
          date_arr.length == 2 &&
          verify.isDate(date_arr[0])
        ) {
          const start_date = date_arr[0].Format("yyyy/MM/dd");
          const end_date = getLastDate(date_arr[1], true).Format("yyyy/MM/dd");
          this.selfSetDate.start_date = start_date;
          this.selfSetDate.end_date = end_date;

          summaryTypes.forEach(item => {
            if (item.value == "999") {
              item.date = [start_date, end_date];
              item.isActive = true;
              this.summaryType = "999";
              this.showDefaultSelfText = false;
            } else {
              item.date = "";
            }
          });
        }
      }
    },
    summaryDate() {
      const type = this.$store.state.webModule.dateSummaryMap;
      return type ? type.date : null;
    },
    summaryType: {
      get() {
        const type = this.$store.state.webModule.dateSummaryMap;
        return type ? type.value : null;
      },
      set(v) {
        this.$store.commit("UPDATE_DATA_SUMMARY_TYPE", summaryDateTypesMap[v]);
      }
    }
  },
  watch: {
    summaryTypes: {
      handler() {
        this.$store.commit(
          "UPDATE_DATA_SUMMARY_TYPE",
          summaryDateTypesMap[this.summaryType]
        );
      },
      deep: true,
      immediate: true
    },
    summaryType: {
      // 日期tab change
      handler(val) {
        if (!val) return;
        if (val != groupTypeEnum.WEEK) this.showDefaultWeekText = true;
        if (val != groupTypeEnum.MONTH) this.showDefaultMonthText = true;
        if (val != groupTypeEnum.YEAR) this.showDefaultYearText = true;
        if (val != "999") this.showDefaultSelfText = true;

        // 清空日期控件里的选中日期
        this.defaultWeek.start_date = "";
        this.defaultWeek.end_date = "";
        this.defaultMonth.start_date = "";
        this.defaultMonth.end_date = "";
        this.defaultYear.start_date = "";
        this.defaultYear.end_date = "";

        // 重置暴露到其他组件的默认日期
        this.resetDate();
      },
      immediate: true
    }
  },
  methods: {
    resetDate() {
      summaryTypes.forEach(item => {
        // 设置input和button的权重标识
        item.isActive = false;
        if (this.summaryType == item.value) {
          item.isActive = true;
        }
        // 设置默认日期
        if (item.value == groupTypeEnum.WEEK) {
          const currentWeekFirst = getCurrentWeekFirst().Format("yyyy/MM/dd");
          const currentWeekLast = getCurrentWeekLast(true).Format("yyyy/MM/dd");
          item.date = [currentWeekFirst, currentWeekLast];
        } else if (item.value == groupTypeEnum.MONTH) {
          const currentMonthFirst = getCurrentMonthFirst().Format("yyyy/MM/dd");
          const currentMonthLast = getCurrentMonthLast(true).Format(
            "yyyy/MM/dd"
          );
          item.date = [currentMonthFirst, currentMonthLast];
        } else if (item.value == groupTypeEnum.YEAR) {
          const currentYearFirst = getCurrentYearFirst().Format("yyyy/MM/dd");
          const currentYearLast = getCurrentYearLast(true).Format("yyyy/MM/dd");
          item.date = [currentYearFirst, currentYearLast];
        } else if (item.value == "999") {
          // tab切换时清空选中的值
          if (this.summaryType != "999") {
            this.selfSetDate.start_date = "";
            this.selfSetDate.end_date = "";
          } else if (this.selfSetDate.start_date && this.selfSetDate.end_date) {
            item.date = [
              this.selfSetDate.start_date,
              this.selfSetDate.end_date
            ];
          }
        } else {
          item.date = "";
        }
      });
    },
    weekChange(date) {
      summaryTypes.forEach(item => {
        if (item.value == groupTypeEnum.WEEK && date) {
          this.showDefaultWeekText = false;
          this.showDefaultMonthText = true;
          this.showDefaultYearText = true;
          this.showDefaultSelfText = true;
        }
      });
    },
    monthChange(date) {
      summaryTypes.forEach(item => {
        if (item.value == groupTypeEnum.MONTH && date) {
          this.showDefaultWeekText = true;
          this.showDefaultMonthText = false;
          this.showDefaultYearText = true;
          this.showDefaultSelfText = true;
        }
      });
    },
    yearChange(date) {
      summaryTypes.forEach(item => {
        if (item.value == groupTypeEnum.YEAR && date) {
          this.showDefaultWeekText = true;
          this.showDefaultMonthText = true;
          this.showDefaultYearText = false;
          this.showDefaultSelfText = true;
        }
      });
    },
    selfSelectChange() {
      let val = "";
      const date = this.selfFormatText;
      if (typeof date == "string") {
        val = date.split("-");
      }

      summaryTypes.forEach(item => {
        if (item.value == "999" && Array.isArray(val) && val.length == 2) {
          this.showDefaultWeekText = true;
          this.showDefaultMonthText = true;
          this.showDefaultYearText = true;
          this.showDefaultSelfText = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.summary-type-select {
  .type-name {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 34px;
    right: 0;
    left: 0;
    line-height: 34px;
  }
  .input-can-visible {
    z-index: 2 !important;
  }
  .icon-size {
    font-weight: normal;
  }
  .self-select-left-positon__not-date {
    width: 100%;
  }
  .summary-type-select.el-radio-group {
    vertical-align: middle;
    .el-radio-button:not(:last-child) {
      margin-right: -1px;
      width: 130px;
    }
    .el-input__inner {
      padding: 0;
    }
    .el-input__icon {
      display: none;
    }
    .date-picker {
      z-index: 0;
      opacity: 0;
      width: 130px;
      height: 32px;
    }
    .date-picker-datarange {
      width: 209px;
      height: 32px;
    }
    .el-radio-button__inner {
      border-radius: 0;
      color: #5080eb;
      border: 1px solid #5080eb;
      font-size: 14px;
      padding: 0;
    }
    .is-active .el-radio-button__inner {
      color: #fff;
    }
    .el-radio-button:first-child .el-radio-button__inner {
      border-radius: 12px 0 0 12px;
    }
    .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 0 12px 12px 0;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #5080eb;
    }
  }
}
</style>
