if (!window.console) {
	console = {
		log : function() {
		}
	}
}
var _defaultWidth = 1280;
var _sect1DefaultHeight = 1450;
var _sect2DefaultHeight = 2200;
var _sect3DefaultHeight = 3683;
var _sect4DefaultHeight = 2100;
var _sect5DefaultHeight = 2814;
var _sect1CurrHeight = _sect1DefaultHeight;
var _sect2CurrHeight = _sect2DefaultHeight;
var _sect3CurrHeight = _sect3DefaultHeight;
var _sect4CurrHeight = _sect4DefaultHeight;
var _sect5CurrHeight = _sect5DefaultHeight;
var c1w, c1h, c2w, c2h, c3w, c3h, c4w, c4h, c5w, c5h;
$(document).ready(function() {
	function R() {
		for (var a = 0; a < D.length; a++) {
			D[a].el.css("height", D[a].h + "px")
		}
	}

	function S() {
		$(window).bind("scroll", function(a) {
			jb();
			nb();
			hb();
			X()
		});
		$(window).bind("resize", function(a) {
			lb();
			X()
		})
	}

	function T() {
		U("hidden");
		B = $("img").length;
		var a = $(".pBar", c);
		c.css("height", b.height() + "px");
		c.css("width", b.width() + "px");
		c.css("top", 0);
		a.css("width", "0px");
		a.css("top", b.height() / 2 + "px");
		for (var d = 0; d < B; d++) {
			$("img").eq(d).css("visibility", "hidden");
			$("img").eq(d).imagesLoaded(V)
		}
	}

	function U(a) {
		$("body").css("overflow", a)
	}

	function V() {
		C++;
		var a = $(".pBar", c);
		var d = C / B;
		var e = b.width() * d;
		a.stop().animate({
			width : e
		}, 1e3, function() {
			if (C >= B) {
				W()
			}
		})
	}

	function W() {
		for (var a = 0; a < B; a++) {
			$("img").eq(a).css("visibility", "visible")
		}
		var b = $(".pBar", c);
		b.css("display", "none");
		c.stop().animate({
			opacity : 0
		}, 1200, function() {
			c.css("display", "none");
			U("visible")
		});
		lb()
	}

	function X() {
		var a = $(".pBar", c);
		c.css("height", b.height() + "px");
		c.css("width", b.width() + "px");
		c.css("top", y);
		a.css("top", b.height() / 2 + "px")
	}

	function Y(a) {
		var b = 4;
		var c = 0;
		var d = 0;
		o.append('<div id="galClose"></div>');
		o.append('<div class="absPos" id="thumbs"></div>');
		var e = $("#thumbs");
		for (var f = 0; f < a.length; f++) {
			if (c < b) {
				e.append('<div id="im_' + f + '" class="galleryImg" style="width:' + a[f].thContW + "px; height:" + a[f].thContH + "px; z-index:" + f + '; overflow:hidden"><img class="absPos" id="imTh_' + f + '" src="' + a[f].imgTh + '" /></div>');
				if (c > 0) {
					$("#im_" + f).css("left", $("#im_" + (f - 1)).position().left + $("#im_" + (f - 1)).width() + 8 + "px")
				}
				if (d > 0) {
					$("#im_" + f).css("top", $("#im_" + (f - b)).position().top + $("#im_" + (f - b)).height() + 8 + "px")
				}
				c++;
				if (c == b) {
					c = 0;
					d++
				}
			}
			P.push($("#im_" + f));
			P[f].data({
				t : P[f].position().top,
				l : P[f].position().left,
				index : f
			});
			P[f].css("cursor", "pointer");
			P[f].live("click", {
				index : f
			}, function(b) {
				gb(b.data.index, a);
				return false
			});
			P[f].mouseover({
				index : f
			}, function(b) {
				Z(b.data.index, a)
			});
			P[f].mouseout({
				index : f
			}, function(b) {
				_(b.data.index, a)
			})
		}
		o.append('<div id="fullContainer"><div id="fullLoader"><div class="pBar"></div></div><div id="fullImg" class="absPos"></div><div id="prevButton"><img src="img/nav/arrow_left.gif" /></div><div id="nextButton"><img src="img/nav/arrow_right.gif" /></div><div id="galCloseButton"><img src="img/nav/close.gif" /></div></div>');
		$("#galCloseButton").on("click", fb);
		$("#scene_3_fog").on("click", fb);
		$("#galClose").on("click", fb);
		$("#prevButton").on("click", cb);
		$("#nextButton").on("click", bb);
		$("#galCloseButton").css("cursor", "pointer");
		$("#prevButton").css("cursor", "pointer");
		$("#nextButton").css("cursor", "pointer");
		$("#galCloseButton").css("display", "none");
		$("#prevButton").css("display", "none");
		$("#nextButton").css("display", "none")
	}

	function Z(a, b) {
		$("#imTh_" + a).stop().animate({
			height : b[a].thContH * 1.3,
			left : -40,
			top : -10
		}, 100, function() {
		})
	}

	function _(a, b) {
		$("#imTh_" + a).stop().animate({
			height : b[a].thContH,
			left : 0,
			top : 0
		}, 200, function() {
		})
	}

	function ab() {
		$(document).keydown(function(a) {
			if (a.which == 37) {
				eb(O);
				return false
			} else if (a.which == 39) {
				db(O);
				return false
			}
		})
	}

	function bb() {
		db(O)
	}

	function cb() {
		eb(O)
	}

	function db(a) {
		if (z) {
			A++;
			if (A > a.length - 1) {
				A = 0
			}
			gb(A, a)
		}
	}

	function eb(a) {
		if (!a) {
			a = O
		}
		if (z) {
			A--;
			if (A < 0) {
				A = a.length - 1
			}
			gb(A, a)
		}
	}

	function fb() {
		if (z) {
			var a = $("#fullContainer");
			var b = $("#fullLoader");
			var c = $("#fullImg");
			$("#galCloseButton").css("display", "none");
			$("#prevButton").css("display", "none");
			$("#nextButton").css("display", "none");
			var d = P[A];
			var e = Math.abs(f.offset().top - y) - o.position().top;
			if (e < -360) {
				e = -360
			}
			a.stop().animate({
				width : 0,
				height : 0,
				top : d.data("t") + d.height() / 2 + 60,
				left : d.data("l") + d.width() / 2
			}, 800, function() {
			});
			$("#_im").stop().animate({
				width : 0,
				height : 0,
				top : d.data("t") + d.height() / 2 + 60,
				left : d.data("l") + d.width() / 2
			}, 800, function() {
			});
			for (var g = 0; g < P.length; g++) {
				P[g].stop().delay(g * 5).animate({
					top : P[g].data("t"),
					left : P[g].data("l")
				}, 600, function() {
				})
			}
			z = false
		}
	}

	function gb(a, b) {
		var c = a;
		A = c;
		var d = $(".pBar", "#fullLoader");
		var e = $("#im_" + c);
		var g = $("#fullContainer");
		var h = $("#fullLoader");
		var i = $("#fullImg");
		var j = Math.abs(f.offset().top - y) - o.position().top;
		if (j < -360) {
			j = -360
		}
		if (!z) {
			g.css("top", e.data("t") + e.height() / 2 + 60 + "px");
			g.css("left", e.data("l") + e.width() / 2 + "px");
			g.stop().animate({
				width : b[c].fW,
				height : b[c].fH,
				top : j + 60,
				left : 0
			}, 600, function() {
			})
		} else {
			g.stop().animate({
				height : b[c].fH
			}, 0, function() {
			})
		}
		z = true;
		d.css("display", "block");
		d.css("top", "-3px");
		d.css("height", "3px");
		d.css("width", "0px");
		d.stop().delay(100).animate({
			width : b[c].fW
		}, 800, function() {
			console.log("width: " + d.css("width"))
		});
		i.html('<img id="_im" src="' + b[c].imgFull + '" />');
		var k = $("#_im");
		k.hide();
		k.bind("load", function() {
			$(this).fadeIn();
			d.css("display", "none");
			$("#galCloseButton").css("display", "block");
			$("#prevButton").css("display", "block");
			$("#nextButton").css("display", "block")
		});
		var l = c;
		var m = 1;
		var n = false;
		for (var p = 0; p < b.length; p++) {
			if (m == 1 && l <= b.length - 1) {
				if (c == 0) {
					n = true
				}
				if (n == true) {
					m = 1;
					l = p
				} else {
					l += p;
					m = 0
				}
				if (l >= b.length - 1) {
					n = true
				}
			} else if (m == 0 && l >= 0) {
				if (n == true) {
					m = 0;
					l = b.length - 1 - p
				} else {
					l -= p;
					m = 1
				}
				if (l <= 0) {
					n = true
				}
			}
			P[l].stop().delay(p * 5).animate({
				top : b[c].fH / 2 + 60 + j - P[l].height() / 2,
				left : b[c].fW / 2 - P[l].width() / 2
			}, 600, function() {
			})
		}
	}

	function hb() {
		if (y >= 0 && y < e.offset().top) {
			ib()
		} else if (y >= e.offset().top && y < f.offset().top) {
			ib();
			Q[0].el.html('<img src="' + Q[0].select + '" />')
		} else if (y >= f.offset().top && y < g.offset().top) {
			ib();
			Q[1].el.html('<img src="' + Q[1].select + '" />')
		} else if (y >= g.offset().top && y < h.offset().top) {
			ib();
			Q[2].el.html('<img src="' + Q[2].select + '" />')
		} else {
			ib();
			Q[3].el.html('<img src="' + Q[3].select + '" />')
		}
	}

	function ib() {
		for (var a = 0; a < Q.length; a++) {
			Q[a].el.html('<img src="' + Q[a].norm + '" />')
		}
	}

	function jb() {
		y = b.scrollTop();
		d.css("top", y * -1 + "px");
		if (a || kb("#container_1", w)) {
			var c = window.c1w;
			var i = window.c1h;
			var j = y;
			var k = j / i;
			if (k < 0) {
				k = 0
			}
			for (var l = 0; l < G.length; l++) {
				G[l].el.css("display", "block");
				G[l].el.css("width", $().eventAnimate(G[l].scale.ease, {
					t : k,
					b : c * G[l].scale.scaleBegin,
					c : c * G[l].scale.scaleEnd - c * G[l].scale.scaleBegin,
					d : 1
				}) + "px");
				G[l].el.css("top", $().eventAnimate(G[l].top.ease, {
					t : k,
					b : c * G[l].top.topBegin,
					c : c * G[l].top.topEnd - c * G[l].top.topBegin,
					d : 1
				}) + "px");
				G[l].el.css("left", c / 2 - G[l].el.width() / 2 + "px")
			}
		} else {
			for (var l = 0; l < G.length; l++) {
				G[l].el.css("display", "none")
			}
		}
		e.css("top", window._sect1CurrHeight + d.offset().top - y + "px");
		if (a || kb("#container_2", w) || kb("#scene_2_cap", w)) {
			var m = window.c2w;
			var z = window.c2h;
			var j = y - (e.offset().top - w);
			var k = j / (z + w);
			if (k < 0) {
				k = 0
			}
			for (var l = 0; l < H.length; l++) {
				H[l].el.css("display", "block");
				H[l].el.css("width", $().eventAnimate(H[l].scale.ease, {
					t : k,
					b : m * H[l].scale.scaleBegin,
					c : m * H[l].scale.scaleEnd - m * H[l].scale.scaleBegin,
					d : 1
				}) + "px");
				H[l].el.css("top", $().eventAnimate(H[l].top.ease, {
					t : k,
					b : z * H[l].top.topBegin,
					c : z * H[l].top.topEnd - z * H[l].top.topBegin,
					d : 1
				}) + "px");
				H[l].el.css("left", m / 2 - H[l].el.width() / 2 + "px")
			}
			for (var l = 0; l < L.length; l++) {
				L[l].el.css("display", "block");
				if (k >= L[l].beginPercent && k <= L[l].endPercent) {
					L[l].el.css("top", $().eventAnimate(L[l].top.ease, {
						t : k - L[l].beginPercent,
						b : z * L[l].top.topBegin,
						c : z * L[l].top.topEnd - z * L[l].top.topBegin,
						d : L[l].endPercent - L[l].beginPercent
					}) + "px")
				} else if (k < L[l].beginPercent) {
					L[l].el.css("top", z * L[l].top.topBegin + "px")
				} else {
					L[l].el.css("top", z * L[l].top.topEnd + "px")
				}
			}
			p.css("top", z * .385 + "px");
			p.css("left", m / 2 - p.width() / 2 + "px")
		} else {
			if (p.children("img").length < 1) {
				p.children(".vidImage").css("display", "block");
				p.children(".vidImage").css("opacity", 1);
				p.children(".vidLayer").html("")
			}
			for (var l = 0; l < H.length; l++) {
				H[l].el.css("display", "none")
			}
		}
		f.css("top", window._sect2CurrHeight + e.offset().top - y + "px");
		if (a || kb("#container_3", w)) {
			var A = window.c3w;
			var B = window.c3h;
			var j = y - (f.offset().top - w);
			var k = j / (B + w);
			if (k < 0) {
				k = 0
			}
			for (var l = 0; l < I.length; l++) {
				I[l].el.css("display", "block");
				I[l].el.css("width", $().eventAnimate(I[l].scale.ease, {
					t : k,
					b : A * I[l].scale.scaleBegin,
					c : A * I[l].scale.scaleEnd - A * I[l].scale.scaleBegin,
					d : 1
				}) + "px");
				I[l].el.css("top", $().eventAnimate(I[l].top.ease, {
					t : k,
					b : B * I[l].top.topBegin,
					c : B * I[l].top.topEnd - B * I[l].top.topBegin,
					d : 1
				}) + "px");
				I[l].el.css("left", A / 2 - I[l].el.width() / 2 + "px")
			}
			o.css("top", B * .228 + "px");
			o.css("left", A / 2 - o.width() / 2 + "px");
			for (var l = 0; l < M.length; l++) {
				M[l].el.css("display", "block");
				if (k >= M[l].beginPercent && k <= M[l].endPercent) {
					M[l].el.css("top", $().eventAnimate(M[l].top.ease, {
						t : k - M[l].beginPercent,
						b : B * M[l].top.topBegin,
						c : B * M[l].top.topEnd - B * M[l].top.topBegin,
						d : M[l].endPercent - M[l].beginPercent
					}) + "px")
				} else if (k < M[l].beginPercent) {
					M[l].el.css("top", B * M[l].top.topBegin + "px")
				} else {
					M[l].el.css("top", B * M[l].top.topEnd + "px")
				}
			}
		} else {
			for (var l = 0; l < I.length; l++) {
				I[l].el.css("display", "none")
			}
			fb()
		}
		g.css("top", window._sect3CurrHeight + f.offset().top - y + "px");
		if (a || kb("#container_4", w)) {
			var C = window.c4w;
			var D = window.c4h;
			var j = y - (g.offset().top - w);
			var k = j / (D + w);
			if (k < 0) {
				k = 0
			}
			for (var l = 0; l < J.length; l++) {
				J[l].el.css("display", "block");
				J[l].el.css("width", $().eventAnimate(J[l].scale.ease, {
					t : k,
					b : C * J[l].scale.scaleBegin,
					c : C * J[l].scale.scaleEnd - C * J[l].scale.scaleBegin,
					d : 1
				}) + "px");
				J[l].el.css("top", $().eventAnimate(J[l].top.ease, {
					t : k,
					b : D * J[l].top.topBegin,
					c : D * J[l].top.topEnd - D * J[l].top.topBegin,
					d : 1
				}) + "px");
				J[l].el.css("left", C / 2 - J[l].el.width() / 2 + "px")
			}
		} else {
			for (var l = 0; l < J.length; l++) {
				J[l].el.css("display", "none")
			}
		}
		n.css("top", window._sect4CurrHeight + g.offset().top - $("#white_stripe").height() / 2 - y + "px");
		if (a || kb("#white_stripe", w)) {
			var C = window.c4w;
			var E;
			if (x > _defaultWidth) {
				t.css("width", x + "px");
				E = x / _defaultWidth
			} else {
				t.css("width", _defaultWidth + "px");
				E = 1
			}
			n.css("height", $("#white_stripe").height() + "px");
			n.css("top", window._sect4CurrHeight + g.offset().top - n.height() / 2 - y + "px");
			var j = y - (n.offset().top - w);
			var k = j / (n.height() + w);
			if (k < 0) {
				k = 0
			}
			var F = t.height();
			u.css("top", F * N[0].top.topEnd + "px");
			for (var l = 0; l < N.length; l++) {
				N[l].el.css("display", "block");
				if (k >= N[l].beginPercent && k <= N[l].endPercent) {
					N[l].el.css("width", N[l].defaultWidth * E + "px");
					N[l].el.css("top", $().eventAnimate(N[l].top.ease, {
						t : k - N[l].beginPercent,
						b : F * N[l].top.topBegin,
						c : F * N[l].top.topEnd - F * N[l].top.topBegin,
						d : N[l].endPercent - N[l].beginPercent
					}) + "px");
					N[l].el.css("left", $().eventAnimate(N[l].left.ease, {
						t : k - N[l].beginPercent,
						b : C * N[l].left.leftBegin,
						c : C * N[l].left.leftEnd - C * N[l].left.leftBegin,
						d : N[l].endPercent - N[l].beginPercent
					}) + "px")
				} else if (k < N[l].beginPercent) {
					N[l].el.css("width", N[l].defaultWidth * E + "px");
					N[l].el.css("top", F * N[l].top.topBegin + "px");
					N[l].el.css("left", C * N[l].left.leftBegin + "px")
				} else {
					N[l].el.css("width", N[l].defaultWidth * E + "px");
					N[l].el.css("top", F * N[l].top.topEnd + "px");
					N[l].el.css("left", C * N[l].left.leftEnd + "px")
				}
			}
		} else {
			for (var l = 0; l < N.length; l++) {
				N[l].el.css("display", "none")
			}
		}
		h.css("top", window._sect4CurrHeight + g.offset().top - y + "px");
		if (a || kb("#container_5", w)) {
			var O = window.c5w;
			var P = window.c5h;
			var j = y - (h.offset().top - w);
			var k = j / P;
			if (k < 0) {
				k = 0
			}
			for (var l = 0; l < K.length; l++) {
				K[l].el.css("display", "block");
				K[l].el.css("width", $().eventAnimate(K[l].scale.ease, {
					t : k,
					b : O * K[l].scale.scaleBegin,
					c : O * K[l].scale.scaleEnd - O * K[l].scale.scaleBegin,
					d : 1
				}) + "px");
				K[l].el.css("top", $().eventAnimate(K[l].top.ease, {
					t : k,
					b : P * K[l].top.topBegin,
					c : P * K[l].top.topEnd - P * K[l].top.topBegin,
					d : 1
				}) + "px");
				K[l].el.css("left", O / 2 - K[l].el.width() / 2 + "px")
			}
			q.css("top", P * .56 + "px");
			q.css("left", O / 2 - q.width() / 2 + "px");
			if (k < .795) {
				r.css("top", $().eventAnimate("quadIn", {
					t : k,
					b : P * .1,
					c : P * .9 - P * .1,
					d : 1
				}) + "px")
			} else {
			}
			r.css("left", O / 2 - r.width() / 2 + "px");
			v.css("top", P * .77 + "px");
			v.css("left", O / 2 - v.width() / 2 + "px");
			s.css("top", P * .98 + "px");
			s.css("left", O / 2 - $("#copyright").width() - 332 + "px")
		} else {
			if (q.children("img").length < 1) {
				$(".vidImage", q).css("display", "block");
				$(".vidImage", q).css("opacity", 1);
				$(".vidLayer", q).html("")
			}
			for (var l = 0; l < K.length; l++) {
				K[l].el.css("display", "none")
			}
		}
		a = false
	}

	function kb(a, b) {
		var c = $(a);
		var d = c.offset().top;
		var e = c.height();
		var f = d < y + b && d + e > y;
		return f
	}

	function lb() {
		a = true;
		x = b.width();
		w = b.height();
		for (var c = 0; c < E.length; c++) {
			var e = $(E[c].contentContainer);
			var f = $(E[c].relativeContainer);
			var g = E[c].elemsDefaultHt;
			var h = E[c].elemsCurrtHeightVar;
			mb(b, e, f, g, h);
			window["c" + (c + 1) + "w"] = e.width();
			window["c" + (c + 1) + "h"] = e.height();
			e.css("left", x / 2 - d.width() / 2 + "px");
			if (c > 0) {
				e.css("top", window[E[c - 1].elemsCurrtHeightVar] + $(E[c - 1].contentContainer).offset().top - y + "px")
			}
		}
		for (var i = 0; i < L.length; i++) {
			L[i].el.css("width", window.c2w / 3 + "px");
			L[i].el.css("height", window.c2w / 3 + "px");
			M[i].el.css("width", window.c3w / 3 + "px");
			M[i].el.css("height", window.c3w / 3 + "px");
			if (i > 0) {
				L[i].el.css("left", L[i].el.width() * i + "px");
				M[i].el.css("left", M[i].el.width() * i + "px")
			}
		}
		$("#white_stripe").css("width", window.c4w + "px");
		jb();
		ib()
	}

	function mb(a, b, c, d, e) {
		var f = _defaultWidth / window[d];
		if (x > _defaultWidth) {
			b.css("width", a.width() + "px");
			b.css("height", a.width() / f + "px");
			c.css("height", b.height() + "px");
			window[e] = b.height()
		} else if (b.width() != _defaultWidth) {
			b.css("width", _defaultWidth + "px");
			b.css("height", window[d] + "px");
			c.css("height", b.height() + "px");
			window[e] = b.height()
		}
		if (b.children(".cont_inner_cont").length) {
			$(".cont_inner_cont", b).css("width", b.width() + "px");
			$(".cont_inner_cont", b).css("height", b.height() + "px")
		}
	}

	function nb() {
	}

	function ob() {
		p.children(".vidImage").click(function() {
			$(".vidLayer", p).html('<iframe width="978" height="550" src="http://www.youtube.com/embed/gg0csv7j24Y?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			$(".vidImage", p).stop().animate({
				opacity : 0
			}, 1e3, function() {
				p.children(".vidImage").css("display", "none")
			});
			return false
		});
		p.css("cursor", "pointer");
		q.children(".vidImage").click(function() {
			$(".vidLayer", q).html('<iframe width="978" height="550" src="http://www.youtube.com/embed/GDHFBRgI4_A?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			$(".vidLayer", q).html('<iframe src="http://player.vimeo.com/video/49309615?title=0&byline=0&portrait=0&autoplay=1" width="978" height="550" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			$(".vidImage", q).stop().animate({
				opacity : 0
			}, 1e3, function() {
				q.children(".vidImage").css("display", "none")
			});
			return false
		});
		q.css("cursor", "pointer")
	}

	function pb(a) {
		a.css("opacity", .7)
	}

	function qb(a) {
		a.css("opacity", 1)
	}

	function rb() {
		$(F.join(",")).mouseover(function() {
			pb($("img", this))
		});
		$(F.join(",")).mouseout(function() {
			qb($("img", this))
		});
		$("a.landing").click(function() {
			var a = 0;
			var b = y - w;
			var c = Math.abs(y - a);
			$("html, body").animate({
				scrollTop : a
			}, c, function() {
				jb()
			});
			return false
		});
		$("a.film").click(function() {
			var a = $("#video_1").offset().top - (w / 2 - $("#video_1").height() / 2);
			var b = y - w;
			var c = Math.abs(y - a);
			$("html, body").animate({
				scrollTop : a
			}, c, function() {
				jb()
			});
			return false
		});
		$("a.photos").click(function() {
			var a = $("#gallery").offset().top;
			var b = y - w;
			var c = Math.abs(y - a);
			$("html, body").animate({
				scrollTop : a
			}, c, function() {
				jb()
			});
			return false
		});
		$("a.boots").click(function() {
			var a = $("#boots_anchor").offset().top;
			var b = y - w;
			var c = Math.abs(y - a);
			$("html, body").animate({
				scrollTop : a
			}, c, function() {
				jb()
			});
			return false
		});
		$("a.naturally").click(function() {
			var a = $("#video_2").offset().top - (w / 2 - $("#video_2").height() / 2);
			var b = y - w;
			var c = Math.abs(y - a);
			$("html, body").animate({
				scrollTop : a
			}, c, function() {
				jb()
			});
			return false
		})
	}

	var a = true;
	var b = $(window);
	var c = $("#preloadContainer");
	var d = $("#container_1");
	var e = $("#container_2");
	var f = $("#container_3");
	var g = $("#container_4");
	var h = $("#container_5");
	var i = $("#landing");
	var j = $("#film");
	var k = $("#photos");
	var l = $("#boots");
	var m = $("#naturally");
	var n = $("#boots_footer");
	var o = $("#gallery");
	var p = $("#video_1");
	var q = $("#video_2");
	var r = $("#naturally_footer");
	var s = $("#copyright");
	var t = $("#white_stripe");
	var u = $("#boots_anchor");
	var v = $("#naturally_content");
	var w = b.height();
	var x = b.width();
	var y = b.scrollTop();
	var z = false;
	var A;
	var B;
	var C = 0;
	var D = [{
		el : i,
		h : window._sect1DefaultHeight
	}, {
		el : j,
		h : window._sect2DefaultHeight
	}, {
		el : k,
		h : window._sect3DefaultHeight
	}, {
		el : l,
		h : window._sect4DefaultHeight
	}, {
		el : m,
		h : window._sect5DefaultHeight
	}];
	var E = [{
		relativeContainer : "#landing",
		contentContainer : "#container_1",
		elemsDefaultHt : "_sect1DefaultHeight",
		elemsCurrtHeightVar : "_sect1CurrHeight"
	}, {
		relativeContainer : "#film",
		contentContainer : "#container_2",
		elemsDefaultHt : "_sect2DefaultHeight",
		elemsCurrtHeightVar : "_sect2CurrHeight"
	}, {
		relativeContainer : "#photos",
		contentContainer : "#container_3",
		elemsDefaultHt : "_sect3DefaultHeight",
		elemsCurrtHeightVar : "_sect3CurrHeight"
	}, {
		relativeContainer : "#boots",
		contentContainer : "#container_4",
		elemsDefaultHt : "_sect4DefaultHeight",
		elemsCurrtHeightVar : "_sect4CurrHeight"
	}, {
		relativeContainer : "#naturally",
		contentContainer : "#container_5",
		elemsDefaultHt : "_sect5DefaultHeight",
		elemsCurrtHeightVar : "_sect5CurrHeight"
	}];
	var F = ["a.landing", "a.film", "a.photos", "a.boots", "a.naturally", "#facebook", "#instagram"];
	var G = [{
		el : $("#scene_1_bg"),
		scale : {
			ease : "quadOut",
			scaleBegin : 1.1,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : 0,
			topEnd : .88
		}
	}, {
		el : $("#scene_1_jake"),
		scale : {
			ease : "quadOut",
			scaleBegin : 1,
			scaleEnd : .8
		},
		top : {
			ease : "linear",
			topBegin : -.016,
			topEnd : .92
		}
	}, {
		el : $("#scene_1_fog"),
		scale : {
			ease : "quadIn",
			scaleBegin : 1.5,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .04,
			topEnd : -.2
		}
	}];
	var H = [{
		el : $("#scene_2_cap"),
		scale : {
			ease : "linear",
			scaleBegin : 1.4,
			scaleEnd : .84
		},
		top : {
			ease : "quadIn",
			topBegin : -.18,
			topEnd : -.02
		}
	}, {
		el : $("#scene_2_range"),
		scale : {
			ease : "linear",
			scaleBegin : 1.4,
			scaleEnd : .84
		},
		top : {
			ease : "quadIn",
			topBegin : -.04,
			topEnd : .65
		}
	}, {
		el : $("#scene_2_right_mtn"),
		scale : {
			ease : "linear",
			scaleBegin : 1.6,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .1,
			topEnd : .5
		}
	}, {
		el : $("#scene_2_left_mtn"),
		scale : {
			ease : "linear",
			scaleBegin : 1.6,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : -.03,
			topEnd : .4
		}
	}];
	var I = [{
		el : $("#scene_3_bg"),
		scale : {
			ease : "linear",
			scaleBegin : 1.6,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.56,
			topEnd : .6
		}
	}, {
		el : $("#scene_3_fog"),
		scale : {
			ease : "linear",
			scaleBegin : 1.3,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.15,
			topEnd : .575
		}
	}];
	var J = [{
		el : $("#scene_4_background"),
		scale : {
			ease : "linear",
			scaleBegin : 1.06,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.435,
			topEnd : .74
		}
	}, {
		el : $("#scene_4_mtns"),
		scale : {
			ease : "linear",
			scaleBegin : 1.1,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.46,
			topEnd : .74
		}
	}, {
		el : $("#scene_4_foreground"),
		scale : {
			ease : "linear",
			scaleBegin : 1.5,
			scaleEnd : .92
		},
		top : {
			ease : "linear",
			topBegin : -.6,
			topEnd : .78
		}
	}];
	var K = [{
		el : $("#scene_5_bg"),
		scale : {
			ease : "linear",
			scaleBegin : 1.5,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.2,
			topEnd : .5
		}
	}, {
		el : $("#scene_5_fog"),
		scale : {
			ease : "linear",
			scaleBegin : 1.5,
			scaleEnd : 1
		},
		top : {
			ease : "linear",
			topBegin : -.6,
			topEnd : -.03
		}
	}];
	var L = [{
		el : $("#scene_2_im_1"),
		beginPercent : .74,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : .82
		}
	}, {
		el : $("#scene_2_im_2"),
		beginPercent : .74,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : .91
		}
	}, {
		el : $("#scene_2_im_3"),
		beginPercent : .74,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : 1
		}
	}];
	var M = [{
		el : $("#scene_3_im_1"),
		beginPercent : .85,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : .885
		}
	}, {
		el : $("#scene_3_im_2"),
		beginPercent : .85,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : .9425
		}
	}, {
		el : $("#scene_3_im_3"),
		beginPercent : .85,
		endPercent : 1,
		top : {
			ease : "linear",
			topBegin : 1,
			topEnd : 1
		}
	}];
	var N = [{
		el : $("#boots_2"),
		defaultWidth : 502,
		beginPercent : .15,
		endPercent : .4,
		scale : {
			ease : "linear",
			scaleBegin : 1,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .132,
			topEnd : .198
		},
		left : {
			ease : "quadOut",
			leftBegin : 1,
			leftEnd : .446
		}
	}, {
		el : $("#boots_1"),
		defaultWidth : 548,
		beginPercent : .15,
		endPercent : .42,
		scale : {
			ease : "linear",
			scaleBegin : 1,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .319,
			topEnd : .289
		},
		left : {
			ease : "quadOut",
			leftBegin : -.5,
			leftEnd : .0785
		}
	}, {
		el : $("#boots_4"),
		defaultWidth : 518,
		beginPercent : .35,
		endPercent : .44,
		scale : {
			ease : "linear",
			scaleBegin : 1,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .288,
			topEnd : .348
		},
		left : {
			ease : "quadOut",
			leftBegin : 1,
			leftEnd : .487
		}
	}, {
		el : $("#boots_3"),
		defaultWidth : 482,
		beginPercent : .32,
		endPercent : .46,
		scale : {
			ease : "linear",
			scaleBegin : 1,
			scaleEnd : 1
		},
		top : {
			ease : "quadIn",
			topBegin : .504,
			topEnd : .474
		},
		left : {
			ease : "quadOut",
			leftBegin : -.5,
			leftEnd : .204
		}
	}];
	var O = [{
		imgTh : "img/gallery/_thumbs/im_1.jpg",
		imgFull : "img/gallery/im_1.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_2.jpg",
		imgFull : "img/gallery/im_2.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_3.jpg",
		imgFull : "img/gallery/im_3.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_4.jpg",
		imgFull : "img/gallery/im_4.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_5.jpg",
		imgFull : "img/gallery/im_5.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_6.jpg",
		imgFull : "img/gallery/im_6.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_7.jpg",
		imgFull : "img/gallery/im_7.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_8.jpg",
		imgFull : "img/gallery/im_8.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_9.jpg",
		imgFull : "img/gallery/im_9.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_10.jpg",
		imgFull : "img/gallery/im_10.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_11.jpg",
		imgFull : "img/gallery/im_11.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_12.jpg",
		imgFull : "img/gallery/im_12.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_13.jpg",
		imgFull : "img/gallery/im_13.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_14.jpg",
		imgFull : "img/gallery/im_14.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_15.jpg",
		imgFull : "img/gallery/im_15.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_16.jpg",
		imgFull : "img/gallery/im_16.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_17.jpg",
		imgFull : "img/gallery/im_17.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_18.jpg",
		imgFull : "img/gallery/im_18.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_19.jpg",
		imgFull : "img/gallery/im_19.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_20.jpg",
		imgFull : "img/gallery/im_20.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_21.jpg",
		imgFull : "img/gallery/im_21.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_22.jpg",
		imgFull : "img/gallery/im_22.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_23.jpg",
		imgFull : "img/gallery/im_23.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_24.jpg",
		imgFull : "img/gallery/im_24.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_25.jpg",
		imgFull : "img/gallery/im_25.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_26.jpg",
		imgFull : "img/gallery/im_26.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_27.jpg",
		imgFull : "img/gallery/im_27.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_28.jpg",
		imgFull : "img/gallery/im_28.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_29.jpg",
		imgFull : "img/gallery/im_29.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_30.jpg",
		imgFull : "img/gallery/im_30.jpg",
		thContW : 287,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_31.jpg",
		imgFull : "img/gallery/im_31.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}, {
		imgTh : "img/gallery/_thumbs/im_32.jpg",
		imgFull : "img/gallery/im_32.jpg",
		thContW : 191,
		thContH : 191,
		fW : 980,
		fH : 653
	}];
	var P = [];
	var Q = [{
		el : $(".film"),
		norm : "img/nav/nav_film.gif",
		select : "img/nav/nav_film_select.gif"
	}, {
		el : $(".photos"),
		norm : "img/nav/nav_photos.gif",
		select : "img/nav/nav_photos_select.gif"
	}, {
		el : $(".boots"),
		norm : "img/nav/nav_boots.gif",
		select : "img/nav/nav_boots_select.gif"
	}, {
		el : $(".naturally"),
		norm : "img/nav/nav_naturally.gif",
		select : "img/nav/nav_naturally_select.gif"
	}];
	S();
	R();
	rb();
	ob();
	lb();
	jb();
	Y(O);
	ab();
	T()
})