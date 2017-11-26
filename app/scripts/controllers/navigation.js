'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {

		$scope.navCollapsed = true;

		$scope.isCurrentParent = function (parent) {
			return $location.path().indexOf(parent) === 0;
		};

		$scope.isCurrentPage = function (path) {
			return $location.path() === path;
		};
	}]);
