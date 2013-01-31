var Trace = Trace || ( function() {
		return {
			log : function() {
				if (!$.browser.msie) {
					var args = [].splice.call(arguments, 0);
					console.log(args.join(', '));
				}
			}
		};
	}());
var Stats = function() {
	var _container, _bar, _mode = 0, _modes = 2, _frames = 0, _time = Date.now(), _timeLastFrame = _time, _timeLastSecond = _time, _fps = 0, _fpsMin = 1000, _fpsMax = 0, _fpsDiv, _fpsText, _fpsGraph, _fpsColors = [[16, 16, 48], [0, 255, 255]], _ms = 0, _msMin = 1000, _msMax = 0, _msDiv, _msText, _msGraph, _msColors = [[16, 48, 16], [0, 255, 0]];
	_container = document.createElement('div');
	_container.style.cursor = 'pointer';
	_container.style.width = '80px';
	_container.style.opacity = '0.9';
	_container.style.zIndex = '10001';
	_container.addEventListener('mousedown', function(event) {
		event.preventDefault();
		_mode = (_mode + 1) % _modes;
		if (_mode == 0) {
			_fpsDiv.style.display = 'block';
			_msDiv.style.display = 'none';
		} else {
			_fpsDiv.style.display = 'none';
			_msDiv.style.display = 'block';
		}
	}, false);
	_fpsDiv = document.createElement('div');
	_fpsDiv.style.textAlign = 'left';
	_fpsDiv.style.lineHeight = '1.2em';
	_fpsDiv.style.backgroundColor = 'rgb(' + Math.floor(_fpsColors[0][0] / 2) + ',' + Math.floor(_fpsColors[0][1] / 2) + ',' + Math.floor(_fpsColors[0][2] / 2) + ')';
	_fpsDiv.style.padding = '0 0 3px 3px';
	_container.appendChild(_fpsDiv);
	_fpsText = document.createElement('div');
	_fpsText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_fpsText.style.fontSize = '9px';
	_fpsText.style.color = 'rgb(' + _fpsColors[1][0] + ',' + _fpsColors[1][1] + ',' + _fpsColors[1][2] + ')';
	_fpsText.style.fontWeight = 'bold';
	_fpsText.innerHTML = 'FPS';
	_fpsDiv.appendChild(_fpsText);
	_fpsGraph = document.createElement('div');
	_fpsGraph.style.position = 'relative';
	_fpsGraph.style.width = '74px';
	_fpsGraph.style.height = '30px';
	_fpsGraph.style.backgroundColor = 'rgb(' + _fpsColors[1][0] + ',' + _fpsColors[1][1] + ',' + _fpsColors[1][2] + ')';
	_fpsDiv.appendChild(_fpsGraph);
	while (_fpsGraph.children.length < 74) {
		_bar = document.createElement('span');
		_bar.style.width = '1px';
		_bar.style.height = '30px';
		_bar.style.cssFloat = 'left';
		_bar.style.backgroundColor = 'rgb(' + _fpsColors[0][0] + ',' + _fpsColors[0][1] + ',' + _fpsColors[0][2] + ')';
		_fpsGraph.appendChild(_bar);
	}
	_msDiv = document.createElement('div');
	_msDiv.style.textAlign = 'left';
	_msDiv.style.lineHeight = '1.2em';
	_msDiv.style.backgroundColor = 'rgb(' + Math.floor(_msColors[0][0] / 2) + ',' + Math.floor(_msColors[0][1] / 2) + ',' + Math.floor(_msColors[0][2] / 2) + ')';
	_msDiv.style.padding = '0 0 3px 3px';
	_msDiv.style.display = 'none';
	_container.appendChild(_msDiv);
	_msText = document.createElement('div');
	_msText.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_msText.style.fontSize = '9px';
	_msText.style.color = 'rgb(' + _msColors[1][0] + ',' + _msColors[1][1] + ',' + _msColors[1][2] + ')';
	_msText.style.fontWeight = 'bold';
	_msText.innerHTML = 'MS';
	_msDiv.appendChild(_msText);
	_msGraph = document.createElement('div');
	_msGraph.style.position = 'relative';
	_msGraph.style.width = '74px';
	_msGraph.style.height = '30px';
	_msGraph.style.backgroundColor = 'rgb(' + _msColors[1][0] + ',' + _msColors[1][1] + ',' + _msColors[1][2] + ')';
	_msDiv.appendChild(_msGraph);
	while (_msGraph.children.length < 74) {
		_bar = document.createElement('span');
		_bar.style.width = '1px';
		_bar.style.height = Math.random() * 30 + 'px';
		_bar.style.cssFloat = 'left';
		_bar.style.backgroundColor = 'rgb(' + _msColors[0][0] + ',' + _msColors[0][1] + ',' + _msColors[0][2] + ')';
		_msGraph.appendChild(_bar);
	}
	var _updateGraph = function(dom, value) {
		var child = dom.appendChild(dom.firstChild);
		child.style.height = value + 'px';
	}
	return {
		domElement : _container,
		update : function() {
			_time = Date.now();
			_ms = _time - _timeLastFrame;
			_msMin = Math.min(_msMin, _ms);
			_msMax = Math.max(_msMax, _ms);
			_msText.textContent = _ms + ' MS (' + _msMin + '-' + _msMax + ')';
			_updateGraph(_msGraph, Math.min(30, 30 - (_ms / 200) * 30));
			_timeLastFrame = _time;
			_frames++;
			if (_time > _timeLastSecond + 1000) {
				_fps = Math.round((_frames * 1000) / (_time - _timeLastSecond));
				_fpsMin = Math.min(_fpsMin, _fps);
				_fpsMax = Math.max(_fpsMax, _fps);
				_fpsText.textContent = _fps + ' FPS (' + _fpsMin + '-' + _fpsMax + ')';
				_updateGraph(_fpsGraph, Math.min(30, 30 - (_fps / 100) * 30));
				_timeLastSecond = _time;
				_frames = 0;
			}
		}
	};
}; 

function in_array(tableau, p_val) {
	var l = tableau.length;
	for (var i = 0; i < l; i++) {
		if (tableau[i] == p_val) {
			rowid = i;
			return true;
		}
	}
	return false;
}


function retrieveImages(container) {
	var imgs = new Array();
	var url = "";
	$(container).find("img").each(function() {
		url = $(this).attr("src");
		if (!in_array(imgs, url))
			imgs.push(url);
	});
	var everything = $(container).find("div, li").each(function() {
		var url = "";
		if ($(this).css("background-image") != "none") {
			url = $(this).css("background-image");
			url = url.replace("url(\"", "");
			url = url.replace("url(", "");
			url = url.replace("\")", "");
			url = url.replace(")", "");
			if (url.length > 0) {
				if (!in_array(imgs, url))
					imgs.push(url);
			}
		}
	});
	return imgs;
};



(function($) {
	var $preload = $.preload = function(original, settings) {
		if (original.split)
			original = $(original);
		settings = $.extend({}, $preload.defaults, settings);
		var sources = $.map(original, function(source) {
			if (!source)
				return;
			if (source.split)
				return settings.base + source + settings.ext;
			var url = source.src || source.href;
			if ( typeof settings.placeholder == 'string' && source.src)
				source.src = settings.placeholder;
			if (url && settings.find)
				url = url.replace(settings.find, settings.replace);
			return url || null;
		});
		var data = {
			loaded : 0,
			failed : 0,
			next : 0,
			done : 0,
			total : sources.length
		};
		if (!data.total)
			return finish();
		var imgs = $(Array(settings.threshold + 1).join('<img/>')).load(handler).error(handler).bind('abort', handler).each(fetch);
		function handler(e) {
			data.element = this;
			data.found = e.type == 'load';
			data.image = this.src;
			data.index = this.index;
			var orig = data.original = original[this.index];
			data[data.found ? 'loaded' : 'failed']++;
			data.done++;
			if (settings.enforceCache)
				$preload.cache.push($('<img/>').attr('src',data.image)[0]);
			if (settings.placeholder && orig.src)
				orig.src = data.found ? data.image : settings.notFound || orig.src;
			if (settings.onComplete)
				settings.onComplete(data);
			if (data.done < data.total)
				fetch(0, this);
			else {
				if (imgs && imgs.unbind)
					imgs.unbind('load').unbind('error').unbind('abort');
				imgs = null;
				finish();
			}
		};
		function fetch(i, img, retry) {
			if (img.attachEvent && data.next && data.next % $preload.gap == 0 && !retry) {
				setTimeout(function() {
					fetch(i, img, true);
				}, 0);
				return false;
			}
			if (data.next == data.total)
				return false;
			img.index = data.next;
			img.src = sources[data.next++];
			if (settings.onRequest) {
				data.index = img.index;
				data.element = img;
				data.image = img.src;
				data.original = original[data.next - 1];
				settings.onRequest(data);
			}
		};
		function finish() {
			if (settings.onFinish)
				settings.onFinish(data);
		};
	};
	$preload.gap = 5;
	$preload.cache = [];
	$preload.defaults = {
		threshold : 2,
		base : '',
		ext : '',
		replace : ''
	};
	$.fn.preload = function(settings) {
		$preload(this, settings);
		return this;
	};
})(jQuery);


jQuery.fn.extend({
	everyTime : function(interval, label, fn, times) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times)
		})
	},
	oneTime : function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1)
		})
	},
	stopTime : function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn)
		})
	}
});
jQuery.extend({
	timer : {
		global : [],
		guid : 1,
		dataKey : "jQuery.timer",
		regex : /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
		powers : {
			'ms' : 1,
			'cs' : 10,
			'ds' : 100,
			's' : 1000,
			'das' : 10000,
			'hs' : 100000,
			'ks' : 1000000
		},
		timeParse : function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseFloat(result[1]);
				var mult = this.powers[result[2]] || 1;
				return num * mult
			} else {
				return value
			}
		},
		add : function(element, interval, label, fn, times) {
			var counter = 0;
			if (jQuery.isFunction(label)) {
				if (!times)
					times = fn;
				fn = label;
				label = interval
			}
			interval = jQuery.timer.timeParse(interval);
			if ( typeof interval != 'number' || isNaN(interval) || interval < 0)
				return;
			if ( typeof times != 'number' || isNaN(times) || times < 0)
				times = 0;
			times = times || 0;
			var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});
			if (!timers[label])
				timers[label] = {};
			fn.timerID = fn.timerID || this.guid++;
			var handler = function() {
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn)
			};
			handler.timerID = fn.timerID;
			if (!timers[label][fn.timerID])
				timers[label][fn.timerID] = window.setInterval(handler, interval);
			this.global.push(element)
		},
		remove : function(element, label, fn) {
			var timers = jQuery.data(element, this.dataKey), ret;
			if (timers) {
				if (!label) {
					for (label in timers)
					this.remove(element, label, fn)
				} else if (timers[label]) {
					if (fn) {
						if (fn.timerID) {
							window.clearInterval(timers[label][fn.timerID]);
							delete timers[label][fn.timerID]
						}
					} else {
						for (var fn in timers[label]) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn]
						}
					}
					for (ret in timers[label])
					break;
					if (!ret) {
						ret = null;
						delete timers[label]
					}
				}
				for (ret in timers)
				break;
				if (!ret)
					jQuery.removeData(element, this.dataKey)
			}
		}
	}
});
jQuery(window).bind("unload", function() {
	jQuery.each(jQuery.timer.global, function(index, item) {
		jQuery.timer.remove(item)
	})
});



(function($) {
	function getTransformProperty(element) {
		var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
		var p;
		while ( p = properties.shift()) {
			if (element && typeof element.style[p] != 'undefined') {
				return p;
			}
		}
		return 'transform';
	}

	var _propsObj = null;
	var proxied = $.fn.css;
	$.fn.css = function(arg, val) {
		if (_propsObj === null) {
			if ( typeof $.cssProps != 'undefined') {
				_propsObj = $.cssProps;
			} else if ( typeof $.props != 'undefined') {
				_propsObj = $.props;
			} else {
				_propsObj = {}
			}
		}
		if ( typeof _propsObj['transform'] == 'undefined' && (arg == 'transform' || ( typeof arg == 'object' && typeof arg['transform'] != 'undefined'))) {
			_propsObj['transform'] = getTransformProperty(this.get(0));
		}
		if (_propsObj['transform'] != 'transform') {
			if (arg == 'transform') {
				arg = _propsObj['transform'];
				if ( typeof val == 'undefined' && jQuery.style) {
					return jQuery.style(this.get(0), arg);
				}
			} else if ( typeof arg == 'object' && typeof arg['transform'] != 'undefined') {
				arg[_propsObj['transform']] = arg['transform'];
				delete arg['transform'];
			}
		}
		return proxied.apply(this, arguments);
	};
})(jQuery); 


(function($) {
	var types = ['DOMMouseScroll', 'mousewheel'];
	if ($.event.fixHooks) {
		for (var i = types.length; i; ) {
			$.event.fixHooks[types[--i]] = $.event.mouseHooks;
		}
	}
	$.event.special.mousewheel = {
		setup : function() {
			if (this.addEventListener) {
				for (var i = types.length; i; ) {
					this.addEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = handler;
			}
		},
		teardown : function() {
			if (this.removeEventListener) {
				for (var i = types.length; i; ) {
					this.removeEventListener(types[--i], handler, false);
				}
			} else {
				this.onmousewheel = null;
			}
		}
	};
	$.fn.extend({
		mousewheel : function(fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},
		unmousewheel : function(fn) {
			return this.unbind("mousewheel", fn);
		}
	});
	function handler(event) {
		var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
		event = $.event.fix(orgEvent);
		event.type = "mousewheel";
		if (orgEvent.wheelDelta) {
			delta = orgEvent.wheelDelta / 120;
		}
		if (orgEvent.detail) {
			delta = -orgEvent.detail / 3;
		}
		deltaY = delta;
		if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
			deltaY = 0;
			deltaX = -1 * delta;
		}
		if (orgEvent.wheelDeltaY !== undefined) {
			deltaY = orgEvent.wheelDeltaY / 120;
		}
		if (orgEvent.wheelDeltaX !== undefined) {
			deltaX = -1 * orgEvent.wheelDeltaX / 120;
		}
		args.unshift(event, delta, deltaX, deltaY);
		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

})(jQuery);






