/**
 * Created by shihao on 16/12/6.
 */

'use strict';

presto.CONTROLLERS
  .controller('ContinueOrderCtrl', ['$scope', '$state', 'Params', 'Storage', 'OrderService', 'CommonToasts', function ($scope, $state, Params, Storage, OrderService, CommonToasts) {
    $scope.user = Storage.get('LoginUser');
    $scope.returnBook = {
      deliveryCom: '',
      deliveryOrderNo: ''
    };

    $scope.continueItems = [];
    $scope.currSelectedItem = '';

    //$scope.order = Params.getParam('ContinueOrder_Order');
    $scope.order = {
      "id": 4,
      "status": 50,
      "statusDesc": null,
      "userId": 1,
      "amount": 19,
      "dateFrom": 1480723200000,
      "dateEnd": 1481846400000,
      "orderDate": 1480603453000,
      "mobile": "15026801649",
      "name": null,
      "address": null,
      "note": null,
      "orderDetails": [{
        "id": 4,
        "userBookId": 1,
        "bookId": 1676,
        "bookName": "设计原理",
        "bookAuthor": "德化",
        "price": 1,
        "bookPress": "中心出版社",
        "bookIsbn": "ISADSDEF4479",
        "bookOwnerId": null,
        "bookOwner": null,
        "$$hashKey": "object:35"
      }],
      "dateFromText": "2016/12/3",
      "dateEndText": "2016/12/16",
      "weeks": 2,
      "$$hashKey": "object:33"
    };
    //console.log(JSON.stringify($scope.order));
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

    $scope.selectItem = function (item) {
      $scope.currSelectedItem = item;
    };

    $scope.goOrders = function () {
      $state.go('tabs.orders');
    };

    $scope.loadContinueItems = function () {
      var param = {
        orderId: $scope.order.id
      };
      OrderService.loadContinueItems(param, function (res) {
        if (res && res.responseCode == 0) {
          $scope.continueItems = res.data;
        } else {
          CommonToasts.showAlert('提示', '获取续惜阅数据失败,请稍后再试');
        }
      }, function (res) {
        CommonToasts.showAlert('提示', '获取续惜阅数据失败,请稍后再试');
      });
    };

    $scope.continueOrder = function () {
      if (!$scope.currSelectedItem) {
        CommonToasts.showAlert('提示', '请选择续阅周数');
        return;
      }
      var param = {
        orderId: $scope.order.id,
        weeks: $scope.currSelectedItem.weeks,
        amount: $scope.currSelectedItem.amount
      };
      OrderService.createContinueOrder(param, function (res) {
        if (res && res.responseCode == 0) {
          CommonToasts.showAlert('提示', '续惜阅成功!', '我知道啦', function () {
            $scope.goOrders();
          });
        } else if (res && res.responseMsg) {
          CommonToasts.showAlert('提示', res.responseMsg);
        } else {
          CommonToasts.showAlert('提示', '续惜阅失败,请稍后再试');
        }
      }, function (res) {
        CommonToasts.showAlert('提示', '续惜阅失败,请稍后再试');
      });
    };

    $scope.initScope = function () {
      $scope.initUserBooks();
      $scope.loadContinueItems();
    };
    $scope.initScope();
  }]);
