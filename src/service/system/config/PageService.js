import * as page from "@/net/http/modules/page";

/**
 * 页面服务
 */
export class PageService {
  constructor() {
  }

  /**
   * 分页查询页面
   */
  pagingPages(param) {
    return new Promise((resolve, reject) => {
      try {
        page.pagingPages(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加页面
   */
  createPage(param) {
    return new Promise((resolve, reject) => {
      try {
        page.createPage(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改页面
   */
  updatePage(param) {
    return new Promise((resolve, reject) => {
      try {
        page.updatePage(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除页面
   */
  deletePages(param) {
    return new Promise((resolve, reject) => {
      try {
        page.deletePages(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
