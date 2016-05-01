/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */


/**
 * Detect mobile platforms
 */
(function () {
	window.mobile = false;
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
	})(navigator.userAgent || navigator.vendor || window.opera);
	if (check) {
		mobile = true;
		document.getElementsByTagName('html')[0].className += " mobile";
		/** Fastclick plugin */
		FastClick.attach(document.body);
	}
})();


/**
 * On document ready
 */
$(document).ready(function () {

	/*** Toggle button color ***/
	(function () {
		var cElement, ph = $('.page-heading'), jm = $('.jumbotron'), _body = $('body');
		if (ph.length > 0) {
			cElement = ph;
		}
		if (jm.length > 0) {
			cElement = jm;
		}
		if (typeof cElement != 'undefined') {
			$(window).on('resize', function () {
				_body.attr('data-toggle', cElement.outerHeight());
			}).on('scroll', function () {
				if (!_body.hasClass('toggle-color')) {
					if ($(window).scrollTop() > +_body.attr('data-toggle')) {
						_body.addClass('toggle-color')
					}
				} else {
					if ($(window).scrollTop() <= +_body.attr('data-toggle')) {
						_body.removeClass('toggle-color')
					}
				}
			}).trigger('resize');
		}
	})();

	/*** Toggle navigation ***/
	$('.header').each(function () {
		var html = $('html'), body = $('body'), _nav = $('.navigation');
		$("<span class='toggle toggle-header'><span></span></span>").insertAfter(this);
		_nav.each(function () {
			$(this).wrapInner('<div class="space"></div>');
			$(this).prepend("<span class='toggle'><span></span></span>");
		});
		$('.toggle-header, .navigation .toggle').on('click', function () {

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
				// lock scroll position, but retain settings for later
				/*
				var scrollPosition = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				window.scrollTo(0, scrollPosition);
				html.attr('data-scroll-position', scrollPosition).addClass('nav-visible');
				*/
				html.on('keydown', keyhandler).on('click touchstart', clickhandler);
				html.addClass('nav-visible');
				setTimeout(function () {
					body.addClass('nav-done');
				}, 20);
			}

			function close() {
				//var scrollPosition = html.data('scroll-position');
				//window.scrollTo(0, scrollPosition);
				body.removeClass('nav-done').off('keydown', keyhandler);
				setTimeout(function () {
					html.removeClass('nav-visible');
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