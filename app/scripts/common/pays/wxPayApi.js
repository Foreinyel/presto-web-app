/**
 * Created by lazyhome on 3/25/16.
 */
"use strict";
presto.SERVICES
  .factory('WxPayApi',['Storage', 'WxApi', 'CommonToasts'
    ,function(Storage, WxApi, CommonToasts){

      function pay(params, success, error){

        var config = {
          "appId": params.appId,     //公众号名称，由商户传入
          "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": params.nonceStr, //随机串
          "package": params.package,
          "signType": params.signType,         //微信签名方式：
          "paySign":params.sign //微信签名
        }

        function onBridgeReady(){
          WeixinJSBridge.invoke('getBrandWCPayRequest', config, function(res){
            if (res.err_msg === "get_brand_wcpay_request:ok") {
              success();
            }
            else if (res.err_msg === "get_brand_wcpay_request:cancel" || res.err_msg === "get_brand_wcpay_request:fail") {
              console.log(location.href, 'Get', params, res.err_msg, function () {
                CommonToasts.showAlert('微信支付失败!');
              });
              error();
            }
            else{
              console.log(location.href, 'Get', params, res.err_msg, function () {
              });
            }
          });
        }

        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          onBridgeReady();
        }
      };

      return {pay: pay};

    }]);
