/**
 * Created by shihao on 16/3/23.
 */

'use strict';
var COMMONAPI = function () {

  var bIsIphoneOs, bIsAndroid, wxconfiged;

  var ajaxHeader;

  var followUrl;

  var c_start, c_end;

  var setStorage = function (key, data) {
    return window.localStorage.setItem(key, window.JSON.stringify(data));
  };

  var getStorage = function (key) {
    return window.JSON.parse(window.localStorage.getItem(key));
  };

  var removeStorage = function (key) {
    return window.localStorage.removeItem(key);
  };

  var getDateStr = function (date) {
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd = date.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  /**
   * days:可选天数 从今天起算，若今天无可选时段，从明天起算
   * times:可选时段，从早上9点到晚上9点,每半小时为一个时间段
   *todayTimes：今天的可选时段，当前时间加上半个小时后向上取半整点开始起算
   * @returns {{days: Array, times: Array, todayTimes: Array}}
   */
  var getDayAndTimes = function getDayAndTimes() {
    var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var now = new Date();
    var times = [];
    for (var i = 9; i <= 20; i++) {
      if (i == 9) {
        times.push("09:00~10:00");
        continue;
      }
      times.push(i + ":00~" + (i + 1) + ":00");
    }

    var days = [];
    var dates = [];
    var todayTimes = [];
    if (now.getHours() < 20) {
      var hasToday = true; ///是否有今天的取件时间
      if (now.getHours() == 19 && now.getMinutes() >= 30) {
        hasToday = false;
      }
      if (hasToday) {
        var today_date = getDateStr(now).substr(5, 5);
        var later = new Date(now.valueOf() + 30 * 60 * 1000)
        var cur_hour = later.getHours();
        var cur_mins = later.getMinutes();
        for (var i = cur_hour + 1; i <= 20; i++) {
          if (cur_hour < 9) {
            continue;
          }
          todayTimes.push(i + ":00~" + (i + 1) + ":00");

        }
        days.push(today_date + " 今天");
        dates.push(getDateStr(now));
      }
    }
    for (i = 1; i <= 6; i++) {
      var theDay = new Date(now.valueOf() + i * 24 * 60 * 60 * 1000);
      //var theDay=now;
      //theDay.setDate(theDay.getDate()+i);
      var date = getDateStr(theDay);
      var dayinfo;
      if (i == 1) {
        dayinfo = date.substr(5, 5) + " 明天";
      } else if (i == 2) {
        dayinfo = date.substr(5, 5) + " 后天";
      } else {
        dayinfo = date.substr(5, 5) + " " + weeks[theDay.getDay()];
      }
      days.push(dayinfo);
      dates.push(date);
    }
    var obj = {
      "days": days,
      "dates": dates,
      "times": times,
      "todayTimes": todayTimes
    };
    return obj;
  };

  var setCookie = function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  };

  var getCookie = function(c_name){
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  };

  var setOpenId = function(openId){
    //alert(openId);
    setCookie("openid", openId, 3650);
    setStorage("openid",openId);
  };

  var setAppId = function(appId){
    setCookie("appid", appId, 3650);
  };

  return {
    getDayAndTimes: getDayAndTimes,
    setStorage: setStorage,
    getStorage: getStorage,
    removeStorage: removeStorage,
    setOpenId:setOpenId,
    setAppId:setAppId,
    followUrl:followUrl
  };

}();
