/**
 * Created by shihao on 16/11/19.
 */

'use strict';
presto.CONTROLLERS
  .controller('SearchBookCtrl', ['$scope', 'BookService','$state','Params'
    , function ($scope, BookService,$state,Params) {

    $scope.bookList = [];
    $scope.findBooks = function () {
      BookService.findBooks({}, function (res) {
        if (res && res.responseCode == 0) {
          $scope.bookList = res.data;
        }
      }, function (res) {

      });
    };

    $scope.goBookDetail=function(book){
      Params.setParam('bookDetail_bookId',book.bookId);
      $state.go('tabs.bookDetail');
    };

    $scope.initScope = function () {
      $scope.findBooks();
    };
    $scope.initScope();
  }]);
