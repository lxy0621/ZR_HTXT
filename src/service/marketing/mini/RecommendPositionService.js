import * as position from "@/net/http/modules/miniPosition";

/**
 * 小程序推荐位
 */
export class RecommendPositionService {
  constructor() {
  }

  /**
   * 分页查询推荐位
   */
  pagingRecommendPositions(param) {
      return new Promise((resolve, reject) => {
        try {
          position.pagingRecommendPositions(param).then(function (res) {
            resolve(res.data);
          });
        } catch (error) {
          reject(error);
        }
      });
  }

  /**
   * 添加推荐位
   * @param param
   */
  createRecommendPosition(param) {
    return new Promise((resolve, reject) => {
      try {
        position.createRecommendPosition(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改推荐位
   * @param param
   */
  updateRecommendPosition(param) {
    return new Promise((resolve, reject) => {
      try {
        position.updateRecommendPosition(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除推荐位
   */
  deleteRecommendPositions(param) {
    return new Promise((resolve, reject) => {
      try {
        position.deleteRecommendPositions(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 启用推荐位
   */
  enableRecommendPosition(recommendPositionId) {
    return new Promise((resolve, reject) => {
      try {
        position.enableRecommendPosition(recommendPositionId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 停用推荐位
   */
  disableRecommendPosition(recommendPositionId) {
    return new Promise((resolve, reject) => {
      try {
        position.disableRecommendPosition(recommendPositionId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获取小程序APP
   */
  getMiniAppSelect() {
    return new Promise((resolve, reject) => {
      try {
        position.getMiniAppSelect().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
