'use strict';

var presto = {};

presto.CONTROLLERS = angular.module('presto.controllers', ['presto.services', 'presto.config', 'presto.filters']);
presto.SERVICES = angular.module('presto.services', ['presto.backend']);
presto.DIRECTIVES = angular.module('presto.directives', []);
presto.COMMON = angular.module('presto.common', []);
presto.BACKEND = angular.module('presto.backend', ['ngResource', 'presto.config']);
presto.CONFIG = angular.module("presto.config", []);
presto.FILTERS = angular.module("presto.filters", ['presto.services']);

angular.module('presto', ['ionic', 'presto.controllers', 'presto.directives', 'presto.common', 'presto.services', 'presto.backend', 'presto.config', 'presto.filters'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(false);

    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');


    $stateProvider

      .state('tabs', {
        url: '/tabs',
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl',
        cache: false
      })

      //首页
      .state('tabs.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      //登录
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login/login.html',
        controller: 'LoginCtrl',
        cache: false
      })

      //我要植书
      .state('tabs.plantBooks', {
        url: '/plantBooks',
        views: {
          'tab-home': {
            templateUrl: 'templates/plantBooks/plantBooks.html',
            controller: 'PlantBooksCtrl'
          }
        }
      })

      //我要植书-选择植书方式
      .state('tabs.plantMethods', {
        url: '/plantMethods',
        views: {
          'tab-home': {
            templateUrl: 'templates/plantBooks/plantMethods.html',
            controller: 'PlantMethodsCtrl'
          }
        }
      })


      //手动植书
      .state('tabs.manualPlant', {
        url: '/manualPlant',
        views: {
          'tab-home': {
            templateUrl: 'templates/plantBooks/manualPlant.html',
            controller: 'ManualPlantCtrl'
          }
        },
        cache:false
      })
    ;
    // if none of the above states are matched, use this as the fallback
    /*var loginUser = COMMONAPI.getStorage('LoginUser');
     if (loginUser && loginUser.token) {
     $urlRouterProvider.otherwise('/tabs/home');
     } else {*/
    $urlRouterProvider.otherwise('/login');
    //}
  })
  .factory('tokenInjector', ['CommonMethods', function (CommonsMethods) {
    var tokenInjector = {
      request: function (config) {
        /*config.headers['x-presto-token'] = CommonsMethods.getToken();
         config.headers['x-presto-ctype'] = CommonsMethods.getCtype();
         config.headers['x-presto-cversion'] = CommonsMethods.getCversion();
         config.headers['x-presto-channel'] = CommonsMethods.getChannel();
         config.headers['x-presto-openid'] = CommonsMethods.getOpenid();
         config.headers['x-presto-latitude'] = CommonsMethods.getLatitude();
         config.headers['x-presto-longtitude'] = CommonsMethods.getLongtitude();
         config.headers['x-presto-deviceinfo'] = CommonsMethods.getDeviceinfo();*/
        return config;
      }
      , response: function (response) {
        if ((response && Number(response.status) >= 400) || (response && Number(response.status) == 200 && response.data && Number(response.data.responseCode) > 0)) {
          if (response.config && response.config.url.indexOf('/log/err') < 0) {
            var param = {
              openId: CommonsMethods.getOpenid(),
              mobile: CommonsMethods.getMobile(),
              errorContent: JSON.stringify(response)
            };
            var ajaxHeader = {
              'x-presto-token': CommonsMethods.getToken()
              , 'x-presto-openid': CommonsMethods.getOpenid()
              , 'x-presto-channel': CommonsMethods.getChannel()
            };

          }
        }

        return response;
      }
    };

    return tokenInjector;
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('tokenInjector');
  }])
  .run(['$rootScope', '$state', 'CommonMethods', 'CommonToasts', '$http', '$ionicBackdrop', 'Storage', 'WxApi'
    , function ($rootScope, $state, CommonMethods, CommonToasts, $http, $ionicBackdrop, Storage, WxApi) {

      //app打开时,获取token,并保存为登录状态
      var args = CommonMethods.getArgs();
      if (args && args.token) {
        var loginUser = {
          token: args.token,
          phoneNumber: args.mobile,
          wxNickName: '',
          headImgUrl: ''
        };
        Storage.set('LoginUser', loginUser);
      }

      /*$rootScope.$on('$locationChangeStart', function (e, newState, oldState) {

       $ionicBackdrop.release();

       var noCheckLoginUrl = {     //不验证是否登录url
       '/welcome': 1,
       '/tabs/login': 1,
       '/tabs/priceList': 1,
       '/priceList': 1,
       '/tabs/questions': 1,
       '/tabs/about': 1,
       '/tabs/agreement': 1,
       '/tabs/depositAgreement': 1,
       '/qrcode': 1,
       '/tabs/home': 1,
       '/tabs/store': 1,
       '/tabs/storePriceList': 1
       };
       //console.log(noCheckLoginUrl[newState.substr(newState.indexOf('#')+1)]);
       var url = newState.substr(newState.indexOf('#') + 1);

       if (url && !noCheckLoginUrl[url] && !CommonMethods.isLogin()) {
       e.preventDefault();
       //CommonToasts.showAlert('提示', '请先登录!');
       $state.go('login');
       $rootScope.newState = newState;
       }

       $rootScope.$broadcast('SideMenuClose');

       });*/
      CommonMethods.checkDevicePlat();

    }])
;
