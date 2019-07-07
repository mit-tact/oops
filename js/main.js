(function($){
	$(window).on("load",function(){

		$('a.menuBtn.mainM_t').click(function(){$('.mainMenu').toggle();return false;});	
		$('a.open-panel').click(function(){$('.search-panel-wrapper').show(); return false;});	
		$('a.close-panel').click(function(){$('.search-panel-wrapper').hide(); return false;});	
		$('a.searchBtn').click(function(){$('.search-overlay').fadeIn(); return false;});	
		$('a.close-home-form-search').click(function(){$('.search-overlay').hide(); return false;});	
		$('.search-overlay').click(function(e){		
			if( ! $(e.target).closest(".home-form-search-wrapper-content").length > 0 ) {			
				$('.search-overlay').hide(); return false;
			}
		});	
		$('.a.overlay-bg').click(function(e){
			return false;
		});		
		setTimeout(function(){ $('.loading-overlay').fadeOut(); }, 500);
		
		// grab the initial top offset of the navigation 
		var stickyNavTop = $('header#header').offset().top;
		
		// our function that decides weather the navigation bar should have "fixed" css position or not.
		var stickyNav = function(){
			var scrollTop = $(window).scrollTop(); // our current vertical position from the top
				 
			// if we've scrolled more than the navigation, change its position to fixed to stick to top,
			// otherwise change it back to relative
			if (scrollTop > stickyNavTop) { 
				$('header#header').addClass('sticky');
			} else {
				$('header#header').removeClass('sticky'); 
			}
		};

		stickyNav();
		// and run it again every time you scroll
		$(window).scroll(function() {
			stickyNav();
		});
			
		
		
		$(".navBarWrapper ul > li > a").on('click', function(event) {		
		
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
		  event.preventDefault();

		  // Store hash
		  var hash = this.hash;

		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
	   
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		  });
		} // End if
	  });
	  
	  $('#example-advanced-form ').css('opacity', '1');
		setTimeout(function(){
			$('.livechat').animate({"left":"2px"}, "slow");
		}, 2000);
		
		
		var today = new Date();
		var tomorrow = new Date();
		var yesterday = new Date();
		tomorrow.setDate(today.getDate() + 1);
		
		$('#check-in').datepicker({
			format: 'dd-MM-yyyy',
			todayHighlight: true,
			autoclose: true,
			});
		$('#check-out').datepicker({
			format: 'dd-MM-yyyy',
			todayHighlight: true,
			autoclose: true,
			});
			
			
		$('select.travelers').on('change', function() {
		  if( this.value == "3" ) console.log('Show');
		   else console.log('Hide');
		})
		
		$('#check-in').datepicker("setDate", today);
		$('#check-out').datepicker("setDate", tomorrow);
		
		
		$("#widget-best-countries").owlCarousel({
			autoplay:true,
			autoplayTimeout:5000,
			margin:0,
			stagePadding: 0,
			nav: true,
			items : 1, //10 items above 1000px browser width
			itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
		});
		$(document).mouseup(function(e) {
			var container = $(".mainMenu, .menuBtn");

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0) 
			{
				$('.mainMenu').hide();
			}
		});

	});
})(jQuery);