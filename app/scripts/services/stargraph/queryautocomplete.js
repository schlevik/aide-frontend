'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphQueryAutocomplete
 * @description
 * # StargraphQueryAutocomplete
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphQueryAutocomplete', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.adminUrl + 'exampleQueries',
			{}, // no default parameters
			{
				getExampleQueries: {
					method: 'GET',
					isArray: true
				}
			}
		);

	}]);
