/**
 * Created by shihao on 16/3/23.
 */
'use strict';
presto.COMMON
.factory('Storage',function(){
  return {
    set: function (key, data) {
      return window.localStorage.setItem(key, window.JSON.stringify(data));
    },
    get: function (key) {
      return window.JSON.parse(window.localStorage.getItem(key));
    },
    remove: function (key) {
      return window.localStorage.removeItem(key);
    }
  };
});
