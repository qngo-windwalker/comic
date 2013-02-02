
var StageController = StageController || (function() {
	var _public = {
		windowWidth : 0,
		windowHeight : 0,
		minWidth : 0,
		minHeight : 0,
		stageWidth : 0,
		stageHeight : 0,
		sceneWidth : 0,
		sceneHeight : 0,
		isDebug : true
	};
	var _funcArr = [];
	var _nameArr = [];
	function init() {
		window.onresize = window.onorientationchange = onResize;
		onResize();
	}

	function addListener(name, func) {
		var check = jQuery.inArray(name, _nameArr);
		if (check > -1) {
			return;
		}
		_nameArr.unshift(name);
		_funcArr.unshift(func);
		func();
	}

	function addAutoListener(func) {
		if (Address.curSub == undefined)
			addListener(Address.curId, func);
		else
			addListener(Address.curSub, func);
	}

	function removeListener(name) {
		var check = jQuery.inArray(name, _nameArr);
		if (check > -1) {
			_nameArr.splice(check, 1);
			_funcArr.splice(check, 1);
		}
	}

	function onResize() {
		if (document.documentElement) {
			_public.windowWidth = document.documentElement.clientWidth;
			_public.windowHeight = document.documentElement.clientHeight;
		} else if (document.body.clientWidth) {
			_public.windowWidth = document.body.clientWidth;
			_public.windowHeight = document.body.clientHeight;
		} else {
			_public.windowWidth = window.innerWidth;
			_public.windowHeight = window.innerHeight;
		}
		_public.stageWidth = _public.windowWidth < _public.minWidth ? _public.minWidth : _public.windowWidth;
		_public.stageHeight = _public.windowHeight < _public.minHeight ? _public.minHeight : _public.windowHeight;
		var i = _funcArr.length;
		while (i--)_funcArr[i]();
	}


	$(document).ready(init);
	_public.addListener = addListener;
	_public.addAutoListener = addAutoListener;
	_public.removeListener = removeListener;
	_public.onResize = onResize;
	return _public;
})();
