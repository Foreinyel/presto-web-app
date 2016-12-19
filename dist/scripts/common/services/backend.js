/**
 * Created by shihao on 16/3/23.
 */
'use strict';
presto.BACKEND

  //用户模块
  .factory('User', ['$resource', 'ENV'
    , function ($resource, ENV) {

      return $resource('', '', {
        //登录
        login: {
          method: "POST",
          url: ENV.baseUrl + 'user/login',
          param: {},
          isArray: false
        }
      });

    }])

  //植书模块
  .factory('PlantBook', ['$resource', 'ENV', function ($resource, ENV) {
    return $resource('', '', {
      //植书
      commonPlant: {
        method: "POST",
        url: ENV.baseUrl + 'plantBook/req',
        param: {},
        isArray: false
      }
    });
  }])

  .factory('Book', ['$resource', 'ENV', function ($resource, ENV) {
    return $resource('', '', {
      findBooks: {
        method: "GET",
        url: ENV.baseUrl + "/book/findBooks",
        param: {},
        isArray: false
      },
      findBookById: {
        method: "GET",
        url: ENV.baseUrl + '/book/findBookById',
        param: {},
        isArray: false
      }
    })
  }])

  .factory('Order', ['$resource', 'ENV', function ($resource, ENV) {
    return $resource('', '', {
      createOrder: {
        method: "POST",
        url: ENV.baseUrl + "/order/create",
        param: {},
        isArray: false
      },
      listMyOrders: {
        method: "GET",
        url: ENV.baseUrl + "/order/list",
        param: {},
        isArray: false
      },
      findOrderById: {
        method: "GET",
        url: ENV.baseUrl + "/order/listById",
        param: {},
        isArray: false
      },
      pay: {
        method: "GET",
        url: ENV.baseUrl + "/order/pay",
        param: {},
        isArray: false
      },
      returnBook: {
        method: "POST",
        url: ENV.baseUrl + "/returnBook/create",
        param:{},
        isArray: false
      },
      loadContinueItem:{
        method:"GET",
        url:ENV.baseUrl + "/continueOrder/loadItems",
        param:{},
        isArray:false
      },
      createContinueOrder:{
        method:"POST",
        url:ENV.baseUrl + "/continueOrder/create",
        param:{},
        isArray:false
      }
    });
  }])
;
