/**
 * Created by lazyhome on 3/30/16.
 */
"use strict";
presto.SERVICES
  .service('Data',[function(){
    this.ordersData = [];

    this.setOrders = function(orders){
      this.ordersData = orders;
    };

    this.getOrders = function(){
      return this.ordersData;
    };

    this.removeOrder = function(order){
      var index = this.ordersData.indexof(order);
      if(index>=0){

      }
    }

}]);
