/**
 * Created by shihao on 16/11/1.
 */

'use strict';

presto.CONTROLLERS
.controller('PlantBooksCtrl',['$scope','$state','Params',function($scope,$state,Params){

  //选择植书方式
  $scope.goPlantMethods = function(plantType){
    Params.setParam('CurrentPlantType',plantType);
    $state.go('tabs.plantMethods');
  };

}]);
