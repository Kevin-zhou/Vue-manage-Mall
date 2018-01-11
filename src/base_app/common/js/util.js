import axios from "axios";


class Utils {
    /*
       * 获取URL参数
       */
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    //左trim
    leftTrim(str) {
        return str.replace(/^\s*/, "");//^符号表示从开头即左边进行匹配
    }
    //右trim
    rightTrim(str) {
        return str.replace(/\s*$/, "");
    }
    //trim
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }


    ajax(key, data) {
        const apiData = this.searchApi(__api.api, key);
        apiData.method = apiData.method.toUpperCase();
        switch (apiData.method) {
            case 'GET': return this.get(__api.base + apiData.url, data); break;
            case 'POST': return this.post(__api.base + apiData.url, data); break;
        }
    }

    get(url, data = '') {
        const _url = url + `${data}`;
        return new Promise(resolve => {
            axios.get(_url).then(res => {
                resolve(res.data || {});
            });
        })
    }
    post(url, data = {}) {
        const _url = url;
        return new Promise(resolve => {
            axios.post(_url, data).then(res => {
                resolve(res.data || {});
            });
        })
    }
    searchApi(api, key) {
        let temp, method;
        const keys = Object.keys(api);

        if (keys.length > 0) {
            keys.forEach(res => {
                const url = api[res][key] ? api[res][key].url : null;
                const params = api[res][key] ? api[res][key].params : null;
                const _method = api[res][key] ? api[res][key].method : null;

                if (typeof url == "string") temp = url;
                if (typeof params == "string") temp += params;
                if (typeof _method == "string") method = _method;

            })
            return { url: temp, method: method };
        }
    }

    //时间转换
    time(date) {
        if (!date) return null;
        var _date = new Date(date)
        //计算年
        var year = _date.getFullYear()

        var month = _date.getMonth() + 1;

        var days = _date.getDate();

        //计算出小时数
        var hours = _date.getHours();

        //计算分钟数
        var minutes = _date.getMinutes();

        //计算秒数
        var seconds = _date.getSeconds();


        seconds = seconds >= 10 ? seconds : "0" + seconds;

        minutes = minutes >= 10 ? minutes : "0" + minutes;

        hours = hours >= 10 ? hours : "0" + hours;

        days = days >= 10 ? days : "0" + days;

        month = month >= 10 ? month : "0" + month;

        year = year >= 10 ? year : "0" + year;



        return `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;
    }

}


// session存储
class Session {
    static setItem(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    static removeItem(key) {
        sessionStorage.removeItem(key);
    }
}

//是否登录
function isLogin() {
    const data = __session.getItem('accessToken');
    return data ? true : false;
}
function logout() {
    __session.removeItem('accessToken');
}

class Events {
    constructor() {
        this._map = {};
    }
    //事件发布
    publish(event, _data) {
        if (this._map[event]) {
            this._map[event].callback(_data);
        }
    }
    //事件订阅
    subscribe(event, callback) {
        this._map[event] = {};
        this._map[event].callback = callback;
    }

    //解除订阅
    unsubscribe(event) {
        this._map[event] = null;
    }
}

function filterTime(time) {
    if (time == null || time == '') {
        return null;
    }
    let _date = new Date(time);
    //计算年
    let year = _date.getFullYear()
    let month = _date.getMonth() + 1;
    let days = _date.getDate();
    //计算出小时数
    let hours = _date.getHours();
    //计算分钟数
    let minutes = _date.getMinutes();
    //计算秒数
    let seconds = _date.getSeconds();
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    hours = hours >= 10 ? hours : "0" + hours;
    days = days >= 10 ? days : "0" + days;
    month = month >= 10 ? month : "0" + month;
    year = year >= 10 ? year : "0" + year;
    let returnDate = year + "-" + month + "-" + days + ' ' + hours + ":" + minutes + ":" + seconds;
    return returnDate;
}

// 放入全局变量
const utils = new Utils()
window['__utils'] = utils;
window['__session'] = Session;
window['__isLogin'] = isLogin;
window['__logout'] = logout;
window['__Events'] = new Events();
window['__filterTime'] = filterTime;

module.exports = utils;
