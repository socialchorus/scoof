describe("Scoof.View", function() {
  var view;

  it('is a Backbone.View', function() {
    var ViewClass = Scoof.View.extend();
    view = new ViewClass();
    expect(view instanceof Backbone.View).toBe(true);
  });

  describe("rendering", function() {
    beforeEach(function() {
      var ViewClass = Scoof.View.extend({
        className: 'view-class',
        templateName: 'view_class'
      });

      HoganTemplates['view_class'] = {
        render: function() {
          return "<div class='view-class-inner'>{{foo}}</div>";
        }
      };

      view = new ViewClass();
    });

    describe("rendering the template", function() {
      beforeEach(function() {
        view.render();
      });

      it('renders via Backbone with the right class', function() {
        expect($(view.el).attr('class')).toBe('view-class');
      });

      it('renders the related Hogan template', function() {
        expect(view.$('.view-class-inner').length).toBe(1);
      });
    });

    describe('using the presenter', function() {
      beforeEach(function() {
        spyOn(view, 'presenter').and.returnValue({foo: 'bar'});
        spyOn(HoganTemplates['view_class'], 'render');
      });

      it('passes the presenter to HoganTemplates as the view model', function() {
        view.render();
        var mostRecentCall = HoganTemplates['view_class'].render.calls.mostRecent();
        expect(mostRecentCall.args[0]).toEqual({foo: 'bar'});
      });
    });

    describe('partials used', function() {
      var partials;

      beforeEach(function() {
        partials = {other_view: '<span class="other"></span>'};
        spyOn(view, 'partials').and.returnValue(partials);
        spyOn(HoganTemplates['view_class'], 'render');
      });

      it('passes the partials to HoganTemplates', function() {
        view.render();
        var mostRecentCall = HoganTemplates['view_class'].render.calls.mostRecent();
        expect(mostRecentCall.args[1]).toEqual(partials);
      });
    });
  });

  describe('presenter', function() {
    var ViewClass, MyPresenter;

    beforeEach(function() {
      MyPresenter = Backbone.Model.extend();
      spyOn(MyPresenter.prototype, 'initialize');
      spyOn(MyPresenter.prototype, 'toJSON').and.returnValue('myJSON');

      ViewClass = Scoof.View.extend({
        presenterClass: function() {
          return MyPresenter;
        }
      });
    });

    it('builds a presenter from the configured class, using the model',function(){
      var model = new Backbone.Model();
      view = new ViewClass({model: model});
      view.presenter();
      expect(MyPresenter.prototype.initialize.calls.mostRecent().args[0]).toEqual(model);
    });

    it('builds a presenter from the configured class, using the collection',function(){
      var collection = new Backbone.Collection();
      view = new ViewClass({collection: collection});
      view.presenter();
      expect(MyPresenter.prototype.initialize.calls.mostRecent().args[0]).toEqual(collection);
    });

    it('calls toJSON on the presenter and returns it', function() {
      view = new ViewClass();
      expect(view.presenter()).toEqual('myJSON');
    });
  });

  describe("Touch event overrides: ", function() {
    var ViewClass;

    beforeEach(function() {
      ViewClass = Scoof.View.extend({
        addListeners: {
          'click': 'onClick',
          'change input': 'onChange'
        },

        onClick: function () {},
        onChange: function () {}
      });
    });

    describe("when the device is touch base", function() {
      beforeEach(function() {
        spyOn(Scoof.Events, 'isTouch').and.returnValue(true);
        view = new ViewClass();
      });

      it("listens for 'touchstart' instead of 'click'", function() {
        expect(view.events()['click']).toEqual(undefined);
        expect(view.events()['touchstart']).toBe('onClick');
      });

      it("leaves other events unchanged", function() {
        expect(view.events()['change input']).toBe('onChange');
      });
    });

    describe('when the device is not touch', function () {
      beforeEach(function() {
        spyOn(Scoof.Events, 'isTouch').and.returnValue(false);
        view = new ViewClass();
      });

      it("leaves click events unchanged", function() {
        expect(view.events()['click']).toEqual('onClick');
      });

      it("leaves non-click events unchanged too", function() {
        expect(view.events()['change input']).toBe('onChange');
      });
    });
  });
});
