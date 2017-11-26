'use strict';

const GRAPHENE_BASE_URL = 'https://adler.fim.uni-passau.de/graphene-api/';

/**
 * @ngdoc service
 * @name Lambda3WebApp.GRAPHENE_CONFIG
 * @description
 * # GRAPHENE_CONFIG
 * Constant in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.constant('GRAPHENE_CONFIG', {
		baseUrl: GRAPHENE_BASE_URL,
		adminUrl: GRAPHENE_BASE_URL + '_admin/',

		version: '1.0.2',

		username: 'graphene-api',
		password: 'wLn8gMlVFtxlkeo6j6d3'
	});
