Scoof.View = Backbone.View.extend({
  addListeners: {},
  presenterClass: function () { return Scoof.DefaultPresenter; },

  render: function() {
    this.renderTemplate();
    this.afterRender();
  },

  afterRender: function() { /* template method hook ! */ },

  events: function() {
    if (!Scoof.Events.isTouch()) return this.addListeners;

    var eventSet = {};

    _.each(_.keys(this.addListeners), function(eventKey) {
      var key = eventKey.replace('click', Scoof.Events.startEvent);
      eventSet[key] = this.addListeners[eventKey];
    }.bind(this));

    return eventSet;
  },

  renderTemplate: function(){
    var template = HoganTemplates[this.templateName];
    var rendered = template.render(this.presenter(), this.partials());
    this.$el.html(rendered);
  },

  presenter: function() {
    var presented = this.model || this.collection || {};
    var presenter = new (this.presenterClass())(presented);
    return presenter.toJSON();
  },

  partials: function() {
    // override with own partials if necessary
    return {};
  }
});