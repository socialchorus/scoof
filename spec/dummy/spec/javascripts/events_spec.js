describe("Scoof.Events", function() {
  describe("publish", function() {
    it("triggers an event on the publisher", function() {
      spyOn(Scoof.Events.publisher, 'trigger');
      var args = {};
      var event = 'publication:yo';

      Scoof.Events.publish(event, args);

      expect(Scoof.Events.publisher.trigger).toHaveBeenCalledWith(
        event, args
      );
    });
  });

  describe("subscribe", function() {
    it("calls the callback when the event is triggered", function() {
      var sentMessage;
      var context = {
        foo: function(message) {
          sentMessage = message;
        }
      };

      Scoof.Events.subscribe('flash', function(message) { this.foo(message) }, context);

      Scoof.Events.publish('flash', 'do it again some more!');
      expect(sentMessage).toBe('do it again some more!');
    });
  });

  describe("isWindowsTouch", function(){
    it("should return true for a Windows device", function() {
      navigator.__defineGetter__('userAgent', function(){
        return '("Mozilla/5.0 (Windows NT 6.2; WOW64) Chrome(29.0.1547)")'; // customized user agent
      });
      expect(Scoof.Events.isWindowsTouch()).toEqual(true);
      navigator.__defineGetter__('userAgent', function(){
        return ''; // decustomize for other tests
      });
    })
  });
});
