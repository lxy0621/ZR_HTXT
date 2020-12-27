import * as member from "@/net/http/modules/member";

/**
 * 会员
 */
export class MemberService {
	constructor() {}

	/**
	 * 分页查询
	 */
	pagingMembers(param) {
		return new Promise((resolve, reject) => {
			try {
				member.pagingMembers(param).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}


	/**
	 * 选项卡分组数据查询
	 */
	findMemberGroups(data) {
		return new Promise((resolve, reject) => {
			try {
				member.findMemberGroups(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

  /**
   * 查询会员详细数据
   */
  getMemberInfoByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.getMemberInfoByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询会员微信数据
   */
  getMemberWechatByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.getMemberWechatByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改会员信息
   * @param data
   * @returns {Promise<unknown>}
   */
  updateMember(data) {
    return new Promise((resolve, reject) => {
      try {
        member.updateMember(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

	/**
	 * 查询会员卡数据
	 */
	pageCardsByMemberId(data) {
		return new Promise((resolve, reject) => {
			try {
				member.pageCardsByMemberId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 查询车辆绑定数据
	 */
	pageBoundCarsByMemberId(data) {
		return new Promise((resolve, reject) => {
			try {
				member.pageBoundCarsByMemberId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 查询消费记录
	 */
	pageExpenseOrdersByMemberId(data) {
		return new Promise((resolve, reject) => {
			try {
				member.pageExpenseOrdersByMemberId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 查询充值记录
	 */
	pageRechargeOrdersByMemberId(data) {
		return new Promise((resolve, reject) => {
			try {
				member.pageRechargeOrdersByMemberId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

  /**
   * 查询退款记录
   */
  pageRefundOrdersByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.pageRefundOrdersByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询撤销记录
   */
  pageRepealOrdersByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.pageRepealOrdersByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询人工扣款记录
   */
  pageRebateOrdersByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.pageRebateOrdersByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

	/**
	 * 查询积分记录
	 */
	pageScoreLogsByMemberId(data) {
		return new Promise((resolve, reject) => {
			try {
				member.pageScoreLogsByMemberId(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

  /**
   * 绑定车辆
   */
  bindCar(param) {
    return new Promise((resolve, reject) => {
      try {
        member.bindCar(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 解绑车辆
   */
  unbindCar(param) {
    return new Promise((resolve, reject) => {
      try {
        member.unbindCar(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询会员卡详细数据
   */
  getMemberCardsByMemberId(data) {
    return new Promise((resolve, reject) => {
      try {
        member.getMemberCardsByMemberId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 人工充值
   */
  rechargeByManual(param) {
    return new Promise((resolve, reject) => {
      try {
        member.rechargeByManual(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获得卡信息
   */
  getCardByCardId(param) {
    return new Promise((resolve, reject) => {
      try {
        member.getCardByCardId(param).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 人工扣款
   */
  rebateByManual(param) {
    return new Promise((resolve, reject) => {
      try {
        member.rebateByManual(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获得全部标签
   */
  getTagsSelect(param) {
    return new Promise((resolve, reject) => {
      try {
        member.getTagsSelect(param).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 打印会员二维码
   */
  printMemberQRCode(memberId) {
    return new Promise((resolve, reject) => {
      try {
        member.printMemberQRCode(memberId).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
