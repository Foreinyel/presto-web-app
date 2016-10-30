/**
 * Created by shihao on 16/3/24.
 */

'use strict';
presto.SERVICES
  .factory('CommonMethods', ['Storage'
    , function (Storage) {

      var bIsAndroid, bIsIphoneOs;

      var c_start, c_end;

      var headImgUrl, wxNickName, token;

      return {
        //是否登录
        isLogin: function () {
          //debugger;
          var loginUser = Storage.get('LoginUser');
          if (!loginUser) return false;
          headImgUrl = loginUser.headImgUrl;
          token = loginUser.token;
          wxNickName = loginUser.wxNickName;
          if (token === '' || token === 'undefined' || token == null) {
            token = this.getCookie('token');
            wxNickName = this.getCookie('wxNickName');
            headImgUrl = this.getCookie('headImgUrl');
          }
          //ajaxHeader['x-presto-channel'] = getChannel();
          //ajaxHeader['x-presto-token'] = token;
          if (this.isStringEmpty(token)) {
            return false;
          }
          return true;
        },

        //设置cookie
        setCookie: function (c_name, value, expiredays) {
          var exdate = new Date();
          exdate.setDate(exdate.getDate() + expiredays);
          document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },

        //获取cookie
        getCookie: function (c_name) {
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
        },
        //清除cookie
        clearCookie: function (c_name) {
          this.setCookie(c_name, "", -1);
        },

        getArgs: function () {
          var args = {};
          var query = location.href.split('?')[1];
          var pairs = [];

          if (query) {
            query = query.split('#')[0];
            pairs = query.split("&");
          }
          // Get query string
          // Break at ampersand
          for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            // Look for "name=value"
            if (pos == -1) continue;
            // If not found, skip
            var argname = pairs[i].substring(0, pos);// Extract the name
            var value = pairs[i].substring(pos + 1);// Extract the value
            value = decodeURIComponent(value);// Decode it, if needed
            args[argname] = value;
            // Store as a property
          }
          return args;// Return the object
        },

        isWeiXin: function () {
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
          } else {
            return false;
          }
          //return true;
        },

        ifHideNavBar: function () {
          return this.isWeiXin();
        },

        getToken: function () {
          var loginUser = Storage.get('LoginUser');
          return loginUser ? loginUser.token : '';
        },
        getCtype: function () {

        },
        getCversion: function () {

        },
        getChannel: function () {
          var channel = '23';
          if (!this.isWeiXin()) {
            if (bIsAndroid) {
              channel = '22';
            }
            if (bIsIphoneOs) {
              channel = '21';
            }
          }
          return channel;
        },
        getOpenid: function () {
          //var openId = this.getCookie('openid');
          //if(!openId){
          //var openId = this.getArgs().openid;
          //if (openId != 'undefined' && openId != 'undefined' && openId != '' && openId != null) {
          //  this.setCookie("openid", openId, 3650);
          //}
          //}
          //if(openId == null || openId == 'undefined' || openId == '' || openId == 'null' || openId == null ) openId = Storage.get('openid');

          var openId = this.getArgs().openid;
          return openId;
        },
        getLatitude: function () {

        },
        getLongtitude: function () {

        },
        getDeviceinfo: function () {

        },
        ////用于扫码下单以及登录
        getPromoterId: function () {
          var proid = this.getArgs().promoterid; ///url进来的值
          if (!proid || typeof proid === 'undefined') {
            proid = this.getCookie('proid');
          } else {
            this.setCookie('proid', proid, 15);
          }
          return proid;
        },

        ///验证手机号码
        isMobile: function (txt) {

          var reg = /^1[3|4|5|8|7][0-9]\d{8}$/;
          return reg.test(txt);
        },

        //验证字符串是否为空
        isStringEmpty: function (str) {
          if (!str || typeof str == 'undefined' || str.length == 0) {
            return true;
          }
          return false;
        },

        //地址中姓名校验:汉字+数字+英文字母
        isAddrName:function(str){
          var reg = /^([\u4e00-\u9fa5]|[0-9]|[a-zA-Z])+$/;
          return reg.test(str);
        },

        //时间戳转换为日期格式:'2016-03-17 09:00:00'
        formatDate2String: function (datestramp) {
          var d = new Date(datestramp);
          var year = d.getFullYear();
          var month = this.pendZero(d.getMonth() + 1);
          var day = this.pendZero(d.getDate());
          var hour = this.pendZero(d.getHours());
          var minute = this.pendZero(d.getMinutes());
          var seconds = this.pendZero(d.getSeconds());

          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
        },

        pendZero: function (t) {
          return Number(t) < 10 ? '0' + t : t;
        },

        //获取用户账号
        getMobile: function () {

          var loginUser = Storage.get('LoginUser');
          if (!loginUser) {
            return '';
          }
          return loginUser.phoneNumber;

        },
        ///检测微信版本
        checkWechatVersion: function () {
          var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
          if (wechatInfo) {
            if (wechatInfo[1] > "5.0") {
              return true;
            }
          }
          return false;
        },

        checkDevicePlat:function(){
          var sUserAgent = navigator.userAgent.toLowerCase();
          var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
          this.bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
          var bIsMidp = sUserAgent.match(/midp/i) == "midp";
          var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
          var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
          this.bIsAndroid = sUserAgent.match(/android/i) == "android";
          var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
          var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
          var marketingKey = location.href.indexOf('yiyuanxi');
        },
        bIsAndroid:this.bIsAndroid,
        bIsIphoneOs:this.bIsIphoneOs,

        //blob to dataurl
        readBlob2DataUrl : function(blob,callback){
          var fr = new FileReader();
          fr.onload = function(e){
            if( callback){
              callback(e.target.result);
            }
          };
          fr.readAsDataURL(blob);
        },

        //Md5 加密
        getMd5Pwd:function(pwd){
          return hex_md5(pwd+'prestoWebApp').toUpperCase();
        }

      };

    }]);
