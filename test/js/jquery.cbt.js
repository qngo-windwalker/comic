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
                var manuallyLoad = ["images/10/2.jpg", "images/10/3.jpg", "images/10/4.jpg", "images/10/5.jpg", "images/10/6.jpg", "images/10/7.jpg", "images/10/8.jpg", "images/10/9.jpg", "images/10/10.jpg", "images/10/11.jpg", "images/10/12.jpg", "images/10/13.jpg", "images/10/14.jpg", "images/10/15.jpg", "images/10/16.jpg", "images/10/17.jpg", "images/10/18.jpg", "images/10/19.jpg", "images/10/20.jpg", "images/10/21.jpg", "images/10/22.jpg", "images/10/23.jpg", "images/10/24.jpg"];
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
                    	
                        start();
                    }
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
    var HEIGHT = w.height();
    var WIDTH = w.width();
    var clampWidth = w.width();
    var clampHeight = w.height();
    var settings = {}, defaults = {
        startAt: 0,
        sectionCheckInterval: clampHeight,
        clampWidth: clampWidth,
        tracking: false,
        firstPart: clampHeight * 6.2,
        maxScroll: clampHeight * 30.3
    }, scrollContoller;
    var wHeight;
    var $scrollBar, $scrollThumb, isScrolling, scrollBarHeight, scrollThumbHeight, thumbDelta, scrollThumbPosition, scrollPercent;
    var maxScroll = clampHeight * 30.3;
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
        var soundAuto = new buzz.sound("sons/sound", {
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
        var event2 = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true
        });
        var event3 = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true
        });
        var event4 = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true
        });
        var event5 = new buzz.sound("sons/sound", {
            formats: ["ogg", "mp3"],
            preload: true,
            autoload: true
        });
     
        window.groupSound = new buzz.group([soundZev, soundSport, soundAuto, event1, event2, event3, event4, event5]);
        $("#sound").bind("click", function () {
            window.groupSound.toggleMute();
        });
        soundZev.fadeTo(musicVolume, 600);
    }
    var firstPart = clampHeight * 6.2;
    var animation = getAnimation();

    function getCurrent(cur, top, bottom, min, max) {
        return (max - min) / (bottom - top) * (cur - top) + min;
    }

    function reposBackground(th) {
        var backgroundArray = [{
            element: "#section0",
            width: 1280,
            height: 996
        }, {
            element: ".shuffle-bg",
            width: 1280,
            height: 720,
            image: true
        }, {
            element: "#section1-bg",
            width: 132,
            height: 120,
            image: true
        }, {
            element: "#section2-bg",
            width: 132,
            height: 120,
            image: true
        }, {
            element: "#section3-bg",
            width: 1332,
            height: 720,
            image: true
        }, {
            element: "#section4-bg",
            width: 1332,
            height: 720,
            image: true
        }, {
            element: "#section5-bg",
            width: 1280,
            height: 760,
            image: true
        }, {
            element: "#final-bg",
            width: 1280,
            height: 720,
            image: true
        }];
        for (var i = 0; i < backgroundArray.length; i++) {
            var stageW = StageController.sceneWidth;
            var sPer = stageW / th;
            var imgPer = backgroundArray[i].width / backgroundArray[i].height;
            var sW;
            var sH;
            var imgX;
            var imgY;
            if (imgPer > sPer) {
                sW = Math.round(backgroundArray[i].width * (th / backgroundArray[i].height));
                sH = th;
                imgX = Math.round((stageW - sW) / 2);
                imgY = 0;
            } else {
                sW = stageW;
                sH = Math.round(backgroundArray[i].height * (stageW / backgroundArray[i].width));
                imgX = 0;
                imgY = Math.round((th - sH) / 2);
            }
            if (backgroundArray[i].ratio) {
                sW = sW * backgroundArray[i].ratio;
                sH = sH * backgroundArray[i].ratio;
            }
            if (backgroundArray[i].image && backgroundArray[i].image == true) {
                $(backgroundArray[i].element).css({
                    width: sW + "px",
                    height: sH + "px",
                    top: imgY,
                    left: imgX
                });
            } else {
                $(backgroundArray[i].element).css({
                    "background-size": sW + "px " + sH + "px"
                });
            }
            if (backgroundArray[i].element == "#section19-bg") {
                $("#section19-window").css({
                    "top": (sH / 2),
                    "margin-top": -sH * 0.52,
                    "margin-left": sW * 0.11,
                    "height": 107 * (sH / backgroundArray[i].height),
                    "width": 110 * (sW / backgroundArray[i].width)
                });
            }
        }
    }

    function isTouch() {
        return 'ontouchstart' in window;
    }
    
    function getAnimation() {
        // firstPart = clampHeight * 6.2
        // maxScroll: clampHeight * 6.3
        var animation = [{
            selector: '#verticalScrollArea',
            startAt: 0,
            endAt: firstPart,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "top": 0
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": -firstPart
                }
            }]
        }, {
            selector: '#section1-text',
            startAt: 0,
            endAt: clampHeight * 0.4,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": -70
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-top": -clampHeight
                }
            }]
        }, {
            selector: '#section1-arrow',
            startAt: 10,
            endAt: clampHeight * 0.22,
            onEndAnimate: function (anim) {
                if (isMobile == false) {
                    // soundAuto.stop();
                    // soundAsc.stop();
                    // soundSport.stop();
                }
            },
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": 220
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-top": 480
                }
            }]
        }, {
            selector: '#section1-scroll',
            startAt: 0,
            endAt: clampHeight * 0.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": 180,
                    "opacity": 1
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-top": 0,
                    "opacity": 0
                }
            }]
        }, {
            selector: '#section1-better',
            startAt: 0,
            endAt: clampHeight * 0.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": -22
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-top": 40
                }
            }]
        }, {
            selector: '#section1',
            startAt: 0,
            endAt: clampHeight * 0.6,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": 10
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-top": 0
                }
            }]
        }, {
            selector: '#section1-chair',
            startAt: 0,
            endAt: clampHeight * 0.6,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "top": clampHeight * 1.1 - 324
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": clampHeight * 1.1 - 324
                }
            }]
        }, {
            selector: '#section1-desk',
            startAt: 0,
            endAt: clampHeight * 0.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "top": clampHeight - 300
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": clampHeight - 606
                }
            }]
        }, {
            selector: '#section2-chair',
            startAt: clampHeight * 0.5,
            endAt: clampHeight * 2.4,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "left": clampWidth / 2 - 338
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "left": clampWidth / 2 + 70 - 338
                }
            }]
        }, {
            selector: '#section2-girl',
            startAt: clampHeight * 0.4,
            endAt: clampHeight * 2.4,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-left": 0
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-left": 100
                }
            }]
        }, {
            selector: '#section3-girl',
            startAt: clampHeight * 2.3,
            endAt: clampHeight * 4.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-left": -90
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-left": -30
                }
            }]
        }, {
            selector: '#section3-full',
            startAt: clampHeight * 2.3,
            endAt: clampHeight * 4.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-left": -300
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-left": -90
                }
            }]
        }, {
            selector: '#section4-girl',
            startAt: clampHeight * 3.6,
            endAt: clampHeight * 5.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-left": 0
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-left": 50
                }
            }]
        }, {
            selector: '#section4-debris',
            startAt: clampHeight * 3.6,
            endAt: clampHeight * 5.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "top": -400,
                    "margin-left": -200
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": -300,
                    "margin-left": -150
                }
            }]
        }, {
            selector: '#section5 .content',
            startAt: clampHeight * 5,
            endAt: clampHeight * 5.5,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "scale": 1
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "scale": 1.1
                }
            }]
        }, {
            selector: '#section5-dog1',
            startAt: clampHeight * 4.2,
            endAt: clampHeight * 6.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "left": -200
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "left": 0
                }
            }]
        }, {
            selector: '#section5-dog2',
            startAt: clampHeight * 4.2,
            endAt: clampHeight * 6.2,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-left": -430
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "margin-left": -230
                }
            }]
        }, {
            selector: '#horizontalScrollArea',
            startAt: clampHeight * 6.4,
            endAt: clampHeight * 6.8,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "left": clampWidth
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "left": 0
                }
            }]
        }, {
            selector: '#shuffle4-content .wd',
            startAt: clampHeight * 13.77,
            endAt: clampHeight * 13.91,
            onEndAnimate: function (anim) {
                if (anim == 1) {
                    $(this.selector).addClass("selected");
                } else {
                    $(this.selector).removeClass("selected")
                }
                if (isMobile == false) {
                    // soundSport.stop();
                    // soundZev.stop();
                }
            },
            keyframes: [{
                position: 0,
                properties: {}
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {}
            }]
        }, {
            selector: '#shuffle5',
            startAt: clampHeight * 15,
            endAt: clampHeight * 15.88,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "left": clampWidth
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "left": 0
                }
            }]
        }, {
            selector: '#top',
            startAt: clampHeight * 28.11,
            endAt: clampHeight * 30.08,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "top": clampHeight / 2 - (clampHeight / 4) + 300
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "top": clampHeight / 2 - (clampHeight / 4)
                }
            }]
        }, {
            selector: '#final-bg',
            startAt: clampHeight * 28.80,
            endAt: clampHeight * 30.08,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "opacity": 0
                }
            }, {
                position: 1,
                ease: TWEEN.Easing.Linear.EaseNone,
                properties: {
                    "opacity": 1
                }
            }]
        }, {
            startAt: clampHeight * 0.7,
            endAt: clampHeight * 0.8,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 1.8,
            endAt: clampHeight * 1.9,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 3.6,
            endAt: clampHeight * 3.7,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 4.9,
            endAt: clampHeight * 5,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 10.3,
            endAt: clampHeight * 10.4,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 13.7,
            endAt: clampHeight * 13.8,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 16.5,
            endAt: clampHeight * 16.6,
            onEndAnimate: function (anim) {
            }
        }, {
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
        }, {
            startAt: clampHeight * 7.46,
            endAt: clampHeight * 7.47,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 8.4,
            endAt: clampHeight * 8.41,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: 0,
            endAt: 0.01,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 4.91,
            endAt: clampHeight * 4.92,
            onEndAnimate: function (anim) {
            }
        }, {
            startAt: clampHeight * 6.91,
            endAt: clampHeight * 6.92,
            onEndAnimate: function (anim) {
            }
        }];
        return animation;
    }
    /*
     * 
    // end getAnimation
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
     */

    function getCurrent(cur, top, bottom, min, max) {
        return (max - min) / (bottom - top) * (cur - top) + min;
    }
    
   
    function resizeScrollBar() {
        scrollBarHeight = wHeight;
        $scrollBar.css('height', scrollBarHeight + "px");
        setScrollBarPosition(scrollPercent);
    }

    function startScroll(event) {
        isScrolling = true;
        thumbDelta = scrollThumbPosition - event.pageY;
        $(document).bind('mousemove', scrollUpdate);
        $(document).bind('mouseup', endScroll);
        return false;
    }

   
    function setScrollBarPosition(percent) {
        scrollThumbPosition = (scrollBarHeight - scrollThumbHeight) * percent;
        $scrollThumb.css('top', scrollThumbPosition);
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
        var scroll_speed;
            scroll_speed = 30;
            // $("#scrollBar").show();
            
            //activateScrollBar(40);
            
        var directionTouch = [{
            start: -1,
            end: clampHeight * 6.45,
            direction: "up"
        }, {
            start: clampHeight * 6.45,
            end: clampHeight * 20.55,
            direction: "left"
        }, {
            start: clampHeight * 20.55,
            end: clampHeight * 24,
            direction: "down"
        }, {
            start: clampHeight * 24,
            end: clampHeight * 27.4,
            direction: "left"
        }, {
            start: clampHeight * 27.4,
            end: clampHeight * 35,
            direction: "up"
        }];
        
        scrollContoller = ScrollController();
        
        scrollContoller.init({
        	// debugId: true,
            animation: animation,
            maxScroll: maxScroll,
            tickSpeed: 20,
            directionTouch: directionTouch,
            scrollSpeed: scroll_speed,
            tweenSpeed: .4,
            startAt: settings.startAt,
            container: $('#main'),
            onStart: function () {},
            onResize: function (page) {
                w = $("#container");
                HEIGHT = w.height();
                WIDTH = w.width();
                clampWidth = w.width();
                clampHeight = w.height();
                sectionHeight = HEIGHT;
                wHeight = HEIGHT;
                settings = {}, defaults = {
                    startAt: 0,
                    sectionCheckInterval: clampHeight,
                    clampWidth: clampWidth,
                    tracking: false,
                    firstPart: clampHeight * 6.2,
                    maxScroll: clampHeight * 30.8
                }, scrollContoller;
                maxScroll = clampHeight * 30.3;
                firstPart = clampHeight * 6.2;
                reposBackground(HEIGHT);
                if (clampHeight < 740) {
                    $("#section2-girl").css({
                        bottom: -(740 - clampHeight)
                    });
                }
                if ($scrollBar) resizeScrollBar();
                scrollContoller.scrollTo(scrollContoller.getScrollTop() + 3);
            },
            onUpdate: function (scrollTop) {
                if (StageController.isDebug) $('#scrollTopTweened').html(("" + scrollTop).substring(0, 10));
                if ($scrollBar) setScrollBarPosition(scrollTop / maxScroll);
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
        
        
		$('#section1-start').click(function(e) {
			e.preventDefault();
	
			scrollContoller.scrollTo(2000);
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