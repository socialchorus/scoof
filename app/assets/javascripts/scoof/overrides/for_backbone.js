// We are overriding this part to spawn some pre-route events that we
// can hook into.
Backbone.Router.prototype.route =  function(route, name, callback) {
  Backbone.history || (Backbone.history = new Backbone.History);
  if (!_.isRegExp(route)) route = this._routeToRegExp(route);
  if (!callback) callback = this[name];
  Backbone.history.route(route, _.bind(function(fragment) {
    var args = this._extractParameters(route, fragment);

    // this is the line we are adding ...
    // it triggers a "route" event on the router instance
    this.trigger.apply(this, ['route', fragment, name, args]);

    callback && callback.apply(this, args);
    this.trigger.apply(this, ['route:' + name].concat(args));
    Backbone.history.trigger('route', this, name, args);
  }, this));
  return this;
};

Backbone.ajax = function() {
  var args = _.map(arguments, function(a) {
    return new Scoof.AuthTokenAdder(a).perform();
  });

  return Backbone.$.ajax.apply(Backbone.$, args);
};

