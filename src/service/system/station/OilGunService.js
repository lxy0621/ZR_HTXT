import * as oilGun from "@/net/http/modules/oilGun";

/**
 * 油枪
 */
export class OilGunService {
	constructor() {}

	/**
	 * 分页查询油枪
	 */
	pagingOilGuns(param) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.pagingOilGuns(param).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 保存油枪
	 */
	createOilGun(data) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.createOilGun(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 修改油枪
	 */
	updateOilGun(data) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.updateOilGun(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 删除油枪
	 */
	deleteOilGuns(data) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.deleteOilGuns(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 据油枪ID查询油枪
	 */
	getOilGunById(data) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.getOilGunById(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 油品类型列表
	 */
	productSkuList() {
		return new Promise((resolve, reject) => {
			try {
				oilGun.productSkuList().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 油站列表
	 */
	stationList() {
		return new Promise((resolve, reject) => {
			try {
				oilGun.stationList().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 油机列表
	 */
	machineList() {
		return new Promise((resolve, reject) => {
			try {
				oilGun.machineList().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 油站下油机列表
	 */
	getMachineListByStationId(data) {
		return new Promise((resolve, reject) => {
			try {
				oilGun.getMachineListByStationId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

  /**
   * 油站下油枪列表
   */
  selectGunsByStationIds(data) {
    return new Promise((resolve, reject) => {
      try {
        oilGun.selectGunsByStationIds(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 油站下员工列表
   */
  getEmployeeListByStationId(data) {
    return new Promise((resolve, reject) => {
      try {
        oilGun.getEmployeeListByStationId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
