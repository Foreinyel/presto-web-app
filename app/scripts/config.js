/**
 * Created by shihao on 16/3/24.
 */
"use strict";
presto.CONFIG
  .constant('ENV', {
    //baseUrl: 'http://localhost:8080/'
    baseUrl: 'http://http://120.76.52.196:7777/'
  })
  .constant('PlantBookMethod',{
    qrcode:0, //扫码植书
    search:1, //搜索植书
    manual:2  //手动植书
  })
  .constant('PlantBookType',{
    donate:0, //捐赠
    share:1,  //分享
    keep:2    //个人分享
  })
;
