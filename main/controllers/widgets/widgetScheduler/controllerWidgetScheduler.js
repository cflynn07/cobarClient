// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'jquery', 'ejs', 'underscore', 'utils/utilBuildDTQuery', 'utils/utilParseClientTimeZone', 'utils/utilSafeStringify', 'text!views/widgetScheduler/viewWidgetScheduler.html', 'text!views/widgetScheduler/viewWidgetSchedulerListButtonsEJS.html', 'text!views/widgetScheduler/viewPartialSchedulerAddExerciseForm.html', 'controllers/widgets/widgetScheduler/controllerWidgetSchedulerAddExerciseForm'], function(app, $, EJS, _, utilBuildDTQuery, utilParseClientTimeZone, utilSafeStringify, viewWidgetScheduler, viewWidgetSchedulerListButtonsEJS, viewPartialSchedulerAddExerciseForm) {
    app.run([
      '$templateCache', function($templateCache) {
        $templateCache.put('viewWidgetScheduler', viewWidgetScheduler);
        return $templateCache.put('viewPartialSchedulerAddExerciseForm', viewPartialSchedulerAddExerciseForm);
      }
    ]);
    return app.controller('ControllerWidgetScheduler', [
      '$scope', '$route', '$routeParams', 'apiRequest', function($scope, $route, $routeParams, apiRequest) {
        var hashChangeUpdate, viewModel;
        viewModel = {
          exerciseListCollapsed: false,
          toggleExerciseListCollapsed: function() {
            var options;
            console.log('p2');
            options = {};
            options.direction = 'left';
            if (!$scope.viewModel.exerciseListCollapsed) {
              return $('#listPortlet').effect('blind', {
                direction: 'left'
              }, function() {
                return setTimeout(function() {
                  $scope.viewModel.exerciseListCollapsed = !$scope.viewModel.exerciseListCollapsed;
                  if (!$scope.$$phase) {
                    return $scope.$apply();
                  }
                }, 150);
              });
            } else {
              return $scope.viewModel.exerciseListCollapsed = !$scope.viewModel.exerciseListCollapsed;
            }
          },
          addNewEventForm: {},
          routeParams: $routeParams,
          eventListDT: {
            detailRow: function(obj) {
              return ' - ';
            },
            columnDefs: [
              {
                mData: null,
                aTargets: [0],
                bSortable: true,
                mRender: function(data, type, full) {
                  var resHtml;
                  resHtml = '<a href="#' + $scope.viewRoot + '/' + $scope.escapeHtml(full.uid) + '">';
                  if (full.name) {
                    resHtml += '<span data-ng-bind="resourcePool[\'' + full.uid + '\'].name">' + $scope.escapeHtml(full.name) + '</span>';
                  }
                  resHtml += '</a>';
                  return resHtml;
                }
              }, {
                mData: null,
                aTargets: [1],
                bSortable: true,
                sWidth: '100px',
                mRender: function(data, type, full) {
                  var resHtml;
                  return resHtml = '<span data-ng-bind="resourcePool[\'' + full.uid + '\'].dateTime | date:\'short\'"></span>';
                }
              }, {
                mData: null,
                aTargets: [2],
                bSortable: true,
                sWidth: '100px',
                mRender: function(data, type, full) {
                  var resHtml;
                  return resHtml = '<span data-ng-bind="resourcePool[resourcePool[\'' + full.revisionUid + '\'].templateUid].name"></span>';
                }
              }
            ],
            options: {
              bStateSave: true,
              iCookieDuration: 2419200,
              bJQueryUI: false,
              bPaginate: true,
              bLengthChange: true,
              bFilter: false,
              bInfo: true,
              bDestroy: true,
              bServerSide: true,
              bProcessing: true,
              fnServerData: function(sSource, aoData, fnCallback, oSettings) {
                var cacheResponse, query;
                query = utilBuildDTQuery(['name', 'dateTime'], ['name', 'dateTime'], oSettings);
                query.filter.push(['deletedAt', '=', 'null']);
                query.expand = [
                  {
                    resource: 'revision',
                    expand: [
                      {
                        resource: 'template'
                      }
                    ]
                  }
                ];
                cacheResponse = '';
                return oSettings.jqXHR = apiRequest.get('event', [], query, function(response, responseRaw) {
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
          },
          fullCalendarOptions: {
            header: {
              right: 'today month,agendaWeek,prev,next'
            },
            eventsResultCache: '',
            changeIncrementor: 0,
            events: function(start, end, callback) {
              var curDate, filter;
              filter = [['dateTime', '>', new Date(start).toISOString(), 'and'], ['dateTime', '<', new Date(end).toISOString()]];
              curDate = new Date();
              return apiRequest.get('event', [], {
                filter: filter
              }, function(response, responseRaw, fromCache) {
                var FCEventObj, eventObj, eventsArr, key, _ref;
                if (response.code !== 200) {
                  return;
                }
                eventsArr = [];
                _ref = response.response.data;
                for (key in _ref) {
                  eventObj = _ref[key];
                  FCEventObj = {
                    title: eventObj.name,
                    start: new Date(eventObj.dateTime),
                    className: new Date(eventObj.dateTime) < curDate ? 'event pastEvent' : 'event upcomingEvent',
                    url: '#' + $scope.viewRoot + '/' + eventObj.uid
                  };
                  eventsArr.push(FCEventObj);
                }
                if (responseRaw !== $scope.viewModel.fullCalendarOptions.eventsResultCache) {
                  $scope.viewModel.fullCalendarOptions.eventsResultCache = responseRaw;
                  return callback(eventsArr);
                }
              });
            }
          },
          fullCalendarOptionsSecondary: {
            header: {
              right: 'today month,agendaWeek,agendaDay,prev,next'
            },
            eventsResultCache: {},
            events: function(start, end, callback) {
              var curDate, filter;
              filter = [['dateTime', '>', new Date(start).toISOString(), 'and'], ['dateTime', '<', new Date(end).toISOString()]];
              curDate = new Date();
              return apiRequest.get('event', [], {
                filter: filter
              }, function(response, responseRaw) {
                var FCEventObj, eventObj, eventsArr, key, _ref;
                if (response.code !== 200) {
                  return;
                }
                eventsArr = [];
                _ref = response.response.data;
                for (key in _ref) {
                  eventObj = _ref[key];
                  FCEventObj = {
                    title: eventObj.name,
                    start: new Date(eventObj.dateTime),
                    className: new Date(eventObj.dateTime) < curDate ? 'event pastEvent' : 'event upcomingEvent'
                  };
                  eventsArr.push(FCEventObj);
                }
                if (responseRaw !== $scope.viewModel.fullCalendarOptionsSecondary.eventsResultCache) {
                  $scope.viewModel.fullCalendarOptionsSecondary.eventsResultCache = responseRaw;
                  return callback(eventsArr);
                }
              });
            }
          }
        };
        hashChangeUpdate = function() {
          return $scope.viewModel.routeParams = $routeParams;
        };
        $scope.$on('$routeChangeSuccess', function() {
          return hashChangeUpdate();
        });
        return $scope.viewModel = viewModel;
      }
    ]);
  });

}).call(this);
