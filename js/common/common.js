define(['jqueryCookie'], function() {
	
	/**
	 * 判断用户有没有登陆过，
	 * 没有的话跳转到登陆页。
	 * */
	// var cookieArr = document.cookie.split("; ");

	// var isLogin = false;

	// for(var i = 0; i < cookieArr.length; i++ ) {
	// 	if(cookieArr[i].indexOf("PHPSESSID=") === 0) {
	// 		isLogin = true;
	// 		break;
	// 	}
	// }

	// !isLogin && (location.href = "/html/home/login.html");





	!$.cookie("PHPSESSID") &&  (location.href = "/html/home/login.html");
})
