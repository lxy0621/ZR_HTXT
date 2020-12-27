import * as product from "@/net/http/modules/mallProduct";

/**
 * 商品
 */
export class ProductService {
  constructor() {
  }

  /**
   * 分页查询商品
   */
  pagingProducts(param) {
    return new Promise((resolve, reject) => {
      try {
        product.pagingProducts(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加商品
   */
  createProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        product.createProduct(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改商品
   */
  updateProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        product.updateProduct(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据ID查询商品
   */
  getProductById(productId) {
    return new Promise((resolve, reject) => {
      try {
        product.getProductById(productId).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获取商品分类
   */
  getCategorySelect() {
    return new Promise((resolve, reject) => {
      try {
        product.getCategorySelect().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 上架商品
   */
  onShelf(productId) {
    return new Promise((resolve, reject) => {
      try {
        product.onShelf(productId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 下架商品
   */
  offShelf(productId) {
    return new Promise((resolve, reject) => {
      try {
        product.offShelf(productId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
