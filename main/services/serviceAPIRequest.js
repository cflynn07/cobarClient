// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'underscore', 'uuid', 'utils/utilSortHash', 'text!config/clientOrmShare.json'], function(app, _, uuid, utilSortHash, clientOrmShare) {
    clientOrmShare = JSON.parse(clientOrmShare);
    return app.factory('apiRequest', [
      'socket', '$rootScope', function(socket, $rootScope) {
        var factory, helperGetCollectionName, helperHashApiRequests, helperMeshResourceWithPool, helperUpdateResourcePool, helperValidateResource, resourcePool, resourcePoolResultCache;
        resourcePool = {};
        $rootScope.resourcePool = resourcePool;
        window.resourcePool = $rootScope.resourcePool;
        window.rootScope = $rootScope;
        resourcePoolResultCache = {};
        /*
        #  Helpers
        */

        helperMeshResourceWithPool = function(data) {
          if (!_.isUndefined(data['resource']) && !_.isUndefined(data['resource']['uid'])) {
            if (!_.isUndefined(resourcePool[data['resource']['uid']])) {
              return _.extend(resourcePool[data['resource']['uid']], data['resource']);
            } else {
              return resourcePool[data['resource']['uid']] = data['resource'];
            }
          }
        };
        helperValidateResource = function(resourceName) {
          if (_.isUndefined(clientOrmShare[resourceName])) {
            throw new Error(resourceName + ' is unknown');
            return false;
          }
          return true;
        };
        helperGetCollectionName = function(resourceName) {
          var apiCollectionName;
          apiCollectionName = resourceName + 's';
          if (resourceName === 'dictionary') {
            apiCollectionName = 'dictionaries';
          }
          if (resourceName === 'activity') {
            apiCollectionName = 'activity';
          }
          return apiCollectionName;
        };
        helperHashApiRequests = function(resourceName, options) {
          var defaultOptions, filter, hashString, order, uids;
          defaultOptions = {
            offset: 0,
            limit: 300,
            filter: [],
            order: [],
            uids: []
          };
          _.extend(defaultOptions, options);
          filter = [];
          filter = _.sortBy(defaultOptions.filter, function(arr) {
            return arr[0] + arr[1] + [2];
          });
          order = [];
          order = _.sortBy(defaultOptions.order, function(arr) {
            return arr[0] + arr[1];
          });
          uids = [];
          uids = _.sortBy(defaultOptions.uids, function(uid) {
            return uid;
          });
          hashString = resourceName + defaultOptions.offset + defaultOptions.limit + JSON.stringify(filter) + JSON.stringify(order) + uids.join(',');
          return hashString;
        };
        helperUpdateResourcePool = function(resourcesArrayOrObject) {
          var item, mergeObjectWithRP, property, value, _i, _len, _results, _results1;
          mergeObjectWithRP = function(object) {
            if (_.isString(object['uid'])) {
              if (!_.isUndefined(resourcePool[object['uid']])) {
                return _.extend(resourcePool[object['uid']], object);
              } else {
                return resourcePool[object['uid']] = object;
              }
            }
          };
          if (_.isArray(resourcesArrayOrObject) && !_.isString(resourcesArrayOrObject)) {
            _results = [];
            for (_i = 0, _len = resourcesArrayOrObject.length; _i < _len; _i++) {
              item = resourcesArrayOrObject[_i];
              _results.push(helperUpdateResourcePool(item));
            }
            return _results;
          } else if (_.isObject(resourcesArrayOrObject)) {
            mergeObjectWithRP(resourcesArrayOrObject);
            _results1 = [];
            for (property in resourcesArrayOrObject) {
              value = resourcesArrayOrObject[property];
              if ((_.isArray(value) || _.isObject(value)) && !_.isString(value)) {
                _results1.push(helperUpdateResourcePool(value));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }
        };
        socket.on('resourcePut', function(data) {
          helperMeshResourceWithPool(data);
          return $rootScope.$broadcast('resourcePut', data);
        });
        socket.on('resourcePost', function(data) {
          helperMeshResourceWithPool(data);
          return $rootScope.$broadcast('resourcePost', data);
        });
        /*
        # Response Object
        */

        return factory = {
          get: function(resourceName, uids, query, callback) {
            var apiCollectionName, hashString;
            if (uids == null) {
              uids = [];
            }
            if (query == null) {
              query = {};
            }
            if (callback == null) {
              callback = null;
            }
            if (!helperValidateResource(resourceName)) {
              return;
            }
            apiCollectionName = helperGetCollectionName(resourceName);
            hashString = helperHashApiRequests(apiCollectionName, {
              offset: query.offset ? query.offset : 0,
              limit: query.limit ? query.limit : 300,
              filter: query.filter ? query.filter : [],
              order: query.order ? query.order : [],
              uids: uids
            });
            if (!_.isUndefined(resourcePoolResultCache[hashString])) {
              callback(resourcePoolResultCache[hashString].response, resourcePoolResultCache[hashString].responseRaw, true);
            }
            return socket.apiRequest('GET', '/' + apiCollectionName + '/' + uids.join(','), query, {}, function(response) {
              var responseRaw;
              responseRaw = JSON.stringify(response);
              if (!_.isObject(response) || _.isUndefined(response.code) || response.code !== 200) {
                callback(response, responseRaw, false);
                return;
              }
              if ((uids.length === 0) && !_.isArray(response.response.data) && _.isObject(response.response.data)) {
                response.response.data = [response.response.data];
              }
              helperUpdateResourcePool(response.response.data);
              resourcePoolResultCache[hashString] = {
                response: response,
                responseRaw: responseRaw
              };
              return callback(response, responseRaw, false);
            });
          },
          post: function(resourceName, objects, query, callback) {
            var apiCollectionName;
            if (!helperValidateResource(resourceName)) {
              return;
            }
            apiCollectionName = helperGetCollectionName(resourceName);
            return socket.apiRequest('POST', '/' + apiCollectionName, query, objects, function(response) {
              return callback(response);
            });
          },
          put: function(resourceName, uid, properties, query, callback) {
            var apiCollectionName;
            if (!helperValidateResource(resourceName)) {
              return;
            }
            apiCollectionName = helperGetCollectionName(resourceName);
            if (!_.isUndefined(resourcePool[uid])) {
              _.extend(resourcePool[uid], properties);
            }
            properties['uid'] = uid;
            return socket.apiRequest('PUT', '/' + apiCollectionName, query, properties, function(response) {
              if (callback) {
                return callback(response);
              }
            });
          },
          "delete": function(resourceName, uid, query, callback) {
            var apiCollectionName;
            if (!helperValidateResource(resourceName)) {
              return;
            }
            apiCollectionName = helperGetCollectionName(resourceName);
            if (!_.isUndefined(resourcePool[uid])) {
              resourcePool[uid].deletedAt = (new Date()).toString();
            }
            return socket.apiRequest('DELETE', '/' + apiCollectionName, query, uid, function(response) {
              return callback(response);
            });
          }
        };
      }
    ]);
  });

}).call(this);
