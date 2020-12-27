import * as device from '@/net/http/modules/device';
import * as expenseReport from "@/net/http/modules/expenseReport";

/**
 * pos设备
 */
export class DeviceService {
	constructor() {}

	/**
	 * 设备列表
	 */
	pagingDevices(params) {
		return new Promise((resolve, reject) => {
			try {
        device.pagingDevices(params).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 添加设备
	 */
	createDevice(params) {
		return new Promise((resolve, reject) => {
			try {
        device.createDevice(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 修改设备
	 */
	updateDevice(params) {
		return new Promise((resolve, reject) => {
			try {
				device.updateDevice(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 删除设备
   */
  deleteDevices(params) {
    return new Promise((resolve, reject) => {
      try {
        device.deleteDevices(params).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

	/**
	 * 启用
	 */
	enableDevice(params) {
		return new Promise((resolve, reject) => {
			try {
				device.enableDevice(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 停用
	 */
	disableDevice(params) {
		return new Promise((resolve, reject) => {
			try {
				device.disableDevice(params).then(function(res) {
					resolve(res);
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
				expenseReport.queryAllStations().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 设备状态列表
   */
  pagingDeviceStatus(params) {
    return new Promise((resolve, reject) => {
      try {
        device.pagingDeviceStatus(params).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

}
