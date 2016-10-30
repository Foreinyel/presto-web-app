/**
 * Created by shihao on 16/5/3.
 */
'use strict';
presto.SERVICES
.factory('Params',function(){

    var param = {

    };

    var setParam = function(key,value){
        param[key] = value;
    };

    var getParam = function(key){
        return param[key];
    };

    return {
        setParam:setParam,
        getParam:getParam
    };

});
