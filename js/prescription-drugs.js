function getAnimationData() {
	var maxScroll;
	var clampHeight;
	var firstPart = clampHeight * 6.2 maxScroll:
	clampHeight * 27.3
	var animation = [{
		selector : '#verticalScrollArea',
		startAt : 0,
		endAt : firstPart,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : -firstPart
			}
		}]
	}, {
		selector : '#invariant',
		startAt : 0,
		endAt : clampHeight * 0.2,
		onEndAnimate : function(anim) {
			$(document).stopTime("autoTimer");
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : -95
			}
		}]
	}, {
		selector : '#section1-text',
		startAt : 0,
		endAt : clampHeight * 0.4,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : -70
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : -clampHeight
			}
		}]
	}, {
		selector : '#section1-arrow',
		startAt : 10,
		endAt : clampHeight * 0.22,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				soundAuto.stop();
				soundAsc.stop();
				soundSport.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : 220
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : 480
			}
		}]
	}, {
		selector : '#section1-scroll',
		startAt : 0,
		endAt : clampHeight * 0.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : 180,
				"opacity" : 1
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : 0,
				"opacity" : 0
			}
		}]
	}, {
		selector : '#section1-better',
		startAt : 0,
		endAt : clampHeight * 0.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : -22
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : 40
			}
		}]
	}, {
		selector : '#section1',
		startAt : 0,
		endAt : clampHeight * 0.6,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : 200
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : 0
			}
		}]
	}, {
		selector : '#section1-chair',
		startAt : 0,
		endAt : clampHeight * 0.6,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight * 1.1 - 324
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight * 1.1 - 324
			}
		}]
	}, {
		selector : '#section1-desk',
		startAt : 0,
		endAt : clampHeight * 0.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight - 300
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight - 606
			}
		}]
	}, {
		selector : '#section2-chair',
		startAt : clampHeight * 0.5,
		endAt : clampHeight * 2.4,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth / 2 - 338
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : clampWidth / 2 + 70 - 338
			}
		}]
	}, {
		selector : '#section2-girl',
		startAt : clampHeight * 0.4,
		endAt : clampHeight * 2.4,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : 100
			}
		}]
	}, {
		selector : '#shuffle1-content .sport',
		startAt : clampHeight * 1.7,
		endAt : clampHeight * 2,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle1']);
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#shuffle1-content .sport',
		startAt : clampHeight * 2,
		endAt : clampHeight * 2.3,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				if (anim == "1") {
					soundZev.fadeOut(600);
					soundSport.fadeTo(musicVolume, 600);
				} else {
					soundSport.fadeOut(600);
					soundZev.fadeTo(musicVolume, 600);
				}
				soundAuto.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#section3-girl',
		startAt : clampHeight * 2.3,
		endAt : clampHeight * 4.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : -90
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : -30
			}
		}]
	}, {
		selector : '#section3-full',
		startAt : clampHeight * 2.3,
		endAt : clampHeight * 4.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : -300
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : -90
			}
		}]
	}, {
		selector : '#section4-girl',
		startAt : clampHeight * 3.6,
		endAt : clampHeight * 5.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : 50
			}
		}]
	}, {
		selector : '#section4-debris',
		startAt : clampHeight * 3.6,
		endAt : clampHeight * 5.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : -400,
				"margin-left" : -200
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : -300,
				"margin-left" : -150
			}
		}]
	}, {
		selector : '#section5 .content',
		startAt : clampHeight * 5,
		endAt : clampHeight * 5.5,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"scale" : 1
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"scale" : 1.1
			}
		}]
	}, {
		selector : '#section5-dog1',
		startAt : clampHeight * 4.2,
		endAt : clampHeight * 6.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : -200
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#section5-dog2',
		startAt : clampHeight * 4.2,
		endAt : clampHeight * 6.2,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : -430
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : -230
			}
		}]
	}, {
		selector : '#shuffle2-content .wd',
		startAt : clampHeight * 6.25,
		endAt : clampHeight * 6.40,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				_gaq.push(['_trackPageview', '/shuffle2']);
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				if (anim == "1") {
					soundSport.fadeOut(600);
					soundAuto.fadeTo(musicVolume, 600);
				} else {
					soundAuto.fadeOut(600);
					soundSport.fadeTo(musicVolume, 600);
				}
				soundZev.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#horizontalScrollArea',
		startAt : clampHeight * 6.4,
		endAt : clampHeight * 6.8,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#section6',
		startAt : clampHeight * 6.8,
		endAt : clampHeight * 8.4,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section6']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section6-dog',
		startAt : clampHeight * 6.3,
		endAt : clampHeight * 8.4,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -200
			}
		}]
	}, {
		selector : '#section6-girl',
		startAt : clampHeight * 6.3,
		endAt : clampHeight * 7.5,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth - 1081
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : clampWidth - 1481
			}
		}]
	}, {
		selector : '#section7',
		startAt : clampHeight * 8.6,
		endAt : clampHeight * 10,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section7']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#shuffle3',
		startAt : clampHeight * 9.8,
		endAt : clampHeight * 12.35,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -300
			}
		}]
	}, {
		selector : '#shuffle3-content .auto',
		startAt : clampHeight * 9.75,
		endAt : clampHeight * 10.20,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				soundSport.stop();
				soundZev.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#section8',
		startAt : clampHeight * 10,
		endAt : clampHeight * 11.5,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section8']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section8-bg',
		startAt : clampHeight * 10,
		endAt : clampHeight * 11.5,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"rotate" : -10
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"rotate" : 20
			}
		}]
	}, {
		selector : '#section9',
		startAt : clampHeight * 10.75,
		endAt : clampHeight * 12.25,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section9']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section9-girl',
		startAt : clampHeight * 10.75,
		endAt : clampHeight * 12.25,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section9']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : -900
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -200
			}
		}]
	}, {
		selector : '#section10',
		startAt : clampHeight * 10.3,
		endAt : clampHeight * 12,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section10']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#section10-img1',
		startAt : clampHeight * 12.5,
		endAt : clampHeight * 13,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"image" : 1
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"image" : 24
			}
		}]
	}, {
		selector : '#section10',
		startAt : clampHeight * 13,
		endAt : clampHeight * 14,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#shuffle4',
		startAt : clampHeight * 12.58,
		endAt : clampHeight * 12.6,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle4',
		startAt : clampHeight * 14.28,
		endAt : clampHeight * 15.5,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#shuffle4-content .wd',
		startAt : clampHeight * 13.77,
		endAt : clampHeight * 13.91,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				soundSport.stop();
				soundZev.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#section11',
		startAt : clampHeight * 14,
		endAt : clampHeight * 16,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section11']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section11-girl',
		startAt : clampHeight * 13.88,
		endAt : clampHeight * 16,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"translate3d" : true,
				"ref-top" : clampHeight / 2 - 380,
				"ref-left" : -300
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"translate3d" : true,
				"ref-top" : clampHeight / 2 - 300,
				"ref-left" : -100
			}
		}]
	}, {
		selector : '#section11bis',
		startAt : clampHeight * 15,
		endAt : clampHeight * 17,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section11bis']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth * 1.1
			}
		}]
	}, {
		selector : '#section11bis-girl',
		startAt : clampHeight * 15,
		endAt : clampHeight * 17,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"rotateLeft" : true,
				"ref-left" : -150,
				"ref-rotate" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"rotateLeft" : true,
				"ref-left" : -100,
				"ref-rotate" : 20
			}
		}]
	}, {
		selector : '#shuffle5',
		startAt : clampHeight * 15,
		endAt : clampHeight * 15.88,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle5-content .zev',
		startAt : clampHeight * 16.72,
		endAt : clampHeight * 16.86,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				if (anim == "1") {
					soundAuto.fadeOut(600);
					soundZev2.fadeTo(musicVolume, 600);
				} else {
					soundZev2.fadeOut(600);
					soundAuto.fadeTo(musicVolume, 600);
				}
				soundZev.stop();
				soundAuto.stop();
				soundSport.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#section12',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section12']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section12-girl',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : clampWidth - 200
			}
		}]
	}, {
		selector : '#section12-car',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 300
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 600
			}
		}]
	}, {
		selector : '#section12-roue1',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 704
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 1004
			}
		}]
	}, {
		selector : '#section12-roue1 img',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"rotate" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"rotate" : 200
			}
		}]
	}, {
		selector : '#section12-roue2 img',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
			if (Modernizr.csstransforms3d) {
				$("#shuffle8").css({
					"-webkit-transform" : "translate3d(100%, 0px, 0px)"
				});
			} else {
				$("#shuffle8").css({
					"left" : "100%"
				});
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"rotate" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"rotate" : 200
			}
		}]
	}, {
		selector : '#section12-roue2',
		startAt : clampHeight * 17,
		endAt : clampHeight * 19.22,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 437
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 737
			}
		}]
	}, {
		selector : '#section13',
		startAt : clampHeight * 18.13,
		endAt : clampHeight * 20.08,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section13']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section13-girl',
		startAt : clampHeight * 18.13,
		endAt : clampHeight * 19.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-left" : -100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-left" : 0
			}
		}]
	}, {
		selector : '#shuffle6',
		startAt : clampHeight * 17.38,
		endAt : clampHeight * 20.33,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle6']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle6',
		startAt : clampHeight * 20.33,
		endAt : clampHeight * 22.72,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight
			}
		}]
	}, {
		selector : '#shuffle6-content .auto',
		startAt : clampHeight * 20.33,
		endAt : clampHeight * 20.47,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				if (anim == "1") {
					soundZev2.fadeOut(600);
					soundAsc.fadeTo(musicVolume, 600);
				} else {
					soundAsc.fadeOut(600);
					soundZev2.fadeTo(musicVolume, 600);
				}
				soundZev.stop();
				soundSport.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#verticalScrollArea2',
		startAt : clampHeight * 20.33,
		endAt : clampHeight * 21.9,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : -clampHeight
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : 0
			}
		}]
	}, {
		selector : '#section14',
		startAt : clampHeight * 20.33,
		endAt : clampHeight * 22.3,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section14']);
			if (anim == "1") {
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight
			}
		}]
	}, {
		selector : '#section14-girl',
		startAt : clampHeight * 20.33,
		endAt : clampHeight * 22.3,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"bottom" : -225
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"bottom" : 0
			}
		}]
	}, {
		selector : '#section15',
		startAt : clampHeight * 20.3,
		endAt : clampHeight * 22.3,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section15']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : -clampHeight
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : 0
			}
		}]
	}, {
		selector : '#section15',
		startAt : clampHeight * 22.3,
		endAt : clampHeight * 23.3,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section15']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight
			}
		}]
	}, {
		selector : '#section15-bg',
		startAt : clampHeight * 22.3,
		endAt : clampHeight * 23.3,
		onEndAnimate : function(anim) {
			if (anim != "1") {
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"margin-top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"margin-top" : -100
			}
		}]
	}, {
		selector : '#horizontalScrollArea2',
		startAt : clampHeight * 22.3,
		endAt : clampHeight * 25.11,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : WIDTH
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle7',
		startAt : clampHeight * 20.36,
		endAt : clampHeight * 23.44,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle7']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : -clampHeight
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : 0
			}
		}]
	}, {
		selector : '#shuffle7',
		startAt : clampHeight * 23.44,
		endAt : clampHeight * 24.3,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -200
			}
		}]
	}, {
		selector : '#section16',
		startAt : clampHeight * 23.44,
		endAt : clampHeight * 25.3,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section16']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section16-meuble',
		startAt : clampHeight * 23.44,
		endAt : clampHeight * 25.30,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : -200
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle7-content .zev',
		startAt : clampHeight * 23.38,
		endAt : clampHeight * 23.52,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				soundSport.stop();
			}
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#section17',
		startAt : clampHeight * 24.36,
		endAt : clampHeight * 25.83,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section17']);
			if (anim == 1) {
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section18',
		startAt : clampHeight * 24.83,
		endAt : clampHeight * 26.83,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section18']);
			if (anim != "1") {
			}
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : -clampWidth
			}
		}]
	}, {
		selector : '#section18-girl',
		startAt : clampHeight * 24.83,
		endAt : clampHeight * 26.83,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : -200
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#section18-bg2',
		startAt : clampHeight * 25.52,
		endAt : clampHeight * 25.61,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"opacity" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"opacity" : 1
			}
		}]
	}, {
		selector : '#shuffle8-content .sport',
		startAt : clampHeight * 26.86,
		endAt : clampHeight * 27,
		onEndAnimate : function(anim) {
			if (anim == 1) {
				$(this.selector).addClass("selected");
			} else {
				$(this.selector).removeClass("selected")
			}
			if (isMobile == false) {
				if (anim == "1") {
					soundAsc.fadeOut(600);
					soundSport.fadeTo(musicVolume, 600);
				} else {
					soundSport.fadeOut(600);
					soundAsc.fadeTo(musicVolume, 600);
				}
				soundZev.stop();
				soundAuto.stop();
			}
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle8']);
		},
		keyframes : [{
			position : 0,
			properties : {}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {}
		}]
	}, {
		selector : '#shuffle8',
		startAt : clampHeight * 24.61,
		endAt : clampHeight * 26.83,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"left" : clampWidth
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"left" : 0
			}
		}]
	}, {
		selector : '#shuffle8',
		startAt : clampHeight * 26.83,
		endAt : clampHeight * 27.83,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : -100
			}
		}]
	}, {
		selector : '#section19',
		startAt : clampHeight * 27,
		endAt : clampHeight * 30.22,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section19']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : -clampHeight * 1.2
			}
		}]
	}, {
		selector : '#section19-window',
		startAt : clampHeight * 27.69,
		endAt : clampHeight * 27.83,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"opacity" : 1
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"opacity" : 0
			}
		}]
	}, {
		selector : '#final',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/final']);
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : 0
			}
		}]
	}, {
		selector : '#twitter',
		startAt : clampHeight * 29,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"scale" : 0,
				"top" : (clampHeight / 2) + (clampHeight / 4) + 550
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"scale" : 1,
				"top" : (clampHeight / 2) + (clampHeight / 4) + 35
			}
		}]
	}, {
		selector : '#facebook',
		startAt : clampHeight * 28.97,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"scale" : 0,
				"top" : (clampHeight / 2) + (clampHeight / 4) + 400
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"scale" : 1,
				"top" : (clampHeight / 2) + (clampHeight / 4)
			}
		}]
	}, {
		selector : '#share',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : (clampHeight / 2) + (clampHeight / 4) + 100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : (clampHeight / 2) + (clampHeight / 4) + 11
			}
		}]
	}, {
		selector : '#technology',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight / 2 + (clampHeight / 4) + 100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight / 2 + (clampHeight / 4) - 50
			}
		}]
	}, {
		selector : '#top',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight / 2 - (clampHeight / 4) + 300
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight / 2 - (clampHeight / 4)
			}
		}]
	}, {
		selector : '#findmore',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight / 2 + (clampHeight / 4) + 100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight / 2 + (clampHeight / 4)
			}
		}]
	}, {
		selector : '#credits',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight - 100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight - 60
			}
		}]
	}, {
		selector : '#credits-popup',
		startAt : clampHeight * 28.11,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : clampHeight - 100
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : clampHeight - 120
			}
		}]
	}, {
		selector : '#final-bg',
		startAt : clampHeight * 28.80,
		endAt : clampHeight * 30.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"opacity" : 0
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"opacity" : 1
			}
		}]
	}, {
		selector : '#invariant',
		startAt : clampHeight * 28.80,
		endAt : clampHeight * 29.08,
		onEndAnimate : function(anim) {
		},
		keyframes : [{
			position : 0,
			properties : {
				"top" : -95
			}
		}, {
			position : 1,
			ease : TWEEN.Easing.Linear.EaseNone,
			properties : {
				"top" : 0
			}
		}]
	}, {
		startAt : clampHeight * 0.7,
		endAt : clampHeight * 0.8,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section2']);
		}
	}, {
		startAt : clampHeight * 1.8,
		endAt : clampHeight * 1.9,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section3']);
		}
	}, {
		startAt : clampHeight * 3.6,
		endAt : clampHeight * 3.7,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section4']);
		}
	}, {
		startAt : clampHeight * 4.9,
		endAt : clampHeight * 5,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/section5']);
		}
	}, {
		startAt : clampHeight * 10.3,
		endAt : clampHeight * 10.4,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle3']);
		}
	}, {
		startAt : clampHeight * 13.7,
		endAt : clampHeight * 13.8,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle4']);
		}
	}, {
		startAt : clampHeight * 16.5,
		endAt : clampHeight * 16.6,
		onEndAnimate : function(anim) {
			if (anim == 1)
				_gaq.push(['_trackPageview', '/shuffle5']);
		}
	}, {
		startAt : clampHeight * 0.51,
		endAt : clampHeight * 0.52,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event1.play();
			}
		}
	}, {
		startAt : clampHeight * 2.42,
		endAt : clampHeight * 2.67,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event2.play();
			}
		}
	}, {
		startAt : clampHeight * 4.58,
		endAt : clampHeight * 4.59,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event3.play();
			}
		}
	}, {
		startAt : clampHeight * 7.46,
		endAt : clampHeight * 7.47,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event4.play();
			}
		}
	}, {
		startAt : clampHeight * 8.4,
		endAt : clampHeight * 8.41,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event5.play();
			}
		}
	}, {
		startAt : clampHeight * 10.16,
		endAt : clampHeight * 10.17,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event6.play();
			}
		}
	}, {
		startAt : clampHeight * 10.58,
		endAt : clampHeight * 10.59,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event7.play();
			}
		}
	}, {
		startAt : clampHeight * 12.31,
		endAt : clampHeight * 12.32,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event8.play();
			}
		}
	}, {
		startAt : clampHeight * 14.27,
		endAt : clampHeight * 14.28,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event9.play();
			}
		}
	}, {
		startAt : clampHeight * 17.27,
		endAt : clampHeight * 17.28,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event10.play();
			}
		}
	}, {
		startAt : clampHeight * 20.88,
		endAt : clampHeight * 20.89,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event11.play();
			}
		}
	}, {
		startAt : clampHeight * 21.86,
		endAt : clampHeight * 21.87,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event12.play();
			}
		}
	}, {
		startAt : clampHeight * 25.52,
		endAt : clampHeight * 25.53,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event13.play();
			}
		}
	}, {
		startAt : clampHeight * 27.13,
		endAt : clampHeight * 27.14,
		onEndAnimate : function(anim) {
			if (anim == 1 && isMobile == false) {
				event14.play();
			}
		}
	}, {
		startAt : clampHeight * 2,
		endAt : clampHeight * 2.01,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteSport.play();
			}
		}
	}, {
		startAt : clampHeight * 6.31,
		endAt : clampHeight * 6.32,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteWd.play();
			}
		}
	}, {
		startAt : clampHeight * 9.83,
		endAt : clampHeight * 9.84,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteAuto.play();
			}
		}
	}, {
		startAt : clampHeight * 13.87,
		endAt : clampHeight * 13.88,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteWd.play();
			}
		}
	}, {
		startAt : clampHeight * 16.81,
		endAt : clampHeight * 16.82,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteZev.play();
			}
		}
	}, {
		startAt : clampHeight * 20.41,
		endAt : clampHeight * 20.42,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteAuto.play();
			}
		}
	}, {
		startAt : clampHeight * 23.46,
		endAt : clampHeight * 23.47,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteZev.play();
			}
		}
	}, {
		startAt : clampHeight * 26.91,
		endAt : clampHeight * 26.92,
		onEndAnimate : function(anim) {
			if (isMobile == false) {
				moletteSport.play();
			}
		}
	}, {
		startAt : 0,
		endAt : 0.01,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#verticalContainer").show();
			}
		}
	}, {
		startAt : clampHeight * 4.91,
		endAt : clampHeight * 4.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#horizontalContainer").show();
			}
		}
	}, {
		startAt : clampHeight * 6.91,
		endAt : clampHeight * 6.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#verticalContainer").hide();
				else
					$("#verticalContainer").show();
			}
		}
	}, {
		startAt : clampHeight * 19.91,
		endAt : clampHeight * 19.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#verticalContainer2").show();
			}
		}
	}, {
		startAt : clampHeight * 22.91,
		endAt : clampHeight * 22.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#horizontalContainer").hide();
				else
					$("#horizontalContainer").show();
			}
		}
	}, {
		startAt : clampHeight * 22.91,
		endAt : clampHeight * 22.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#horizontalScroll2").show();
			}
		}
	}, {
		startAt : clampHeight * 23.91,
		endAt : clampHeight * 23.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#verticalContainer2").hide();
				else
					$("#verticalContainer2").show();
			}
		}
	}, {
		startAt : clampHeight * 24.91,
		endAt : clampHeight * 24.92,
		onEndAnimate : function(anim) {
			if (isMobile) {
				if (anim == 1)
					$("#verticalContainer2").hide();
				else
					$("#verticalContainer2").show();
			}
		}
	}];
	return animation;
}

