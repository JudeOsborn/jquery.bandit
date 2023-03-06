/*
* JQuery Bandit
*
* A jQuery plugin that randomly selects a line of text from a list, spinning
* it like a one-armed bandit.
*
* Usage:
* Apply to a list-like element like this:
*	$('ul').bandit();
*
* Note that a call without any parameters will not add any spinning functionality.
* Either use the "spinOnLoad" option (see options below) to load the spinner when
* the page loads, or use the "startButton" option to indicate a button that starts
* spinning.

* Options:
*  - speed: The spinning speed in milliseconds. Optionally, an array of two values
		will randomly select a speed between those values. For example, [100, 200].
*  - delay: Number of milliseconds before the spinner starts spinning.
*  - accel: The speed at which the spinner accelerates.
*  - decel: The speed at which the spinner decelerates.
*  - autoStop: Number of milliseconds before the spinner stop spinning, or 0 to spin
*		forever. Optionally, an array of two values will randomly stop the spinner
* 		after a randomly selected number of milliseconds. For example, [2000, 3000].
*  - startButton: A JQuery element to act as a button that starts the spinner.
*  - stopButton: A JQuery element to act as a button that stops the spinner.
*  - spinOnLoad: If set to true, spinner starts automatically on page load.
*  - done: Callback that is called when the spinner has stopped spinning. Passes the
			randomized text as a parameter.
*
* Copyright (c) 2013 Jude Osborn
*
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/

(function ($) {
	$.fn.bandit = function (options) {
		var settings = {
			speed: '150',
			delay: 2000,
			accel: 10,
			decel: .8,
			autoStop: 0,
			startButton: null,
			stopButton: null,
			spinOnLoad: false,
			done: empty
		};

		if (options) {
			jQuery.extend(settings, options);
		}

		var $document = $(document);

		return this.each(function () {
			var $this = $(this),
				totalItems = $this.children().length,
				currentItemBlock = 'first',
				speed = settings.speed,
				topSpeed = 0,
				stopping = false,
				$spinButton = $(document).find(settings.startButton),
				$stopButton = $(document).find(settings.stopButton);

			$spinButton.click(function (e) {
				startSpin();
			});

			$stopButton.click(function (e) {
				if (settings.delay > 0) {
					setTimeout(stop, settings.delay);
				} else {
					stop();
				}
			});

			function startSpin() {
				$spinButton.attr('disabled', 'disabled');

				speed = settings.accel;

				// See if we need to randomize the top speed.
				if (settings.speed instanceof Array) {
					topSpeed = getRandom(settings.speed[0], settings.speed[1]);
				} else {
					topSpeed = settings.speed;
				}

				stopping = false;

				if (settings.delay > 0) {
					setTimeout(spin, settings.delay);
				} else {
					spin();
				}

				var autoStop = 0;
				// See if we need to randomize the auto stop time.
				if (settings.autoStop instanceof Array) {
					autoStop = getRandom(settings.autoStop[0], settings.autoStop[1]);
				} else {
					autoStop = settings.autoStop;
				}

				if (autoStop > 0) {
					setTimeout(stop, autoStop);
				}
			}

			function stop() {
				$stopButton.attr('disabled', 'disabled');
				stopping = true;
				speed -= settings.decel;
			}

			/**
			* Move up one item.
			*/
			function spin() {
				var $item = $this.children().first();
				var itemHeight = $item.outerHeight();
				var offset = $this.offset();
				$this.animate({
					top: '-=' + itemHeight
				}, {
					complete: function () {
						$this.append($item);
						$this.css('top', 0);

						if (stopping === true) {
							if (speed > 0) {
								speed -= settings.decel;
							}
						} else {
							if (speed < topSpeed) {
								speed += settings.accel;
							}
						}

						if (speed > 0.5) {
							spin();
						} else {
							$this.stop();
							settings.done($this.children().first().html());
							$spinButton.removeAttr('disabled');
							$stopButton.removeAttr('disabled');
						}
					},
					easing: 'linear',
					duration: 1000 / speed
				});
			}

			if (settings.spinOnLoad === true) {
				startSpin();
			}

		});
	};

	function empty() { }

	function getParameterByName(name) {
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}

	function getRandom(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}
}(jQuery));
