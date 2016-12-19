/**
 * Created by shihao on 16/12/1.
 */

'use strict';

presto.SERVICES
  .service('OrderService', ['Order', function (Order) {
    this.createOrder = function (param, success, error, final) {
      Order.createOrder({}, param).$promise.then(function (res) {
        return res;
      }).then(success, error)['finally'](final);
    };

    this.queryMyOrders = function (param, success, error, final) {
      Order.listMyOrders(param).$promise.then(function (res) {
        return res;
      }).then(success, error)['finally'](final);
    };

    this.findOrderById = function (param, success, error, final) {
      Order.findOrderById(param).$promise.then(function (res) {
        return res;
      }).then(success, error)['finally'](final);
    };

    this.payOrder = function (param, success, error, final) {
      Order.pay(param).$promise.then(function (res) {
        return res;
      }).then(success, error)['finally'](final);
    };

    this.returnBook = function (param, success, error, final) {
      Order.returnBook({}, param).$promise.then(function (res) {
        return res;
      }).then(success, error)['finally'](final);
    };

    this.loadContinueItems = function(param,success,error,final){
      Order.loadContinueItem(param).$promise.then(function(res){
        return res;
      }).then(success,error)['finally'](final);
    };

    this.createContinueOrder = function(param,success,error,final){
      Order.createContinueOrder({},param).$promise.then(function(res){
        return res;
      }).then(success,error)['finally'](final);
    };

  }]);
