$(document).ready(function () {
	setTimeout(function () {
		scrollInit();
	}, 2000);
	detectTotemProd();
	AllEvents();
	swiperInit();
});

var cl = {
	head: '.dwHeader',
	logo: '.logoHeader',
	titleHome: '.dwTitle',
	fdh: '.full-dw-home',
	fib: '.flx-item-block',
	fic: '.flx-item-content',
	dynamicName: '.dynamic-name',
	logoPlus: '.logoPlus',
	dwFooter: '.dwFooter',
	form_contact: '.form_contact',
	returnToDetail: '.returnToDetail',
	btnSend: '.btnSend',
	menuBasic: '.menu-basic a',
	menuDw: '.menu-dw'
}
var _height = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
var _heightScreen = $('body, html').height();

var _scrollTopEvents;

function _scrollTop() {
	_scrollTopEvents = Math.round($(window).scrollTop());
	return _scrollTopEvents;
}
var waiting = false;

//end of bottom
function scrolled(o) {
	_scrollTop();
	if (_scrollTopEvents + _height >= $('html, body').height()) {
		console.log('end reached');
	}
}
function scrollInit() {
	$(window).on('scroll', function () {
		/*	if (waiting) {
				return;
			}
			*/
		waiting = true;
		///////////////////////////////////////////////////;
		_scrollTop();
		headerEvents();
		titleHomeEvents();
		globalElementHome();
		childreElementHome();

		if ($('.bodyProduct').length) {
			showContactView();
		}

		if ($('.clFooterMain').offset().top < _scrollTopEvents) {
			$('.contactUsSticky').addClass('active');
		} else {
			$('.contactUsSticky').removeClass('active');
		}
		///////////////////////////////////////////////////
		/*  setTimeout(function () {
			  waiting = false;
		  }, 50);*/
	});
}

function headerEvents() {
	// if scrollTop is large than height of header addClass dwFixed
	_scrollTop();

	var _color = {
		_blue: '#324297',
		_purple: '#75318e',
		_red: '#e90f81'
	}


	var _percentScrollWidth = _scrollTopEvents * 100 / $('html, body').height();
	// animation of logo
	// console.log('footerVisible', $(cl.dwFooter).offset().top);
	// console.log('scolllEventsFooter', _scrollTopEvents + $(cl.dwFooter).height());
	if (_scrollTopEvents + _heightScreen >= $(cl.dwFooter).offset().top + $(cl.dwFooter).height()) {
		_percentScrollWidth = 100;
		//	console.log('bottom');
	}
	// if (_percentScrollWidth > 0 && _percentScrollWidth < 30) {
	// 	var colorization = _color._blue;
	// 	$('.clHeaderMain, .contactUsSticky').css('background', _color._red);
	// } else if (_percentScrollWidth > 30 && _percentScrollWidth < 70) {
	// 	var colorization = _color._purple;
	// 	$('.clHeaderMain, .contactUsSticky').css('background', _color._blue);
	// } else if (_percentScrollWidth > 70) {
	// 	var colorization = _color._red;
	// 	$('.clHeaderMain, .contactUsSticky').css('background', _color._purple);
	// }
	_percentScrollWidth = _percentScrollWidth + '%';

	// console.log('realHeightofScreen', $('html, body').height());
	// console.log('scrollTop', _scrollTopEvents);
	// console.log('_percentScrollWidth', _percentScrollWidth);

	if (_scrollTopEvents > $(cl.head).height()) {
		$(cl.head).addClass('dwFixed');
		$(cl.logo).addClass('animated').one("transitionend", function () {
			var _this = $(this);
			if (_scrollTopEvents > $(cl.head).height()) {
				_this.addClass('animatedPlus');
			}
		});
	} else {
		$(cl.head).removeClass('dwFixed');
		$(cl.logo).removeClass('animated animatedPlus');
	}


	$(cl.logoPlus).width(_percentScrollWidth);

}

function titleHomeEvents() {
	// get the position of scrollTop by the function declared by _scrollTop
	// we can use _scrollTopEvents
	_scrollTop();

	// we loop for each title home for animate them
	$(cl.titleHome).each(function (i, value) {
		var _this = $(this);
		var _thisOffset = _this.offset().top;

		var calcRealValue = _scrollTopEvents * _height / _heightScreen;
		var topOfRealThis = _thisOffset * _height / _heightScreen;
		/*console.log('real',topOfRealThis);
		console.log('realvalue',_thisOffset);
		console.log('realHeightofScreen', _heightScreen);
		console.log('valueScrollReal', _scrollTopEvents);

		if($('.exisr').length < $(cl.titleHome).length ){
			var linered = $(document.createElement('div')).addClass('exisr').css({
				'background':'green',
				'position' : 'fixed',
				'height' : '2px',
				'width' : '100%',
				'top' : _heightScreen / 2,
				'z-index' : 20000000000000,
				'display' : 'block'

			}).prependTo('body');
		}
				*/
		var middlePagePassed = (_thisOffset * _heightScreen) / _scrollTopEvents;
		//	console.log('middlePagePassed', middlePagePassed);

		if (_scrollTopEvents + (_heightScreen / 2) >= _thisOffset) {

		} else {
			//_this.removeClass('animated animatedPlus');
		}
	});

}
var timer = 0;
function globalElementHome() {
	_scrollTop();
	$(cl.fdh).each(function () {
		var _this = $(this);

		var _thisOffset = _this.offset().top;
		if (_scrollTopEvents + (_heightScreen / 2) >= _thisOffset &&
			_scrollTopEvents <= (_thisOffset + _this.height())) {
			var _refTxt = _this.find(cl.titleHome).text();
			$(cl.dynamicName).text(_refTxt).addClass('animated').one("transitionend", function () {
				var _thisTitle = $(this);
				setTimeout(function () {
					_thisTitle.addClass('animatedPlus');
				}, 500);

			});
			_this.siblings(cl.fdh).removeClass('active');

			var classMenu = _this.attr('data-cat');
			console.log('classmenu', classMenu, $('.menu-basic').find('a[data-cat="' + classMenu + '"]'));

			$('.menu-basic').find('li a[data-cat="' + classMenu + '"]').addClass('active')
				.closest('li')
				.siblings('li')
				.find('a')
				.removeClass('active')


			_this.addClass('active').one("transitionend", function () {
				var _this = $(this);
				if (_scrollTopEvents + (_heightScreen / 2) >= _thisOffset &&
					_scrollTopEvents <= (_thisOffset + _this.height())) {
					_this.find(cl.fib).each(function () {
						var _thisChild = $(this);
						if (_thisChild.index() != 0) {
							timer += 100;
						} else {
							timer = 0
						}
						setTimeout(function () {
							_thisChild.find(cl.fic).addClass('animated');
						}, timer);
					});
				}

				_this.find('.dwTitle').addClass('animated').one("transitionend", function () {
					var _this = $(this);
					_this.addClass('animatedPlus');
				});
			});
		} else {
			_this.removeClass('active');
			_this.find(cl.fic).removeClass('animated');
			timer = 0;
		}
	});

	$('.flx-content').each(function () {
		var _this = $(this);
		var _thisOffset = _this.offset().top;
		if (_scrollTopEvents <= (_thisOffset + _this.height())) {
			_this.find('.ico-home').each(function () {
				var _this = $(this);



				if (_this.index() != 0) {
					timer += 100;
				} else {
					timer = 0
				}
				setTimeout(function () {
					_this.addClass('animated');
				}, timer);

			});

		} else {


			_this.find('.ico-home').each(function () {
				var _this = $(this);



				if (_this.index() != 0) {
					timer += 100;
				} else {
					timer = 0
				}
				setTimeout(function () {
					_this.removeClass('animated');
				}, timer);

			});
		}
	});
}
function childreElementHome() {
	_scrollTop();
	$(cl.fic).each(function () {
		var _this = $(this);
		var heightCa = _this.height();
		var _offsetTop = _this.offset().top;
		var _offsetGetTop = Math.round(_offsetTop - (3 * _offsetTop / 100));
		var _offsetBottom = Math.round(_offsetTop - (3 * _offsetTop / 100)) + heightCa;

		// console.log('itemTOP', _offsetGetTop);
		// console.log('itemBOTTOM', _offsetBottom);
		// console.log('_scrollTopEvents', _scrollTopEvents);
		if ((_scrollTopEvents + $(cl.dwFooter).height()) >= _offsetGetTop) {
			_this.addClass('scaled');
		} else {
			_this.removeClass('scaled');
		}


	});


}

function whichTransitionEvent() {
	var t;
	var transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	}

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}

///////////////// for Prod

// function for detect totem of page
function detectTotemProd(scrollDetect) {
	var ca = '.logo-dw-lion';

	//verify for each totem the position
	$(ca).each(function () {
		// get current element "totem"
		var _this = $(this);
		// for content get parent of totem
		var _thisParent = _this.closest('.home-dw');
		// get current offsetleft of content asset
		var offsetLeftParent = _thisParent.offset().left;
		// get value for calcul of percent from left of content asset
		var posx = _this.attr('data-posx');
		// get height of current element "totem"
		var heightCa = _this.height();

		// Apply position of left on content "totem"
		_this.css({
			'left': (offsetLeftParent + ((_thisParent.width()) * posx / 100))
		});

		// for each element call function for desappearance
		myScrollingPageProd(_this, '.home-dw');
	});

	$('.ttl-tile').each(function () {
		// get current element "totem"
		var _this = $(this);
		// for content get parent of totem
		var _thisParent = _this.closest('.home-dw');
		// get current offsetleft of content asset
		var offsetLeftParent = _thisParent.offset().top;
		// get value for calcul of percent from left of content asset
		var posx = _this.attr('data-posx');
		// get height of current element "totem"
		var heightCa = _this.height();

		// Apply position of left on content "totem"
		_this.css({
			'top': (offsetLeftParent + ((_thisParent.width()) * posx / 100))
		});

		// for each element call function for desappearance
		parallaxElement(_this, '.home-dw');
	});

	// $('.swiper-slide img').each(function () {
	// 	// get current element "totem"
	// 	var _this = $(this);
	// 	// for content get parent of totem
	// 	var _thisParent = _this.closest('.home-dw');
	// 	// get current offsetleft of content asset
	// 	var offsetLeftParent = _thisParent.offset().top;
	// 	// get value for calcul of percent from left of content asset
	// 	var posx = _this.attr('data-posx');
	// 	// get height of current element "totem"
	// 	var heightCa = _this.height();

	// 	// Apply position of left on content "totem"
	// 	_this.css({
	// 		'top': (offsetLeftParent + ((_thisParent.width()) * posx / 100))
	// 	});

	// 	// for each element call function for desappearance
	// 	parallaxImage(_this, '.home-dw');
	// });

}


// function scroll for trigger the animation of element
//_this :  current element focused
// _ parent : current parent of element focused
function myScrollingPageProd(_this, _parent) {
	// event js scroll
	$(window).on('scroll', function () {

		// call your function here
		var getCurrentParent = _this.closest(_parent);
		// get top of current content asset from element focused
		// we round the value get
		var _offsetTop = getCurrentParent.offset().top;
		_offsetTop = Math.round(_offsetTop);
		// we decrease of 3% the value get
		var _offsetTopPer = Math.round(_offsetTop + (20 * _offsetTop / 100));
		// get real height of screen
		var height = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		// get position of scroll from screen
		var scrw = $(window).scrollTop();
		// get real height of content page
		var heightBody = $('html , body').height();
		// convert content of the page to height screen
		var calcRealValue = scrw * height / heightBody;

		// we verify if when user scrolling find between under top of content asset
		// and if it find on over bottom of content parent with 3%
		if ((_offsetTopPer - calcRealValue) + getCurrentParent.height() / 3 <= $(window).scrollTop() &&
			(_offsetTop - calcRealValue) + getCurrentParent.height() >= $(window).scrollTop()) {

			// we apply css and current position top if condition respected
			_this.css({
				'position': 'fixed',
				'top': calcRealValue + 180
			});
			// we add class on active item focused
			_this.addClass('active');

		} else {
			// if not we remove Class of active itemp focused
			_this.removeClass('active').removeAttr('style');
		}
	}).scroll();
}

// function scroll for trigger the animation of element
//_this :  current element focused
// _ parent : current parent of element focused
function parallaxElement(_this, _parent) {
	// event js scroll
	var initTop = _this.offset().top;

	$(window).on('scroll', function () {

		// call your function here
		var getCurrentParent = _this.closest(_parent);
		// get top of current content asset from element focused
		// we round the value get
		var _offsetTop = getCurrentParent.offset().top;
		_offsetTop = Math.round(_offsetTop);
		// we decrease of 3% the value get
		var _offsetTopPer = Math.round(_offsetTop + (20 * _offsetTop / 100));
		// get real height of screen
		var height = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		// get position of scroll from screen
		var scrw = $(window).scrollTop();
		// get real height of content page
		var heightBody = $('html , body').height();
		// convert content of the page to height screen
		var calcRealValue = scrw * height / heightBody;

		// we verify if when user scrolling find between under top of content asset
		// and if it find on over bottom of content parent with 3%
		if ($(window).scrollTop() <= getCurrentParent.height() / 5 &&
			(_offsetTop - calcRealValue) + getCurrentParent.height() >= $(window).scrollTop()) {

			// we apply css and current position top if condition respected
			_this.css({
				'position': 'absolute',
				'top': initTop - $(window).scrollTop()
			});
			// we add class on active item focused
			_this.addClass('active');

		} else {
			// if not we remove Class of active itemp focused
			_this.removeClass('active').removeAttr('style');
		}
	})
}

function parallaxImage(_this, _parent) {
	// event js scroll
	var initTopImg = 0;

	$(window).on('scroll', function () {

		// call your function here
		var getCurrentParent = _this.closest(_parent);
		// get top of current content asset from element focused
		// we round the value get
		var _offsetTop = getCurrentParent.offset().top;
		_offsetTop = Math.round(_offsetTop);
		// we decrease of 3% the value get
		var _offsetTopPer = Math.round(_offsetTop + (20 * _offsetTop / 100));
		// get real height of screen
		var height = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		// get position of scroll from screen
		var scrw = $(window).scrollTop();
		// get real height of content page
		var heightBody = $('html , body').height();
		// convert content of the page to height screen
		var calcRealValue = scrw * height / heightBody;

		// we verify if when user scrolling find between under top of content asset
		// and if it find on over bottom of content parent with 3%
		if ($(window).scrollTop() <= getCurrentParent.height() / 3 &&
			(_offsetTop - calcRealValue) + getCurrentParent.height() >= $(window).scrollTop()) {

			// we apply css and current position top if condition respected
			_this.css({
				'position': 'relative',
				'top': initTopImg++
			});
			// we add class on active item focused
			_this.addClass('active');

		} else {
			// if not we remove Class of active itemp focused
			//_this.removeClass('active').removeAttr('style');
			_this.css({
				'position': 'relative',
				'top': 0
			});
		}
	})
}


function showContactView() {
	_scrollTop();

	var flxFixed = '.flx-fixed .fx-content',
		formContact = '.form_contact';

	var offsetContactTop = $(flxFixed).offset().top + $(flxFixed).outerHeight(true);

	if (_scrollTopEvents => offsetContactTop) {
		$('.form_contact').addClass('noFixed');
	} else {
		$('.form_contact').removeClass('noFixed');
	}
}

function AllEvents() {
	var btnContact = ".btn-contact";
	$(document).on('click', btnContact, function (e) {
		e.preventDefault();
		$(cl.form_contact).toggleClass('active');
		$('.flx-fixed').toggleClass('active');
	}).on('click', cl.returnToDetail, function (e) {
		e.preventDefault();
		$('.flx-fixed').removeClass('active');
		$(cl.form_contact).removeClass('active');
		$('.content_contact, .message_validate, .title-block-contact').removeClass('active');
	}).on('click', cl.btnSend, function (e) {
		e.preventDefault();
		$('.content_contact, .title-block-contact, .message_validate').addClass('active');
		$('html, body').animate({
			scrollTop: $('.form_contact').offset().top - 100
		}, 800);
	}).on('click', cl.menuBasic, function (e) {
		var _this = $(this);
		var _thisAttr = _this.attr('data-cat');
		if (_this.attr('data-cat').length) {
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $('.full-dw-home[data-cat="' + _thisAttr + '"]').offset().top - 80
			}, 800);
		}
		$('.menu-basic').removeClass('active');

	}).on('click', cl.menuDw, function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		if ($(window).width() < 768) {
			$('.menu-basic').toggleClass('active');
		}

	});
}

function swiperInit() {
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 1,
		spaceBetween: 0,
		height: 400,
		loop: false,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
}