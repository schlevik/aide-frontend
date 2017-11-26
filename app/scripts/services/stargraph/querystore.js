'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphQueryStore
 * @description
 * # StargraphQueryStore
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphQueryStore', [
		'$resource', 'STARGRAPH_CONFIG',
		function ($resource, STARGRAPH_CONFIG) {

			return $resource(
				STARGRAPH_CONFIG.adminUrl + 'queryStore',
				{}, // no default parameters
				{
					getStoredQueries: {
						method: 'GET',
						isArray: true
					},
					storeQuery: {
						method: 'PUT',
						isArray: false
					}
				}
			);

		}]);
