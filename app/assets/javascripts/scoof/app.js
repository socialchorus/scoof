Scoof.App = function() {};
Scoof.App.extend = Backbone.Model.extend;

_.extend(Scoof.App.prototype, {
  start: function () {
    // add self to Scoof
    // do starting code
  },

  stop: function () {
    // remove from Scoof
  },
});
