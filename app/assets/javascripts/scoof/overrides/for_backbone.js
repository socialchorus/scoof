Backbone.ajax = function() {
  var args = _.map(arguments, function(a) {
    return new Scoof.AuthTokenAdder(a).perform();
  });

  // TODO: wrap complete arguments to trigger global events

  return Backbone.$.ajax.apply(Backbone.$, args);
};

