describe("Scoof.Events.Flasher", function() {
  var view, flasher;

  beforeEach(function() {
    view = new Scoof.View();
    view.show = jasmine.createSpy('show the flash');
    flasher = new Scoof.Events.Flasher(view);
  });

  describe("flash events", function() {
    var data;
    beforeEach(function() {
      data = {message: 'yay!'};
      flasher.subscribe();
      Scoof.Events.publish('flash', data);
    });

    it("sets the model", function() {
      expect(flasher.view.model).toEqual(data);
    });

    it("calls show on the flash", function() {
      expect(view.show).toHaveBeenCalled();
    });
  });
});
