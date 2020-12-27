import * as tagGroups from '@/net/http/modules/tagGroups';

/**
 * 充值订单
 */
export class TagGroupsService {
	constructor() {}

	/**
	 * 标签组列表
	 */
	pagingTagGroups(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.pagingTagGroups(params).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签组删除
	 */
	batchDelete(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.batchDelete(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签组新增
	 */
	saveGroups(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.saveGroups(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 标签组修改
	 */
	updateTagGroups(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.updateTagGroups(params).then(function(res) {
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
	enable(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.enable(params).then(function(res) {
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
	disable(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.disable(params).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
	
	/**
	 * 所有有效的标签组
	 */
	findAllGroups(params) {
		return new Promise((resolve, reject) => {
			try {
				tagGroups.findAllGroups(params).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}
}
