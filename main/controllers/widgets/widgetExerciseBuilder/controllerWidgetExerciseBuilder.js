// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'jquery', 'ejs', 'async', 'underscore', 'underscore_string', 'utils/utilBuildDTQuery', 'controllers/widgets/widgetExerciseBuilder/groupFieldAddFormControllers/controllerWidgetExerciseBuilderGroupFieldOpenResponse', 'controllers/widgets/widgetExerciseBuilder/groupFieldAddFormControllers/controllerWidgetExerciseBuilderGroupFieldSelectIndividual', 'controllers/widgets/widgetExerciseBuilder/groupFieldAddFormControllers/controllerWidgetExerciseBuilderGroupFieldSelectMultiple', 'controllers/widgets/widgetExerciseBuilder/groupFieldAddFormControllers/controllerWidgetExerciseBuilderGroupFieldYesNo', 'controllers/widgets/widgetExerciseBuilder/groupFieldAddFormControllers/controllerWidgetExerciseBuilderGroupFieldPercentageSlider', 'controllers/widgets/widgetExerciseBuilder/groupFieldManageControllers/controllerWidgetExerciseBuilderFieldManageOpenResponse', 'controllers/widgets/widgetExerciseBuilder/groupFieldManageControllers/controllerWidgetExerciseBuilderFieldManageSelectIndividual', 'controllers/widgets/widgetExerciseBuilder/groupFieldManageControllers/controllerWidgetExerciseBuilderFieldManageSelectMultiple', 'controllers/widgets/widgetExerciseBuilder/groupFieldManageControllers/controllerWidgetExerciseBuilderFieldManageYesNo', 'controllers/widgets/widgetExerciseBuilder/groupFieldManageControllers/controllerWidgetExerciseBuilderFieldManageSlider', 'controllers/widgets/widgetExerciseBuilder/controllerWidgetExerciseBuilderGroupEdit', 'text!views/widgetExerciseBuilder/viewWidgetExerciseBuilder.html', 'text!views/widgetExerciseBuilder/fields/viewPartialExerciseBuilderFieldOpenResponse.html', 'text!views/widgetExerciseBuilder/fields/viewPartialExerciseBuilderFieldSelectIndividual.html', 'text!views/widgetExerciseBuilder/fields/viewPartialExerciseBuilderFieldSlider.html', 'text!views/widgetExerciseBuilder/fields/viewWidgetExerciseBuilderFieldButtons.html', 'text!views/widgetExerciseBuilder/viewWidgetExerciseBuilderDetailsEJS.html', 'text!views/widgetExerciseBuilder/viewWidgetExerciseBuilderTemplateListButtonsEJS.html', 'text!views/widgetExerciseBuilder/viewWidgetExerciseBuilderArchivedTemplateListButtonsEJS.html', 'text!views/widgetExerciseBuilder/viewPartialExerciseBuilderNewTemplateForm.html', 'text!views/widgetExerciseBuilder/viewPartialExerciseBuilderNewGroupForm.html', 'text!views/widgetExerciseBuilder/viewPartialExerciseBuilderGroupMenu.html', 'text!views/widgetExerciseBuilder/formPartials/viewPartialExerciseBuilderGroupFieldOpenResponse.html', 'text!views/widgetExerciseBuilder/formPartials/viewPartialExerciseBuilderGroupFieldSelectIndividual.html', 'text!views/widgetExerciseBuilder/formPartials/viewPartialExerciseBuilderGroupFieldPercentageSlider.html'], function(app, $, EJS, async, _, _string, utilBuildDTQuery, ControllerWidgetExerciseBuilderGroupFieldOpenResponse, ControllerWidgetExerciseBuilderGroupFieldSelectIndividual, ControllerWidgetExerciseBuilderGroupFieldSelectMultiple, ControllerWidgetExerciseBuilderGroupFieldYesNo, ControllerWidgetExerciseBuilderGroupFieldPercentageSlider, ControllerWidgetExerciseBuilderFieldManageOpenResponse, ControllerWidgetExerciseBuilderFieldManageSelectIndividual, ControllerWidgetExerciseBuilderFieldManageSelectMultiple, ControllerWidgetExerciseBuilderFieldManageYesNo, ControllerWidgetExerciseBuilderFieldManageSlider, ControllerWidgetExerciseBuilderGroupEdit, viewWidgetExerciseBuilder, viewPartialExerciseBuilderFieldOpenResponse, viewPartialExerciseBuilderFieldSelectIndividual, viewPartialExerciseBuilderFieldSlider, viewWidgetExerciseBuilderFieldButtons, viewWidgetExerciseBuilderDetailsEJS, viewWidgetExerciseBuilderTemplateListButtonsEJS, viewWidgetExerciseBuilderArchivedTemplateListButtonsEJS, viewPartialExerciseBuilderNewTemplateForm, viewPartialExerciseBuilderNewGroupForm, viewPartialExerciseBuilderGroupMenu, viewPartialExerciseBuilderGroupFieldOpenResponse, viewPartialExerciseBuilderGroupFieldSelectIndividual, viewPartialExerciseBuilderGroupFieldPercentageSlider) {
    var helperReorderGroupOrdinals;
    helperReorderGroupOrdinals = function($scope, apiRequest, groupsHash, insertOrdinalNum, insertUid, topCallback) {
      var groupsArray, i;
      if (insertUid == null) {
        insertUid = false;
      }
      groupsArray = $scope.getArrayFromHash(groupsHash);
      groupsArray = _.sortBy(groupsArray, function(item) {
        return item.ordinal;
      });
      groupsArray = _.filter(groupsArray, function(item) {
        return !item.deletedAt;
      });
      i = 0;
      groupsArray = _.map(groupsArray, function(item) {
        if (insertUid) {
          if (item.uid === insertUid) {
            return item;
          }
        }
        if (i >= insertOrdinalNum) {
          item.ordinal = i + 1;
        } else {
          item.ordinal = i;
        }
        i++;
        return item;
      });
      return async.map(groupsArray, function(item, callback) {
        return apiRequest.put('group', item.uid, {
          ordinal: item.ordinal
        }, {}, function(result) {
          return callback();
        });
      }, function(err, results) {
        return topCallback();
      });
    };
    app.run([
      '$templateCache', function($templateCache) {
        $templateCache.put('viewWidgetExerciseBuilder', viewWidgetExerciseBuilder);
        $templateCache.put('viewPartialExerciseBuilderFieldOpenResponse', viewPartialExerciseBuilderFieldOpenResponse);
        $templateCache.put('viewPartialExerciseBuilderFieldSelectIndividual', viewPartialExerciseBuilderFieldSelectIndividual);
        $templateCache.put('viewPartialExerciseBuilderFieldSlider', viewPartialExerciseBuilderFieldSlider);
        $templateCache.put('viewWidgetExerciseBuilderFieldButtons', viewWidgetExerciseBuilderFieldButtons);
        $templateCache.put('viewPartialExerciseBuilderNewTemplateForm', viewPartialExerciseBuilderNewTemplateForm);
        $templateCache.put('viewPartialExerciseBuilderNewGroupForm', viewPartialExerciseBuilderNewGroupForm);
        $templateCache.put('viewPartialExerciseBuilderGroupMenu', viewPartialExerciseBuilderGroupMenu);
        $templateCache.put('viewPartialExerciseBuilderGroupFieldOpenResponse', viewPartialExerciseBuilderGroupFieldOpenResponse);
        $templateCache.put('viewPartialExerciseBuilderGroupFieldSelectIndividual', viewPartialExerciseBuilderGroupFieldSelectIndividual);
        return $templateCache.put('viewPartialExerciseBuilderGroupFieldPercentageSlider', viewPartialExerciseBuilderGroupFieldPercentageSlider);
      }
    ]);
    /*
    # PRIMARY CONTROLLER
    */

    return app.controller('ControllerWidgetExerciseBuilder', [
      '$scope', '$route', '$routeParams', '$templateCache', 'socket', 'apiRequest', '$dialog', function($scope, $route, $routeParams, $templateCache, socket, apiRequest, $dialog) {
        var hashChangeUpdate, rateLimit;
        $scope.viewModel = {
          toggleTemplatesListCollapsed: function() {
            var options;
            options = {};
            options.direction = 'left';
            if (!$scope.viewModel.templatesListCollapsed) {
              return $('#templatesListPortlet').effect('blind', {
                direction: 'left'
              }, function() {
                return setTimeout(function() {
                  $scope.viewModel.templatesListCollapsed = !$scope.viewModel.templatesListCollapsed;
                  if (!$scope.$$phase) {
                    return $scope.$apply();
                  }
                }, 150);
              });
            } else {
              return $scope.viewModel.templatesListCollapsed = !$scope.viewModel.templatesListCollapsed;
            }
          },
          showAddNewTemplate: false,
          showAddNewTemplateGroup: false,
          routeParams: {},
          templates: {},
          newTemplateForm: {},
          newTemplateGroupForm: {},
          editTemplateNameForm: {},
          archivedListLength: 0,
          nonArchivedListLength: 0,
          restoreTemplate: function(uid) {
            return apiRequest.put('template', uid, {
              deletedAt: null
            }, {}, function(response) {
              return console.log(response);
            });
          },
          archivedTemplatesListDataTable: {
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
                mRender: function(data, type, full) {
                  return '{{ resourcePool[\'' + full.employeeUid + '\'].firstName }} {{ resourcePool[\'' + full.employeeUid + '\'].lastName }}';
                }
              }, {
                mData: null,
                aTargets: [2],
                bSortable: true,
                sWidth: '125px',
                mRender: function(data, type, full) {
                  return '{{ resourcePool[\'' + full.uid + '\'].createdAt | date:\'short\' }}';
                }
              }, {
                mData: null,
                aTargets: [3],
                bSortable: true,
                sWidth: '75px',
                mRender: function(data, type, full) {
                  return '<span data-ng-show = "resourcePool[\'' + full.uid + '\'].revisions[0].finalized">Yes</span>\
                 <span data-ng-show = "!resourcePool[\'' + full.uid + '\'].revisions[0].finalized">No</span>';
                }
              }, {
                mData: null,
                aTargets: [4],
                bSortable: false,
                sWidth: '100px',
                mRender: function(data, type, full) {
                  var html, revisionUid, uid;
                  uid = $scope.escapeHtml(full.uid);
                  if (!_.isUndefined(resourcePool[uid].revisions[0])) {
                    revisionUid = resourcePool[uid].revisions[0].uid;
                  } else {
                    revisionUid = '';
                  }
                  return html = new EJS({
                    text: viewWidgetExerciseBuilderArchivedTemplateListButtonsEJS
                  }).render({
                    uid: uid
                  });
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
                query = utilBuildDTQuery(['name', 'employeeUid', 'createdAt'], ['name', 'employeeUid', 'createdAt'], oSettings);
                query.filter.push(['deletedAt', '!=', 'null']);
                query.expand = [
                  {
                    resource: 'revisions',
                    expand: [
                      {
                        resource: 'template'
                      }, {
                        resource: 'employee'
                      }
                    ]
                  }
                ];
                cacheResponse = '';
                return oSettings.jqXHR = apiRequest.get('template', [], query, function(response, responseRaw) {
                  var dataArr, responseDataString;
                  if (response.code === 200) {
                    $scope.viewModel.archivedListLength = response.response.length;
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
          templatesListDataTable: {
            detailRow: function(obj) {
              var html, uid;
              uid = $scope.escapeHtml(obj.uid);
              html = new EJS({
                text: viewWidgetExerciseBuilderDetailsEJS
              }).render({
                templateUid: uid
              });
              return html;
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
                mRender: function(data, type, full) {
                  return '{{ resourcePool[\'' + full.employeeUid + '\'].firstName }} {{ resourcePool[\'' + full.employeeUid + '\'].lastName }}';
                }
              }, {
                mData: null,
                aTargets: [2],
                bSortable: true,
                sWidth: '125px',
                mRender: function(data, type, full) {
                  return '{{ resourcePool[\'' + full.uid + '\'].createdAt | date:\'short\' }}';
                }
              }, {
                mData: null,
                aTargets: [3],
                bSortable: true,
                sWidth: '75px',
                mRender: function(data, type, full) {
                  return '<span data-ng-show = "resourcePool[\'' + full.uid + '\'].revisions[0].finalized">Yes</span>\
                 <span data-ng-show = "!resourcePool[\'' + full.uid + '\'].revisions[0].finalized">No</span>';
                }
              }, {
                mData: null,
                aTargets: [4],
                bSortable: false,
                sWidth: '100px',
                mRender: function(data, type, full) {
                  var html, revisionUid, uid;
                  uid = $scope.escapeHtml(full.uid);
                  if (!_.isUndefined(resourcePool[uid].revisions[0])) {
                    revisionUid = resourcePool[uid].revisions[0].uid;
                  } else {
                    revisionUid = '';
                  }
                  return html = new EJS({
                    text: viewWidgetExerciseBuilderTemplateListButtonsEJS
                  }).render({
                    templateUid: uid,
                    revisionUid: revisionUid
                  });
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
                query = utilBuildDTQuery(['name', 'employeeUid', 'createdAt'], ['name', 'employeeUid', 'createdAt'], oSettings);
                query.filter.push(['deletedAt', '=', 'null']);
                query.expand = [
                  {
                    resource: 'revisions',
                    expand: [
                      {
                        resource: 'template'
                      }, {
                        resource: 'employee'
                      }
                    ]
                  }
                ];
                cacheResponse = '';
                return oSettings.jqXHR = apiRequest.get('template', [], query, function(response, responseRaw) {
                  var dataArr, responseDataString;
                  if (response.code === 200) {
                    $scope.viewModel.nonArchivedListLength = response.response.length;
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
          deleteConfirmDialogTemplate: function(templateUid) {
            return apiRequest.get('template', [templateUid], {}, function(response) {
              var btns, msg, title;
              title = 'Delete Dialog';
              msg = 'Dire Consequences...';
              btns = [
                {
                  result: false,
                  label: 'Cancel',
                  cssClass: 'red'
                }, {
                  result: true,
                  label: 'Confirm',
                  cssClass: 'green'
                }
              ];
              return $dialog.messageBox(title, msg, btns).open().then(function(result) {
                if (result) {
                  return apiRequest["delete"]('template', templateUid, {}, function(result) {});
                }
              });
            });
          },
          clearnewTemplateGroupForm: function() {
            $scope.viewModel.showAddNewTemplateGroup = false;
            if ($scope.newTemplateGroupForm) {
              $scope.newTemplateGroupForm.$setPristine();
            }
            return $scope.viewModel.newTemplateGroupForm = {};
          },
          clearNewTemplateForm: function() {
            $scope.viewModel.showAddNewTemplate = false;
            $scope.viewModel.postNewTemplateSaving = false;
            $scope.viewModel.newTemplateForm = {};
            if ($scope.newTemplateForm) {
              return $scope.newTemplateForm.$setPristine();
            }
          },
          postNewTemplateGroup: function() {
            var $groupsObj;
            if (!$scope.viewModel.routeParams.revisionUid) {
              return;
            }
            $groupsObj = $scope.resourcePool[$scope.viewModel.routeParams.revisionUid].groups;
            return helperReorderGroupOrdinals($scope, apiRequest, $groupsObj, 0, false, function() {
              return apiRequest.post('group', {
                name: $scope.viewModel.newTemplateGroupForm.name,
                description: $scope.viewModel.newTemplateGroupForm.description,
                ordinal: 0,
                revisionUid: $scope.viewModel.routeParams.revisionUid
              }, {}, function(result) {
                $scope.viewModel.clearnewTemplateGroupForm();
                return console.log(result);
              });
            });
          },
          revisionChangeSummary: '',
          putRevisionChangeSummary: function() {
            return apiRequest.put('revision', [$scope.viewModel.routeParams.revisionUid], {
              changeSummary: $scope.viewModel.revisionChangeSummary
            }, {}, function(response) {
              return console.log(response);
            });
          },
          putRevisionFinalize: function() {
            var btns, msg, title;
            title = 'Save Revision';
            msg = 'Save this exercise revision if you\'re done editing. You will not be able to make changes to this revision after your save.';
            btns = [
              {
                result: false,
                label: 'Cancel',
                cssClass: 'red'
              }, {
                result: true,
                label: 'Confirm',
                cssClass: 'green'
              }
            ];
            return $dialog.messageBox(title, msg, btns).open().then(function(result) {
              if (result) {
                return apiRequest.put('revision', [$scope.viewModel.routeParams.revisionUid], {
                  finalized: true
                }, {}, function(response) {
                  return console.log(response);
                });
              }
            });
          },
          putTemplate: function(templateUid) {
            return apiRequest.put('template', [templateUid], {
              name: $scope.viewModel.formEditTemplateName.name
            }, {}, function(response) {
              console.log(response);
              return $scope.viewModel.showEditTemplateName = false;
            });
          },
          postNewTemplate: function() {
            $scope.viewModel.postNewTemplateSaving = true;
            return apiRequest.post('template', {
              name: $scope.viewModel.newTemplateForm.name,
              type: $scope.viewModel.newTemplateForm.type
            }, {}, function(response) {
              var hash, uid;
              if (response.code !== 201) {
                return;
              }
              uid = response.uids[0];
              hash = window.location.hash;
              return apiRequest.get('template', [uid + ''], {
                expand: [
                  {
                    resource: 'revisions'
                  }
                ]
              }, function(templateResponse) {
                if (templateResponse.code !== 200) {
                  return;
                }
                $scope.viewModel.clearNewTemplateForm();
                return window.location.hash = hash + '/' + templateResponse.response.data.revisions[0].uid;
              });
              /*
              MODIFIED API TO IMPLICITLY CREATE FIRST REVISION AND GROUP
              
              #Create first revision
              apiRequest.post 'revision', {
                changeSummary: ''
                scope:         ''
                templateUid:   result.uids[0]
              }, {}, (result) ->
                console.log result
                $scope.viewModel.clearNewTemplateForm()
              #console.log result
              */

            });
          },
          currentTemplateRevision: {},
          /*
          fetchCurrentTemplateRevision: () ->
          
            if !$scope.viewModel.routeParams.templateUid
              $scope.viewModel.currentTemplateRevision = false
              return
            if !$scope.viewModel.templates
              return
            if !$scope.viewModel.routeParams.templateUid
              return
            return
          
            $scope.resourcePool[$scope.viewModel.routeParams.templateUid]
          
            apiRequest.get 'revision', [], {}, (response) ->
          
            template = $scope.viewModel.templates[$scope.viewModel.routeParams.templateUid]
            $scope.viewModel.currentTemplateRevision = $scope.getLastObjectFromHash template.revisions
            #console.log $scope.viewModel.currentTemplateRevision
          */

          currentTemplate: false,
          fetchCurrentTemplate: function() {
            if (!$scope.viewModel.routeParams.revisionUid) {
              $scope.viewModel.currentTemplate = false;
              return;
            }
            return apiRequest.get('revision', [$scope.viewModel.routeParams.revisionUid], {
              expand: [
                {
                  resource: 'template'
                }, {
                  resource: 'groups',
                  expand: [
                    {
                      resource: 'fields'
                    }
                  ]
                }
              ]
            }, function(response) {
              if (response.code !== 200) {
                return;
              }
              $scope.viewModel.currentTemplate = response.response.template;
              return $scope.viewModel.currentRevision = response.response;
            });
          }
        };
        $scope.fieldsSortableOptions = {
          connectWith: 'div[data-ui-sortable]',
          disabled: false,
          update: function() {
            return $('div[data-group-uid]').each(function() {
              var groupFieldOrdinal, groupUid;
              groupUid = $(this).attr('data-group-uid');
              groupFieldOrdinal = 0;
              return $(this).find('div[data-field-uid]').each(function() {
                var field, fieldUid;
                fieldUid = $(this).attr('data-field-uid');
                field = $scope.resourcePool[fieldUid];
                if ((field.ordinal === groupFieldOrdinal) && (field.groupUid === groupUid)) {
                  groupFieldOrdinal++;
                  return;
                }
                if (field.groupUid !== groupUid) {
                  $scope.resourcePool[groupUid].fields[field.uid] = field;
                  delete $scope.resourcePool[field.groupUid].fields[field.uid];
                  field.groupUid = groupUid;
                }
                apiRequest.put('field', fieldUid, {
                  ordinal: groupFieldOrdinal,
                  groupUid: groupUid
                }, {}, function(result) {
                  return console.log(result);
                });
                return groupFieldOrdinal++;
              });
            });
          }
        };
        rateLimit = null;
        $scope.$on('resourcePut', function(e, data) {
          var field, fieldUid, found, group, groupUid, groupUids, _ref, _ref1;
          if (!$scope.routeParams.revisionUid) {
            return;
          }
          groupUids = [];
          found = false;
          _ref = $scope.resourcePool[$scope.routeParams.revisionUid].groups;
          for (groupUid in _ref) {
            group = _ref[groupUid];
            groupUids.push(groupUid);
            _ref1 = group.fields;
            for (fieldUid in _ref1) {
              field = _ref1[fieldUid];
              if (fieldUid === data['uid']) {
                found = true;
                break;
              }
            }
          }
          if (found) {
            clearTimeout(rateLimit);
            return rateLimit = setTimeout(function() {
              return apiRequest.get('group', groupUids, {
                expand: [
                  {
                    resource: 'fields'
                  }
                ]
              }, function(response) {
                console.log('GET groups.fields');
                return console.log(response);
              });
            }, 100);
          }
        });
        hashChangeUpdate = function() {
          $scope.viewModel.showEditTemplateName = false;
          $scope.viewModel.routeParams = $routeParams;
          if ($routeParams.revisionUid) {
            return $scope.viewModel.fetchCurrentTemplate();
          }
        };
        $scope.$on('$routeChangeSuccess', function() {
          return hashChangeUpdate();
        });
        hashChangeUpdate();
        return $scope.viewModel.fetchCurrentTemplate();
      }
    ]);
  });

}).call(this);
