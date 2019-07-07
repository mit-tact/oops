
/*
	Sticky menu script
 */

(function(w,d,undefined){
	var el_html = d.documentElement,
		el_body = d.getElementsByTagName('body')[0],
		header = d.getElementById('header'),
		menuIsStuck = function(triggerElement) {
			var _scrollTop	= w.pageYOffset || el_body.scrollTop,
				regexp		= /(nav\-is\-stuck)/i,
				classFound	= el_html.className.match( regexp ),
				navHeight	= header.offsetHeight,
				bodyRect	= el_body.getBoundingClientRect(),
				scrollValue	= triggerElement ? triggerElement.getBoundingClientRect().top - bodyRect.top - navHeight  : 120,
				scrollValFix = classFound ? scrollValue : scrollValue + navHeight;

			// if scroll down is 700 or more and nav-is-stuck class doesn't exist
			if ( _scrollTop > scrollValFix && !classFound ) {
				el_html.className = el_html.className + ' nav-is-stuck';
				el_body.style.paddingTop = navHeight + 'px';
			}

			// if we are to high in the page and nav-is-stuck class exists
			if ( _scrollTop <= 2 && classFound ) {
				el_html.className = el_html.className.replace( regexp, '' );
				el_body.style.paddingTop = '0px';
			}
		},
		onScrolling = function() {
			// this function fires menuIsStuck()…
			menuIsStuck( d.getElementById('main') );
			// and could do more stuff below
		};


	el_html.className = el_html.className + ' js';

	// when you scroll, fire onScrolling() function
	w.addEventListener('scroll', function(){
		w.requestAnimationFrame( onScrolling );
	});


}(window, document));