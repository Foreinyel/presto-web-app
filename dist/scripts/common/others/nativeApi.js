/**
 * Created by shihao on 16/9/12.
 */

'use strict';

presto.SERVICES
    .service('NativeApi', function () {

        var execute = function (data) {
            var iframe = document.createElement("IFRAME");
            var url = 'native://pay?data=' + JSON.stringify(data);
            iframe.setAttribute("src", url);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        };

        return {
            execute: execute
        };

    });
