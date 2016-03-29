Articles = new Mongo.Collection('articles');

validateArticle = function (article) {
  var errors = {};
  if (!article.title)
    errors.title = "Please enter a title";
  if (!article.body)
    errors.body =  "Please enter a body";
  return errors;
}

Meteor.methods({
  createArticle: function(articleAttributes) {
    check(Meteor.userId(), String);
    check(articleAttributes, {
      title: String,
      body: String
    });

    var errors = validateArticle(articleAttributes);
    if (errors.title || errors.body)
      throw new Meteor.Error('invalid-article', "You must set a title and a body for your article");
    
    var user = Meteor.user();
    var article = _.extend(articleAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0
    });
    var articleId = Articles.insert(article);
    return {
      _id: articleId
    };
  }
});