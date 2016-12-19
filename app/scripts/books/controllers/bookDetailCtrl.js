/**
 * Created by shihao on 16/11/20.
 */

'use strict';

presto.CONTROLLERS
  .controller('BookDetailCtrl', ['$scope', '$state', 'BookService', 'Params','$ionicModal','Storage', function ($scope, $state, BookService, Params,$ionicModal,Storage) {

    $scope.currentBookId = Params.getParam('bookDetail_bookId');
    $scope.book = {};
    $scope.currentSelectedUserBook = '';
    $scope.userBooks = [];

    $scope.loadBook = function () {
      var param = {
        bookId: $scope.currentBookId
      };
      BookService.findBookById(param, function (res) {
        if(res && res.responseCode == 0){
          $scope.book = res.data;
          $scope.userBooks = $scope.book.userBookROList;
        }
      }, function (res) {

      });
    };

    $scope.goBookPackage = function(){
      $state.go('tabs.bookPackage');
    };

    $scope.userBookModal = '';
    $ionicModal.fromTemplateUrl('show-user-book-modal', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.userBookModal = modal;
    });

    $scope.showUserBookModal = function(){
      $scope.userBookModal.show();
    };

    $scope.selectUserBook = function(item){
      $scope.currentSelectedUserBook = item;
    };

    $scope.userBookConfirm = function(){
      var loginUser = Storage.get('LoginUser');
      if(!loginUser.bookPackage){
        loginUser.bookPackage = [];
      }
      $scope.currentSelectedUserBook['bookName'] = $scope.book.bookName;
      $scope.currentSelectedUserBook['authorName'] = $scope.book.authorName;
      $scope.currentSelectedUserBook['bookPress'] = $scope.book.bookPress;
      $scope.currentSelectedUserBook['bookDesc'] = $scope.book.bookDesc;
      loginUser.bookPackage.push($scope.currentSelectedUserBook);
      Storage.set('LoginUser',loginUser);
      $scope.userBookModal.hide();
    };

    $scope.initScope = function(){
      $scope.loadBook();
    };
    $scope.initScope();

  }]);
