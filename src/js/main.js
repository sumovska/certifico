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
		_nav.wrapInner('<div class="space"></div>');
		$('.toggle', this).on('click', function () {
			body.addClass('nav-visible').on('click', function () {
				if ($(this).hasClass('nav-done')) {
					$(this).removeClass('nav-done');
					setTimeout(function () {
						body.removeClass('nav-visible');
					}, 500);
				}
			});
			if (!$('body').is('.nav-done')) {
				setTimeout(function () {
					body.addClass('nav-done');
				}, 20);
			} else {
				body.removeClass('nav-done');
				setTimeout(function () {
					body.removeClass('nav-visible');
				}, 500);
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
		fo.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: nav,
			mobileFirst: true,
			adaptiveHeight: true,
			arrows: false,
			fade: true
		});
		nav.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: fo,
			focusOnSelect: true,
			mobileFirst: true,
			centerMode: true,
			arrows: false,
			variableWidth: true
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
	preload: false,
	callbacks: {
		ajaxContentAdded: function () {
		}
	}
});
