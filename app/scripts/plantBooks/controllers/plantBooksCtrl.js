/**
 * Created by shihao on 16/11/1.
 */

'use strict';

presto.CONTROLLERS
.controller('PlantBooksCtrl',['$scope','$state','Params','PlantBookType',function($scope,$state,Params,PlantBookType){

  //选择植书方式
  $scope.goPlantMethods = function(plantType){
    Params.setParam('CurrentPlantType',PlantBookType[plantType]);
    $state.go('tabs.plantMethods');
  };

}]);
