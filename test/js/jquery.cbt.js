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

    function getAnimation() {
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
            selector: '#section1',
            startAt: 0,
            endAt: clampHeight * 0.6,
            onEndAnimate: function (anim) {},
            keyframes: [{
                position: 0,
                properties: {
                    "margin-top": 0
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
            maxScroll: 760 * 5,
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