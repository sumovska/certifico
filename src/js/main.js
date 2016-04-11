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
		var body = $('body'), _nav = $('.nav', this);
		$(this).prepend("<span class='toggle'></span>");
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
		$(this).slick({
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

	/*** Testimonials carousel ***/
	$('.testimonials').each(function () {
		$('.list', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
			arrows: false,
			dots: false,
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
		$('.list', this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst: true,
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
						slidesToScroll: 3
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

});