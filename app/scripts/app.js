'use strict';

/**
 * @ngdoc overview
 * @name Lambda3WebApp
 * @description
 * # Lambda3WebApp
 *
 * Main module of the application.
 */
angular
    .module('Lambda3WebApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.ace',
        'ngMaterial',
        'ui.bootstrap', // bootstrap ui
        'monospaced.elastic', // elastic textareas
        'checklist-model', // multiple selects
        'ngToast', // toast message
        'ngFileUpload' // upload files
    ])
    .config(function($routeProvider) {
        $routeProvider
            //aide
            .when('/aide/ruleEditor', {
                templateUrl: 'views/aide/ruleEditor.html',
                controller: 'ProgrammingRuleEditorCtrl',
            })
            .when('/aide/functionEditor', {
                templateUrl: 'views/aide/functionEditor.html',
                controller: 'ProgrammingFunctionEditorCtrl'
            })
            // default otherwise
            .otherwise({
                redirectTo: '/aide/ruleEditor'
            });
    });

