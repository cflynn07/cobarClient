// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'utils/utilBuildDTQuery'], function(app, utilBuildDTQuery) {
    return app.controller('ControllerWidgetExerciseBuilderFieldManageSelectIndividual', [
      '$scope', 'apiRequest', '$dialog', function($scope, apiRequest, $dialog) {
        return $scope.dictionaryItemsDT = {
          columnDefs: [
            {
              mData: null,
              aTargets: [0],
              mRender: function(data, type, full) {
                return '<span data-ng-bind="resourcePool[\'' + full.uid + '\'].name">' + full.name + '</span>';
              }
            }
          ],
          options: {
            bStateSave: true,
            iCookieDuration: 2419200,
            bJQueryUI: false,
            bPaginate: true,
            bLengthChange: false,
            bFilter: true,
            bInfo: true,
            bDestroy: true,
            bServerSide: true,
            bProcessing: true,
            fnServerData: function(sSource, aoData, fnCallback, oSettings) {
              var cacheResponse, query;
              query = utilBuildDTQuery(['name'], ['name'], oSettings);
              if (query.filter && !_.isUndefined(query.filter[0])) {
                query.filter[0][3] = 'and';
              }
              query.filter.push(['deletedAt', '=', 'null', 'and']);
              query.filter.push(['dictionaryUid', '=', $scope.field.dictionaryUid, 'and']);
              cacheResponse = '';
              return oSettings.jqXHR = apiRequest.get('dictionaryItem', [], query, function(response, responseRaw) {
                var dataArr, responseDataString;
                if (response.code === 200) {
                  responseDataString = responseRaw;
                  if (cacheResponse === responseDataString) {
                    return;
                  }
                  cacheResponse = responseDataString;
                  dataArr = _.toArray(response.response.data);
                  return fnCallback({
                    iTotalRecords: response.response.length,
                    iTotalDisplayRecords: response.response.length,
                    aaData: dataArr
                  });
                }
              });
            }
          }
        };
      }
    ]);
  });

}).call(this);
