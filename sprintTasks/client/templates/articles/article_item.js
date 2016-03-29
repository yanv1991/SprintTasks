Template.articleItem.helpers({
  ownArticle: function() {
    return this.userId === Meteor.userId();
  }
});