import * as productPrice from "@/net/http/modules/productPrice";

/**
 * 充值订单
 */
export class ProductPriceService {
  constructor() {}

  /**
   * 枚举列表
   */
  enumList(params) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.enumList(params).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

	/**
	 * 查询所有可用的加油站信息
	 */
	queryAllStations() {
		return new Promise((resolve, reject) => {
			try {
				productPrice.queryAllStations().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
	 * 查询所有的产品信息
	 */
	findAllProducts() {
		return new Promise((resolve, reject) => {
			try {
				productPrice.findAllProducts().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 查询所有油品 -- 根据产品ID
   */
  findProductSkuByProduct(productId) {
  	return new Promise((resolve, reject) => {
  		try {
  			productPrice.findProductSkuByProduct(productId).then(function(res) {
  				resolve(res.data);
  			});
  		} catch (error) {
  			reject(error);
  		}
  	})
  }

  /**
   * 分页查询
   */
  pageList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.pageList(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 删除
  deletePrice(id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.deletePrice(id).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 失效
  unUsing(id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.unUsing(id).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 生效
  usePrice(id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.usePrice(id).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 修改
  updData(data,id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.updData(data,id).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 保存
  saveData(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        productPrice.saveData(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
