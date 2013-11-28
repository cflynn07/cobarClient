// Generated by CoffeeScript 1.6.3
(function() {
  define(['app'], function(app) {
    return app.controller('ControllerWidgetExerciseBuilderGroupFieldPercentageSlider', [
      '$scope', 'apiRequest', '$dialog', function($scope, apiRequest, $dialog) {
        $scope.form = {};
        $scope.cancelAddNewField = function() {
          $scope.form = {};
          $scope.formPercentageSliderAdd.$setPristine();
          return $scope.$parent.viewModel.cancelAddNewField();
        };
        $scope.submitField = function() {
          apiRequest.post('field', {
            name: $scope.form.name,
            type: 'slider',
            percentageSliderLeft: $scope.form.leftValue,
            percentageSliderRight: $scope.form.rightValue,
            groupUid: $scope.group.uid,
            ordinal: 0
          }, {}, function(response) {
            return console.log(response);
          });
          return $scope.cancelAddNewField();
        };
        return $scope.isFormInvalid = function() {
          if (!$scope.formPercentageSliderAdd) {
            return;
          }
          return $scope.formPercentageSliderAdd.$invalid;
        };
      }
    ]);
  });

}).call(this);
