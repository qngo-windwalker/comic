$(document).ready(function () {
	
	var w = $(window);
    window.scrollTo(0, 1);
    
    StageController.isDebug = true;
    StageController.minWidth = 0;
    StageController.minHeight = 0;
    StageController.addListener("index", onIndex);
    
    function onIndex() {
        var w = $(window);
        var WIDTH = w.width();
        var HEIGHT = w.height();
        StageController.sceneWidth = WIDTH;
        StageController.sceneHeight = HEIGHT;
    }
    var timer;
    
	setScene();
	
	function setScene() {
        var urlExperience = "prescription-drugs.html";
        $.manageAjax.add('ajaxProfile', {
            abortOld: true,
            preventDoubbleRequests: true,
            cacheResponse: true,
            success: function (data) {
            	
            	// console.log(data);
            	
                var toLoad = retrieveImages($(data));
            	// console.log(toLoad);
                var manuallyLoad = ["images/0/screen2.jpg", "images/0/screen3.jpg", "images/0/screen4.jpg", "images/0/screen5.jpg", "images/0/screen6.jpg", "images/0/screen7.jpg", "images/0/screen8.jpg", "images/0/screen9.jpg", "images/0/screen10.jpg", "images/0/screen11.jpg", "images/0/screen12.jpg", "images/0/screen13.jpg", "images/0/screen14.jpg", "images/0/screen15.jpg", "images/0/screen16.jpg", "images/0/screen17.jpg", "images/0/screen18.jpg", "images/0/screen19.jpg", "images/0/screen20.jpg", "images/0/screen21.jpg", "images/0/screen22.jpg", "images/0/screen23.jpg", "images/0/screen24.jpg"];
                var finalLoad = toLoad.concat(manuallyLoad);
                
                $("#scrollContainer").empty().html(data);
                
                var toLoad = retrieveImages($("#scrollContainer"));
                
            	// console.log(toLoad);
                // http://demos.flesler.com/jquery/preload/link/
                $.preload(toLoad, {
                    onComplete: function (callback) {
                        $("#progress").css({
                            width: (callback.done / callback.total) * 100 + "%"
                        });
                    },
                    onFinish: function () {
                        start();                    }
                });
            },
            url: urlExperience
        });
    }
    // end setScene
    
    function start() {
    	// Top header menu
        $("#invariant").animate({
            top: 0
        }, "slow");
        
        $("#sound, #autoplay, #separation").animate({
            top: 23
        }, "slow");
        
        $("#intro").delay(1000).fadeOut("slow", function () {
        	
        	// Auto Start
            $(document).oneTime(20000, "autoTimer", function () {
                // $("#autoplay").trigger("click");
            });
            
            console.log("window.siteAnimator :: " + window.siteAnimator);
            
            window.siteAnimator = null;            
            window.siteAnimator = MainScroll.init();
            
            $("#intro").remove();
        });
    }
    
    // $("#stat").hide();
    // $("#status").hide();
});

var MainScroll = (function () {
	var w = $("#cbt-player-container");
    var clampWidth = w.width();
    var clampHeight = w.height();
    
    console.log("clampHeight : " + clampHeight);
    
    var settings = {}, defaults = {
        startAt: 0,
        sectionCheckInterval: clampHeight,
        clampWidth: clampWidth,
        tracking: false,
        firstPart: clampHeight * 6.2,
    }, scrollContoller;
    
    var isScrolling, thumbDelta, scrollThumbPosition;
    var isMobile = navigator.userAgent.match(/android|avantgo|android|Android|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i) != null;
    if (isMobile == false) {
        var musicVolume = 20;
        var soundZev = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true,
            loop: true
        });
        var soundSport = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true,
            loop: true
        });
        var event1 = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true
        });
        window.groupSound = new buzz.group([soundZev, soundSport, event1]);
        $("#sound").bind("click", function () {
            window.groupSound.toggleMute();
        });
        //soundZev.fadeTo(musicVolume, 600);
    }
    var firstPart = clampHeight * 1006.2; // This has something to do with limiing scroll height
    var animation = getAnimation();

    function getAnimation() {
        var animation = [{
            selector: '#verticalScrollArea',
            startAt: 0,
            endAt: firstPart,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": 0
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": -firstPart // This also has something to do with limiting scroll height
                }
            }]
        },{
            startAt: clampHeight * 0.51,
            endAt: clampHeight * 0.52,
            onEndAnimate: function (anim) {
                if (anim == 1 && isMobile == false) {
                    event1.play();
                }
            }
        }, {
            startAt: clampHeight * 2.42,
            endAt: clampHeight * 2.67,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 4.58,
            endAt: clampHeight * 4.59,
            onEndAnimate: function (anim) {
            }
        }];
        return animation;
    }

    function getCurrent(cur, top, bottom, min, max) {
        return (max - min) / (bottom - top) * (cur - top) + min;
    }
    
    function startScroll(event) {
        isScrolling = true;
        thumbDelta = scrollThumbPosition - event.pageY;
        $(document).bind('mousemove', scrollUpdate);
        $(document).bind('mouseup', endScroll);
        return false;
    }

    function endScroll(event) {
        isScrolling = false;
        $(document).unbind('mousemove', scrollUpdate);
        $(document).unbind('mouseup', endScroll);
        return false;
    }
    
    var init = function (opts) {
    	//////////////////////////////////////////////////////////////////////////////////
    	console.log('Main scroll init');
    	
        settings = $.extend(defaults, opts);
            // $("#scrollBar").show();            
            //activateScrollBar(40);
        
        scrollContoller = ScrollController();
        
        // This cannot be calculated since there's no way of monitoring assets load completed.

        scrollContoller.init({
        	// This does not work.
        	debugId: true,
            animation: animation,
            // This cannot be calculated since there's no way of monitoring assets load completed.
            // 760 is the image's height multiple by 5
            maxScroll: 7060 * 40, 
            tickSpeed: 20,
            scrollSpeed: 30,
            tweenSpeed: .4,
            startAt: settings.startAt,
            container: $('#main'),
            onStart: function () {},
            onResize: function (page) {},
            onUpdate: function (scrollTop) {
                if (StageController.isDebug) $('#scrollTopTweened').html(("" + scrollTop).substring(0, 10));
            }
        });
        
        $("#sound").bind("click", function () {
            $(this).toggleClass("disabled");
        });
        $("#top").bind("click", function () {
            scrollContoller.scrollTo($(this).data("ref"));
        });
        
        $("#cbt-player-main-prev").bind("click", function () 
        {
            scrollContoller.scrollTo(4);
        });
        
        $("#cbt-player-main-next").bind("click", function () 
        {
            scrollContoller.scrollTo(3106);
        });
        
		$('#main .cbt-player-nav-section').click(function(e) {
			e.preventDefault();
			
			var nextElemId = $(this).attr("href");
			var nextElemOffsetTop = $('#main div' + nextElemId)[0].offsetTop; 
			console.log(nextElemOffsetTop);
			scrollContoller.scrollTo(nextElemOffsetTop);
			return false;
		}); 
        
        return scrollContoller;
    }
    
    return {
        init: init,
        scrollContoller: scrollContoller
    }
	console.log('MainScroll');
})();