'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphMappingsStore
 * @description
 * # StargraphMappingsStore
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphMappingsStore', [function () {

		var data = {};

		return {

			setData: function (newData) {
				data = newData;
			},

			getQuery: function () {
				return data.query;
			},


			getMappings: function () {
				return data.mappings;
			}
		};


	}]);
