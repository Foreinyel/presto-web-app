/**
 * Created by shihao on 16/11/6.
 */

'use strict';

presto.CONTROLLERS
  .controller('ManualPlantCtrl', ['$scope', '$state', 'PlantBookService', 'CommonToasts','Storage','Params', function ($scope, $state, PlantBookService, CommonToasts,Storage,Params) {
    $scope.bookInfo = {
      bookName: '',
      bookAuthor: '',
      bookPress: '',
      bookIsbn: '',
      bookImgUrl: ''
    };

    $scope.showPlantSuccess = false;

    $scope.savePlantBookReq = function () {
      var param = {
        userId: $scope.user.id,
        plantType: $scope.currentPlantType,
        plantMethod: $scope.currentPlantMethod,
        bookName: $scope.bookInfo.bookName,
        bookAuthor: $scope.bookInfo.bookAuthor,
        bookPress: $scope.bookInfo.bookPress,
        bookIsbn: $scope.bookInfo.bookIsbn,
        bookImgUrl: ''
      };

      if (!param.bookName) {
        CommonToasts.showAlert("书名不能为空!");
        return;
      }
      /*if (!param.bookAuthor) {
        CommonToasts.showAlert("作者不能为空!");
        return;
      }
      if (!param.bookPress) {
        CommonToasts.showAlert("出版社不能为空!");
        return;
      }*/
      if (!param.bookIsbn) {
        CommonToasts.showAlert("ISBN不能为空!");
        return;
      }

      PlantBookService.plantBook(param, function (res) {
        if (res && res.responseCode == 0) {
          $scope.showPlantSuccess = true;
        } else {
          CommonToasts.showAlert("植书失败,请稍后再试!");
        }
      });
    };

    $scope.continuePlantBook = function(){
      $scope.initScope();
      $scope.showPlantSuccess = false;
    };

    $scope.initScope = function () {
      $scope.bookInfo = {
        bookName: '',
        bookAuthor: '',
        bookPress: '',
        bookIsbn: '',
        bookImgUrl: ''
      };
      $scope.user =  Storage.get('LoginUser');
      $scope.currentPlantType = Params.getParam('CurrentPlantType');
      $scope.currentPlantMethod = Params.getParam('currentPlantMethod');
    };
    $scope.initScope();
  }]);
