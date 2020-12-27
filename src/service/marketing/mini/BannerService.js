import * as banner from "@/net/http/modules/miniBanner";

/**
 * 广告图服务
 */
export class BannerService {
  constructor() {
  }

  /**
   * 分页查询广告图
   */
  pagingBanners(param) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        banner.pagingBanners(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 创建广告图
   */
  createBanner(param) {
    return new Promise((resolve, reject) => {
      try {
        banner.createBanner(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改广告图
   */
  updateBanner(param) {
    return new Promise((resolve, reject) => {
      try {
        banner.updateBanner(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除广告图
   * @param param
   */
  deleteBanners(param) {
    return new Promise((resolve, reject) => {
      try {
        banner.deleteBanners(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 启用广告图
   */
  enableBanner(bannerId) {
    return new Promise((resolve, reject) => {
      try {
        banner.enableBanner(bannerId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 停用广告图
   */
  disableBanner(bannerId) {
    return new Promise((resolve, reject) => {
      try {
        banner.disableBanner(bannerId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
