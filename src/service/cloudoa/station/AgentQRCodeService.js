import * as agentOrder from "@/net/http/modules/agentOrder";

/**
 * 代记账二维码配置
 */
export class AgentQRCodeService {
  constructor() {
  }

  /**
   * 分页查询代记账二维码
   */
  pagingAgentQRCodes(param) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.pagingAgentQRCodes(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
