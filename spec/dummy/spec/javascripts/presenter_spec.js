describe("Scoof.Presenter", function() {
  var presenter;

  describe("default behavior", function() {
    describe("when not initialized with an object to present", function() {
      beforeEach(function() {
        presenter = new Scoof.Presenter();
      });

      it("toJSON retruns an empty object", function() {
        expect(presenter.toJSON()).toEqual({});
      });
    });

    describe("when initialized with something that converts to json", function() {
      var json;

      beforeEach(function() {
        json = { can: 'be jsoned'};
        presented = {
          toJSON: function () {
            return json;
          }
        };

        presenter = new Scoof.Presenter(presented);
      });

      it("return the json", function() {
        expect(presenter.toJSON()).toBe(json);
      });
    });

    describe("when initialized with a plain old json object", function() {
      var json;
      beforeEach(function() {
        json = {plain: 'old'};
      });

      it("returns the object", function() {
        presenter = new Scoof.Presenter(json);
        expect(presenter.toJSON()).toBe(json);
      });
    });
  });

  describe('extendability', function () {
    var PresenterClass, presenter;

    beforeEach(function() {
      PresenterClass = Scoof.Presenter.extend({
        scoof: function() {
          return 'SocialCoder OO FrontEnd';
        }
      });
    });

    it("gets it from Backbone", function() {
      presenter = new PresenterClass();
      expect(presenter.scoof()).toBe('SocialCoder OO FrontEnd');
    });
  });

  describe("added properties", function() {
    var PresenterClass, presenter, model, json;

    beforeEach(function() {
      PresenterClass = Scoof.Presenter.extend({
        include: ['scoof', 'scoff'],

        scoof: function() {
          return 'SocialCoder OO FrontEnd';
        },

        scoff: true
      });
    });

    describe("new attributes", function() {
      beforeEach(function() {
        model = {};
        presenter = new PresenterClass(model);
        json = presenter.toJSON();
      });

      it("adds things that are attributes", function() {
        expect(json.scoff).toBe(true);
      });

      it("adds things that are functions", function() {
        expect(json.scoof).toBe('SocialCoder OO FrontEnd');
      });
    });

    describe("overriden attributes", function() {
      beforeEach(function() {
        model = {scoff: 'not so much'};
        presenter = new PresenterClass(model);
        json = presenter.toJSON();
      });

      it("uses the included calculated values over the model values", function() {
        expect(json.scoff).toBe(true);
      });
    });
  });
});
