// Backbone does not send model data with delete requests ...
// which means the authenticity token does not go there either.
// It sucks, but we unpack the data before each request, and send the
// token along

Scoof.AuthTokenAdder = function (args) {
  this.args = args;
  this.type = args.type.toLowerCase();
  this.data = _.clone(args.data || {});
  this.authenticityToken = $('meta[name="csrf-token"]').attr('content');
};

Scoof.AuthTokenAdder.prototype.perform = function () {
  this.handlePostPutPatch();
  this.handleDelete();
  return this.args;
};

Scoof.AuthTokenAdder.prototype.handleDelete = function () {
  if ( this.type != 'delete' ) { return; }

  this.args.url = this.args.url +
    "?authenticity_token=" +
    encodeURIComponent(this.authenticityToken);
};

Scoof.AuthTokenAdder.prototype.handlePostPutPatch = function () {
  if ( this.type != 'post' && this.type != 'put' && this.type != 'patch' ) { return; }

  if ( _.isString(this.data) ) {
    this.repackageStringData();
  }

  this.addAuthToken();
};

Scoof.AuthTokenAdder.prototype.repackageStringData = function () {
  this.data = JSON.parse(this.data);
};

Scoof.AuthTokenAdder.prototype.addAuthToken = function () {
  data = _.extend(this.data, {authenticity_token: this.authenticityToken});
  this.args.data = this.data = JSON.stringify(data);
}
