
$(document).ready(function(){
	
	//TextBox PlaceHolders
	
	$('.form-title-1-selectBox-dropdown-menu li:first').hide();
	
	lang = $('#reserve-form').attr('class'); //Get language
	$('#errors').css("opacity", 0);
	
	$('.form-field-full, .form-field-half').keydown(function() {
        default_value = $(this).attr('default-value');
		
		if ($(this).val() == default_value) {
			$(this).val('');
		}
    });
	
	$('.form-field-full, .form-field-half').blur(function() {
        default_value = $(this).attr('default-value');
		
		if (($(this).val() == default_value) || ($(this).val() == '') || ($(this).val()==null)){
			$(this).val(default_value);
		}
    });
	
	
	//Error Checking on form fields
	
	var errors = new Array();	
	
	$('#reserve-form').submit(function(){ //return true;
		
		errors = null;	
		error_messages= new Array();
		$('#mail-errors').text('');
		$('#errors').fadeTo(1, 0);
		$('#text-errors').text('');
		$('#phone-errors').text('');
		
		text_errors = false;
		mail_errors = false;
		phone_errors = false;
		select_errors = false;
		agree_errors = false;
		
		$('#reserve-form input[type="text"]').css("border", "#d6d6d6 solid 2px");
		$('#reserve-form .selectBox-dropdown').css({'min-width':'160px', 'max-width':'160px', 'height': '29px', 'border': 'none'});
		$('#reserve-form .form-country, #reserve-form .form-language').css({"border": "none", "min-width": "340px",  "max-width": "340px", "height": "29px"});
		$('.agree').css('border','2px solid transparent');
		
		//Checks if text field is different than null or the placeholder (default-value)
		var text_fields = $('#reserve-form input[type="text"]').length; 
		
		
		for (i=0; i<text_fields; i++) {
			var default_value_field = $('#reserve-form input[type="text"]').eq(i).attr('default-value');
			
			var required=($('#reserve-form input[type="text"]').eq(i).attr('class').split(' ')[1]=="required");
			if (required)
				if (($('#reserve-form input[type="text"]').eq(i).val() == null) || ($('#reserve-form input[type="text"]').eq(i).val() == '') || ($('#reserve-form input[type="text"]').eq(i).val() == default_value_field)) {
					text_errors = true;
					error_messages.push($('#reserve-form input[type="text"]').eq(i).attr('name').split(' ')[0]);
					$('#reserve-form input[type="text"]').eq(i).css("border", "red solid 2px");
				}
		}	
		
		//Checks if select field is different than default value (first)
		if ('ontouchstart' in window) {
			$('select').each(function(){
				var $this = $(this);
				
				var required=($(this).attr('class').split(' ')[2]=="required");
				var default_value_select = $this.find("option:selected").text();
				var first_value = $this.find("option:first").text();
				
				if (required) {
					if (default_value_select===first_value) {
						$this.addClass('red-error');
					} else {
						$this.removeClass('red-error');
					}
				}
				//alert(default_value_select+"=?="+first_value);
			});
		} else {
			var select_boxes = $('.selectBox-dropdown').length;
			for (i=0; i<select_boxes; i++) {
				
				var select_class =  $('.selectBox-dropdown').eq(i).attr('class').split(' ')[2];
				var default_value_select = $('ul.'+select_class+'-selectBox-dropdown-menu li:first-child a').text();
				var required=($('.selectBox-dropdown').eq(i).attr('class').split(' ')[3]=="required");
				if (required)
					if ($('.selectBox-dropdown').eq(i).children('.selectBox-label').text() == default_value_select) {
						select_errors = true;
						error_messages.push($('.selectBox-dropdown').eq(i).attr('class').split(' ')[2]);
						$('.selectBox-dropdown').eq(i).css({"border": "red solid 2px", "min-width": "156px",  "max-width": "156px", "height": "25px"});
						
						if (($('.selectBox-dropdown').eq(i).hasClass('form-country')) || ($('.selectBox-dropdown').eq(i).hasClass('form-language'))) {
								$('.selectBox-dropdown').eq(i).css({"border": "red solid 2px", "min-width": "336px",  "max-width": "336px", "height": "25px"});
						}
																
						$('select.'+select_class).addClass('red-error');
						
					}
			}			
		}

		
		//Checks if is valid email address
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		
		if ($('#reserve-form #form-email') != 0){
			var address = $('#reserve-form #form-email').val();
			if(reg.test(address) == false){
				mail_errors = true;	
				$('#reserve-form #form-email').css("border", "red solid 2px");
			}
		}
		
		if ($('#reserve-form #form-number') != 0){
			var phonenumber = $('#reserve-form #form-number').val();
			if ($('#language').val()!="Germany" || ($('#language').val()=="Germany" &&  $("input:radio[name=agree-phone]:checked").val()=="Yes")){
				if( isNaN(phonenumber) || phonenumber.indexOf(' ')!=-1){
					phone_errors = true;	
					$('#reserve-form #form-number').css("border", "red solid 2px");
				}
			}
			else if ($('#language').val()=="Germany" &&  $("input:radio[name=agree-phone]:checked").val()=="No")
				if (phonenumber!="Telefonnummer")
					if( isNaN(phonenumber) || phonenumber.indexOf(' ')!=-1){
						phone_errors = true;	
						$('#reserve-form #form-number').css("border", "red solid 2px");
					}

		}
		
		if ($('#language').val()=="Germany")
		{
			if ($('#agree-email').attr('checked')!='checked')
			{
				$('.agree').eq(0).css('border','1px solid red');
				agree_errors=true;
			}
			
			if ($('#agree-use').attr('checked')!='checked')
			{
				$('.agree').eq(2).css('border','1px solid red');
				agree_errors=true;
			}
		}

		
		
		//Checks if no error flags are active, if they are, build error array
		if (!text_errors && !mail_errors && !select_errors && !phone_errors && !agree_errors)
		{
			$('#reserve-form').slideUp('slow',function(){$('#reserve-form').remove()});
			$('#footer-form').find('p').eq(0).hide();
			$('#footer-form').find('p').eq(1).hide();
			$('.thank-you').eq(0).fadeIn();
			$.post(base_url+'index.php', $('#reserve-form').serializeArray(),function(data) {});
		}
		
		else {
			if (text_errors || mail_errors || select_errors || phone_errors)
				$('#footer-form-wrapper').animate({scrollTop : 0},1000);
			if (text_errors || select_errors) {
				$('#errors').fadeTo(200, 1);
				$('#text-errors').text(translation[lang]["text-error"]);
			}
			
			if (mail_errors) {
				$('#errors').fadeTo(200, 1);
				$('#mail-errors').text(translation[lang]["mail-error"]);
			}

			if (phone_errors) {
				$('#errors').fadeTo(200, 1);
				$('#phone-errors').text(translation[lang]["form-number-error"]);
			}
			
		}
		
		return false;	
	});
	
	
	//Form click cancel button resets everything back to initial state
	
	$('#form-cancel').click(function() {
		
		$("#footer-form-wrapper").slideUp();
		
		$(".register-interes").removeClass("open");
		
		errors = null;	
		$('#mail-errors').text('');
		$('#errors').fadeTo(1, 0);
		$('#text-errors').text('');
		$('#phone-errors').text('');
		
		$('.agree').css('border','2px solid transparent');
		$('#agree-email').removeAttr('checked');
		$('#agree-use').removeAttr('checked');
		$("input:radio[name=agree-phone]").eq(1).attr('checked','checked');
		
		$('#form_agree').parent().css('border','2px solid transparent');
		$('#reserve-form input[type="text"]').css("border", "#d6d6d6 solid 2px");
		$('#reserve-form .selectBox-dropdown').css({'min-width':'160px', 'max-width':'160px', 'height': '29px', 'border': 'none'});
		$('#reserve-form .form-country, #reserve-form .form-language').css({"border": "none", "min-width": "340px",  "max-width": "340px", "height": "29px"});
			
		$('select').each(function(){
			if ($(this).attr('id')!='form-country' && $(this).attr('id')!='form-language')
				$(this).find('option').each(function(index){
					if ($(this).attr('selected')=='selected')
						$(this).removeAttr('selected');
			});
			if ($(this).attr('id')!='form-country' && $(this).attr('id')!='form-language')
				$(this).find('option').each(function(index){
					if (index==0)
						$(this).attr('selected','selected');
				});
				
			if ($(this).attr('id')=='form-country') 
				$(this).val(default_country_value);
			if ($(this).attr('id')=='form-language')
				$(this).val(default_language_value);

			
		});
		
		//$('select option:selected').removeAttr('selected');
		//$('select option:first').attr('selected', 'selected');
		
		$('select').removeClass('red-error');
		
		var text_fields_reset = $('#reserve-form input[type="text"]').length;
		for (i=0; i<text_fields_reset; i++) {
			$('#reserve-form input[type="text"]').eq(i).val($('#reserve-form input[type="text"]').eq(i).attr('default-value'));
 		}
		
		var select_boxes_reset = $('#reserve-form .selectBox-dropdown').length;
		for (j=0; j<select_boxes_reset; j++) {
			var select_class =  $('.selectBox-dropdown').eq(j).attr('class').split(' ')[2];
			if (select_class!='form-country' && select_class!='form-language')
			{
				var default_value_select_reset = $('ul.'+select_class+'-selectBox-dropdown-menu li:first-child a').text();
				$('#reserve-form .selectBox-dropdown').eq(j).children('.selectBox-label').text(default_value_select_reset);
			}
			else
			{
				if (select_class=='form-country')
				{
					$('#form-country').val(default_country_value);
					$('#reserve-form .selectBox-dropdown').eq(j).children('.selectBox-label').text(default_country_label);
				}
				if (select_class=='form-language')
				{
					$('#form-language').val(default_language_value);
					$('#reserve-form .selectBox-dropdown').eq(j).children('.selectBox-label').text(default_language_value);
				}
			}

		}	
	});
		
	
});

/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function(e) {
	
	//Transform select boxes
	$(".form-select").selectBox();	
	
	$(".register-interes").bind("touchstart click", function(e){
		e.preventDefault();
		// if ($('html').attr('lang') == 'ru') {	
		// 	window.open('https://www.jlr-connect.ru/CRM/Brands/LandRover/SubscribeToNews.aspx?models=Range%20Rover%20Evoque&brandnews=true');
		// 	return false;
		// }
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('open')) {
			
			$("#footer-form-wrapper").slideUp(
				500,
				function(){
					$this.removeClass('open');
					window.siteAnimator.resume();
				}
			);
			//$(".register-interes").text("{{#ID003}}");
			
		}
		else {
			
			$("#footer-form-wrapper").slideDown(
				500,
				function(){
					$this.addClass('open');
					window.siteAnimator.pause();
				}
			);
			_gaq.push(['_trackEvent', 'Form', 'Opened']);
			//$(".register-interes").text("{{#ID004}}");
		}
	});
	
	//Language select box
	$('.language-selector').click(function(e){
		$('#footer-form-wrapper').slideUp()
		$('.register-interes').removeClass('open');
		
		if (!$(this).hasClass('open')) {
			e.stopPropagation();
			$('#language-select-list').fadeIn(100);
			$(this).addClass('open');
		}
		else {
			$('#language-select-list').fadeOut(100);
			$(this).removeClass('open');
			$('.language-selector p').css('color', '#fff');
			$('.language-selector p span').css('color', '#999');			
		}
		
		
	});
	
	$(document).click(function(e){
		$('#language-select-list').fadeOut(100);
		$('.language-selector').removeClass('open');
		$('.language-selector p').css('color', '#fff');
		$('.language-selector p span').css('color', '#999');
	});
	
	
	//Share button
	
	$('.share-button').click(function(){
		$('.share-box').show();
		$(this).css({"background-position": "0px -120px", "color": "#b87d5f"});
		_gaq.push(['_trackEvent', 'Social', 'Share panel opened']);
		return false;
		
	});
	

	$('.share-link').click(function(e){
		var $this = $(this);
		var h,w,url;
		var shareText = $this.data('shareText')||'';
		var shareURL = $this.data('shareUrl')||window.location;
		if ($this.hasClass('twitter')) {
			_gaq.push(['_trackEvent', 'Social', 'Twitter share clicked']);
			h = 230; 
			w = 480;
			url = " https://twitter.com/share?url="+encodeURIComponent(shareURL)+"&text="+encodeURIComponent(shareText);
		} else {
			_gaq.push(['_trackEvent', 'Social', 'Facebook share clicked']);
			h = 350;
			w = 600;
			url = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(shareURL)+"&t="+encodeURIComponent(shareText);
		};
		//https://plus.google.com/share?url=your-page-url
		
		window.open(url,'share','directories=no,menubar=no,status=no,titlebar=no,toolbar=no,resizable=yes,width='+w+',height='+h);	
		return false;
	})

	$('.share-box .cancel').click(function(e){
		e.preventDefault();
		$('.share-box').hide();
		$('.share-button').css({"background-position": "0px 0px", "color": "#fff"});	
	});
	
	
	//Language selector active orange text
	
	$('.language-selector').mousedown(function() {
		$('.language-selector p, .language-selector p span').css('color', '#b87a5c');
	});
	
	$('.language-selector').mouseup(function() {
		
		if (!$(this).hasClass('open')){
			$('.language-selector p').css('color', '#fff');
			$('.language-selector p span').css('color', '#999');
		}
	});
	
});


$(window).resize(function() {
	if ($(window).width() <=  1000) {
		$('.footer-logo').hide();
	}
	else {
		$('.footer-logo').show();
	}
});

$(document).ready(function() {
	if ($(window).width() <=  1000) {
		$('.footer-logo').hide();
	}
	else {
		$('.footer-logo').show();
	}
});