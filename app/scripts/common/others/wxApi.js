/**
 * Created by shihao on 16/3/23.
 */
'use strict';
presto.SERVICES
    .factory('WxApi', ['Storage'
        , function (Storage) {

            var wxconfiged, wechatInfo;

            var getConfig = function (next, shareInfo, callback) {
                //  var config = Storage.get('wechatConfig');
                var config = "";
                if (!config) {
                    var url = location.href.split("#")[0];
                } else {
                    next(config, shareInfo, callback);
                }
            };

            var share = function (shareInfo, callback) {
                getConfig(wxconfig, shareInfo, callback);
            };


            var wxconfig = function (params, shareInfo, callback) {

                //params.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getLocation', 'hideMenuItems'];
                params.jsApiList = ['getLocation', 'hideMenuItems'];

                wx.config(params);
                wx.ready(function () {
                    wxconfiged = true;

                    /*  隐藏传播类功能按钮
                     发送给朋友: "menuItem:share:appMessage"
                     分享到朋友圈: "menuItem:share:timeline"
                     分享到QQ: "menuItem:share:qq"
                     分享到Weibo: "menuItem:share:weiboApp"
                     收藏: "menuItem:favorite"
                     分享到FB: "menuItem:share:facebook"
                     分享到 QQ 空间/menuItem:share:QZone
                     */
                    //wx.hideOptionMenu();
                    wx.hideMenuItems({
                        menuList: ["menuItem:share:appMessage"
                            , "menuItem:share:timeline"
                            , "menuItem:share:qq"
                            , "menuItem:share:weiboApp"
                            , "menuItem:favorite"
                            , "menuItem:share:facebook"
                            , "menuItem:share:QZone"
                        ]
                    });

                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    /*wx.onMenuShareTimeline({
                     trigger: function () {
                     this.title = shareInfo.title;
                     this.desc = shareInfo.desc;
                     this.link = shareInfo.link;
                     this.imgUrl = shareInfo.imgUrl;
                     }
                     });
                     wx.onMenuShareAppMessage({
                     trigger: function () {
                     this.title = shareInfo.title;
                     this.desc = shareInfo.desc;
                     this.link = shareInfo.link;
                     this.imgUrl = shareInfo.imgUrl;
                     }
                     });
                     wx.onMenuShareQQ({
                     trigger: function () {
                     this.title = shareInfo.title;
                     this.desc = shareInfo.desc;
                     this.link = shareInfo.link;
                     this.imgUrl = shareInfo.imgUrl;
                     }
                     });
                     wx.onMenuShareWeibo({
                     trigger: function () {
                     this.title = shareInfo.title;
                     this.desc = shareInfo.desc;
                     this.link = shareInfo.link;
                     this.imgUrl = shareInfo.imgUrl;
                     }
                     });
                     wx.onMenuShareQZone({
                     trigger: function () {
                     this.title = shareInfo.title;
                     this.desc = shareInfo.desc;
                     this.link = shareInfo.link;
                     this.imgUrl = shareInfo.imgUrl;
                     }
                     });*/
                    wx.getLocation({
                        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            //alert('latitude:' + latitude + ',longitude:' + longitude);
                            MAPAPI.setGPS(latitude, longitude);
                            callback(latitude, longitude);
                        }
                    });

                });
                wx.error(function (res) {
                    wxconfiged = false;
                    console.log(location.href, 'Get', params, res, function () {
                        alert('微信配置失败');
                    });
                    //$.alert('微信配置失败,' + "params: " + JSON.stringify(params)+ "res: " + res);
                });
            };

            //检测微信是否配置成功
            var loopWatchWxConfig = function (callback) {
                if (wxconfiged) {
                    callback();
                }
                else {
                    setTimeout(function () {
                        loopWatchWxConfig(callback);
                    }, 10);
                }
            };

            //检测微信版本
            var checkWechatVersion = function () {
                wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
                if (wechatInfo) {
                    if (wechatInfo[1] > "5.0") {
                        return true;
                    }
                }
                return false;
            };

            return {
                wxshare: share,
                loopWatchWxConfig: loopWatchWxConfig,
                checkWechatVersion: checkWechatVersion
            };
        }]);
