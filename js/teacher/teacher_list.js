define(['aside', 'header', 'loading', 'nprogress', 'jquery', 'template', 'bootstrap'], function (undefined, undefined, undefined, nprogress, $, template, undefined) {

    // 渲染讲师列表
    (function () {
        /**
         * 1、发送请求获取讲师列表
         * 2、请求成功后调用template方法得到讲师列表html
         * 3、把html添加到页面中即可
         * */
        $.get('/v6/teacher', function (data) {
            if (data.code == 200) {
                $('.table-teacher-list').append(template('teacher-list-tpl', data));
            }
        })
    })();

    (function () {
        template.helper("getAge", function (birthday) {
            // 1. 获取当前年份
            var nowYear = new Date().getFullYear();
            // 2. 截取传进来的日期的年份，从开始到第4个
            var targetYear = birthday.substr(0, 4);
            // 3. 返回计算出来的年龄
            return nowYear - (+targetYear);
        })
    })();


    // 实现查看功能
    (function () {
        $(document).on('click', '.check', function () {
            $.ajax({
                type: 'GET',
                url: '/v6/teacher/view',
                data: {
                    tc_id: $(this).data('id')
                },
                success: function (data) {
                    if (data.code == 200) {
                        $('#table-teacher-info').html(template('teacher-info-tpl', data.result));
                    }
                }
            })
        })
    })();

    // 实现启用和注销的功能
    (function () {
        $(document).on('click', '.handle', function () {
            var self = this;
            $.ajax({
                type: 'POST',
                url: '/v6/teacher/handle',
                data: {
                    tc_id: $(this).data('id'),
                    tc_status: $(this).data('status')
                },
                success: function (data) {
                    // 如果为0，讲师当前是开启状态，那么更新按钮的自定义属性为当前状态，
					// 但是按钮显式相反的状态：注销，因为按钮表示的是点击后用户会成为什么状态。
					// 如果为1则相反。
                    if (data.code == 200) {
                        // console.log(data);
                        if(data.result.tc_status === 0) {
                            $(self).data('status', 0);
                            $(self).html('注销');

                            // $(self).data('status', 0).html('注销');
                            // $('.handle').data('status', 0).html('注销');
                        }else {
                            $(self).data('status', 1);
                            $(self).html('启用');

                            // $(self).data('status', 1).html('启用');
                            // $('.handle').data('status', 1).html('启用');
                        }
                    }
                }
            })
        })
    })();


    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});