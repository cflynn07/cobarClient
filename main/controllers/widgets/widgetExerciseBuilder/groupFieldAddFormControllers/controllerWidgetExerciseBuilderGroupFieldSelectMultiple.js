// Generated by CoffeeScript 1.6.3
(function() {
  define(['app'], function(app) {
    return app.controller('ControllerWidgetExerciseBuilderGroupFieldSelectMultiple', [
      '$scope', 'apiRequest', '$dialog', function($scope, apiRequest, $dialog) {
        $scope.form = {};
        return $scope.cancelAddNewField = function() {
          $scope.form = {};
          $scope.formSelectMultipleAdd.$setPristine();
          return $scope.$parent.viewModel.cancelAddNewField();
        };
      }
    ]);
  });

}).call(this);
