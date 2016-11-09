/**
 * Created by shihao on 16/11/3.
 */

'use strict';

presto.CONTROLLERS
  .controller('PlantMethodsCtrl',['$scope','$state','Params','PlantBookMethod',function($scope,$state,Params,PlantBookMethod){


    $scope.goManualPlant = function(){
      Params.setParam('currentPlantMethod',PlantBookMethod.manual);
      $state.go('tabs.manualPlant');
    };
  }]);
