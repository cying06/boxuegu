define(['jquery'],function($) {
    $(document).ajaxStart(function() {
        $('.overlay').show();
    });
    $(document).ajaxStop(function() {
        $('.overlay').hide();
    })
})