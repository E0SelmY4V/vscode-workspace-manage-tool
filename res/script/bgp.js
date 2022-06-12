(function (scpo) {
	function getStyle(node) {
		return document.defaultView
			? document.defaultView.getComputedStyle(node).position
			: node.currentStyle.position;
	}
	function setBackground(node, dadNode) {
		var s = node.style, dadBody;
		dadBody = dadNode.localName ? dadNode.localName : dadNode.nodeName;
		dadBody = Boolean(dadBody.toLowerCase().indexOf("body") + 1);
		s.position = dadBody ? "fixed" : "absolute";
		if (getStyle(dadNode).position == "static") dadNode.style.position = "relative";
		s.top = s.left = s.margin = s.padding = "0";
		s.zIndex = "-999";
		s.overflow = "hidden";
		s.height = s.width = "100%";
		return node;
	}
	function resize() {
		for (var i = 0, f = this.rsFunc, l = f.length; i < l; i++) f[i]();
	}
	function createIfr(boxNode, rsFunc) {
		var ifrNode = document.createElement("iframe");
		boxNode.ifr.push(boxNode.appendChild(ifrNode));
		ifrNode.style.height = ifrNode.style.width = "100%";
		ifrNode.onload = ifrNode.contentWindow.onload = function () {
			this.rsFunc = rsFunc;
			this.onresize = resize;
		}
	}
	var IFR_NUMBER = 1;
	function ifrNumber(n) {
		if (typeof n != "undefined") {
			for (var i = 0, l = rsBox.length, n; (e = rsBox[i], i < l); i++) {
				for (var j = e.ifr.length; j < n; j++) createIfr(e, e.fun);
				for (var j = e.ifr.length; j > n; j--) e.removeChild(e.ifr.pop());
			}
			IFR_NUMBER = n;
		}
		return IFR_NUMBER;
	}
	var rsBox = [];
	scpo.rsBox = rsBox;
	function rsPush(node, func) {
		if (node.scpo_rsFunc) return node.scpo_rsFunc.push(func);
		var boxNode = document.createElement("div"), rsFunc = [func];
		boxNode.fun = node.scpo_rsFunc = rsFunc;
		boxNode.ifr = [];
		rsBox.push(node.appendChild(setBackground(boxNode, node)));
		boxNode.style.zIndex = "-9999";
		boxNode.style.background = "#333";
		for (var i = 0; i < IFR_NUMBER; i++) createIfr(boxNode, rsFunc);
		return 1;
	}
	scpo.getStyle = getStyle;
	scpo.setBackground = setBackground;
	scpo.ifrNumber = ifrNumber;
	scpo.rsPush = rsPush;
	function createBGP(uri) {
		var boxNode = document.createElement("div"),
			picNode = document.createElement("img"),
			picStyle = picNode.style,
			temp = document.scripts,
			scale = 1,
			dadNode = temp[temp.length - 1].parentNode;
		picNode.src = uri;
		picStyle.position = "relative";
		dadNode.insertBefore(scpo.setBackground(boxNode, dadNode), dadNode.firstChild);
		temp = scpo.rsPush(dadNode, function () {
			var x = boxNode.clientWidth, y = boxNode.clientHeight,
				yFact = y, xFact = x;
			x / y < scale ? x = y * scale : y = x / scale;
			picStyle.width = (x += 2) + "px";
			picStyle.height = (y += 2) + "px";
			picStyle.left = (xFact - x) / 2 + "px";
			picStyle.top = (yFact - y) / 2 + "px";
		});
		picNode.onload = function () {
			scale = picNode.width / picNode.height;
			dadNode.scpo_rsFunc[temp - 1]();
			boxNode.appendChild(picNode);
		};
		if (picNode.readystate == "complete") picNode.onload();
	}
	function toBGP(picNode) { }
	scpo.createBGP = createBGP;
}(window.ScpoUI ? ScpoUI : ScpoUI = {}));