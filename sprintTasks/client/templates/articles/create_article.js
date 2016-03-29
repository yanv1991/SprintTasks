Template.createArticle.onCreated(function() {
  Session.set('postSubmitErrors', {});
});
Template.createArticle.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.createArticle.events({
  'submit form': function(e) {
    e.preventDefault();

    var article = {
      title: $(e.target).find('[name=title]').val(),
      body: $(e.target).find('[name=body]').val()
    };

    var errors = validateArticle(article);
    if (errors.title || errors.body)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('createArticle', article, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      Router.go('articleItem', {_id: result._id});
    });
  }
});