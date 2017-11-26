'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.SpeechRecognitionAPI
 * @description
 * # SpeechRecognitionAPI
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('SpeechRecognitionAPI', function () {

		//noinspection JSUnresolvedVariable
		var SpeechRecognition = (
			window.SpeechRecognition ||
			window.webkitSpeechRecognition
		);

		if (SpeechRecognition === undefined) {
			return false;
		}

		var recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.lang = 'en-US';

		return recognition;
	});
