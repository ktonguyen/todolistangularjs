/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todotest', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todo.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					todoStorage.get(); // Fetch the todo records in the background.
					return todoStorage;

				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
