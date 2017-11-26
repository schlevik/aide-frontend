'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphEnrichEntity
 * @description
 * # StargraphEnrichEntity
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphEnrichEntity', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		const StargraphEnrichEntity = $resource(
			STARGRAPH_CONFIG.baseUrl,
			{}, // no default parameters
			{
				image: {
					method: 'GET',
					url: STARGRAPH_CONFIG.baseUrl + 'graph/select/?q=:q',
					params: {
						q: ':q'
					},
					transformResponse: function (data) {
						const json = angular.fromJson(data);
						if (json && json.bindings && json.bindings.o && json.bindings.o.length > 0) {
							return json.bindings.o[0];
						}
					}
				},
				labelName: {
					method: 'GET'
				}
			}
		);

		StargraphEnrichEntity.prototype.findImage = function findImage(id) {
			return (function (innerId) {
				const image = {};
				StargraphEnrichEntity
					.image({q: 'SELECT ?o WHERE { <' + innerId + '> <http://xmlns.com/foaf/0.1/depiction> ?o .}'})
					.$promise
					.then(
						function (responseData) {
							if (responseData.id && responseData.value) {
								image.url = responseData.id;
								image.alt = responseData.value;
							}
						});
				return image;
			})(id);
		};

		return StargraphEnrichEntity;
	}]);
