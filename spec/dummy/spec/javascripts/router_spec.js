describe("Scoof.Router", function() {
  it("is a Backbone.Router", function() {
    expect(new Scoof.Router() instanceof Backbone.Router).toBe(true);
  });

  describe("page", function() {
    var router;

    beforeEach(function() {
      pageView = new Scoof.View({el: $('<div id="content"><span></span></div>')});
      router = new Scoof.Router(pageView);
    });

    it("clears the #content div of existing content", function() {
      router.page();
      expect(pageView.$('span').length).toBe(0);
    });

    it("renders view passed in", function() {
      var ViewClass = Scoof.View.extend();
      var view = new ViewClass();
      spyOn(view, 'render');

      router.page(view);
      expect(view.render).toHaveBeenCalled();
    });
  });

  describe("render", function() {
    var router;

    beforeEach(function() {
      pageView = new Scoof.View({el: $('<div id="content"><span></span></div>')});
      router = new Scoof.Router(pageView);
    });

    it("renders view passed in", function() {
      var ViewClass = Scoof.View.extend();
      var view = new ViewClass();
      spyOn(view, 'render');

      router.render(view);
      expect(view.render).toHaveBeenCalled();
    });
  });

  describe("going to a route", function() {
    var router, RouterClass;

    beforeEach(function() {
      Backbone.history.start();

      RouterClass = Scoof.Router.extend({
        routes: {
          '*wildcard': 'something'
        },

        something: jasmine.createSpy('router#something')
      });

      router = new RouterClass();
    });

    afterEach(function () {
      Backbone.history.stop();
    });

    it("triggers a route:start event", function() {
      var eventCallback = jasmine.createSpy('route:start callback');
      router.on('route:start', eventCallback);

      router.navigate('#somewhere', {trigger: true});
      expect(eventCallback).toHaveBeenCalled();
    });

    it("calls the original function", function() {
      router.navigate('#somewhere-else', {trigger: true});
      expect(router.something).toHaveBeenCalled();
    });
  });
});
