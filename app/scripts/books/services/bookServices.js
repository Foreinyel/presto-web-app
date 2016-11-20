/**
 * Created by shihao on 16/11/19.
 */

'use strict';
presto.SERVICES
  .service('BookService',['Book',function(Book){

    this.findBooks = function(param,successfunction,errorfunction,finalfunction){
        Book.findBooks(param).$promise.then(function(response){
          return response;
        }).then(successfunction,errorfunction)['finally'](finalfunction);
    };

  }]);
