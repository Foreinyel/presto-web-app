/**
 * Created by shihao on 16/11/6.
 */

'use strict';
presto.SERVICES
  .service('PlantBookService', ['PlantBook', function (PlantBook) {

    //植书
    this.plantBook = function (param, successfunction, errorfunction, finalfunction) {
      PlantBook.commonPlant({}, param).$promise.then(successfunction, errorfunction)['finally'](finalfunction);
    };

  }]);
