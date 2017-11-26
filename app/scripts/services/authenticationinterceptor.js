'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.AuthenticationInterceptor
 * @description
 * # AuthenticationInterceptor
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('AuthenticationInterceptor', [
		'STARGRAPH_CONFIG', 'GRAPHENE_CONFIG', 'INDRA_CONFIG',
		function (STARGRAPH_CONFIG, GRAPHENE_CONFIG, INDRA_CONFIG) {

			function generateAuth(username, password) {
				return 'Basic ' + btoa(username + ':' + password);
			}

			return {
				request: function (config) {

					config.headers = config.headers || {};
					if (config.url) {

						if (config.url.indexOf(STARGRAPH_CONFIG.baseUrl) === 0) {
							config.headers.Authorization = generateAuth(STARGRAPH_CONFIG.username, STARGRAPH_CONFIG.password);
						} else if (config.url.indexOf(GRAPHENE_CONFIG.baseUrl) === 0) {
							config.headers.Authorization = generateAuth(GRAPHENE_CONFIG.username, GRAPHENE_CONFIG.password);
						} else if (config.url.indexOf(INDRA_CONFIG.baseUrl) === 0) {
							config.headers.Authorization = generateAuth(INDRA_CONFIG.username, INDRA_CONFIG.password);
						}

					}

					return config;
				}
			};
		}]);
