/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/**
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/*** Toggle navigation ***/
	$('.header').each(function () {
		var body = $('body'), _nav = $('.navigation');
		$(this).prepend("<span class='toggle'><span></span></span>");
		_nav.each(function () {
			$(this).wrapInner('<div class="space"></div>');
			$(this).prepend("<span class='toggle'><span></span></span>");
		});
		$('.header .toggle, .navigation .toggle').on('click', function () {

			function keyhandler(e) {
				if (e.which == 27) {
					close();
				}
			}

			function clickhandler(e) {
				if ($(e.target).hasClass('navigation')) {
					close();
				}
			}

			function open() {
				body.addClass('nav-visible').on('keydown', keyhandler).on('click touchstart', clickhandler);
				setTimeout(function () {
					body.addClass('nav-done');
				}, 20);
			}

			function close() {
				body.removeClass('nav-done').off('keydown', keyhandler);
				setTimeout(function () {
					body.removeClass('nav-visible');
				}, 400);
			}

			if (body.hasClass('nav-done')) {
				close();
			} else {
				open();
			}
		});
	});


	/*** Table scroll ***/
	$('table').wrapAll('<div class="table-scroll"></div>');

	/*** Jumbotron carousel ***/
	$('.jumbotron').each(function () {
		_self = $(this);
		_self.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 5000,
			dots: true,
			customPaging: function (slider, i) {
				return '<span class="dots" data-role="none"></span>';
			}
		});
		$(window).on('resize', function () {
			if ($(window).width() <= 568) {
				_self.height($('body').height());
			} else {
				_self.removeAttr("style");
			}
		}).trigger('resize');
	});

	/*** Testimonials carousel ***/
	$('.testimonials').each(function () {
		$('.list', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			arrows: false,
			dots: false,
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 1279,
					settings: 'unslick'
				}
			]
		});
	});

	/*** Features section carousel ***/
	$('.features').each(function () {
		$('.carousel', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			adaptiveHeight: true,
			arrows: false,
			dots: true,
			customPaging: function (slider, i) {
				return '<span class="dots" data-role="none"></span>';
			},
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						adaptiveHeight: false
					}
				},
				{
					breakpoint: 1279,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}
			]
		});
	});

	/*** Articles carousel ***/
	$('.article-icon').each(function () {
		$('.carousel', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			arrows: false,
			dots: true,
			customPaging: function (slider, i) {
				return '<span class="dots" data-role="none"></span>';
			}
		});
	});

	/** Gallery carousel */
	$('.gallery').each(function () {
		var fo = $('.for', this), nav = $('.nav', this);

		var _for = $('.for', this), _nav = $('.nav', this);
		_for.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			infinite: true,
			asNavFor: _nav
		});
		_nav.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: _for,
			mobileFirst: true,
			dots: false,
			arrows: false,
			speed: 400,
			infinite: true,
			focusOnSelect: true,
			responsive: [
				{breakpoint: 400, settings: {slidesToShow: 5}},
				{breakpoint: 568, settings: {slidesToShow: 6}},
				{breakpoint: 768, settings: {slidesToShow: 8}},
				{breakpoint: 1024, settings: {slidesToShow: 10}},
				{breakpoint: 1280, settings: {slidesToShow: 12}},
				{breakpoint: 1440, settings: {slidesToShow: 14}},
				{breakpoint: 1560, settings: {slidesToShow: 16}}
			]
		});
	});


	/** Google Map */
	$('.map').each(function () {
		var _map = $(this);

		/** Map initialization */
		window.mapInit = function () {
			if (typeof google != 'undefined') {
				var pos = new google.maps.LatLng(55.965958, 38.0668768);

				var map = new google.maps.Map(_map[0], {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: pos,
					zoom: 16,
					scrollwheel: false,
					disableDefaultUI: true,
					backgroundColor: "#f7f1d9"
				});

				var pin = new google.maps.MarkerImage(

				);
				var marker = new google.maps.Marker({
					position: pos,
					map: map
				});
				google.maps.event.addDomListener(window, 'resize', function () {
					mapCenter.call(map);
				});
				mapCenter.call(map);
			}
		};

		/** Map centering */
		window.mapCenter = function () {
			var center = this.getCenter();
			google.maps.event.trigger(this, 'resize');
			this.setCenter(center);
		};

		/** Map script */
		function init() {
			$.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ru-RU&callback=mapInit');
			_map.fadeIn();
		}

		$(this).on('location', function () {
			init();
		});

		if ($(this).hasClass('open')) {
			init();
		}
	});

	/** Team text visible */
	$('.team').each(function () {
		$('.item', this).each(function () {
			var _item = $(this);
			_item.on('mouseenter touchstart', function () {
				_item.height($(this).height()).addClass('visible').siblings('.item').trigger('custom');
			}).on('mouseleave custom', function () {
				_item.removeAttr('style').removeClass('visible');
			});
		});
	});

	/*** Inform carousel ***/
	$('.inform').each(function () {
		$('.carousel', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			arrows: false,
			dots: true,
			customPaging: function (slider, i) {
				return '<span class="dots" data-role="none"></span>';
			}
		});
	});

	/** Certificates */
	$('.certificates').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			}
		});
	});

	/*** Ajax popup ***/
	$('.js-popup').magnificPopup({
		type: 'ajax'
	});

});

/**
 * Magnific Popup default settings
 */
$.extend(true, $.magnificPopup.defaults, {
	tClose: 'Закрыть (Esc)',
	tLoading: '',
	closeMarkup: '<span title="%title%" class="mfp-close"><span class="mfp-in"></span></span>',
	ajax: {tError: '<a href="%url%">Контент</a> не найден.'},
	settings: {cache: false},
	mainClass: 'mfp-zoom-in',
	midClick: true,
	removalDelay: 300,
	autoFocusLast: false,
	preload: false
});