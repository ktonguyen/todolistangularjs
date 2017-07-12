
angular.module('todotest')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		var todos = $scope.todos = store.todos;
		$scope.newTodo = '';

		$scope.$watch('todos', function () {
			var remainingCount = $filter('filter')(todos, { selected: false }).length;
			$scope.allChecked = !remainingCount && todos.length > 0;
		}, true);


		$scope.addTodo = function () {
			var newTodo = {
				title: $scope.newTodo.trim(),
				selected: false
			};

			if (!newTodo.title) {
				return;
			}

			$scope.saving = true;
			store.insert(newTodo)
				.then(function success() {
					$scope.newTodo = '';
				})
				.finally(function () {
					$scope.saving = false;
				});
		};

		$scope.removeTodo = function (todo) {
			store.delete(todo);
		};

		$scope.toggleSelected = function (todo, selected) {
			if (angular.isDefined(selected)) {
				todo.selected = selected;
			}
		};

		$scope.deleteSelectedTodos = function () {
			store.deleteSelected();
		};

		$scope.markAll = function (selected) {
			console.log("todo list", todos);
			todos.forEach(function (todo) {

				if (todo.selected !== selected) {
					$scope.toggleSelected(todo, selected);
				}
			});
		};
	});
