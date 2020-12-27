import * as ticketAdmin from '@/net/http/modules/ticketAdmin';

/**
 * 小票机管理
 */
export class TicketService {
    constructor() {}

    /**
     * 小票机列表
     */
    ticketMachineList(params) {
            return new Promise((resolve, reject) => {
                try {
                    ticketAdmin.ticketMachineList(params).then(function(res) {
                        resolve(res.data);
                    });
                } catch (error) {
                    reject(error);
                }
            })
        }
        /**
         * 小票机编辑
         */
    editTicketMachine(data) {
            return new Promise((resolve, reject) => {
                try {
                    ticketAdmin.editTicketMachine(data).then(function(res) {
                        resolve(res);
                    });
                } catch (error) {
                    reject(error);
                }
            })
        }
        /**
         * 启用或禁用
         */
    enabled(data) {
            return new Promise((resolve, reject) => {
                try {
                    ticketAdmin.enabled(data).then(function(res) {
                        resolve(res);
                    });
                } catch (error) {
                    reject(error);
                }
            })
        }
        /**
         * 删除
         */
    machineDelete(id) {
            return new Promise((resolve, reject) => {
                try {
                    ticketAdmin.machineDelete(id).then(function(res) {
                        resolve(res);
                    });
                } catch (error) {
                    reject(error);
                }
            })
        }
        /**
         * 获取小票机查询枚举
         */
    getTicketPrinterQueryEnums() {
        return new Promise((resolve, reject) => {
            try {
                ticketAdmin.getTicketPrinterQueryEnums().then(function(res) {
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}