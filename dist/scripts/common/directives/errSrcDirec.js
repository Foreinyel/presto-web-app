/**
 * Created by shihao on 16/3/24.
 */


'use strict';
presto.DIRECTIVES
  .directive('errSrc',function() {
    return {
      link: function (scope, element, attrs) {
        if(attrs.ngSrc == ''){
          attrs.$set('src', attrs.errSrc);
        }
        element.bind('error', function () {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        })
      }
    }
  })
