
EKTweener = (function(doc, w) {
	var undef;
	var app = {};
	var _browserPrefix = "";
	var _dummy;
	var _dummyStyle;
	var HTMLPlugins = {};
	var HTMLPrefixedStyle = [];
	var HTMLStyleAlias = {};
	var HTMLSuffix = {
		width : "px",
		height : "px",
		top : "px",
		left : "px",
		bottom : "px",
		right : "px",
		marginTop : "px",
		marginLeft : "px",
		marginBottom : "px",
		marginRight : "px",
		paddingTop : "px",
		paddingLeft : "px",
		paddingBottom : "px",
		paddingRight : "px",
		fontSize : "px",
		size : "px"
	};
	var _targetTweens = [];
	function _isHTMLElement(target) {
		return typeof HTMLElement === "object" ? target instanceof HTMLElement : typeof target === "object" && target.nodeType === 1 && typeof target.nodeName === "string";
	};
	function _isStyle(target) {
		return typeof CSSStyleDeclaration === "object" ? target instanceof CSSStyleDeclaration : typeof target === "object" && typeof target.cssText === "string";
	};
	function _init() {
		var testedElement = doc.createElement("div");
		var browserPrefixes = 'Webkit Moz O ms'.split(' ');
		var i = browserPrefixes.length;
		while (i--) {
			if (browserPrefixes[i] + "Transform" in testedElement.style) {
				_browserPrefix = browserPrefixes[i];
				break;
			}
		}
	}

	function getPropertyName(name) {
		if (HTMLStyleAlias[name])
			name = HTMLStyleAlias[name];
		for (var i = 0; i < HTMLPrefixedStyle.length; i++)
			if (HTMLPrefixedStyle[i] === name)
				return _browserPrefix + name.charAt(0).toUpperCase() + name.slice(1);
		return name;
	}

	function _parseNaming(data) {
		for (var name in data) {
			var newName = name;
			if (HTMLStyleAlias[name])
				newName = HTMLStyleAlias[name];
			for (var i = 0; i < HTMLPrefixedStyle.length; i++)
				if (HTMLPrefixedStyle[i] === newName) {
					newName = _browserPrefix + newName.charAt(0).toUpperCase() + newName.slice(1);
					break
				}
			;
			if (name !== newName) {
				data[newName] = data[name];
				delete data[name];
			}
		}
	}

	function _parseDataNaming(data) {
		_parseNaming(data);
		_parseNaming(data.plugin);
	}

	function _parseHTMLStyle(target, data) {
		if (!data.plugin)
			data.plugin = {};
		if (!data.suffix)
			data.suffix = {};
		for (property in data) {
			if (HTMLPlugins[property] && !data.plugin[property]) {
				data.plugin[property] = HTMLPlugins[property];
			}
			if (HTMLSuffix[property] && !data.suffix[property]) {
				data.suffix[property] = HTMLSuffix[property];
			}
		}
		_parseDataNaming(data);
	}

	function to(target, duration, data, hasFrom) {
		var appliedTarget;
		if (_isHTMLElement(target) && data.skipHTMLParsing != true) {
			appliedTarget = target.style;
			_parseHTMLStyle(target, data);
		} else {
			appliedTarget = target;
			data.appliedTarget = target;
		}
		if ( typeof target.tweenId === "undefined") {
			target.tweenId = _targetTweens.length;
			_targetTweens[target.tweenId] = [];
		}
		var delay = data.delay == undef ? 0 : data.delay;
		delete data.delay;
		var ekTween = new EKTween(target, appliedTarget, duration, delay, data, hasFrom || false);
		_targetTweens[target.tweenId].push(ekTween);
		if (!hasFrom)
			ekTween.onLoop();
		return ekTween;
	};
	function fromTo(target, duration, fromData, toData) {
		var ekTween = to(target, duration, toData, true);
		if (_isHTMLElement(target) && toData.skipHTMLParsing != true)
			_parseDataNaming(fromData);
		for (var i in fromData)
		ekTween.changeFrom(i, fromData[i]);
		ekTween.onLoop();
		return ekTween;
	};
	function killTweensOf(target) {
		var tween = _targetTweens[target.tweenId];
		if (tween) {
			while (tween[0]) {
				tween[0].removeProperties();
				tween[0].kill();
				delete tween[0];
			}
			tween.splice(0, tween.length);
		}
	};
	function getTweens(target) {
		return _targetTweens[target.tweenId];
	};
	function getTween(target, propertyName) {
		if (HTMLStyleAlias[propertyName])
			propertyName = HTMLStyleAlias[propertyName];
		var arr = getTweens(target);
		if (!arr)
			return null;
		var i = arr.length;
		while (i--)
		if (arr[i].properties[propertyName])
			return arr[i];
		return null;
	};
	function getStyle(name, cssText) {
		propertyName = getPropertyName(name);
		var styleName = styleName;
		var re = /[A-Z]/g;
		if (re.test(propertyName)) {
			styleName = propertyName.replace(re, function() {
				return "-" + arguments[0].toLowerCase()
			});
			if (styleName.indexOf("ms") == 0)
				styleName = "-" + styleName;
		}
		if (doc.body) {
			if (!_dummy) {
				_dummy = doc.createElement("div");
				_dummyStyle = _dummy.style;
				_dummyStyle.position = "absolute";
				_dummyStyle.top = _dummyStyle.left = "-9000px";
				document.body.appendChild(_dummy);
			}
			_dummyStyle[propertyName] = cssText;
			return w.getComputedStyle(_dummy, "null").getPropertyValue(styleName);
		}
		var fakeBody = doc.createElement("body");
		var dummy = doc.createElement("div");
		doc.documentElement.appendChild(fakeBody);
		fakeBody.appendChild(dummy);
		_dummyStyle[propertyName] = cssText;
		var computedStyle = w.getComputedStyle(dummy, "null").getPropertyValue(styleName);
		doc.documentElement.removeChild(fakeBody);
		fakeBody = null;
		dummy = null;
		return computedStyle;
	}

	_init();
	app.HTMLPlugins = HTMLPlugins;
	app.HTMLSuffix = HTMLSuffix;
	app.HTMLPrefixedStyle = HTMLPrefixedStyle;
	app.HTMLStyleAlias = HTMLStyleAlias;
	app.getPropertyName = getPropertyName;
	app.getStyle = getStyle;
	app.to = to;
	app.fromTo = fromTo;
	app.killTweensOf = killTweensOf;
	app.getTweens = getTweens;
	app.getTween = getTween;
	return app;
})(document, window);


function EKTween(target, appliedTarget, duration, delay, data, hasFrom) {
	this._target = target;
	this._appliedTarget = appliedTarget;
	this._isStyle = target !== appliedTarget;
	this._data = data;
	this._pauseTime = 0;
	this._isPaused = false;
	this._isStarted = false;
	this._currentTime = new Date().getTime();
	this._startTime = delay * 1000 + this._currentTime;
	this._durationTime = duration * 1000;
	this._hasFrom = hasFrom;
	this.isFinished = false;
	this.ease = EKTweenFunc.easeOutCirc;
	this.tweens = null;
	this.onStart = null;
	this.onStartParams = null;
	this.onUpdate = null;
	this.onUpdateParams = null;
	this.onComplete = null;
	this.onCompleteParams = null;
	this.properties = {};
	this.prefix = {};
	this.suffix = {};
	this.yoyo = {};
	this.plugin = {};
	this.init();
};

EKTween.prototype = {
	init : function() {
		for (var i in this._data.plugin) {
			this.plugin[i] = new this._data.plugin[i]();
		}
		for (i in this._data) {
			switch(i) {
				case"ease":
					this.ease = EKTweenFunc[this._data[i]];
					break;
				case"prefix":
				case"suffix":
				case"yoyo":
				case"onStart":
				case"onStartParams":
				case"onUpdate":
				case"onUpdateParams":
				case"onComplete":
				case"onCompleteParams":
					this[i] = this._data[i];
					break;
				case"plugin":
					break;
				default:
					this.properties[i] = [this.plugin[i] ? 1 : this._data[i], 0];
					if (this.plugin[i])
						this.plugin[i].setTo(this._data[i], this._appliedTarget);
			}
		};
		if (this.yoyo && this._isStyle) {
			for (var i = 0; i < this.yoyo.length; i++) {
				this.yoyo[i] = EKTweener.getPropertyName(this.yoyo[i]);
			}
		}
		this.tweens = EKTweener.getTweens(this._target);
		if (this.tweens) {
			if (this.tweens.length > 0) {
				i = this.tweens.length;
				while (i--) {
					if (this.tweens[i].removeProperties(this.properties) == 0) {
						this.tweens[i].kill();
						this.tweens.splice(i, 1);
					};
				};
			};
		};
		delete this._data;
		function bind(fn, scope) {
			return function() {
				return fn.apply(scope, Array.prototype.slice.call(arguments));
			};
		};
		this.onLoop = bind(this.onLoop, this);
	},
	update : function() {
		if (this.onUpdate) {
			if (this.onUpdateParams) {
				this.onUpdate.apply(this, this.onUpdateParams);
			} else {
				this.onUpdate();
			}
		}
	},
	onLoop : function() {
		if (this.isFinished)
			return;
		requestAnimFrame(this.onLoop);
		this._currentTime = new Date().getTime();
		if (!this._isPaused) {
			if (this._currentTime >= this._startTime) {
				if (!this._isStarted) {
					if (!this._hasFrom)
						for (var i in this.properties) {
							this.setProperty(i, this.properties[i]);
						}
					if (this.onStart) {
						if (this.onStartParams) {
							this.onStart.apply(this, this.onStartParams);
						} else {
							this.onStart();
						}
					}
					this._isStarted = true;
				}
				if (this._currentTime >= this._durationTime + this._startTime) {
					for (var i in this.properties) {
						this.setValue(this.properties[i][4] ? this.properties[i][1] : this.properties[i][0], i, this.properties[i]);
					}
					this.update();
					if (this.onComplete) {
						if (this.onCompleteParams) {
							this.onComplete.apply(this, this.onCompleteParams);
						} else {
							this.onComplete();
						}
					}
					this.kill();
					i = this.tweens.length;
					while (i--) {
						if (this.tweens[i])
							if (this.tweens[i].isFinished)
								this.tweens.splice(i, 1);
					}
					return;
				} else {
					for (var i in this.properties) {
						this.setEaseValue(i, this.properties[i]);
					}
					this.update();
				}
			};
		};
	},
	setProperty : function(propertyName, property) {
		var i;
		if (this.prefix) {
			if (this.prefix[propertyName]) {
				property[2] = this.prefix[propertyName];
			}
		};
		if (this.suffix) {
			if (this.suffix[propertyName]) {
				property[3] = this.suffix[propertyName];
			}
		};
		if (this.yoyo) {
			for (var i = 0; i < this.yoyo.length; i++) {
				if (this.yoyo[i] === propertyName) {
					property[4] = true;
					break;
				}
			}
		};
		if (this._isStyle) {
			var currentValue = this.getCurrentPropertyValue(propertyName);
			if (this.plugin[propertyName]) {
				this.plugin[propertyName].setFrom(currentValue);
				property[1] = 0;
			} else {
				property[1] = parseFloat(currentValue);
			}
		} else {
			property[1] = this._appliedTarget[propertyName];
		}
		if (isNaN(property[1]))
			property[1] = 0;
	},
	setEaseValue : function(propertyName, property) {
		if (property[4]) {
			var d = this._durationTime;
			var t = (this._currentTime - this._startTime) * 2 / d;
			this.setValue(this.ease(t > 1 ? 2 - t : t, property[1], property[0] - property[1], 1), propertyName, property);
		} else {
			this.setValue(this.ease(this._currentTime - this._startTime < 0 ? 0 : this._currentTime - this._startTime, property[1], property[0] - property[1], this._durationTime), propertyName, property);
		}
	},
	setValue : function(value, propertyName, property) {
		if (isNaN(value))
			return;
		var pValue = this.plugin[propertyName] ? this.plugin[propertyName].setOutput(value) : value;
		if (property.length > 2)
			this._appliedTarget[propertyName] = (property[2] ? property[2] : "") + pValue + (property[3] ? property[3] : "");
		else
			this._appliedTarget[propertyName] = pValue;
	},
	kill : function() {
		this.isFinished = true;
	},
	pause : function() {
		if (this._pauseTime == 0)
			this._pauseTime = new Date().getTime();
		this._isPaused = true;
	},
	resume : function() {
		if (this._pauseTime > 0) {
			var timeDiff = new Date().getTime() - this._pauseTime;
			this._currentTime += timeDiff;
			this._startTime += timeDiff;
			_pauseTime = new Date().getTime();
			this._pauseTime = 0;
		}
		if (this._isPaused)
			this._isPaused = false;
	},
	removeProperties : function(propertyNames) {
		var i;
		if (propertyNames) {
			var size = 0;
			for (propertyName in this.properties) {
				if ( propertyName in propertyNames)
					delete this.properties[propertyName];
				else
					size++;
			};
			return size;
		} else {
			for (propertyName in this.properties)
			delete this.properties[propertyName];
		}
		return 0;
	},
	changeFrom : function(propertyName, value) {
		if (this._isHTML)
			propertyName = getPropertyName(propertyName);
		this.setProperty(propertyName, this.properties[propertyName]);
		if (this.properties[propertyName]) {
			if (this.plugin[propertyName]) {
				this.plugin[propertyName].setFrom(value);
			} else {
				this.properties[propertyName][1] = value;
			}
		}
	},
	changeTo : function(propertyName, value) {
		if (this._isHTML)
			propertyName = getPropertyName(propertyName);
		if (this.properties[propertyName]) {
			if (this.plugin[propertyName]) {
				this.plugin[propertyName].setTo(value);
			} else {
				this.properties[propertyName][0] = value;
			}
		}
	},
	getCurrentPropertyValue : function(propertyName) {
		var re = /[A-Z]/g;
		if (re.test(propertyName)) {
			propertyName = propertyName.replace(re, function() {
				return "-" + arguments[0].toLowerCase()
			});
			if (propertyName.indexOf("ms") == 0)
				propertyName = "-" + propertyName;
		}
		return window.getComputedStyle(this._target, "null").getPropertyValue(propertyName);
	}
}; 

var EKTweenFunc = {
	linear : function(t, b, c, d) {
		return c * t / d + b;
	},
	easeInQuad : function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad : function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad : function(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic : function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic : function(t, b, c, d) {
		return c * (( t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic : function(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeOutInCubic : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutCubic(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInCubic((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInQuart : function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart : function(t, b, c, d) {
		return -c * (( t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart : function(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeOutInQuart : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutQuart(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInQuart((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInQuint : function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint : function(t, b, c, d) {
		return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint : function(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeOutInQuint : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutQuint(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInQuint((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInSine : function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine : function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine : function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeOutInSine : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutSine(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInSine((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInExpo : function(t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
	},
	easeOutExpo : function(t, b, c, d) {
		return (t == d) ? b + c : c * 1.001 * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo : function(t, b, c, d) {
		if (t == 0)
			return b;
		if (t == d)
			return b + c;
		if ((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
		return c / 2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeOutInExpo : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutExpo(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInExpo((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInCirc : function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc : function(t, b, c, d) {
		return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
	},
	easeInOutCirc : function(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeOutInCirc : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutCirc(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInCirc((t * 2) - d, b + c / 2, c / 2, d);
	},
	easeInElastic : function(t, b, c, d, a, p) {
		var s;
		if (t == 0)
			return b;
		if ((t /= d) == 1)
			return b + c;
		if (!p)
			p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic : function(t, b, c, d, a, p) {
		var s;
		if (t == 0)
			return b;
		if ((t /= d) == 1)
			return b + c;
		if (!p)
			p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(c / a);
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
	},
	easeInOutElastic : function(t, b, c, d, a, p) {
		var s;
		if (t == 0)
			return b;
		if ((t /= d / 2) == 2)
			return b + c;
		if (!p)
			p = d * (.3 * 1.5);
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1)
			return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeOutInElastic : function(t, b, c, d, a, p) {
		if (t < d / 2)
			return EKTweenFunc.easeOutElastic(t * 2, b, c / 2, d, a, p);
		return EKTweenFunc.easeInElastic((t * 2) - d, b + c / 2, c / 2, d, a, p);
	},
	easeInBack : function(t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack : function(t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack : function(t, b, c, d, s) {
		if (s == undefined)
			s = 1.70158;
		if ((t /= d / 2) < 1)
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeOutInBack : function(t, b, c, d, s) {
		if (t < d / 2)
			return EKTweenFunc.easeOutBack(t * 2, b, c / 2, d, s);
		return EKTweenFunc.easeInBack((t * 2) - d, b + c / 2, c / 2, d, s);
	},
	easeInBounce : function(t, b, c, d) {
		return c - EKTweenFunc.easeOutBounce(d - t, 0, c, d) + b;
	},
	easeOutBounce : function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	easeInOutBounce : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeInBounce(t * 2, 0, c, d) * .5 + b;
		else
			return EKTweenFunc.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	},
	easeOutInBounce : function(t, b, c, d) {
		if (t < d / 2)
			return EKTweenFunc.easeOutBounce(t * 2, b, c / 2, d);
		return EKTweenFunc.easeInBounce((t * 2) - d, b + c / 2, c / 2, d);
	}
};

function EKTweenerOpacityPlugin() {
	var _from;
	var _to;
	this.setFrom = function(from) {
		if (!from) {
			_from = 1;
			return;
		}
		if ( typeof from == "number") {
			_from = parseFloat(from);
			return;
		}
		var index = from.indexOf("alpha");
		if (index > -1) {
			_from = parseFloat(from.slice(from.indexOf("=", index) + 1)) / 100;
		} else {
			_from = 1;
		}
	}
	this.setTo = function(to) {
		_to = to;
	}
	this.setOutput = function(value) {
		return "alpha(opacity=" + ((_from + (_to - _from) * value) * 100) + ")";
	}
};

EKTweenerOpacityPlugin.hasOpacity = (function() {
	var testedElement = document.createElement("div");
	return "opacity" in testedElement.style;
})();

if (EKTweener) {
	if (!EKTweenerOpacityPlugin.hasOpacity) {
		EKTweener.HTMLStyleAlias.opacity = "filter";
		EKTweener.HTMLPlugins.opacity = EKTweenerOpacityPlugin;
	}
};


(function($) {"use strict";
	var managed = {}, cache = {};
	$.manageAjax = (function() {
		function create(name, opts) {
			managed[name] = new $.manageAjax._manager(name, opts);
			return managed[name]
		}

		function destroy(name) {
			if (managed[name]) {
				managed[name].clear(true);
				delete managed[name]
			}
		}

		var publicFns = {
			create : create,
			destroy : destroy
		};
		return publicFns
	})();
	$.manageAjax._manager = function(name, opts) {
		this.requests = {};
		this.inProgress = 0;
		this.name = name;
		this.qName = name;
		this.opts = $.extend({}, $.ajaxSettings, $.manageAjax.defaults, opts);
		if (opts && opts.queue && opts.queue !== true && typeof opts.queue === 'string' && opts.queue !== 'clear') {
			this.qName = opts.queue
		}
	};
	$.manageAjax._manager.prototype = {
		add : function(o) {
			o = $.extend({}, this.opts, o);
			var origCom = o.complete || $.noop, origSuc = o.success || $.noop, beforeSend = o.beforeSend || $.noop, origError = o.error || $.noop, strData = ( typeof o.data == 'string') ? o.data : $.param(o.data || {}), xhrID = o.type + o.url + strData, that = this, ajaxFn = this._createAjax(xhrID, o, origSuc, origCom);
			if (o.preventDoubbleRequests && o.queueDuplicateRequests) {
				if (o.preventDoubbleRequests) {
					o.queueDuplicateRequests = false
				}
				setTimeout(function() {
					throw ("preventDoubbleRequests and queueDuplicateRequests can't be both true");
				}, 0)
			}
			if (this.requests[xhrID] && o.preventDoubbleRequests) {
				return
			}
			ajaxFn.xhrID = xhrID;
			o.xhrID = xhrID;
			o.beforeSend = function(xhr, opts) {
				var ret = beforeSend.call(this, xhr, opts);
				if (ret === false) {
					that._removeXHR(xhrID)
				}
				xhr = null;
				return ret
			};
			o.complete = function(xhr, status) {
				that._complete.call(that, this, origCom, xhr, status, xhrID, o);
				xhr = null
			};
			o.success = function(data, status, xhr) {
				that._success.call(that, this, origSuc, data, status, xhr, o);
				xhr = null
			};
			o.error = function(ahr, status, errorStr) {
				var httpStatus = '', content = '';
				if (status !== 'timeout' && ahr) {
					httpStatus = ahr.status;
					content = ahr.responseXML || ahr.responseText
				}
				if (origError) {
					origError.call(this, ahr, status, errorStr, o)
				} else {
					setTimeout(function() {
						throw status + '| status: ' + httpStatus + ' | URL: ' + o.url + ' | data: ' + strData + ' | thrown: ' + errorStr + ' | response: ' + content;
					}, 0)
				}
				ahr = null
			};
			if (o.queue === 'clear') {
				$(document).clearQueue(this.qName)
			}
			if (o.queue || (o.queueDuplicateRequests && this.requests[xhrID])) {
				$.queue(document, this.qName, ajaxFn);
				if (this.inProgress < o.maxRequests && (!this.requests[xhrID] || !o.queueDuplicateRequests)) {
					$.dequeue(document, this.qName)
				}
				return xhrID
			}
			return ajaxFn()
		},
		_createAjax : function(id, o, origSuc, origCom) {
			var that = this;
			return function() {
				if (o.beforeCreate.call(o.context || that, id, o) === false) {
					return
				}
				that.inProgress++;
				if (that.inProgress === 1) {
					$.event.trigger(that.name + 'AjaxStart')
				}
				if (o.cacheResponse && cache[id]) {
					if (!cache[id].cacheTTL || cache[id].cacheTTL < 0 || ((new Date().getTime() - cache[id].timestamp) < cache[id].cacheTTL)) {
						that.requests[id] = {};
						setTimeout(function() {
							that._success.call(that, o.context || o, origSuc, cache[id]._successData, 'success', cache[id], o);
							that._complete.call(that, o.context || o, origCom, cache[id], 'success', id, o)
						}, 0)
					} else {
						delete cache[id]
					}
				}
				if (!o.cacheResponse || !cache[id]) {
					if (o.async) {
						that.requests[id] = $.ajax(o)
					} else {
						$.ajax(o)
					}
				}
				return id
			}
		},
		_removeXHR : function(xhrID) {
			if (this.opts.queue || this.opts.queueDuplicateRequests) {
				$.dequeue(document, this.qName)
			}
			this.inProgress--;
			this.requests[xhrID] = null;
			delete this.requests[xhrID]
		},
		clearCache : function() {
			cache = {}
		},
		_isAbort : function(xhr, status, o) {
			if (!o.abortIsNoSuccess || (!xhr && !status)) {
				return false
			}
			var ret = !!((!xhr || xhr.readyState === 0 || this.lastAbort === o.xhrID));
			xhr = null;
			return ret
		},
		_complete : function(context, origFn, xhr, status, xhrID, o) {
			if (this._isAbort(xhr, status, o)) {
				status = 'abort';
				o.abort.call(context, xhr, status, o)
			}
			origFn.call(context, xhr, status, o);
			$.event.trigger(this.name + 'AjaxComplete', [xhr, status, o]);
			if (o.domCompleteTrigger) {
				$(o.domCompleteTrigger).trigger(this.name + 'DOMComplete', [xhr, status, o]).trigger('DOMComplete', [xhr, status, o])
			}
			this._removeXHR(xhrID);
			if (!this.inProgress) {
				$.event.trigger(this.name + 'AjaxStop')
			}
			xhr = null
		},
		_success : function(context, origFn, data, status, xhr, o) {
			var that = this;
			if (this._isAbort(xhr, status, o)) {
				xhr = null;
				return
			}
			if (o.abortOld) {
				$.each(this.requests, function(name) {
					if (name === o.xhrID) {
						return false
					}
					that.abort(name)
				})
			}
			if (o.cacheResponse && !cache[o.xhrID]) {
				if (!xhr) {
					xhr = {}
				}
				cache[o.xhrID] = {
					status : xhr.status,
					statusText : xhr.statusText,
					responseText : xhr.responseText,
					responseXML : xhr.responseXML,
					_successData : data,
					cacheTTL : o.cacheTTL,
					timestamp : new Date().getTime()
				};
				if ('getAllResponseHeaders' in xhr) {
					var responseHeaders = xhr.getAllResponseHeaders();
					var parsedHeaders;
					var parseHeaders = function() {
						if (parsedHeaders) {
							return
						}
						parsedHeaders = {};
						$.each(responseHeaders.split("\n"), function(i, headerLine) {
							var delimiter = headerLine.indexOf(":");
							parsedHeaders[headerLine.substr(0, delimiter)] = headerLine.substr(delimiter + 2)
						})
					};
					$.extend(cache[o.xhrID], {
						getAllResponseHeaders : function() {
							return responseHeaders
						},
						getResponseHeader : function(name) {
							parseHeaders();
							return ( name in parsedHeaders) ? parsedHeaders[name] : null
						}
					})
				}
			}
			origFn.call(context, data, status, xhr, o);
			$.event.trigger(this.name + 'AjaxSuccess', [xhr, o, data]);
			if (o.domSuccessTrigger) {
				$(o.domSuccessTrigger).trigger(this.name + 'DOMSuccess', [data, o]).trigger('DOMSuccess', [data, o])
			}
			xhr = null
		},
		getData : function(id) {
			if (id) {
				var ret = this.requests[id];
				if (!ret && this.opts.queue) {
					ret = $.grep($(document).queue(this.qName),function(fn,i){return(fn.xhrID===id)})[0]
				}
				return ret
			}
			return {
				requests : this.requests,
				queue : (this.opts.queue) ? $(document).queue(this.qName) : [],
				inProgress : this.inProgress
			}
		},
		abort : function(id) {
			var xhr;
			if (id) {
				xhr = this.getData(id);
				if (xhr && xhr.abort) {
					this.lastAbort = id;
					xhr.abort();
					this.lastAbort = false
				} else {
					$(document).queue(this.qName, $.grep($(document).queue(this.qName), function(fn, i) {
						return (fn !== xhr)
					}))
				}
				xhr = null;
				return
			}
			var that = this, ids = [];
			$.each(this.requests, function(id) {
				ids.push(id)
			});
			$.each(ids, function(i, id) {
				that.abort(id)
			})
		},
		clear : function(shouldAbort) {
			$(document).clearQueue(this.qName);
			if (shouldAbort) {
				this.abort()
			}
		}
	};
	$.manageAjax._manager.prototype.getXHR = $.manageAjax._manager.prototype.getData;
	$.manageAjax.defaults = {
		beforeCreate : $.noop,
		abort : $.noop,
		abortIsNoSuccess : true,
		maxRequests : 1,
		cacheResponse : false,
		domCompleteTrigger : false,
		domSuccessTrigger : false,
		preventDoubbleRequests : true,
		queueDuplicateRequests : false,
		cacheTTL : -1,
		queue : false
	};
	$.each($.manageAjax._manager.prototype, function(n, fn) {
		if (n.indexOf('_') === 0 || !$.isFunction(fn)) {
			return
		}
		$.manageAjax[n] = function(name, o) {
			if (!managed[name]) {
				if (n === 'add') {
					$.manageAjax.create(name, o)
				} else {
					return
				}
			}
			var args = Array.prototype.slice.call(arguments, 1);
			managed[name][n].apply(managed[name], args)
		}
	})
})(jQuery);




