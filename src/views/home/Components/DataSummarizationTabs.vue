<template>
  <div class="data-summarization-tabs">
    <div class="index_top clearfix">
      <!--
      <div class="user_info index_border">
        <div class="block user_pic">
          <el-avatar :size="80" :src="circleUrl"></el-avatar>
        </div>

        <div class="user_info_text">
          <div>admin</div>
          <div>13512345678</div>
          <div>所在部门：***部门</div>
          <div>当前角色：超级管理员</div>
          <div>当前登录IP：127.0.0.1</div>
          <div>上次登录时间：2020-04-05 12:20</div>
        </div>
      </div>
      -->
      <el-card class="index_card index_border">
        <!--
        <div class="index_card_select">
          <el-select v-model="quaryParams.station" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        -->
        <div class="homepage-data-summarization__all-panel">
          <dashboard-data-block
            title="充值总金额"
            :title-style="{ color: '#F54747' }"
            :content="convert2Million(manageData.rechargemoney)"
            :content-style="{ color: '#F54747' }"
            :footer="'总订单数：' + manageData.rechargecnt + '单'"
          />
          <div class="green-line"></div>
          <dashboard-data-block
            title="消费总金额"
            :title-style="{ color: '#34C3A3' }"
            :content="convert2Million(manageData.expensemoney)"
            :content-style="{ color: '#34C3A3' }"
            :footer="'总订单数：' + manageData.expensecnt + '单'"
          />
          <div class="green-line"></div>
          <dashboard-data-block
            title="账户余额"
            :title-style="{ color: '#666666' }"
            :content="convert2Million(manageData.totalbalance)"
            :content-style="{ color: '#1e9fff' }"
            :footer="'主账户：' + convert2Million(manageData.cashbalance) + '万'"
            :footer2="'副账户：' + convert2Million(manageData.giftbalance) + '万'"
          />
          <div class="green-line"></div>
          <dashboard-data-block
            title="会员总数"
            :title-style="{ color: '#666666' }"
            :contentAppend="'人'"
            :contentPrepend="''"
            :content="manageData.alltotal"
            :content-style="{ color: '#f00' }"
            :footer="'充值会员：' + manageData.rechargetotal + '人'"
            :footer2="'未充值会员：' + manageData.notrechargetotal + '人'"
          />
        </div>
      </el-card>
    </div>
    <!--  -->
    <div style="text-align:right; padding:40px 0 25px 0;">
      <slot name="append"></slot>
    </div>
    <el-card>
      <div slot="header" class="clearfix" align="center">
        <span>会员充值总额走势图</span>
      </div>
      <v-chart-line
        :idata="chartData"
        :settings="chartSettings"
        :tooltip="chartTooltip"
      ></v-chart-line>
    </el-card>
    <el-card style="margin-top: 10px;">
      <div slot="header" class="clearfix" align="center">
        <span>会员消费总额走势图</span>
      </div>
      <v-chart-line
        :idata="chartData2"
        :settings="chartSettings"
        :tooltip="chartTooltip2"
      ></v-chart-line>
    </el-card>
    <el-card style="margin-top: 10px;">
      <div slot="header" class="clearfix" align="center">
        <span>新增会员走势图</span>
      </div>
      <v-chart-line
        :idata="chartData3"
        :settings="chartSettings"
        :tooltip="chartTooltipNewMen"
      ></v-chart-line>
    </el-card>
    <el-card style="margin-top: 10px;">
      <div slot="header" class="clearfix" align="center">
        <span>各渠道新增会员走势图</span>
      </div>
      <v-chart-line
        :idata="chartData4"
        :settings="chartSettings"
        :tooltip="chartTooltipChannel"
      ></v-chart-line>
    </el-card>
  </div>
</template>

<script>
  import DashboardDataBlock from './DashboardDataBlock';
  import VChartLine from './VChartLine';
  import {DashBoardService} from '@/service/dashboard/DashBoardService.js';
  import axios from 'axios';

  export default {
    name: 'data-summarization-tabs',
    components: {
      DashboardDataBlock,
      VChartLine
    },
    data() {
      let _this = this;

      // 所有的英汉对应 - 如果有重复的只能单独写了
      this.chartSettings = {
        labelMap: {
          xiaoFeiZongJinE: '消费总金额',
          jinE92: '92#消费总金额',
          jinE95: '95#消费总金额',
          jinE0: '0#消费总金额',
          jinEcng: 'CNG消费总金额',
          qianshu: '充值总金额',
          newMember: '新增会员',
          xiaoChengXu: '小程序新增会员',
          gongZhongHao: '公众号新增会员'
        }
      };
      // 会员充值总额走势图
      this.chartTooltip = {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          let indexData = _this.chartData.rows[params.dataIndex];
          if (_this.type == 5) {
            return params.name + '  ' + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }
          if (_this.type == 4) {
            return params.name + '  ' + indexData.time + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }
          if (_this.type == 3) {
            return params.name + '  ' + indexData.time + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }
          if (_this.type == 2) {
            return params.name + '  ' + indexData.time + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }
          if (_this.type == 1) {
            return params.name + '  ' + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }
          if (_this.type == 10) {
            return params.name + '  ' + '<br/>' + '充值总额：' + indexData.qianshu + '/' + indexData.danzi + '单';
          }

        },
        axisPointer: {
          animation: false
        }
      };
      // 会员消费总额走势图
      this.chartTooltip2 = {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var indexData = _this.chartData2.rows[params.dataIndex];
          if (_this.type == 5) {
            indexData.time = ''
          }
          if (_this.type == 10) {
            indexData.time = ''
          }
          if (_this.type == 1) {
            indexData.time = ''
          }
          return (
            params.name +
            '  ' +
            indexData.time +
            '<br/><table>' +
            '<tr><td width="80">消费总额：' +
            indexData.xiaoFeiZongJinE +
            '</td><td>　　' +
            indexData.danzi +
            '单</td></tr>' +
            '</table>'
          );
        },
        axisPointer: {
          animation: false
        }
      };

      // 新增会员走势图
      this.chartTooltipNewMen = {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          let indexData = _this.chartData3.rows[params.dataIndex];
          if (_this.type == 5) {
            indexData.time = ''
          }
          if (_this.type == 1) {
            indexData.time = ''
          }
          if (_this.type == 10) {
            indexData.time = ''
          }
          return params.name + '  ' + indexData.time + '<br/>' + '新增会员：' + indexData.newMember + '人';
        },
        axisPointer: {
          animation: false
        }
      };
      //  各渠道新增会员走势图
      this.chartTooltipChannel = {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          let indexData = _this.chartData4.rows[params.dataIndex];
          if (_this.type == 5) {
            indexData.time = ''
          }
          if (_this.type == 1) {
            indexData.time = ''
          }
          if (_this.type == 10) {
            indexData.time = ''
          }
          return params.name + '  ' + indexData.time + '<br/>' + '小程序新增会员：' + indexData.xiaoChengXu + '人<br/>' + '公众号新增会员：' + indexData.gongZhongHao + '人';
        },
        axisPointer: {
          animation: false
        }
      };
      return {
        // 会员充值总额走势图
        chartData: {
          columns: ['name', 'qianshu'],
          rows: []
        },
        // 会员消费总额走势图
        chartData2: {
          columns: ['name', 'xiaoFeiZongJinE'],
          rows: []
        },
        // 新增会员走势图
        chartData3: {
          columns: ['时间', 'newMember'],
          rows: []
        },
        // 各渠道新增会员走势图
        chartData4: {
          columns: ['name', 'xiaoChengXu', 'gongZhongHao'],
          rows: []
        },
        circleUrl: 'http://cenggel.com/wp-content/uploads/2019/08/20190805-1.png',
        options: [],
        manageData: {
          rechargemoney: '0.00', // 充值总金额
          rechargecnt: 0,// 充值总数
          expensemoney: '0.00', // 消费总金额
          expensecnt: 0, // 消费总单数
          totalbalance: '0.00', // 账户余额
          alltotal: '0', // 会员总数
          rechargetotal: 0, // 充值会员人数
          notrechargetotal: 0, // 未充值会员人数
          cashbalance: '0.00',// 主账户余额
          giftbalance: '0.00'// 副账户余额
        },
        quaryParams: {},
        tabType: 'manage', // manage, personal
        hasHomepagePersonalDataPermission: true,
        hasHomepageManageDataPermission: true,
        service: null,
        type: 5,
        arr: [],
      };
    },
    created: function () {
      let _this = this;
      this.Observer.$on("Datechange", (val) => {
        //前端按钮 1-日 2-周 3-月 4-季  5-年 10-自定义
        if (val == 1) {
          this.type = 5
        } else if (val == 2) {
          this.type = 4
        } else if (val == 3) {
          this.type = 3
        } else if (val == 4) {
          this.type = 2
        } else if (val == 5) {
          this.type = 1
        } else if (val.length == 2) {
          this.type = 10
          this.arr = val
        }
        // debugger
      })
    },
    computed: {
      isManage() {
        return this.tabType === 'manage';
      },
      isPersonal() {
        return this.tabType === 'personal';
      }
    },
    mounted() {
      this.service = new DashBoardService();
      if (this.hasHomepagePersonalDataPermission) {
        this.tabType = 'personal';
      }
      if (this.hasHomepageManageDataPermission) {
        this.tabType = 'manage';
      }
      this.getAllStation();
      this.topData();
      this.GetStatsTrend();
    },
    watch: {
      type(newVal, oldVal) {
        this.type = newVal
        if (this.type != 10) {
          this.GetStatsTrend()
        }
      },
      arr: {
        handler(val) {
          this.GetStatsTrend(val);
        },
        deep: true
      }
    },
    methods: {
      topData() {
        this.service.topData().then(response => {
          this.manageData.rechargemoney = response.expense.money + response.balance.totalbalance; //充值总金额
          this.manageData.rechargecnt = response.recharge.cnt; //充值总订单数
          this.manageData.expensemoney = response.expense.money; //消费总金额
          this.manageData.expensecnt = response.expense.cnt; //消费总订单数
          this.manageData.totalbalance = response.balance.totalbalance; //账户余额
          this.manageData.cashbalance = response.balance.cashbalance; //主账户余额
          this.manageData.giftbalance = response.balance.giftbalance; //副账户余额
          this.manageData.alltotal = response.member.alltotal;//会员总数
          this.manageData.rechargetotal = response.member.rechargetotal;//充值会员
          this.manageData.notrechargetotal = response.member.alltotal - response.member.rechargetotal;//未充值会员
        });
      },
      getAllStation() {
        this.service.getAllStation().then(response => {
          this.options = response;
        });
      },

      changeTabType(type) {
        this.tabType = type;
        this.$emit('change', type);
      },

      convert2Million(num) {
        const number = num || 0;
        return (number / 10000).toFixed(2);
      },

      //请求后台图表数据
      async GetStatsTrend(val) {

        // try {
        //   let res = await this.GetStatsTrenddata()
        //   debugger
        // }catch(err){
        //   // debugger
        // }
        let data
        if (val) {
          data = {
            "type": this.type,
            "startDate": val[0],
            "endDate": val[1]
          }
        } else {
          data = {
            "type": this.type,
          }
        }
        this.service.getEchertData(data).then(response => {
          //充值总金额，是个对象
          let memberRechargeTrend = response.memberRechargeTrend         //充值总金额
          let memberConsumeTrend = response.memberConsumeTrend             //消费总金额
          let memberAddTrend = response.memberAddTrend                      //新增会员，公众号、小程序
          //图表数据

          //充值总金额
          let metricData = memberRechargeTrend.metricData

          // debugger
          let str = ''
          if (this.type == 4) {
            str = '周'
          } else if (this.type == 5) {
            str = '日'
          } else if (this.type == 3) {
            str = '月'
          } else if (this.type == 2) {
            str = ''
          } else if (this.type == 1) {
            str = '年'
          } else if (this.type == 10) {
            str = '日'
          }
          let arr = []
          metricData.map((item, index) => {
            arr.push({
              name: item.keyName + str,
              qianshu: item.statsSum,
              danzi: item.statsCount,
              time: item.keyArea
            })
          })
          this.chartData.rows = arr

          //消费总金额
          let arr1 = []
          let arr2 = []
          let arr3 = []
          let arr4 = []
          let arr5 = []
          for (let i = 0; i < memberConsumeTrend.length; i++) {
            if (memberConsumeTrend[i].trendName == '消费总金额') {
              memberConsumeTrend[i].metricData.map((item, index) => {
                arr1.push(
                  {
                    name: item.keyName + str,
                    danzi: item.statsCount,
                    xiaoFeiZongJinE: item.statsSum,
                    time: item.keyArea
                  }
                )
              })
            }
            // else if(memberConsumeTrend[i].trendName == 'CNG') {
            //     memberConsumeTrend[i].metricData.map((item, index) => {
            //         arr2.push(
            //             {
            //                 name: item.keyName + str,
            //                 danzicng: item.statsCount,
            //                 jinEcng: item.statsSum,
            //                 time: item.keyArea
            //             }
            //         )
            //     })
            // }
            // }else if(memberConsumeTrend[i].trendName == '92号汽油'){
            //     memberConsumeTrend[i].metricData.map((item,index)=>{
            //         arr3.push(
            //             {
            //                 name: item.keyName + str,
            //                 danzi92: item.statsCount,
            //                 jinE92 : item.statsSum,
            //                 time : item.keyArea
            //             }
            //         )
            //     })
            // }else if(memberConsumeTrend[i].trendName == '95号汽油'){
            //     memberConsumeTrend[i].metricData.map((item,index)=>{
            //         arr4.push(
            //             {
            //                 name: item.keyName + str,
            //                 danzi95: item.statsCount,
            //                 jinE95 : item.statsSum,
            //                 time : item.keyArea
            //             }
            //         )
            //     })
            // }else if(memberConsumeTrend[i].trendName == '0号柴油'){
            //     memberConsumeTrend[i].metricData.map((item,index)=>{
            //         arr5.push(
            //             {
            //                 name: item.keyName + str,
            //                 danzi0: item.statsCount,
            //                 jinE0 : item.statsSum,
            //                 time : item.keyArea
            //             }
            //         )
            //     })
            // }
          }
          //合并到arr1当中
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].name || arr2[i].name || arr1[i].name == arr2[i].name) {
              arr1[i] = {...arr1[i], ...arr2[i]}
            }
            if (arr1[i].name || arr3[i].name || arr1[i].name == arr3[i].name) {
              arr1[i] = {...arr1[i], ...arr3[i]}
            }
            if (arr1[i].name || arr4[i].name || arr1[i].name == arr4[i].name) {
              arr1[i] = {...arr1[i], ...arr4[i]}
            }
            if (arr1[i].name || arr5[i].name || arr1[i].name == arr5[i].name) {
              arr1[i] = {...arr1[i], ...arr5[i]}
            }
          }
          //处理如果没有值的情况（undefined）
          for (let i = 0; i < arr1.length; i++) {
            if (!arr1[i].xiaoFeiZongJinE) {
              arr1[i].xiaoFeiZongJinE = 0
            }
            if (!arr1[i].jinE92) {
              arr1[i].jinE92 = 0
            }
            if (!arr1[i].jinE95) {
              arr1[i].jinE95 = 0
            }
            if (!arr1[i].jinE0) {
              arr1[i].jinE0 = 0
            }
            if (!arr1[i].jinEcng) {
              arr1[i].jinEcng = 0
            }
            if (!arr1[i].danzi) {
              arr1[i].danzi = 0
            }
            if (!arr1[i].danzi92) {
              arr1[i].danzi92 = 0
            }
            if (!arr1[i].danzi95) {
              arr1[i].danzi95 = 0
            }
            if (!arr1[i].danzi0) {
              arr1[i].danzi0 = 0
            }
            if (!arr1[i].danzicng) {
              arr1[i].danzicng = 0
            }

          }
          this.chartData2.rows = arr1

          //会员新增
          let memberchart = memberAddTrend[0]
          let arr6 = []
          // {时间: '2020.1周', newMember: 1393, time: '2020.6.30 - 2020.6.30'},
          memberchart.metricData.map((item, index) => {
            arr6.push({
              时间: item.keyName + str,
              newMember: item.statsCount,
              time: item.keyArea
            })
          })
          this.chartData3.rows = arr6

          //公众号小程序新增
          let Applets = memberAddTrend[1]                   // 小程序
          let officialAccount = memberAddTrend[2]                           //公众号
          // {name: '2020.1周', xiaoChengXu: 211, gongZhongHao: 11, time: '2020.6.30 - 2020.6.30'},
          for (let i in Applets.metricData) {
            // memberAddTrend[1].metricData[i][keyName] = name
            for (let j in Applets.metricData[i]) {
              if (j == 'keyName') {
                Applets.metricData[i]['name'] = Applets.metricData[i][j]                    //修改属性名为“title”
                delete Applets.metricData[i]['keyName']                                             //删除“name”
              }
              if (j == 'statsCount') {
                Applets.metricData[i]['xiaoChengXu'] = Applets.metricData[i][j]                    //修改属性名为“title”
                delete Applets.metricData[i]['statsCount']                                             //删除“name”
              }
              if (j == 'keyArea') {
                Applets.metricData[i]['time'] = Applets.metricData[i][j]                    //修改属性名为“title”
                delete Applets.metricData[i]['keyArea']                                             //删除“name”
              }
            }
          }
          for (let i in officialAccount.metricData) {
            // memberAddTrend[1].metricData[i][keyName] = name
            for (let j in officialAccount.metricData[i]) {
              if (j == 'keyName') {
                officialAccount.metricData[i]['name'] = officialAccount.metricData[i][j]                    //修改属性名为“title”
                delete officialAccount.metricData[i]['keyName']                                             //删除“name”
              }
              if (j == 'statsCount') {
                officialAccount.metricData[i]['gongZhongHao'] = officialAccount.metricData[i][j]                    //修改属性名为“title”
                delete officialAccount.metricData[i]['statsCount']                                             //删除“name”
              }
              if (j == 'keyArea') {
                officialAccount.metricData[i]['time'] = officialAccount.metricData[i][j]                    //修改属性名为“title”
                delete officialAccount.metricData[i]['keyArea']                                             //删除“name”
              }
            }
          }
          //合并
          for (let i = 0; i < Applets.metricData.length; i++) {
            if (Applets.metricData[i].name == officialAccount.metricData[i].name) {
              Applets.metricData[i] = {...Applets.metricData[i], ...officialAccount.metricData[i]}
            }
          }
          for (let i = 0; i < Applets.metricData.length; i++) {
            Applets.metricData[i].name = Applets.metricData[i].name + str
          }
          this.chartData4.rows = Applets.metricData
        })

      },
      GetStatsTrenddata() {
        return new Promise((resolve, reject) => {
          this.$axios.post('/dashboard/getStatsTrend', {
            "type": 5,
          }).then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        })
      },

    }
  };
</script>

<style lang="scss">
  .user_info {
    padding: 20px 0;
    float: right;
    width: 240px;

    .user_pic {
      text-align: center;
    }

    .user_pic img {
      height: 80px;
      width: 80px;
    }

    .user_info_text {
      text-align: center;

      div {
        font-size: 14px;
        color: #666;
        line-height: 26px;
      }
    }
  }

  .index_card {
    height: 200px;
  }

  .index_border {
    border: 1px solid #f1f1f1;
  }

  .index_margin {
    margin-bottom: 15px;
  }

  .index_card_select {
    padding: 10px;
  }

  .homepage-data-summarization__all-panel {
    padding-top: 25px;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    overflow: auto;

    .custom-data-block {
      margin: 0 5px;
    }

    .green-line {
      height: 58px;
      border: 1px solid rgb(236, 236, 236);
    }
  }

  .ve_line_title {
    text-align: center;
    font-size: 16px;
    color: #333;
    padding-top: 50px;
  }
</style>
