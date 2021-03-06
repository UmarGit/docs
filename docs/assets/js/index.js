function OpenNavBar() {
  let element = document.getElementById('menu-link-small-screen');
  element.style.transform = 'translateY(0)';
}

function CloseNavBar() {
  let element = document.getElementById('menu-link-small-screen');
  element.style.transform = 'translateY(-100vh)';
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (window.scrollY < 100) {
    let aside = document.getElementsByTagName('aside');
    aside[0].style.position = 'absolute'
  }
  else {
    let aside = document.getElementsByTagName('aside');
    aside[0].style.position = 'fixed'
  }
}





! function (e, n) {
	"object" == typeof exports && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n()
}(0, function () {
	"use strict";

	function e(e, n) {
		void 0 === n && (n = {});
		var t = n.insertAt;
		if (e && "undefined" != typeof document) {
			var a = document.head || document.getElementsByTagName("head")[0],
				o = document.createElement("style");
			o.type = "text/css", "top" === t && a.firstChild ? a.insertBefore(o, a.firstChild) : a.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
		}
	}
	var t;

	function a(e) {
		if (e && null != t) {
			var n = e.getBoundingClientRect().top;
			document.querySelector(".sidebar").scrollBy(0, n - t)
		}
	}

	function n() {
		requestAnimationFrame(function () {
			var e = document.querySelector(".app-sub-sidebar > .active");
			if (e)
				for (e.parentNode.parentNode.querySelectorAll(".app-sub-sidebar").forEach(function (e) {
						return e.classList.remove("open")
					}); e.parentNode.classList.contains("app-sub-sidebar") && !e.parentNode.classList.contains("open");) e.parentNode.classList.add("open"), e = e.parentNode
		})
	}

	function o(e) {
		t = e.target.getBoundingClientRect().top;
		var n = s(e.target, "LI", 2);
		n && (n.classList.contains("open") ? (n.classList.remove("open"), setTimeout(function () {
			n.classList.add("collapse")
		}, 0)) : (! function (e) {
			if (e)
				for (e.classList.remove("open", "active"); e && "sidebar-nav" !== e.className && e.parentNode;) "LI" !== e.parentNode.tagName && "app-sub-sidebar" !== e.parentNode.className || e.parentNode.classList.remove("open"), e = e.parentNode
		}(r()), i(n), setTimeout(function () {
			n.classList.remove("collapse")
		}, 0)), a(n))
	}

	function r() {
		var e = document.querySelector(".sidebar-nav .active");
		e || (e = s(document.querySelector('.sidebar-nav a[href="'.concat(decodeURIComponent(location.hash).replace(/ /gi, "%20"), '"]')), "LI", 2)) && e.classList.add("active");
		return e
	}

	function i(e) {
		if (e)
			for (e.classList.add("open", "active"); e && "sidebar-nav" !== e.className && e.parentNode;) "LI" !== e.parentNode.tagName && "app-sub-sidebar" !== e.parentNode.className || e.parentNode.classList.add("open"), e = e.parentNode
	}

	function s(e, n, t) {
		if (e && e.tagName === n) return e;
		for (var a = 0; e;) {
			if (t < ++a) return;
			if (e.parentNode.tagName === n) return e.parentNode;
			e = e.parentNode
		}
	}
  e(`
    .sidebar-nav > ul > li ul li ul {\n  display: none;\n}\n\n
    .app-sub-sidebar {\n  display: none;\n}\n\n
    .app-sub-sidebar.open {\n  display: block;\n}\n\n
    .sidebar-nav .open > ul:not(.app-sub-sidebar),\n.sidebar-nav .active:not(.collapse) > ul {\n  display: block;\n}\n\n\n
    .sidebar-nav li.open:not(.collapse) > ul {\n  display: block;\n}\n\n
    .active + ul.app-sub-sidebar {\n  display: block;\n}\n
  `), 
  document.addEventListener("DOMContentLoaded", function () {
		document.querySelector(".sidebar-nav").addEventListener("click", o)
  }), 
  document.addEventListener("scroll", n);
	e("@media screen and (max-width: 768px) {\n  /* 移动端适配 */\n  .markdown-section {\n    max-width: none;\n    padding: 16px;\n  }\n  /* 改变原来按钮热区大小 */\n  .sidebar-toggle {\n    padding: 0 0 10px 10px;\n  }\n  /* my pin */\n  .sidebar-pin {\n    appearance: none;\n    outline: none;\n    position: fixed;\n    bottom: 0;\n    border: none;\n    width: 40px;\n    height: 40px;\n    background: transparent;\n  }\n}\n");
	var d = "DOCSIFY_SIDEBAR_PIN_FLAG";

	function c() {
		var e = localStorage.getItem(d);
		e = "true" === e, localStorage.setItem(d, !e), document.querySelector(".content").style.transform = e ? document.querySelector(".sidebar").style.transform = "translateX(0)" : document.querySelector(".sidebar").style.transform = "translateX(300px)"
	}! function () {
		if (!(768 < document.documentElement.clientWidth)) {
			localStorage.setItem(d, !1);
			var e = document.createElement("button");
			e.classList.add("sidebar-pin"), e.onclick = c, document.body.append(e), window.addEventListener("load", function () {
				var n = document.querySelector(".content");
				document.body.onclick = n.onclick = function (e) {
					e.target !== document.body && e.currentTarget !== n || "true" === localStorage.getItem(d) && c()
				}
			})
		}
	}(),
	function () {
		if (window.$docsify) {
			for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++) n[t] = arguments[t];
			$docsify.plugins = n.concat($docsify.plugins || [])
		} else console.error("这是一个docsify插件，请先引用docsify库！")
	}(function (e, n) {
		e.doneEach(function (e, n) {
			var t = r();
			i(t), document.querySelectorAll(".sidebar-nav li").forEach(function (e) {
				e.querySelector("ul:not(.app-sub-sidebar)") ? e.classList.add("folder") : e.classList.add("file")
			}), a(t), n(e)
		})
	})
});