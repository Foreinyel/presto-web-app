/**
 * Created by shihao on 16/11/28.
 */

'use strict';

presto.CONTROLLERS
  .controller('OrderCtrl', ['$scope', '$state', 'Storage', '$ionicModal', 'CommonToasts', 'OrderService', function ($scope, $state, Storage, $ionicModal, CommonToasts, OrderService) {
    $scope.userBooks = [];
    $scope.deleteBookObj = {};
    $scope.user = {};

    $scope.order = {
      name: '',
      mobile: '',
      address: '',
      dateFrom: '',
      dateEnd: '',
      amount: '',
      note: '',
      orderDetails: [],
      weeks: ''
    };

    $scope.initUserBooks = function () {
      var loginUser = Storage.get('LoginUser');
      $scope.user = loginUser;
      if (loginUser) {
        var books = loginUser.bookPackage;
        if (!books) {
          return;
        }
        for (var i = 0; i < books.length; i++) {

          //初始化order对象的orderDetails
          var orderDetail = {
            userBookId: books[i].id,
            price: books[i].price
          };
          $scope.order.orderDetails.push(orderDetail);

          var count = 0, currIndex;
          angular.forEach($scope.userBooks, function (item, index) {
            if (item.userId == books[i].userId) {
              count++;
              currIndex = index;
            }

          });
          var item = books[i];
          if (count == 0) {
            var userBook = {
              userId: item.userId,
              userName: item.userName,
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
      }
    };

    //日期选择modal
    $scope.selectDateModal = '';
    $ionicModal.fromTemplateUrl('select-date-modal', {
      scope: $scope
    }).then(function (modal) {
      $scope.selectDateModal = modal;
    });

    $scope.showSelectDateModal = function () {
      $scope.selectDateModal.show();
    };
    $scope.hideSelectDateModal = function () {
      $scope.selectDateModal.hide();
    };

    $scope.openSelectDate = function () {
      $scope.showSelectDateModal();
    };


    //当我们用完模型时，清除它！
    $scope.$on('$destroy', function () {
      $scope.selectDateModal.remove();
    });
    // 当隐藏模型时执行动作
    $scope.$on('modal.hide', function () {
      // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function () {
      // 执行动作
    });

    //产生一个月的数据
    //是否闰年
    $scope.calendar = {
      year: '',      //当前年
      month: '',     //当前月
      selectedYear: '',  //选中年
      selectedMonth: '', //选中月
      selectedDay: '',  //选中日
      selectedDate: '',
      firstWeekDay: '',  //月份第一天对应星期几,0-星期天,1-星期一
      daysArray: []
    };
    var isLeap = function (year) {
      return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
    };


    var getFirstWeekDay = function (year, month) {
      var n1str = new Date(year, month - 1, 1);
      return n1str.getDay();
    };

    $scope.selectDate = function (d) {
      $scope.calendar.selectedDate = $scope.calendar.year + '-' + $scope.calendar.month + '-' + d;
      $scope.calendar.selectedDay = d;
      $scope.calendar.selectedYear = $scope.calendar.year;
      $scope.calendar.selectedMonth = $scope.calendar.month;
    };

    //创建日历数组
    $scope.createCurrentCalendar = function () {
      //1.根据年生成月份天数数组
      var mDays = new Array(31, 28 + isLeap($scope.calendar.year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);
      //2.当月天数
      var daysCount = mDays[$scope.calendar.month - 1];
      //3.获取当月第一天星期
      var firstWeekDay = getFirstWeekDay($scope.calendar.year, $scope.calendar.month);
      //4.获取日历行数
      var linesCount = Math.ceil((daysCount + firstWeekDay) / 7);
      var day = 1;
      var monthRowArr = [];
      for (var i = 0; i < linesCount; i++) {
        var weekdayArr = [];
        for (var j = 0; j < 7; j++) {
          if ((i == 0 && j < firstWeekDay) || day > daysCount) {
            weekdayArr.push(null);
          } else {
            weekdayArr.push(day++);
          }
        }
        monthRowArr.push(weekdayArr);
      }
      $scope.calendar.daysArray = monthRowArr;
    };

    $scope.lastMonth = function () {
      var currDate = new Date($scope.calendar.year, $scope.calendar.month - 1, 1);
      var lastDay = new Date(currDate.setMonth(currDate.getMonth() - 1));
      $scope.calendar.year = lastDay.getFullYear();
      $scope.calendar.month = lastDay.getMonth() + 1;
      $scope.createCurrentCalendar();

    };
    $scope.nextMonth = function () {
      var currDate = new Date($scope.calendar.year, $scope.calendar.month - 1, 1);
      var lastDay = new Date(currDate.setMonth(currDate.getMonth() + 1));
      $scope.calendar.year = lastDay.getFullYear();
      $scope.calendar.month = lastDay.getMonth() + 1;
      $scope.createCurrentCalendar();
    };

    $scope.calcTotalAmount = function () {
      var totalAmount = 0;
      var totalWeeks = Math.ceil((new Date($scope.order.dateEnd) - new Date($scope.order.dateFrom)) / (7 * 24 * 60 * 60 * 1000));
      var totalPrice = 0;
      angular.forEach($scope.order.orderDetails, function (detail) {
        totalPrice += detail.price * 7;
      });
      $scope.order.weeks = totalWeeks;
      $scope.order.amount = totalWeeks * totalPrice + 5;    //加运费
      return $scope.order.amount;
    };

    $scope.$watch('calendar.selectedDate', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.order.dateEnd = newValue;
        $scope.calcTotalAmount();
      }
    });

    $scope.initOrder = function () {
      var nowDate = new Date();
      var dayAfterTomorrow = new Date(nowDate.setDate(nowDate.getDate() + 2));

      $scope.order.dateFrom = dayAfterTomorrow.getFullYear() + '-' + (dayAfterTomorrow.getMonth() + 1) + '-' + dayAfterTomorrow.getDate();
    };

    $scope.initCalendar = function () {
      var nowDate = new Date();
      $scope.calendar.year = nowDate.getFullYear();
      $scope.calendar.month = nowDate.getMonth() + 1;
    };

    //下单
    $scope.createOrder = function () {
      var param = $scope.order;
      param['userId'] = $scope.user.id;
      if (!$scope.user.id) {
        CommonToasts.showAlert('提示', '用户id不能为空!');
        return;
      }
      if (!$scope.order.name || !$scope.order.mobile || !$scope.order.address) {
        CommonToasts.showAlert('提示', '联系方式不能为空!');
        return;
      }
      if (new Date($scope.order.dateEnd).getTime() <= new Date($scope.order.dateFrom).getTime()) {
        CommonToasts.showAlert('提示', '日期选择有误,请重新选择!');
        return;
      }

      OrderService.createOrder(param, function (res) {
        CommonToasts.showAlert('提示', '下单成功!')
      }, function (res) {
        CommonToasts.showAlert('提示', '下单失败,请稍后再试!')
      });

    };

    $scope.initScope = function () {
      $scope.userBooks = [];
      $scope.deleteBookObj = {};
      $scope.initUserBooks();
      $scope.initCalendar();
      $scope.createCurrentCalendar();
      $scope.initOrder();
    };
    $scope.initScope();

    $scope.selectDateModalViewClick = function () {
      if (!$('#select-date-modal-view>ion-content')[0].contains(window.event.srcElement)) {
        $scope.hideSelectDateModal();
      }
    };
  }]);
