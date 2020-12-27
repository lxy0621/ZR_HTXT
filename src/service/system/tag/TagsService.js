import * as tags from '@/net/http/modules/tags';

/**
 * 充值订单
 */
export class TagsService {
	constructor() {}

	/**
	 * 标签列表
	 */
	pagingTags(params) {
		return new Promise((resolve, reject) => {
			try {
				tags.pagingTags(params).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签组列表
	 */
	batchDelete(params) {
		return new Promise((resolve, reject) => {
			try {
				tags.batchDelete(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签新增
	 */
	saveTags(params) {
		return new Promise((resolve, reject) => {
			try {
				tags.saveTags(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签修改
	 */
	updateTags(params) {
		return new Promise((resolve, reject) => {
			try {
				tags.updateTags(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
}
