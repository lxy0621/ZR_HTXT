/* jshint esversion: 6 */
/**
 * 网络相关的配置信息
 */

// 后台管理系统服务器地址 aiyou.xueda.cloud / test.xueda.cloud
let localBaseUrl = 'https://aiyou.xueda.cloud/aiyou-ent-admin';
// 前端访问地址
let localAccessUrl = '';

if (process.env.NODE_ENV == "production") {
    //生产环境的地址
    localBaseUrl = 'https://aiyou-v2.xueda.cloud/aiyou-ent-admin';
} else {
    localBaseUrl = 'https://aiyou-v2.xueda.cloud/aiyou-ent-admin';
}

if (process.env.NODE_ENV == "production") {
    //生产环境的地址
    localAccessUrl = 'https://aiyou-v2.xueda.cloud/';
} else {
    localAccessUrl = 'https://aiyou-v2.xueda.cloud/';
}

export const baseUrl = localBaseUrl;
export const accessUrl = localAccessUrl;


export default {
    baseUrl,
    accessUrl
}
