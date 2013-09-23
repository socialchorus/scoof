Backbone.ajax = function() {
  // adds the authenticity token
  var args = _.map(arguments, function(a) {
    return new Scoof.AuthTokenAdder(a).perform();
  });

  // reads events from data, and does a global publish
  var args = _.map(args, function(a) {
    return new Scoof.GlobalPublisherAdder(a).perform();
  });

  return Backbone.$.ajax.apply(Backbone.$, args);
};

