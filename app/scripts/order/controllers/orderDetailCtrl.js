/**
 * Created by shihao on 16/12/4.
 */

'use strict';

presto.CONTROLLERS
  .controller('OrderDetailCtrl', ['$scope', '$state', 'Params', 'OrderService', 'CommonToasts'
    , function ($scope, $state, Params, OrderService, CommonToasts) {

      $scope.order = {};
      $scope.userBooks = [];

      $scope.initUserBooks = function () {

        var books = $scope.order.orderDetails;
        if (!books) {
          return;
        }
        for (var i = 0; i < books.length; i++) {

          var count = 0, currIndex;
          angular.forEach($scope.userBooks, function (item, index) {
            if (item.bookOwnerId == books[i].bookOwnerId) {
              count++;
              currIndex = index;
            }

          });
          var item = books[i];
          if (count == 0) {
            var userBook = {
              bookOwnerId: item.bookOwnerId,
              bookOwner: item.bookOwner,
              pickMethod: item.pickMethod,
              pickMethodDesc: item.pickMethodDesc,
              pickAddress: item.pickAddress,
              bookItem: [item]
            };
            $scope.userBooks.push(userBook);
          } else {
            $scope.userBooks[currIndex].bookItem.push(item);
          }
        }
      };

      $scope.loadOrder = function () {
        var param = {
          orderId: $scope.order.id
        };

        OrderService.findOrderById(param, function (res) {
          if (res && res.responseCode == 0) {
            $scope.order = res.data;
            $scope.order.weeks = Math.ceil(($scope.order.dateEnd - $scope.order.dateFrom) / (7 * 24 * 60 * 60 * 1000));
            $scope.order.dateFrom = new Date($scope.order.dateFrom).toLocaleDateString();
            $scope.order.dateEnd = new Date($scope.order.dateEnd).toLocaleDateString();
            $scope.initUserBooks();
          } else {
            CommonToasts.showAlert('提示', '查询订单信息失败,请稍后再试');
          }
        }, function (res) {
          CommonToasts.showAlert('提示', '查询订单信息失败,请稍后再试');
        });
      };

      $scope.goReturnBook = function(order){
        Params.setParam('ReturnBook_Order',order);
        $state.go('tabs.returnBook');
      };

      $scope.goContinueOrder = function (order, e) {

        Params.setParam('ContinueOrder_Order', order);
        $state.go('tabs.continueOrder');
        if (e) e.stopPropagation();
      };

      $scope.orderPay = function () {
        var param = {
          id: $scope.order.id
        };
        OrderService.payOrder(param, function (res) {
          if (res && res.responseCode == 0) {
            $scope.loadOrder();
            CommonToasts.showAlert('提示', '支付成功');
          } else if (res && res.responseMsg) {
            CommonToasts.showAlert('提示', res.responseMsg);
          }
        }, function (res) {
          CommonToasts.showAlert('提示', '查询订单信息失败,请稍后再试');
        });
      };

      $scope.initScope = function () {
        $scope.order.id = Params.getParam('OrderDetailCtrl.Order').id;
        //$scope.order.id = 4;
        $scope.loadOrder();
      };
      $scope.initScope();

    }]);
