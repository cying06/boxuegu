define(["jquery", "common", "header", "nprogress"], function ($, undefined, undefined, nprogress) {
    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});


// define(["jquery"], function($) {
// 	$.ajax({
//         url:"/v6/login",
//         type: "post",
//         data:{
//             tc_name: "前端学院",
//             tc_pass: 123456
//         },
//         success: function(data) {
//             console.log(data);
//         }
//     })
// });