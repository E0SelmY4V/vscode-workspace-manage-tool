var CONFIG = {
	code: "E:\\Program Files\\Microsoft VS Code\\Code.exe",
	bgp: "http://loc.com:8081/img/others/beauty/random/",
	workspace: [
		{
			name: "C++",
			file: "cpp",
			icon: "F:\\F1\\website\\wwwroot\\img\\ico\\others\\cpp.png"
		}, {
			name: "工作区列表.hta",
			file: "workspace-list"
		}, {
			name: "Pixiv CN",
			file: "pcn",
			icon: "F:\\F1\\website\\pcn\\logo.png"
		}, {
			name: "简单代理",
			file: "sona",
			icon: "F:\\F1\\website\\sona\\logo.png"
		}, [
			{
				name: "SEVENTOP.TOP",
				path: "seventop.top"
			}, {
				name: "网站根目录",
				file: "website"
			}, {
				name: "Apache<br />配置",
				file: "etc-apache2",
				icon: "workspace/apache.jpg"
			}, {
				name: "家",
				file: "home"
			}
		], [
			{
				name: "幻想私社程序",
				path: "scpos"
			}, {
				name: "ScpoPHP",
				file: "scpo-php",
				bg: "orange"
			}, {
				name: "ScpoPHP Doc",
				file: "scpo-php-doc",
				bg: "orange"
			}, {
				name: "ScpoAPI",
				file: "scpo-api"
			}, {
				name: "scpo-webreq.js",
				file: "webreq"
			}
		], [
			{
				name: "|简·陋| 系列程序",
				path: "sc"
			}, {
				name: "网站配置<br />快捷工具",
				file: "site-conf"
			}, {
				name: "查IP工具",
				file: "chaip"
			}
		], [
			{
				name: "CCPIRA<br />中国计算机编程非正式研究协会",
				path: "ccpira"
			}, {
				name: "CCPIRA<br />Script<br />Online",
				file: "js"
			}
		], [
			{
				name: "学习",
				path: "learn"
			}, {
				name: "sino-num.js",
				file: "sino-num"
			}
		]
	],
	sidebar: [{
		name: "本地网站",
		action: function () {
			Runfile("\"explorer.exe\" \"F:\\F1\\website\\\"");
		}
	}]
};