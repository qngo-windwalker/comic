function translate(lang) {

var default_country_value;
var default_country_label;
var default_language_value;
var default_language_label;
	
	if (typeof(translation[lang]) == 'undefined') {
		lang = 'int';
	}

	for (var i in translation[lang]){
		
		var isstr = typeof(translation[lang][i]) == 'string';
		
		if (isstr && (translation[lang][i] == "")) {
			$(i).remove();
		}
		
		
		if (!isstr) {
			var opt_no = translation[lang][i].length;
			
			for(e=0;e<opt_no; e++){
   				$(i).append("<option></option>");
				
			}
			
			for (var x=0; x <= opt_no; x++) {
			
			if ($(i+' option').eq(x).parent().attr('name')!="form-country")
				$(i+' option').eq(x).text(translation[lang][i][x]);
			else
			{
				var temp001=translation[lang][i][x];
				if (x==0)
				{
					$(i+' option').eq(x).text(temp001);
					$(i+' option').eq(x).val(0);
				}
				else
				{
					if (lang=="de")
						$(i+' option').eq(x).html(cons[temp001][1]);
					else if (lang=="fr")	
						$(i+' option').eq(x).html(cons[temp001][2]);
					else
						$(i+' option').eq(x).html(cons[temp001][0]);
					$(i+' option').eq(x).val(cons[temp001][0]);
				}
			}

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="The United Kingdom")
						if (translation[lang][i][x]=="875f2a82-88e5-4113-b624-f028fdd4538c")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="The United Kingdom")
						if (translation[lang][i][x]=="United Kingdom (English)")
							$(i+' option').eq(x).attr("selected","selected");

			
				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="The United States")
						if (translation[lang][i][x]=="0834158f-6139-4aab-9529-e510b6f89b05")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="The United States")
						if (translation[lang][i][x]=="United States (English)")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="Brazil")
						if (translation[lang][i][x]=="d317bb57-189d-4f41-a88c-427bdddc7129")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="Brazil")
						if (translation[lang][i][x]=="Portugal (Portuguese)")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="France")
						if (translation[lang][i][x]=="0270b352-694f-4c19-96e6-5b51781addc8")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="France")
						if (translation[lang][i][x]=="French")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="Germany")
						if (translation[lang][i][x]=="47f390cf-91cc-415d-94a7-c5d961a4d7f7")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="Germany")
						if (translation[lang][i][x]=="German")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="China")
						if (translation[lang][i][x]=="34c487fa-5559-49cf-85c6-87c1c97381f9")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="China")
						if (translation[lang][i][x]=="China (Chinese)")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="Russia")
						if (translation[lang][i][x]=="87f466d2-ad65-4f02-8ab3-32c710f20701")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="Russia")
						if (translation[lang][i][x]=="Russian")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-country")
					if ($('#language').val()=="Netherlands")
						if (translation[lang][i][x]=="11ed45c6-33b7-405a-b0c5-c874dd38a66a")
							$(i+' option').eq(x).attr("selected","selected");

				if ($(i+' option').eq(x).parent().attr('name')=="form-language")
					if ($('#language').val()=="Netherlands")
						if (translation[lang][i][x]=="Dutch")
							$(i+' option').eq(x).attr("selected","selected");
					
			}
		}
		
		else {
			$(i).val(translation[lang][i]);
			$(i).attr('default-value', translation[lang][i]);
			
		}
	}
}


$(document).ready(function() {
	form_class = $('#reserve-form').attr('class');
	translate(form_class);
	
	default_country_value=$('#form-country').val();
	default_country_label=$("#form-country option[value='"+default_country_value+"']").text();
	
	default_language_value=$('#form-language').val();
	default_language_label=$('#form-language').val();
});
