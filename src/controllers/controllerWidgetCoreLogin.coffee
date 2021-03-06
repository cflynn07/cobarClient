define [
  'app'
  'text!views/viewWidgetCoreLogin.html'
], (
  app
  viewWidgetCoreLogin
) ->

  app.run [
    '$templateCache',
    ($templateCache) ->
      $templateCache.put 'viewWidgetCoreLogin', viewWidgetCoreLogin
  ]

  app.controller 'ControllerWidgetCoreLogin', [
    '$scope'
    '$templateCache'
    'socket'
    'authenticate'
    ($scope
      $templateCache
      socket
      authenticate) ->

      $scope.errorMessage = ''
      $scope.submitting   = false
      $scope.username     = ''
      $scope.password     = ''


      $scope.authenticate = () ->

        $scope.errorMessage = ''
        if !$scope.username || !$scope.password
          $scope.errorMessage = 'Input your email and password'
        else
          $scope.submitting = true
          socket.emit 'authenticate:authenticate', {username: $scope.username, password: $scope.password}, (response) ->
            $scope.submitting = false
            if response.success and response.user
              authenticate.authenticate response.user
            else
              $scope.errorMessage = 'Incorrect username or password'
  ]
