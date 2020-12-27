/* jshint esversion: 6 */
import { baseUrl, accessUrl } from '@/config/net';

export default {
    method: 'get',
    // 基础url前缀
    baseUrl: baseUrl,
    accessUrl: accessUrl,
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 100000,
    // 携带凭证
    withCredentials: true,
    // 返回数据类型
    responseType: 'json'
}
