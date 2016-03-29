//Base controller.
UserController = RouteController.extend({  
    onBeforeAction: function () {            
        //Authenticate the user.
        if (! Meteor.user()) {
          if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
          } else {
            this.render('accessDenied');
          }
        } else {
          this.layout('layout');
          this.next();
        }
    }
}); 

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('articles');
  }
});


Router.route('/', {name: 'articleList'});
Router.route('/articles/:_id', {
  name: 'articleItem',
  data: function() { return Articles.findOne(this.params._id); }
});


Router.route('/createArticle', {
  name: 'createArticle',
  controller: UserController.extend({
    template: 'createArticle',
  })
});
Router.route('/tasks', {
  name: 'dragList',
  waitOn: function() {
    return Meteor.subscribe('tasks');
  },
  controller: UserController.extend({
    template: 'dragList',
  })
});

Router.onBeforeAction('dataNotFound', {only: 'articleItem'});