/**
 * Created by shihao on 16/11/24.
 */

'use strict';

presto.CONTROLLERS
  .controller('BookPackageCtrl', ['$scope', '$state', 'Storage', function ($scope, $state, Storage) {

    $scope.userBooks = [];
    $scope.deleteBookObj = {};

    $scope.initUserBooks = function () {
      var loginUser = Storage.get('LoginUser');
      if (loginUser) {
        var books = loginUser.bookPackage;
        if(!books){
          return;
        }
        for (var i = 0; i < books.length; i++) {
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

    $scope.selectBookItem = function (b) {
      b.selected = !b.selected;
      if (b.selected) {
        $scope.deleteBookObj[b.id] = true;
      } else {
        //$scope.deleteBookObj.
        delete $scope.deleteBookObj[b.id];
      }
    };

    $scope.deleteUserBook = function () {
      var loginUser = Storage.get('LoginUser');
      var books = loginUser.bookPackage;
      for (var i = 0; i < books.length; i++) {
        if ($scope.deleteBookObj[books[i].id]) {
          books.remove(books[i]);
        }
      }
      loginUser.bookPackage = books;
      Storage.set('LoginUser', loginUser);
      $scope.initScope();
    };

    $scope.goOrder = function(){
      $state.go('tabs.order');
    };

    $scope.initScope = function () {
      $scope.userBooks = [];
      $scope.deleteBookObj = {};
      $scope.initUserBooks();
    };
    $scope.initScope();

  }]);
