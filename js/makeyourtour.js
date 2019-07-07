$(document).ready(function(){

	var form = $("#example-advanced-form").show();
	var generate_fields = true;
		form.steps({
			headerTag: "h3",
			bodyTag: "fieldset",
			transitionEffect: "fade",
			 labels: {
				cancel: "الغاء",
				pagination: "الصفحات",
				finish: "انهاء",
				next: "التالي",
				previous: "السابق",
				loading: "جاري ..."
			},
			onStepChanging: function (event, currentIndex, newIndex)
			{
				// Allways allow previous action even if the current form is not valid!
				if (currentIndex > newIndex)
				{
					return true;
				}
				
				// Needed in some cases if the user went back (clean up)
				if (currentIndex < newIndex)
				{
					// To remove error styles
					form.find(".body:eq(" + newIndex + ") label.error").remove();
					form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
				}
				form.validate().settings.ignore = ":disabled,:hidden";
				return form.valid();
			},
			onStepChanged: function (event, currentIndex, priorIndex)
			{
				
				// Used to skip the "Warning" step if the user is old enough and wants to the previous step.
				if (currentIndex === 2 && priorIndex === 3)
				{
					//form.steps("previous");
				}
				if (currentIndex === 1)
				{
				
					var numD = $( "#numDays" ).val();
					if (numD > 1 && generate_fields ) {
						while (numD > 1) {
						$( "<div class='itemDay'><label class='added' for='dayItem-"+numD+"'>يوم "+numD+"</label><input id='dayItem-"+numD+"' name='dayItem-"+numD+"' type='text' class='required added'></div>" ).insertAfter( $( ".firstDay" ) );
						numD--;
						}
						generate_fields = false;
						$('.daysItems').change();						
						$('.itemDay.current').removeClass('current');
						$('.itemDay:first-child').addClass('current');
					}
				}
				if (currentIndex === 3)
				{
					insertRequestInfo();
				}
			},
			onFinishing: function (event, currentIndex)
			{
				form.validate().settings.ignore = ":disabled";
				return form.valid();
			},
			onFinished: function (event, currentIndex)
			{
				$("#example-advanced-form").submit();
			}
		}).validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); },
			rules: {
				"citiesInput" : {
					required : true
				}				
			},
			messages: {
				"citiesInput": {
					required: "يرجى اختيار  المدينة أو المدن التي ترغب في زيارتها"
				}
			}
		});
		
		$( "#numDays" ).change(function() {
			$(".added" ).remove();
			generate_fields = true;
			//form.steps("next");
		});
		
		$(document).on( 'change', function() {
			$('input[name*="dayItem-"]').change(function() {
				$(this).parent().removeClass('current').next( ".itemDay" ).addClass('current').find('input.added');
				$(this).attr('data-city','');
			});
			checkItemCity();	
		});
		
		$('.daysItems').on( 'change', function() {			
			$('.itemDay').click(function() {
				$('.itemDay.current').removeClass('current');
				$(this).addClass('current');
			});
		});
		
		$('.listDaysPrograms .program-item').click(function() {
			if ( !$( this ).hasClass( "disabled" ) ) {
				$('.itemDay.current').find('input[name*="dayItem-"]').val($(this).find('h4').text());
				$('.itemDay.current').find('input[name*="dayItem-"]').attr('data-city',$(this).attr("id"));
				$('.itemDay.current').find('label.error').hide();
				$('.itemDay.current').find('input.error').removeClass('error');
				if($('.itemDay.current').next( '.itemDay' ).length){				
					$('.itemDay.current').removeClass('current').next( ".itemDay" ).addClass('current').find('input.added');
				}
			}
			checkItemCity ();
			return false;
		});
		
		
		function checkItemCity () {
			$( "article.program-item" ).each(function( index ) {
			 if ($( "input[data-city='"+$(this).attr("id")+"']" ).length ) { 
					$(this).addClass('disabled');			 
				} else {$(this).removeClass('disabled');	}
			});
		}
		
		var list_cities = new Array();
		$('ul.citiesList li input').click(function() {
			if (! $( this ).prop('checked') ) {
				list_cities.splice( $.inArray($(this).val(), list_cities), 1 );				
				$('input[name="citiesInput"]').val(list_cities.toString());
				$('.program-item.'+$(this).val()).addClass('hide');
			} else  {			
				list_cities.push($(this).val());
				$('input[name="citiesInput"]').val(list_cities.toString());				
				$('.citiesInputGrid').find('label.error').hide();
				$('input[name="citiesInput"]').removeClass('error');
				$('.program-item.'+$(this).val()).removeClass('hide');
			}
		});
		
		function insertRequestInfo() {
			$(".genItem" ).remove();
			$( ".requestInfo" ).append ('<p class="genItem">الاسم: ' + $('input[name="name_user"]').val() +'</p>');
			$( ".requestInfo" ).append ('<p class="genItem">البريد الالكتروني : ' + $('input[name="email_user"]').val() +'</p>');
			$( ".requestInfo" ).append ('<p class="genItem">الهاتف: ' + $('input[name="phone_user"]').val() +'</p>');
			$( ".requestInfo" ).append ('<p class="genItem">البلد: ' + $('input[name="country_user"]').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">تاريخ الوصول: ' + $('input[name="ArrivalDate"]').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">تاريخ المغادرة: ' + $('input[name="DepartureDate"]').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">عدد البالغين: ' + $('#numberOfAdults_user').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">عدد الأطفال: ' + $('#numberOfChild_user').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">أعمار الأطفال: ' + $('input[name="ageOfChild"]').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">هل تريد النقل من المطار؟: ' + $('#moveFromAirport').val()+'</p>' );
			$( ".requestInfo" ).append ('<p class="genItem">ملاحظــات إضافية: ' + $('textarea[name="commentsOrder"]').val()+'</p>' );
			
			$( ".requestInfo" ).append ('<hr class="genItem">' );
			
			$( ".requestInfo" ).append ('<p class="genItem">عدد الأيام: ' + $('#numDays').val() +'</p>');
			$( ".requestInfo" ).append ('<p class="genItem"> المدن : ' + list_cities.toString() +'</p>');
			$( ".requestInfo" ).append ('<ul class="genItem daysItemsGen"></ul>');			
			$( ".daysItemsGen" ).append ('<span>البرامج اليومية</span>' );
			$( ".daysItems .itemDay" ).each(function( index ) {				 
				if($(this).find('input[name*="dayItem-"]').val()) $( ".daysItemsGen" ).append ('<li>'+ $(this).find('input[name*="dayItem-"]').val() + '</li>' );
			});
			
			
			insertRec = false;
		}
		jQuery.extend(jQuery.validator.messages, {
			required: "يرجى ملء الحقل",
			remote: "يرجى ملء الحقل",
			email: "من فضلك أدخل البريد الالكتروني صحيحا",
			url: "الرجاء إدخال رابط صحيح.",
			date: "يرجى إدخال تاريخ صحيح.",
			dateISO: "يرجى إدخال تاريخ صحيح.",
			number: "لرجاء إدخال رقم صحيح.",
			digits: "يرجى إدخال الأرقام فقط.",
			creditcard: "الرجاء إدخال رقم بطاقة ائتمان صالحة.",
			equalTo: "الرجاء إدخال نفس القيمة مرة أخرى.",
			accept: "يرجى إدخال قيمة بملحق صالح.",
			maxlength: jQuery.validator.format("الرجاء إدخال ما لا يزيد عن {0} حرفا."),
			minlength: jQuery.validator.format("الرجاء إدخال ما لا يقل عن {0} حرفا."),
			rangelength: jQuery.validator.format("الرجاء إدخال قيمة بين {0} و {1} حرفا."),
			range: jQuery.validator.format("الرجاء إدخال قيمة بين {0} و {1}."),
			max: jQuery.validator.format("الرجاء إدخال قيمة أقل من أو يساوي {0}."),
			min: jQuery.validator.format("يرجى إدخال قيمة أكبر من أو تساوي {0}.")
		});
});
