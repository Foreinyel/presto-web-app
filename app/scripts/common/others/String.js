/**
 * Created by shihao on 16/12/1.
 */

'use strict';

String.prototype.replaceAll = function(s1,s2){
  return this.replace(new RegExp(s1,"gm"),s2);
}
