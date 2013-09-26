Scoof.View = Backbone.View.extend({
  addListeners: {},
  presenterClass: function () { return Scoof.Presenter; },

  initialize: function (opts) {
    opts = opts || {};
    this.parent = opts.parent;
    this.attachmentMethod = opts.attachmentMethod || 'append';
    this.init();
  },

  init: function () {
    // override in classes
  },

  render: function() {
    this.renderTemplate();
    this.attachToParent();
    this.afterRender();
  },

  attachToParent: function () {
    var $parent = new Scoof.View.ParentFinder(
      this.parent, this.parentSelector, this.attachmentMethod
    ).perform();
    $parent && $parent[this.attachmentMethod](this.el);
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
    if (!template) {return;}
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
