"use strict";
/**
 * 转换阿拉伯数字为中文
 * @param {number|string} num 要转换的数字
 * @param {?boolean} haveLiang 是否使用两，默认是
 * @param {?boolean} mem 是否记忆大单位来加快速度，默认是
 * @returns {string} 中文数字
 * @author E0SelmY4V from 幻想私社
 * @link https://github.com/E0SelmY4V/sino-num.js
 * @version 1.0.0
 */
function sinoNum() { }
sinoNum = (function () {
	/**数字 */
	var headNum = [
		'零', '一', '两', '三', '四',
		'五', '六', '七', '八', '九'
	];
	/**小单位 */
	var preUnit = [
		'', '十', '百', '千'
	];
	/**大单位 */
	var attUnit = [
		'万', '亿', '兆', '京', '垓',
		'杼', '穰', '沟', '涧', '正',
		'载', '极', '恒河沙', '阿僧口',
		'那由它', '不可思议', '无量',
		'大数'
	];
	/**大单位记忆数组，用以加快速度 */
	var unitMem = [];
	/**
	 * 获取一个大单位
	 * @param {number} place 大单位的位数
	 * @param {boolean} mem 是否记忆大单位来加快速度
	 * @returns {string} 大单位的中文
	 */
	function placePower(place, mem) {
		if (unitMem[place]) return unitMem[place];
		var r = "", p = place.toString(2).split(''), c, w = -1, i = p.length;
		while (w++, c = p[--i]) if (c === '1') r += attUnit[w];
		return mem ? unitMem[place] = r : r;
	}
	/**
	 * 获取一个大部分
	 * @param {string} num 大部分四个数
	 * @param {number} place 大单位的位数
	 * @param {boolean} haveLiang 是否使用两
	 * @param {boolean} mem 是否记忆大单位来加快速度
	 * @returns {string} 大部分的中文
	 */
	function getPlace(num, place, haveLiang, mem) {
		if (num === '0000') return headNum[0];
		var i = -1, w = 4, r = "", f, t, num = num.split('');
		while (i++, w--) {
			if (num[i] !== '0') {
				if (f) r += headNum[0];
				t = headNum[num[i]];
				if (num[i] === '2') {
					if (!haveLiang) t = '二';
					else if (w === 1) t = '二';
					else if (w === 0 && num[i - 1] !== '0') t = '二';
				}
				r += t + preUnit[w], f = false;
			} else f = true;
		}
		return r + placePower(place, mem);
	}
	return function (num, haveLiang, mem) {
		if (typeof haveLiang == "undefined") haveLiang = true;
		if (typeof mem == "undefined") mem = true;
		var t, i, r = "", j, c, w = 0, f;
		num = parseInt(num);
		if (!num) return headNum[0];
		if (num < 0) f = true, num = -num;
		num = String(num).split('');
		if (t = num.length % 4) for (i = 3 - t; i >= 0; i--) num.unshift('0');
		for (i = num.length; i > 0; i -= 4) {
			c = "";
			for (var j = i - 4; j < i; j++) c += num[j];
			t = getPlace(c, w++, haveLiang, mem);
			if (
				r.slice(0, 1) && r.slice(0, 1) === headNum[0] && t.slice(0, 1) === headNum[0]
			) t = t.slice(1);
			r = t + r;
		}
		r = r.split('');
		if (r[0] === "零") r = r.slice(1);
		if (r[0] + r[1] === "一十") r = r.slice(1);
		if (r[r.length - 1] === "两") r[r.length - 1] = "二";
		if (f) r.unshift("负");
		return r.join('');
	}
}());