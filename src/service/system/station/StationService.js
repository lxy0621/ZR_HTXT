import * as station from '@/net/http/modules/station';

/**
 * 油气站管理
 */
export class StationService {
  constructor() {
  }

  /**
   * 油站列表
   */
  pagingStation(params) {
    return new Promise((resolve, reject) => {
      try {
        station.pagingStation(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 油站下拉框
   *
   */
  selectStations() {
    return new Promise((resolve, reject) => {
      try {
        station.selectStations().then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
}
