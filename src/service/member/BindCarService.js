import * as bindcar from "@/net/http/modules/bindCar";

/**
 * 车辆绑定信息
 */
export class BindCarService {
	constructor() {}

	/**
	 * 分页查询
	 */
	bindCarList(param) {
		return new Promise((resolve, reject) => {
			try {
				bindcar.bindCarList(param).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 分页查询
	 */
	bindCarGroupData(param) {
		return new Promise((resolve, reject) => {
			try {
				bindcar.bindCarGroupData(param).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}
