/**
 * Created by shihao on 16/6/2.
 */

'use strict';

$.rem2px = function(r){  //rem to px
    var parseUnit = $('html').css('font-size');
    parseUnit = Number(parseUnit.substr(0,parseUnit.indexOf('px')));
    var tmp = r.substr(0,r.indexOf('rem')) || '0';
    return Number(tmp * parseUnit);
};