Scoof.Events = {
  isTouch: function() {
    // taken from modernize
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  },
  startEvent: 'touchstart'
};
