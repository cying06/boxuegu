define(['aside', "nprogress", 'header', 'jquery', 'loading', 'template', 'datepicker', 'datepickerCN', 'jqueryForm'], function (undefined, nprogress, undefined, $, undefined, template, undefined, undefined, undefined) {

    /**
     * 提取查询字符串中指定的值：
     * 1、先去掉查询字符串的?号
     * 2、使用&符号劈开这个字符串，得到一个数组，里面存储着每一个单独的查询字符串
     * 3、然后遍历这个数组，每一个单独字符串继续使用=号劈开，提取每一个查询字符串的key与value
     * 4、把这些查询字符串的key与value存储到一个对象中，方便使用
     * */
    var urlSearch = location.search.slice(1);
    var urlSearchArr = urlSearch.split('&');
    var urlSeachObj = {}, temp;
    // var urlSeachObj = {};
    // var temp;
    for (var i = 0, len = urlSearchArr.length; i < len; i++) {
        temp = urlSearchArr[i].split('=');
        urlSeachObj[temp[0]] = temp[1];
    }

    if(urlSeachObj.hasOwnProperty('tc_id')) {
        teacherEdit();
    }else {
        teacherAdd();
    }

    // 我们这里的js，作用与两个页面，一个是讲师添加，一个是讲师编辑。
    function teacherAdd() {
        // 把模版渲染到页面中，因为是添加，所以不需要回显数据，那么传递一个空对象即可
        $('.teacher').html(template('teacher-add-edit-list', {}));

        // $(document).on('submit', '#teacher-add-form', function() {
        //     $.post('/v6/teacher/add', $(this).serialize(), function(data){
        //          location.href = "/html/teacher/teacher_list.html";            
        //     })
        //     return false;
        // })

        $('#teacher-add-form').ajaxForm(function(data) {
            location.href = "/html/teacher/teacher_list.html";
        });
        initDatepicker();
    }

    function teacherEdit() {
        $.get('/v6/teacher/edit', { tc_id: urlSeachObj.tc_id }, function(data){
            if (data.code == 200) {
                console.log(data);
                $('.teacher').html(template('teacher-add-edit-list', data.result));

                initDatepicker();
            }
        })

        $(document).on('submit', '#teacher-add-form', function() {
            $.post('/v6/teacher/update', $(this).serialize(), function(data) {
                location.href = "/html/teacher/teacher_list.html";
            })
            return false;
        })

        
    }


    function initDatepicker() {
        $('#datepicker-join').datepicker({
            language: 'zh-CN',
            endDate: new Date(),
            format: 'yyyy-mm-dd'
        })
    }

    // 页面所有代码执行完毕，进度条结束
    nprogress.done();
});