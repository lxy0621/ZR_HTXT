/* jshint esversion: 6 */
/**
 * 时间日期相关操作
 */


/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format(datetime) {
    return formatWithSeperator(datetime, "/", ":");
}

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成类似 2018/09/23 11:54:16
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator(datetime, dateSeprator, timeSeprator) {
    if (datetime != null) {
        const dateMat = new Date(datetime);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat = year + dateSeprator + month + dateSeprator + day + " " + hh + timeSeprator + mm + timeSeprator + ss;
        return timeFormat;
    }
}
export const verify = {
    isObject: function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },
    isArray: function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
    isBoolean: function(o) {
        return Object.prototype.toString.call(o) === '[object Boolean]';
    },
    isDate: function(o) {
        return Object.prototype.toString.call(o) === '[object Date]';
    },
    isFunction: function(o) {
        return Object.prototype.toString.call(o) === '[object Function]';
    },
    isString: function(o) {
        return Object.prototype.toString.call(o) === '[object String]';
    },
    isNumber: function(o) {
        return typeof o === 'number';
    },
    isPhone: function(phone) {
        var reg = /^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        return reg.test(phone);
    }
};

/**
 * 获取当前月的第一天
 */
export const getCurrentMonthFirst = () => {
    const date = new Date();
    date.setDate(1);
    return date;
};

/**
 * 获取当月的最后一天
 */
export const getCurrentMonthLast = (byNow = false) => {
    const date = new Date();
    const M = date.getMonth();
    const Y = date.getFullYear();
    return byNow ? date : new Date(Y, M + 1, 0);
};
/**
 * 获取某一周的第一天
 * @param firstDayOfWeek {number} - 每周的第一天从周几开始
 * @param current {Date} - 日期对象，默认是当天
 * @return {Date} - 该日期所处周的第一天
 */
function getFirstDateOfWeek(firstDayOfWeek = 0, current = new Date()) {
    const originalWeekInterval = [0, 1, 2, 3, 4, 5, 6];
    const dayIndex = originalWeekInterval.indexOf(firstDayOfWeek);
    const realWeekInterval = originalWeekInterval
        .slice(dayIndex)
        .concat(originalWeekInterval.slice(0, dayIndex));
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth();
    const currentDate = current.getDate();
    const currentDay = current.getDay();
    return new Date(
        currentYear,
        currentMonth,
        currentDate - originalWeekInterval[realWeekInterval.indexOf(currentDay)]
    );
}
/**
 * 获取本周的第一天(每周的第一天从周一开始)
 */
export const getCurrentWeekFirst = function() {
    return getFirstDateOfWeek(1);
};

/**
 * 获取某一周的最后一天
 * @param firstDayOfWeek {number} - 每周的第一天从周几开始
 * @param current {Date} - 日期对象，默认是当天
 * @return {Date} - 该日期所处周的最后一天
 */
function getLastDateOfWeek(firstDayOfWeek = 0, current = new Date()) {
    const originalWeekInterval = [0, 1, 2, 3, 4, 5, 6];
    const reversedOriginalWeekInterval = originalWeekInterval.slice().reverse();
    const dayIndex = originalWeekInterval.indexOf(firstDayOfWeek);
    const realWeekInterval = originalWeekInterval
        .slice(dayIndex)
        .concat(originalWeekInterval.slice(0, dayIndex));
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth();
    const currentDate = current.getDate();
    const currentDay = current.getDay();
    return new Date(
        currentYear,
        currentMonth,
        currentDate +
        reversedOriginalWeekInterval[realWeekInterval.indexOf(currentDay)]
    );
}

/**
 * 获取本周的最后天(每周的第一天从周一开始)
 */
export const getCurrentWeekLast = function(byNow = false) {
    var now = new Date(); // 当前日期
    return byNow ? now : getLastDateOfWeek(1);
};

/**
 * 获取本年第一天
 */
export const getCurrentYearFirst = function() {
    var currentYear = new Date().getFullYear();
    var currentYearFirstDate = new Date(currentYear, 0, 1);
    return currentYearFirstDate;
};

/**
 * 获取本年最后一天
 */
export const getCurrentYearLast = function(byNow = false) {
    var currentYear = new Date().getFullYear();
    var currentYearEndDate = new Date(currentYear, 11, 31);
    return byNow ? new Date() : currentYearEndDate;
};

export const weekToDate = function(weekstr, blo = true) {
    //传入值为2016年第51周,以周一开始,当blo为true是周一开始
    if (!verify.isString(weekstr)) return weekstr;
    var reg = /\d+/g,
        arr = weekstr.match(reg);
    if (!arr) return weekstr;
    if (arr.length === 2) {
        return week2Date(+arr[1], +arr[0], +blo);
    } else {
        return weekstr;
    }
};

export const dateToWeek = function(dd) {
    //将日期转为第几周
    if (!verify.isDate(dd)) return;
    const [year, week] = date2Week(dd);
    return `${week}`;
};

function date2Week(dd) {
    // Copy date so don't modify original
    const d = new Date(Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}
/**
 * datepicker选择当天之后的option
 *
 */
export const datePickerToday = {
    disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
    }
};

/**
 * datepicker选择当天之前的option
 *
 */
export const datePickerBeforeToday = {
    disabledDate(time) {
        return time.getTime() > Date.now();
    }
};
