Scoof.Events.Flasher = function (view) {
  this.view = view;
};

_.extend(Scoof.Events.Flasher.prototype, {
  subscribe: function () {
    Scoof.Events.subscribe('flash', this.perform, this);
  },

  perform: function (data) {
    this.view.model = data;
    this.view.show();
  }
});

Scoof.Events.Flasher.extend = Backbone.Model.extend;

