/**
 * Created by shihao on 16/3/23.
 */
'use strict';
presto.SERVICES
  .service('LoginService', ['User'
    , function (User) {

      //获取验证码
      this.getSmsCode = function(param,successfunction,errorfunction,finalfunction){
        User.getSmsCode({},param).$promise.then(function(response){
          return response;
        }).then(successfunction,errorfunction)['finally'](finalfunction);
      };

      //用户登录
      this.login = function(param,successfunction,errorfunction,finalfunction){
        User.login({},param).$promise.then(function(response){
          return response;
        }).then(successfunction,errorfunction)['finally'](finalfunction);
      };
    }]);
