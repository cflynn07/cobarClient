define [
  'app'
  'underscore'
], (
  app
  _
) ->

  #https://github.com/angular/angular.js/issues/1286
  app.filter 'toArray', [
    () ->
      (obj) ->
        if !(obj instanceof Object)
          return obj

        result = _.map obj, (val, key) ->
          return Object.defineProperty val, '$key', {__proto__: null, value: key}

        return result
  ]