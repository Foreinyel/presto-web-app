/**
 * Created by shihao on 16/12/1.
 */

'use strict';

presto.CONTROLLERS
  .controller('MyOrdersCtrl', ['$scope', '$state', 'OrderService', 'Storage', 'CommonToasts', 'Params', function ($scope, $state, OrderService, Storage, CommonToasts, Params) {
    $scope.user = Storage.get('LoginUser');
    $scope.status = '';
    $scope.orders = [];

    $scope.goOrderDetail = function (o) {
      Params.setParam('OrderDetailCtrl.Order', o);
      $state.go('tabs.orderDetail');
    };

    $scope.selectStatus = function (status) {
      $scope.status = status;
    };

    $scope.findMyOrders = function () {
      var param = {
        userId: $scope.user.id,
        status: $scope.status
      };

      OrderService.queryMyOrders(param, function (res) {
        if (res && res.responseCode == 0) {
          $scope.orders = res.data;
          angular.forEach($scope.orders, function (order) {
            order.dateFromText = (new Date(order.dateFrom)).toLocaleDateString();
            order.dateEndText = (new Date(order.dateEnd)).toLocaleDateString();
            order.weeks = Math.ceil((Number(order.dateEnd) - Number(order.dateFrom)) / (7 * 24 * 60 * 60 * 1000));
          });
        } else {
          CommonToasts.showAlert('提示', '查询订单失败!');
        }

      }, function (res) {
        CommonToasts.showAlert('提示', '查询订单失败!');
      });
    };

    $scope.goReturnBook = function (order, e) {
      Params.setParam('ReturnBook_Order', order);
      $state.go('tabs.returnBook');
      e.stopPropagation();
    };

    $scope.goContinueOrder = function (order, e) {

      Params.setParam('ContinueOrder_Order', order);
      $state.go('tabs.continueOrder');
      if (e) e.stopPropagation();
    };

    $scope.orderPay = function (o, e) {
      e.stopPropagation();
      var param = {
        id: o.id
      };
      OrderService.payOrder(param, function (res) {
        if (res && res.responseCode == 0) {
          $scope.findMyOrders();
          CommonToasts.showAlert('提示', '支付成功');
        } else if (res && res.responseMsg) {
          CommonToasts.showAlert('提示', res.responseMsg);
        } else {
          CommonToasts.showAlert('提示', '支付订单失败,请稍后再试');
        }
      }, function (res) {
        CommonToasts.showAlert('提示', '支付订单失败,请稍后再试');
      });
    };

    $scope.$watch('status', function (newValue, oldValue) {
      $scope.findMyOrders();
    });

    $scope.initScope = function () {
      //$scope.findMyOrders();
    };
    $scope.initScope();

  }]);
