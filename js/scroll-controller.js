var ScrollController = function() {
	var settings = {}, page, started = false, paused = false, animation = null;
	var w = $(window), d = $(document), touch = false, touchStart = {
		x : 0,
		y : 0
	}, scrollStart = 0, scrollTopTweened = 0, scrollTop = 0, scrollDirection = 0, autoScrollInterval;
	function animationLoop() {
		requestAnimFrame(animationLoop);
		if (paused)
			return;
		if (Math.ceil(scrollTopTweened) !== Math.floor(scrollTop)) {
			scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
			scrollDirection = scrollTop > scrollTopTweened ? 1 : -1;
			for (var i in animation) {
				var anim = animation[i];
				if (scrollTopTweened >= anim.startAt && scrollTopTweened <= anim.endAt) {
					startAnimatable(anim);
					render(anim);
				} else {
					stopAnimatable(anim);
				}
			}
			if ( typeof settings.onUpdate === 'function')
				settings.onUpdate(scrollTopTweened);
		}
	}

	var has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	var hascsstrans = Modernizr.csstransitions;
	var isiPhone = navigator.userAgent.match(/android.+mobile|avantgo|android|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i) != null;
	function render(anim) {
		var progress = (anim.startAt - scrollTopTweened) / (anim.startAt - anim.endAt);
		progress = Math.max(0, Math.min(1, progress));
		var properties = {};
		anim.lastProgress = progress;
		var isMobile = (isiPhone || isiPad);
		if (anim.keyframes) {
			for (var i = 1; i < anim.keyframes.length; i++) {
				var keyframe = anim.keyframes[i], lastkeyframe = anim.keyframes[i - 1], keyframeProgress = (lastkeyframe.position - progress) / (lastkeyframe.position - keyframe.position);
				if (keyframeProgress >= 0 && keyframeProgress <= 1) {
					if (keyframe.onProgress && typeof keyframe.onProgress === 'function') {
						keyframe.onProgress(keyframeProgress, scrollDirection);
					}
					for (var property in keyframe.properties) {
						if (property === "background-position" && keyframe.properties[property].hasOwnProperty("x") && !isMobile) {
							var startValues = keyframe.properties[property];
							var endValues = lastkeyframe.properties[property];
							var result = "";
							if ( typeof startValues.x === "number") {
								result += getTweenedValue(endValues.x, startValues.x, keyframeProgress, 1, keyframe.ease) + "px";
							} else {
								result += startValues.x
							}
							result += " ";
							if ( typeof startValues.y === "number") {
								result += getTweenedValue(endValues.y, startValues.y, keyframeProgress, 1, keyframe.ease) + "px";
							} else {
								result += startValues.y
							}
							properties[property] = result;
						} else if (property === "rotate" && !isMobile) {
							properties["transform"] = "rotate(" + getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease) + "deg)";
						} else if (property === "top" && has3d) {
							properties["transform"] = "translateY(" + getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease) + "px)";
						} else if (property === "translate3d") {
							if (has3d) {
								properties["transform"] = "translate3d(" + getTweenedValue(lastkeyframe.properties["ref-left"], keyframe.properties["ref-left"], keyframeProgress, 1, keyframe.ease) + "px, " + getTweenedValue(lastkeyframe.properties["ref-top"], keyframe.properties["ref-top"], keyframeProgress, 1, keyframe.ease) + "px, 0px)";
							} else {
								properties["top"] = getTweenedValue(lastkeyframe.properties["ref-top"], keyframe.properties["ref-top"], keyframeProgress, 1, keyframe.ease);
								properties["left"] = getTweenedValue(lastkeyframe.properties["ref-left"], keyframe.properties["ref-left"], keyframeProgress, 1, keyframe.ease);
							}
						} else if (property === "rotateLeft") {
							if (has3d && !isMobile) {
								properties["transform"] = "rotate(" + getTweenedValue(lastkeyframe.properties["ref-rotate"], keyframe.properties["ref-rotate"], keyframeProgress, 1, keyframe.ease) + "deg) translate3d(" + getTweenedValue(lastkeyframe.properties["ref-left"], keyframe.properties["ref-left"], keyframeProgress, 1, keyframe.ease) + "px, 0px, 0px)";
							} else {
								properties["left"] = getTweenedValue(lastkeyframe.properties["ref-left"], keyframe.properties["ref-left"], keyframeProgress, 1, keyframe.ease);
							}
						} else if (property === "ref-rotate" || property === "ref-left" || property === "ref-top") {
						} else if (property === "left" && has3d) {
							properties["transform"] = "translate3d(" + getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease) + "px, 0px, 0px)";
						} else if (property === "margin-left" && has3d) {
							properties["transform"] = "translate3d(" + getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease) + "px, 0px, 0px)";
						} else if (property === "margin-top" && has3d) {
							properties["transform"] = "translate3d(0px, " + getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease) + "px, 0px)";
						} else if (property === "scale" && !isMobile) {
						} else if (property === "image") {
							var id = Math.round(getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease));
							$("#section10 img").not($("#section10-img" + id)).css({
								"margin-top" : "200%"
							});
							$("#section10-img" + id).css({
								"margin-top" : 0
							});
						} else {
							properties[property] = getTweenedValue(lastkeyframe.properties[property], keyframe.properties[property], keyframeProgress, 1, keyframe.ease);
						}
					}
				}
			}
		}
		anim._elem.css(properties);
		if (anim.onProgress && typeof anim.onProgress === 'function') {
			anim.onProgress.call(anim, progress);
		}
	}

	function startAnimatable(anim) {
		if (!anim._started) {
			if (anim.onStartAnimate && typeof anim.onStartAnimate === 'function') {
				anim.onStartAnimate.call(anim, scrollDirection);
			} else {
				anim._elem.css('display', 'block');
			}
			anim._started = true;
		}
	}

	function stopAnimatable(anim) {
		if ((anim._started && anim.endAt < scrollTopTweened || anim._started && anim.startAt > scrollTopTweened) || (scrollDirection < 0 && anim.lastProgress > 0 && anim.startAt > scrollTopTweened) || (scrollDirection > 0 && anim.lastProgress < 1 && anim.endAt < scrollTopTweened)) {
			render(anim);
			if (anim.onEndAnimate && typeof anim.onEndAnimate === 'function') {
				anim.onEndAnimate.call(anim, scrollDirection);
			} else {
				anim._elem.css('display', 'none');
			}
			anim._started = false;
		}
	}

	function setAnimatable() {
		for (var i in animation) {
			var anim = animation[i];
			anim.lastProgress = 0;
			if (anim._elem == undefined) {
				anim._elem = $(anim.selector);
			}
			if ( typeof anim.onInit == 'function')
				anim.onInit.call(anim);
			for (var k in anim.keyframes) {
				var keyframe = anim.keyframes[k];
				if (keyframe.position == 0) {
					var nKeyframe = anim.keyframes[Number(k) + 1];
					for (var property in nKeyframe.properties) {
						if (keyframe.properties[property] == undefined) {
							if (/left|top/.test(property)) {
								keyframe.properties[property] = anim._elem.position()[property];
							}
						}
					}
				}
				var bIndex = Number(k);
				while (bIndex > 0) {
					var bKeyframe = anim.keyframes[bIndex];
					for (var property in bKeyframe.properties) {
						if (keyframe.properties[property] == undefined) {
							keyframe.properties[property] = bKeyframe.properties[property];
						}
					}
					bIndex--;
				};
				if ( typeof keyframe.onInit == 'function')
					keyframe.onInit(anim);
			}
		}
	}

	function resize() {
		var container = settings.container;
		page = {
			wWidth : settings.container.width(),
			wHeight : settings.container.height(),
			wCenter : {
				left : settings.container.width() / 2,
				top : settings.container.height() / 2
			}
		};
		if (settings.onResize && typeof settings.onResize === 'function')
			settings.onResize(page);
		resetAnimatable();
		setAnimatable();
		start();
	}

	function resetAnimatable() {
		for (var i in animation) {
			var anim = animation[i];
			if (anim._started) {
				delete anim._elem;
				delete anim._started;
			}
		}
	}

	var reloading = false;
	function resizeHandler(e) {
		window.groupSound.mute();
		$(document).stopTime("resizzMe");
		$(document).oneTime(1000, "resizzMe", function() {
			window.groupSound.unmute();
		});
		resize();
	}

	function touchStartHandler(e) {
		touchStart.x = e.touches[0].pageX;
		touchStart.y = e.touches[0].pageY;
		scrollStart = scrollTop;
	};
	function touchEndHandler(e) {
	}

	function touchMoveHandler(e) {
		e.preventDefault();
		if (paused)
			return;
		var offset = {};
		for (var i = 0; i < settings.directionTouch.length; i++) {
			if (scrollTop > settings.directionTouch[i].start && scrollTop < settings.directionTouch[i].end) {
				switch(settings.directionTouch[i].direction) {
					case"up":
						offset.y = touchStart.y - e.touches[0].pageY;
						scrollTop = Math.max(0, scrollStart + offset.y);
						break;
					case"left":
						offset.x = (touchStart.x - e.touches[0].pageX);
						scrollTop = Math.max(0, scrollStart + offset.x);
						break;
					case"down":
						offset.y = touchStart.y - e.touches[0].pageY;
						scrollTop = Math.max(0, scrollStart - offset.y);
						break;
				}
				if (scrollTop > settings.directionTouch[i].end)
					scrollTop = settings.directionTouch[i].end + 0.1;
				else if (scrollTop < settings.directionTouch[i].start)
					scrollTop = settings.directionTouch[i].start - 0.1;
				break;
			}
		}
		checkScrollExtents();
	}

	function wheelHandler(e, delta, deltaX, deltaY) {
		if (paused)
			return;
		scrollTop -= delta * settings.scrollSpeed;
		if (scrollTop < 0)
			scrollTop = 0;
		checkScrollExtents();
	};
	function checkScrollExtents() {
		if (scrollTop < 0)
			scrollTop = 0;
		else if (scrollTop > settings.maxScroll)
			scrollTop = settings.maxScroll;
	}

	function getTweenedValue(start, end, currentTime, totalTime, tweener) {
		var delta = end - start;
		var percentComplete = currentTime / totalTime;
		if (!tweener)
			tweener = TWEEN.Easing.Linear.EaseNone;
		return tweener(percentComplete) * delta + start
	}

	function isTouch() {
		return 'ontouchstart' in window;
	}

	function resetAnimation() {
		animation = settings.animation;
	}

	function setSettings(settings) {
		settings = settings;
	}

	function init(opts) {
		
		console.log("ScrollController init.");
		
		var defaults = {
			maxScroll : 1000,
			tickSpeed : 30,
			scrollSpeed : 40,
			directionTouch : [],
			tweenSpeed : .5
		};
		settings = $.extend(defaults, opts);
		animation = settings.animation;
		touch = isTouch();
		if (touch) {
			var container = settings.container[0];
			container.addEventListener('touchstart', touchStartHandler, true);
			container.addEventListener('touchmove', touchMoveHandler, true);
			container.addEventListener('touchend', touchEndHandler, true);
		}
		d.on('mousewheel', wheelHandler);
		w.on('resize', resizeHandler);
		window.requestAnimFrame = (function() {
			return function(callback) {
				window.setTimeout(callback, settings.tickSpeed);
			}
		})();
		resize();
		return this;
	};
	function start() {
		if (!started && settings.startAt)
			scrollTopTweened = scrollTop = settings.startAt;
		scrollTop++;
		if (!started) {
			animationLoop();
			started = true;
		};
		if (settings.onStart && typeof settings.onStart === 'function') {
			settings.onStart();
		}
	};
	function getPageInfo() {
		return page;
	};
	function getScrollTop() {
		return scrollTopTweened;
	};
	function getMaxScroll() {
		return settings.maxScroll;
	};
	function scrollTo(scroll) {
		if (paused)
			return;
		scrollTop = scroll;
	};
	function autoScrollStart() {
		if (autoScrollInterval)
			return;
		autoScrollInterval = setInterval(aScroll, 50);
	}

	function autoScrollStop() {
		clearInterval(autoScrollInterval);
		autoScrollInterval = null;
	}

	function aScroll() {
		scrollTop += 9;
		if (scrollTop >= settings.maxScroll) {
			autoScrollStop();
			$("#autoplay").addClass("disabled");
		}
	}

	function stopScroll() {
		scrollTopTweened = scrollTop;
	}

	function pauseScroll() {
		paused = true;
	}

	function resumeScroll() {
		paused = false;
	}

	return {
		init : init,
		start : start,
		pause : pauseScroll,
		resume : resumeScroll,
		resetAnimation : resetAnimation,
		setSettings : setSettings,
		getPageInfo : getPageInfo,
		getScrollTop : getScrollTop,
		getMaxScroll : getMaxScroll,
		autoScrollStart : autoScrollStart,
		autoScrollStop : autoScrollStop,
		stopScroll : stopScroll,
		scrollTo : scrollTo,
		resize : resize
	}
};