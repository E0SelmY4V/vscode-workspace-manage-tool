function randomBGC() {
	var color = [
		"#dc1a0e",
		"#01cd0f",
		"#f2e722",
		"#04c3f2",
		"#da5bc5"
	];
	return color[Math.floor(Math.random() * color.length)];
}
function getRunFunc(uri) {
	return function () { runcode(CONFIG.code, uri); }
}
function list() {
	var lmon = function (n) {
		if (!n) n = this;
		n.getElementsByTagName("div")[0].style.display = "none";
		n.style.background = n.color;
	}, lmout = function (n) {
		if (!n) n = this;
		n.getElementsByTagName("div")[0].style.display = "block";
		n.style.background = "";
	}, lclick = function () {
		runcode(CONFIG.code, this.uri);
		lmout(this);
		var n = this;
		setTimeout(function () { lmon(n) }, 120);
	};
	llist_home.backgroundColor = randomBGC();
	(function (li, node, uri, isInner) {
		var nbox, nblk, ntxt, icon, i = -1 + isInner, info;
		while (info = li[++i]) {
			if (info instanceof Array) {
				nbox = document.createElement("div");
				nbox.className = "llist_group";
				node.appendChild(nbox);
				ntxt = document.createElement("span");
				ntxt.innerHTML = '<div class="blurBG"></div><div class="llist_line"></div><h3>' + info[0].name + '</h3>';
				ntxt.className = "llist_title";
				nbox.appendChild(ntxt);
				nbox.appendChild(document.createElement("br"));
				arguments.callee(info, nbox, uri + info[0].path + "\\", 1);
			} else {
				nbox = document.createElement("span");
				nbox.className = "llist_nbox";
				nbox.color = randomBGC();
				nbox.onmouseover = lmon;
				nbox.onmouseout = lmout;
				nbox.uri = uri + info.file;
				nbox.onclick = lclick;
				node.appendChild(nbox);
				nblk = document.createElement("div");
				nblk.className = "llist_bg";
				if (info.bg) nblk.style.background = info.bg;
				nbox.appendChild(nblk);

				nblk = document.createElement("div");
				nblk.className = "llist_nblk";
				if (info.icon) {
					icon = document.createElement("img");
					icon.src = info.icon;
					icon.style.width = icon.style.height = "100%";
					icon.style.position = "absolute";
					nblk.appendChild(icon);
				} else nblk.style.backgroundColor = nbox.color;
				nbox.appendChild(nblk);
				for (var j = 1; j >= 0; j--) {
					ntxt = document.createElement("span");
					ntxt.innerHTML = info.name;
					ntxt.className = "llist_ntxt" + j;
					nblk.appendChild(ntxt);
				}
			}
		}
	}(CONFIG.workspace, llist, "", 0));
	var i = -1, nbox, nblk, ntxt, info, tmon = function () {
		this.parentNode.style.background = this.parentNode.color;
	}, tmout = function () {
		this.parentNode.style.background = "";
	};
	while (info = CONFIG.sidebar[++i]) {
		nbox = document.createElement("div");
		nbox.className = "ltool_nbox";
		nbox.innerHTML = "&nbsp;";
		nbox.color = randomBGC();
		ltool.appendChild(nbox);
		for (var j = 2; j >= 0; j--) {
			ntxt = document.createElement("span");
			ntxt.innerHTML = info.name;
			ntxt.className = "ltool_ntxt" + j;
			nbox.appendChild(ntxt);
		}
		nblk = document.createElement("div");
		nblk.className = "ltool_cover";
		nblk.onmouseover = tmon;
		nblk.onmouseout = tmout;
		nblk.onclick = info.action;
		nblk.innerHTML = "mmmmmmmmmmm";
		nbox.appendChild(nblk);
	}
}