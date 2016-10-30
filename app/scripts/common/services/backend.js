/**
 * Created by shihao on 16/3/23.
 */
'use strict';
presto.BACKEND

    //用户模块
    .factory('User', ['$resource', 'ENV'
        , function ($resource, ENV) {

            return $resource('', '', {
                //登录
                login: {
                    method: "POST",
                    url: 'http://localhost:8080/' + 'user/login',
                    param: {},
                    isArray: false
                }
            });

        }])
;
