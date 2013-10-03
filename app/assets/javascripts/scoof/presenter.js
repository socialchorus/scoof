Scoof.Presenter = function(presented) {
  this.presented = presented || {};
  this.initialize();
  this.init();
};

Scoof.Presenter.prototype.initialize = function () {
  //Put your stuff here
};

Scoof.Presenter.prototype.init = function () {
  //Put your stuff here
};

Scoof.Presenter.extend = Backbone.Model.extend;

Scoof.Presenter.prototype.presentedToJSON = function () {
  var json;
  if (this.presented && this.presented.toJSON) {
    json = this.presented.toJSON();
  }
  return json || this.presented;
};

Scoof.Presenter.prototype.inclusions = function () {
  var inclusions = {};
  _.each(this.include || [], function (prop) {
     inclusions[prop] = this.inclusionFor(prop);
  }.bind(this));
  return inclusions;
};

Scoof.Presenter.prototype.inclusionFor = function (attr) {
  var prop = this[attr];
  return _.isFunction(prop) ? prop.bind(this)() : prop;
};

Scoof.Presenter.prototype.toJSON = function() {
  var base = this.presentedToJSON();
  var inclusions = this.inclusions();
  return _.extend(base, inclusions);
};

