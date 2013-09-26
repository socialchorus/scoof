describe("Scoof.Presenter.Collection", function(){
  var collection, collectionPresenter;
  beforeEach(function() {
    collection = new Backbone.Collection([{berkin: 'berkin'}, {flerbin: 'flerbin'}])
    collectionPresenter = new Scoof.Presenter.Collection(collection)
    collectionPresenter.name = "kilroy"
  });
  it("takes a collection and makes it a json hash with the key as name",
    function(){
      expect(collectionPresenter.presentedToJSON())
        .toEqual({kilroy: collection.toJSON()})
    });
})