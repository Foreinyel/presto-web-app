/**
 * Created by shihao on 16/11/1.
 */

'use strict';

presto.CONTROLLERS
  .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.goPlantBooks = function () {
      $state.go('tabs.plantBooks');
    };
  }]);
