JQuery Bandit
=============

A jQuery plugin that randomly selects a line of text from a list, spinning it like a one-armed bandit.

Usage
-----

Apply to a list-like element like this:

	$('ul').bandit({
		spinOnLoad: true
	});

Note that a call without any parameters will not add any spinning functionality. Either use the "spinOnLoad" option (see options below) to load the spinner when the page loads, or use the "startButton" option to indicate a button that starts spinning.

Options
-------

 * speed: The spinning speed in milliseconds. Optionally, an array of two values will randomly select a speed between those value. For example, [100, 200] will spin the spinner at a speed randonly selected between 100 and 200 ms.
 * autoStop: Number of milliseconds before the spinner stops spinning, or 0 to spin forever. Optionally, an array of two values will randomly select a speed between those value. For example, [2000, 3000] will stop the spinner after a randomly selected number of ms between 2000 and 3000.
 * delay: Number of milliseconds before the spinner starts spinning. 
 * accel: The speed at which the spinner accelerates.
 * decel: The speed at which the spinner decelerates.
 * startButton: A JQuery element to act as a button that starts the spinner.
 * stopButton: A JQuery element to act as a button that stops the spinner.
 * spinOnLoad: If set to true, spinner starts automatically on page load.
 * done: Callback that is called when the spinner has stopped spinning. Passes the randomized text as a parameter.

See index.html for a demo of this plug-in.

Copyright (c) 2013 Jude Osborn

Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
