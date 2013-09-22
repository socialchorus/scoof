Scoof.Events = {
  isTouch: function() {
    // taken from modernize
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  },

  startEvent: 'touchstart',

  publisher: _.extend({}, Backbone.Events),

  publish: function (event, args) {
    this.publisher.trigger(event, args);
  },

  subscribe: function (event, callback, context) {
    this.publisher.on(event, callback, context);
  }
};
