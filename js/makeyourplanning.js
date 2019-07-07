$( document ).ready(function() {


	var form = $("#planning-advanced-form").show();
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
						$( "<div class='itemDay'  data-number="+numD+" ><label class='added title-day'>اليوم "+numD+"</label><div class='first-act activity-"+numD+"  activity-item-w'><input name='activity-"+numD+"[]' type='text' class='required added'><span class='country_name_cap'></span><span class='act_duration'></span></div><a href='#' class='add-new-activity'><i class='fa fa-plus-circle' aria-hidden='true'></i> أضف نشاط جديد في هذا اليوم</a></div>" ).insertAfter( $( ".firstDay" ) );
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
				$("#planning-advanced-form").submit();
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
		
			
			$('.activity-item-w.new-act').remove();
			$('.itemDay').each(function() {
				if(!$( this ).hasClass('firstDay')) $( this ).remove();
			});
			$('.firstDay').find('.country_name_cap').hide();
			$('.firstDay').find('.act_duration').hide();
			$('.firstDay').find('input[name*="activity-"]').val('');
			
			
			var numD = $( "#numDays" ).val();
			while (numD > 1) {
			$( "<div class='itemDay'  data-number="+numD+" ><label class='added title-day'>اليوم "+numD+"</label><div class='first-act activity-"+numD+"  activity-item-w'><input name='activity-"+numD+"[]' type='text' class='required added'><span class='country_name_cap'></span><span class='act_duration'></span></div><a href='#' class='add-new-activity'><i class='fa fa-plus-circle' aria-hidden='true'></i> أضف نشاط جديد في هذا اليوم</a></div>" ).insertAfter( $( ".firstDay" ) );
			numD--;
			}
			
			$('.itemDay .activity-item-w.current').removeClass('current');
			$('.itemDay:first-child .activity-item-w').addClass('current');
			
			generate_fields = false;
		});
		
		$(document).on( 'change', function() {
			$('input[name*="activity-"]').change(function() {
				$(this).parent().removeClass('current').next( ".itemDay" ).addClass('current').find('input.added');
				$(this).attr('data-city','');
			});
			checkItemCity();	
		});
		
			
		$(".daysItems").on("click", ".activity-item-w", function(){ 
			$('.activity-item-w.current').removeClass('current');
			$(this).addClass('current');
		});

		
		$('.listDaysPrograms .program-item').click(function() {
			if ( !$( this ).hasClass( "disabled" ) ) {
				$('.activity-item-w.current').find('input[name*="activity-"]').val($(this).find('h4').text());
				$('.activity-item-w.current').find('.country_name_cap').html($(this).find('.country_caption').text()).show();
				$('.activity-item-w.current').find('.act_duration').html($(this).find('.duration span').text()+ " س").show();
				$('.activity-item-w.current').find('input[name*="activity-"]').attr('data-city',$(this).attr("id"));
				$('.activity-item-w.current').find('label.error').hide();
				$('.activity-item-w.current').find('input.error').removeClass('error');
				if($('.activity-item-w.current').next( '.activity-item-w' ).length){				
					$('.activity-item-w.current').removeClass('current').next( ".activity-item-w" ).addClass('current').find('input.added');
				}
			}
			checkItemCity ();
			return false;
		});
		
		
		var count_a = 1;
		$(".daysItems").on("click", "a.add-new-activity", function(){  
			count_a_var = "ele_"+count_a;
			day_num = $(this).parent(".itemDay").attr('data-number');
			$(this).parent(".itemDay").append("<div id='"+count_a_var+"' class='new-act activity-"+day_num+" activity-item-w'><input  name='activity-"+day_num+"[]' type='text' class='required added'><span class='country_name_cap'></span><span class='act_duration'></span><span class='deleteActivity' onclick='myFunction(\""+count_a_var+"\"); '><i class='fa fa-minus-circle' aria-hidden='true'></i></span></div>" );
			count_a ++;
			return false;
		});
		
		
		/*
		$(document).on('click', '.deleteActivity', function(){ 
			alert("hey!");
		}); 
		
		$(".daysItems").on("click", "a.deleteActivity", function(){  
			console.log('fd');
			//$(this).parent(".activity-item-w").remove();
			return false;
		});*/
		
		
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
			$( ".requestInfo" ).append ('<p class="genItem">ملاحظــات إضافية: ' + $('textarea[name="commentsOrder"]').val()+'</p>' );
			
			$( ".requestInfo" ).append ('<hr class="genItem">' );
			
			$( ".requestInfo" ).append ('<p class="genItem">عدد الأيام: ' + $('#numDays').val() +'</p>');
			
			
			var selected = [];
			$('.citiesList input:checked').each(function() {
				selected.push($(this).parent('li').text());
			});


			$( ".requestInfo" ).append ('<p class="genItem"> المدن : ' + selected.toString() +'</p>');
			$( ".requestInfo" ).append ('<ul class="genItem daysItemsGen"></ul>');		
			
			
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
