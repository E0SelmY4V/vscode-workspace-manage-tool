var timeGO = (function () {
	function getTime() {
		var d = new Date(), i,
			s = [d.getHours(), d.getMinutes(), d.getSeconds()];
		ltime_chn.innerText = sinoNum(s[0]) + "点" + sinoNum(s[1]) + "分" + sinoNum(s[2]) + "秒";
		for (i = 0; i < 3; i++) if (s[i] < 10) s[i] = '0' + s[i];
		ltime_num.innerText = s.join(":");
	}
	return function () {
		getTime();
		setInterval(getTime, 1000);
	}
}());