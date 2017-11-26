'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingOnthologyCtrl
 * @description
 * # ProgrammingOnthologyCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingFunctionEditorCtrl', function ($scope, aide, $mdSidenav, $uibModal, semanticSearch, lodash) {
		$scope.types = ["api", "extractor", "action_provider"];
		$scope.currentType = "api";

		function buildToggler(componentId) {
			return function () {
				$mdSidenav(componentId).toggle();
				if (!$scope.apiList) {
					$scope.getApis();
				}
				if (!$scope.action_providerList) {
					$scope.getActionProviders();
				}
				if (!$scope.extractorList) {
					$scope.getExtractors();
				}
			};
		}

		$scope.aceLoaded = function (_editor) {
			$scope.editor = _editor;
			_editor.setPrintMarginColumn(120);
			$scope.editSession = _editor.getSession();
			_editor.commands.addCommand({
				name: "saveApi",
				bindKey: {win: "Ctrl-Shift-S", mac: "Command-Shift-S"},
				exec: function () {
					$scope.saveApi();
				}
			});
			_editor.commands.addCommand({
				name: "semanticSearch",
				bindKey: {win: "Ctrl-Shift-E", mac: "Command-Shift-E"},
				exec: function () {
					$scope.formatAndInsert();
				}
			});
			_editor.commands.addCommand({
				name: "formatCode",
				bindKey: {win: "Ctrl-Shift-F", mac: "Command-Shift-F"},
				exec: function () {
					$scope.formatCode();
					console.log($scope.editor.getCursorPosition());
				}
			});
			_editor.on("change", $scope.autoCompleteDoc);
		};

		function createTypeHinting(defLine, indent) {
			indent = " ".repeat(indent);
			var result = lodash(defLine.match(/def(.*)\((.*?)\):/)[2])
				.split(",")
				.filter((elem) => elem && elem.trim() !== "self")
				.map(function (arg) {
					arg = arg.split("=")[0].trim();
					return [indent + ":param " + arg + ": ", indent + ":type " + arg + ": "];
				}).flatten().value();
			result.push(indent + '"""');
			return [indent].concat(result);

		}

		/**
		 * Called when editor changes.
		 *
		 * Basically checks if it's a line break and if so, if its the beginning of a function documentation.
		 *
		 */
		$scope.autoCompleteDoc = function (e) {
			if (e.action === "insert" && e.lines.length === 1 && e.lines[0].trim() === "") {
				var defLine = $scope.editSession.getLine(e.end.row - 2);
				if (defLine.trim().startsWith("def")) {
					var docLine = $scope.editSession.getLine(e.end.row - 1);
					if (docLine.trim() === ('"""') && $scope.editor.getCursorPosition().column === 0) {
						var indent = docLine.length - docLine.trim().length;
						$scope.editSession.getDocument().insertFullLines(e.end.row, createTypeHinting(defLine, indent));
						var firstLine = e.end.row + 2;
						$scope.editor.gotoLine(firstLine, $scope.editSession.getLine(firstLine).length + 1, false);
					}
				}
			}
		};

		$scope.formatCode = function () {
			aide.formatCode({"code": $scope.api}).$promise
				.then(
					function (result) {
						var position = $scope.editor.getCursorPosition();
						console.log(position);
						$scope.api = result.formatted_code;
						$scope.editSession.getDocument().setValue(result.formatted_code);
						position = $scope.editor.getCursorPosition();
						console.log(position);
					},
					function (error) {
						console.log(error);
					});
		};
		$scope.formatAndInsert = function () {
			var result = $scope.openSemanticSearch();
			result.result
				.then(
					function (result) {
						var formatted = result.api + "." + result.name + "(";
						if (result.args.length > 0) {
							result.args.forEach(function (item) {
								formatted += item + "= ,";
							});
							formatted = formatted.slice(0, -1);
						}
						formatted += ")";
						$scope.editor.insert(formatted);
					},
					function () {
						console.log("search cancelled");
					});
			console.log(result);
		};

		$scope.openSemanticSearch = function () {
			var modalInstance = $uibModal.open({
				templateUrl: "views/aide/templates/modals/semanticSearchModal.tpl.html",
				controller: 'ProgrammingSemanticSearchModalCtrl',
			});

			return modalInstance;
		};

		$scope.saveApi = function () {
			$scope.loading = true;
			$scope.message = false;
			aide.postApi({'type': $scope.currentType + "s"}, {"name": $scope.name, "file_content": $scope.api}).$promise.then(
				function (success) {
					console.log(success);
					$scope.message = "Save the API. You were:";
					$scope.message += success.success ? "Successful!" : "Unsuccessful!";
					$scope.warnings = success.errors;
					$scope.loading = false;
					getEverythings($scope.currentType);

				},
				function (obj) {
					console.log(obj.data.message);
					var msg = obj.data.message;
					Object.keys(msg).forEach(function (key) {
						$scope.error += msg[key] + "\n";
					});
					console.log($scope.error);
					$scope.loading = false;
				});
		};
		var getEverything = function (type, name) {
			$scope.loading = true;
			aide.getApi({'name': name, 'type': type + "s"}).$promise.then(
				function (obj) {
					console.log(obj);
					$scope.reset();
					$scope.name = name;
					$scope.api = obj.file_content;
					$scope.loading = false;
					$scope.currentType = type;

				},
				function (obj) {
					var msg = obj.data.message;
					$scope.error = Object.keys().forEach(function (key) {
						$scope.error += msg[key] + "\n";
					});
					$scope.loading = false;
				}
			);
		};

		$scope.delete = function () {
			$scope.loading = true;
			console.log("DELETING");
			const type = $scope.currentType;
			aide.deleteApi({'name': $scope.name, 'type': type + "s"}).$promise.then(
				function (obj) {
					$scope.reset();
					$scope.message = "Delete the API. You were:";
					$scope.message += obj.success ? "Successful!" : "Unsuccessful!";
					$scope.loading = false;
					getEverythings(type);
				},
				function (obj) {

					$scope.error = obj.error;
					$scope.loading = false;
				}
			);
		};

		var getEverythings = function (type) {
			aide.getApis({'type': type + "s"}).$promise.then(
				function (success) {
					console.log(success);
					$scope[type + "List"] = success.api_names;
					console.log($scope[type + "List"]);
				},
				function (error) {
					$scope.error = error;
				});
		};
		$scope.getApis = function () {
			getEverythings("api");
		};
		$scope.getApi = function (name) {
			getEverything("api", name);
		};
		$scope.getExtractors = function () {
			getEverythings("extractor");
		};
		$scope.getExtractor = function (name) {
			getEverything("extractor", name);
		};
		$scope.getActionProvider = function (name) {
			console.log("GETTING ACTION PROVIDER");
			getEverything("action_provider", name);
		};

		$scope.getActionProviders = function () {
			getEverythings("action_provider");
		};

		$scope.toggleLeft = buildToggler('left');
		$scope.toggleRight = buildToggler('right');

		$scope.reset = function () {
			$scope.name = "";
			$scope.message = false;
			$scope.error = "";
			$scope.warnings = "";
			$scope.api = "";
		};

		$scope.reset();
	});
