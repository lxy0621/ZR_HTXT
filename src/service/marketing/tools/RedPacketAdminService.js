import * as redPacket from "@/net/http/modules/redPacket";

/**
 * 红包管理服务
 */
export class RedPacketAdminService {
  constructor() {
  }

  /**
   * 红包批次详情
   */
  getRpBatch(batchId) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.getRpBatch(batchId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包批次列表查询
   */
  pagingRpBatches(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.pagingRpBatches(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包状态统计查询
   */
  groupByRpBatchState(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.groupByRpBatchState(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 新建红包批次
   */
  createRpBatch(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.createRpBatch(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 编辑红包批次
   */
  updateRpBatch(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.updateRpBatch(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包批次状态修改
   */
  updateRpBatchState(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.updateRpBatchState(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteRpBatch(batchId) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.deleteRpBatch(batchId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 卡券批次导出为Excel文件
   */
  exportRpBatch2Excel(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.exportRpBatch2Excel(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包批次统计查询
   */
  rpBatchStats(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.rpBatchStats(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包图表统计查询
   */
  redPacketStats(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.redPacketStats(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包实体数据查询
   */
  pagingRedPackages(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.pagingRedPackages(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包批次状态查询枚举
   */
  getRpBatchQueryState() {
    return new Promise((resolve, reject) => {
      try {
        redPacket.getRpBatchQueryState().then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 红包批次列表查询（活动用）
   */
  rpBatchList(param) {
    return new Promise((resolve, reject) => {
      try {
        redPacket.rpBatchList(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
