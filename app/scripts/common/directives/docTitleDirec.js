/**
 * Created by shihao on 16/5/16.
 */

'use strict';
presto.DIRECTIVES
.directive('docTitle',function(){
    return {
        restrict:'A',
        link:function(scope,ele,attr){
            var title = attr.docTitle;
            if(!title){
                title = attr.viewTitle;
            }
            scope.$on('$ionicView.enter',function(){
                //alert(title);
                document.title = title;
                var $body = $('body');
                var $iframe = $('<iframe src="favicon.ico"></iframe>').on('load', function() {
                    setTimeout(function() {
                        $iframe.off('load').remove()
                    }, 0)
                }).appendTo($body);
            });

            //更换document title
            scope.changeDocTitle = function(title){
                document.title = title;
                var $body = $('body');
                var $iframe = $('<iframe src="favicon.ico"></iframe>').on('load', function() {
                    setTimeout(function() {
                        $iframe.off('load').remove()
                    }, 0)
                }).appendTo($body);
            };
        }
    };
});
