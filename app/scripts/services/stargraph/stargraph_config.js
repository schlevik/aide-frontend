'use strict';

const STARGRAPH_BASE_URL = 'https://adler.fim.uni-passau.de/stargraph-api/';

/**
 * @ngdoc service
 * @name Lambda3WebApp.STARGRAPH_CONFIG
 * @description
 * # STARGRAPH_CONFIG
 * Constant in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.constant('STARGRAPH_CONFIG', {
		baseUrl: STARGRAPH_BASE_URL,
		adminUrl: STARGRAPH_BASE_URL + '_admin/',

		version: '1.1.0-SNAPSHOT',

		username: 'stargraph-api',
		password: 'ALtANPuT3.vW#Xdiq9'
	});
