/**
 * 金额分隔
 * @param {*} num
 */
export function formatNumber(num) {
  const n = 2;
  if (num === 0 || num === undefined) {
    return 0;
  }
  num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let l = num.split(".")[0].split("").reverse(), r = num.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/**
 * 日期格式化
 * @param {*} time
 */
export function formatDate(time) {
  if (time != null) {
    const dateMat = new Date(time);
    const year = dateMat.getFullYear();
    const month = (dateMat.getMonth() + 1) >= 10 ? (dateMat.getMonth() + 1) : '0' + (dateMat.getMonth() + 1);
    const day = dateMat.getDate() >= 10 ? dateMat.getDate() : '0' + dateMat.getDate();
    const timeFormat = year + '-' + month + '-' + day;
    return timeFormat;
  }
}

