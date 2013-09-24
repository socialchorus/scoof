describe("Scoof", function() {
  describe("add", function() {
    var app;
    beforeEach(function() {
      Scoof._apps = []; // clear the app state
      Scoof.subscriptions = {
        redirect: jasmine.createSpy('redirect callback'),
        flash: jasmine.createSpy('flash callback')
      };

      spyOn(Backbone.history, 'start');
      spyOn(Scoof.Events, 'subscribe');

      app = {my: 'app'};
    });

    it("will add an app to the array", function() {
      Scoof.add(app);
      expect(_.include(Scoof.apps(), app)).toBe(true);
    });

    it("will not add the app if it is already there", function() {
      Scoof.add(app);
      Scoof.add(app);
      expect(Scoof.apps().length).toBe(1);
    });

    describe('starting services', function () {
      it("will start services if this is the first app", function() {
        Scoof.add(app);
        expect(Backbone.history.start).toHaveBeenCalled();
        var subscriptions = Scoof.Events.subscribe.calls
        expect(subscriptions.argsFor(0)[0]).toBe('redirect');
        expect(subscriptions.argsFor(1)[0]).toBe('flash');
      });
    });
  });
});
