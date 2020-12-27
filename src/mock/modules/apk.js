// 获取APK
export function pagingApks(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'rows': [{
        'id': 1,
        'name': '中国燃气',
        'url': 'https://oss.tan8.com/yuepuku_dzq/90/45007/45007_prev.jpg',
        'version': '1.0.12',
        'build': '22',
        'appKey': 'b5565aqweqw',
        'download': 'https://xueda.cloud/ajYH',
        'qrcode': 'https://pay.weixin.qq.com/wiki/doc/api/img/chapter6_1_1.png',
        'updatorName': '吴彦祖',
        'updatedAt': '2020-08-23 12:32:50'
      }, {
        'id': 2,
        'name': '兴邦石油',
        'url': 'https://oss.tan8.com/yuepuku_dzq/90/45007/45007_prev.jpg',
        'version': '2.1.0',
        'build': '25',
        'appKey': 'b52325awoeiu',
        'download': 'https://xueda.cloud/rJ4h',
        'qrcode': 'https://pay.weixin.qq.com/wiki/doc/api/img/chapter6_1_1.png',
        'updatorName': '成龙',
        'updatedAt': '2020-07-23 16:32:50'
      }],
      'total': 2
    }
  };
  return {
    url: 'apk/pagingApks',
    type: 'post',
    data: data,
  };
};
