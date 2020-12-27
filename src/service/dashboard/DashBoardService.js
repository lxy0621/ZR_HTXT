import * as dashboard from "@/net/http/modules/dashboard";

export class DashBoardService {
	constructor() {}

	/**
	 * 查询所有油站信息
	 */
	getAllStation() {
		return new Promise((resolve, reject) => {
			try {
				dashboard.getAllStation().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	
	/**
	 * 仪表盘顶部数据
	 */
	topData() {
		return new Promise((resolve, reject) => {
			try {
				dashboard.topData().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}



  // 仪表盘下面echarts数据
  getEchertData(data){
    return new Promise((resolve,reject)=>{
      try{
        dashboard.getEchertData(data).then((res)=>{
          resolve(res.data);
        });
      } catch(error){
        reject(error);
      }
    });
  }




};























