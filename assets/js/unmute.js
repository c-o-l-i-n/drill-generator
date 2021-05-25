// unmute code by Spencer Evans
// https://github.com/swevans/unmute
// Thanks, Spencer. This was a life saver.

'use strict'
function unmute(i) {
	var e
	void 0 !== document.hidden
		? (e = { hidden: 'hidden', visibilitychange: 'visibilitychange' })
		: void 0 !== document.webkitHidden
		? (e = {
				hidden: 'webkitHidden',
				visibilitychange: 'webkitvisibilitychange',
		  })
		: void 0 !== document.mozHidden
		? (e = { hidden: 'mozHidden', visibilitychange: 'mozvisibilitychange' })
		: void 0 !== document.msHidden &&
		  (e = { hidden: 'msHidden', visibilitychange: 'msvisibilitychange' })
	var n,
		t = navigator.userAgent.toLowerCase(),
		d =
			(0 <= t.indexOf('iphone') && t.indexOf('like iphone') < 0) ||
			(0 <= t.indexOf('ipad') && t.indexOf('like ipad') < 0) ||
			(0 <= t.indexOf('ipod') && t.indexOf('like ipod') < 0) ||
			(0 <= t.indexOf('mac os x') && 0 < navigator.maxTouchPoints),
		o = !0,
		a = !0,
		s = !0,
		c = !1,
		r = [
			'click',
			'contextmenu',
			'auxclick',
			'dblclick',
			'mousedown',
			'mouseup',
			'touchend',
			'keydown',
			'keyup',
		],
		u = !1,
		A = !1,
		v = !1
	function l(e) {
		'running' == i.state
			? (f(!1), c && i.suspend().then(h, h))
			: 'closed' != i.state && (c ? f(!1) : (f(!0), e && i.resume().then(h, h)))
	}
	function f(e) {
		if (u !== e) {
			u = e
			for (var i = 0, n = r; i < n.length; i++) {
				var t = n[i]
				e
					? window.addEventListener(t, m, { capture: !0, passive: !0 })
					: window.removeEventListener(t, m, { capture: !0, passive: !0 })
			}
		}
	}
	function h() {
		l(!1)
	}
	function m() {
		l(!0)
	}
	function g(e) {
		if (!v)
			if (n.paused)
				if (c) p(!1)
				else if (e) {
					p(!1), (v = !0)
					e = void 0
					try {
						;(e = n.play()),
							e
								? e.then(w, w)
								: (n.addEventListener('playing', w),
								  n.addEventListener('abort', w),
								  n.addEventListener('error', w))
					} catch (e) {
						w()
					}
				} else p(!0)
			else p(!1), c && n.pause()
	}
	function p(e) {
		if (A !== e) {
			A = e
			for (var i = 0, n = r; i < n.length; i++) {
				var t = n[i]
				e
					? window.addEventListener(t, b, { capture: !0, passive: !0 })
					: window.removeEventListener(t, b, { capture: !0, passive: !0 })
			}
		}
	}
	function w() {
		n.removeEventListener('playing', w),
			n.removeEventListener('abort', w),
			n.removeEventListener('error', w),
			(v = !1),
			g(!1)
	}
	function b() {
		g(!0)
	}
	function E() {
		a && s
			? o || ((o = !0), (c = !1), n && g(!0), l(!0))
			: o && ((o = !1), (c = !0), l(!0), n && g(!0))
	}
	function y() {
		e && document[e.hidden] == o && ((a = !document[e.hidden]), E())
	}
	function L(e) {
		;(e && e.target !== window) ||
			(document.hasFocus() ? s || ((s = !0), E()) : s && ((s = !1), E()))
	}
	function k(e, i) {
		for (var n = i; 1 < e; e--) n += i
		return n
	}
	d &&
		((t = document.createElement('div')),
		(t.innerHTML = "<audio x-webkit-airplay='deny'></audio>"),
		(n = t.children.item(0)),
		(n.controls = !1),
		(n.disableRemotePlayback = !0),
		(n.preload = 'auto'),
		(n.src =
			'data:audio/mpeg;base64,//uQx' +
			k(23, 'A') +
			'WGluZwAAAA8AAAACAAACcQCA' +
			k(16, 'gICA') +
			k(66, '/') +
			'8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI' +
			k(320, 'A') +
			'//sQxAADgnABGiAAQBCqgCRMAAgEAH' +
			k(15, '/') +
			'7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq' +
			k(18, '/') +
			'9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw' +
			k(97, 'V') +
			'Q=='),
		(n.loop = !0),
		n.load(),
		g(!0)),
		(i.onstatechange = function () {
			l(!0)
		}),
		l(!1),
		e && document.addEventListener(e.visibilitychange, y, !0),
		d &&
			(window.addEventListener('focus', L, !0),
			window.addEventListener('blur', L, !0)),
		y(),
		d && L()
}
