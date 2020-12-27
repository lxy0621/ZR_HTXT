import * as card from "@/net/http/modules/bindCard";

/**
 * 会员卡
 */
export class BindCardService {
	constructor() {}

	/**
	 * 会员卡信息
	 */
	memberCardList(param) {
		return new Promise((resolve, reject) => {
			try {
				card.memberCardList(param).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 会员卡选项卡信息
	 */
	memberCardGroupData(param) {
		return new Promise((resolve, reject) => {
			try {
				card.memberCardGroupData(param).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

}
