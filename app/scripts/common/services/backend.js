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

  .factory('Book',['$resource','ENV',function($resource, ENV){
    return $resource('','',{
      findBooks:{
        method:"GET",
        url:ENV.baseUrl + "/book/findBooks",
        param:{},
        isArray:false
      }
    })
  }])
;
