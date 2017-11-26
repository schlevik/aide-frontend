'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.Indra
 * @description
 * # Indra
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('Indra', ['$resource', 'INDRA_CONFIG', function ($resource, INDRA_CONFIG) {

		return $resource(
			'', // no default url
			{}, // no default parameters
			{
				semanticRelatedness: {
					url: INDRA_CONFIG.baseUrl + 'relatedness',
					method: 'POST'
				},
				ngrams: {
					url: INDRA_CONFIG.baseUrl + 'ngrams/ngrams',
					method: 'POST'
				}
			}
		);

	}]);
