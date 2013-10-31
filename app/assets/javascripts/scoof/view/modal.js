Scoof.View.Modal = Scoof.View.extend({
  templateName: 'modals/base',
  parentSelector: "#overlay-container",

  render: function() {
    Scoof.View.prototype.render.call(this);
    var pageHeight = $('body').css('height');
    $('#overlay').css('height', pageHeight);
  }
});