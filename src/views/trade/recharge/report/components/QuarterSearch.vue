<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <!-- <search-container-item>
      <el-select v-model="value" placeholder="全部油站/部门" size="small" style="width: 100%" multiple>
        <el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item> -->
    <!--
    <search-container-item style="text-align: center">
      <el-row :gutter="5">
        <el-col :span="9">
          <el-select v-model="queryParams.moneyType" placeholder="请选择" size="small">
            <el-option label="充值总金额" value='1'></el-option>
            <el-option label="赠送总金额" value='2'></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小金额" size="small" :controls="false"
                           :precision="2" style="width: 100%;">
          </el-input-number>
        </el-col>
        <el-col :span="1" style="text-align: center">-</el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大金额" size="small" :controls="false"
                           :precision="2" style="width: 100%;">
          </el-input-number>
        </el-col>
      </el-row>
    </search-container-item>
    -->
    <!-- <search-container-item>
      <el-select placeholder="会员卡类型" size="small" style="width: 100%">
        <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item> -->
    <search-container-item style="width:560px;">
      <el-row :gutter="5">
        <el-col :span="11">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-date-picker v-model="queryParams.rechargeDateStart" type="year" value-format="yyyy-MM-dd"
                              placeholder="选择开始年" size="small" style="width: 100%"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-select v-model="queryParams.rechargeDateSta" placeholder="选择开始季度" size="small"
                         @change="changeQuarterStart" style="width: 100%">
                <el-option label="第一季度" value='1'></el-option>
                <el-option label="第二季度" value='2'></el-option>
                <el-option label="第三季度" value='3'></el-option>
                <el-option label="第四季度" value='4'></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" align="center">至</el-col>
        <el-col :span="11">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-date-picker v-model="queryParams.rechargeDateEnd" type="year" value-format="yyyy-MM-dd"
                              placeholder="选择结束年" size="small" style="width: 100%"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-select v-model="queryParams.rechargeDateEn" placeholder="选择结束季度" size="small"
                         @change="changeQuarterEnd" style="width: 100%">
                <el-option label="第一季度" value='1'></el-option>
                <el-option label="第二季度" value='2'></el-option>
                <el-option label="第三季度" value='3'></el-option>
                <el-option label="第四季度" value='4'></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';

  const getDefaultQueryParams = () => ({
    stations: null, // 油站
    moneyType: '1', // 金额类型

    rechargeDateStart: null,
    rechargeDateEnd: null,
    rechargeDateSta: '',
    rechargeDateEn: '',
    minChargeMoney: undefined,
    maxChargeMoney: undefined,
  });

  export default {
    name: 'QuarterSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        value: '',
        value1: '',
      };
    },
    methods: {
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.filterTags = [];
        this.$emit('reset', queryParams);
        this.handleDataSearch();
      },
      // 季度选择改变事件 - start
      changeQuarterStart() {
        if (this.queryParams.rechargeDateStart == null) {
          this.$message({
            message: '请先选择年份',
            type: 'warning'
          });
          this.queryParams.rechargeDateSta = '';
        }
      },
      // 季度选择改变事件 - end
      changeQuarterEnd() {
        if (this.queryParams.rechargeDateEnd == null) {
          this.$message({
            message: '请先选择年份',
            type: 'warning'
          });
          this.queryParams.rechargeDateEn = '';
        }
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
