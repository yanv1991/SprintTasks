Template.tasksList.helpers({
  tasks: function(status) {
    var userId = (Meteor.user()) ? Meteor.user()._id : String.Empty;
    var tasks = Tasks.find({userId: userId, status: status});
    Session.set(status, tasks.fetch());
    return Session.get(status);
  }
});
Template.tasksList.onRendered(function(){
  drake = dragula([document.querySelector('#todoPanel'), document.querySelector('#inProgressPanel'), 
    document.querySelector('#qaPanel'), document.querySelector('#atPanel'), document.querySelector('#donePanel')], {
    moves: function (el, source, handle, sibling) {
      return el.className !== 'panelTitle';
    }, 
    revertOnSpill: true,
  });
  drake.on("drop", function(el, target, source, sibling){
      if(sibling && sibling.className === 'panelTitle'){
        drake.cancel();
      } else {
        var task = Blaze.getData(el);
        var id = task._id;
        delete task['_id'];
        task.status = $(target).attr("data-status");
        Tasks.update(id, {$set: task}, function(error) {
          if (error) {
            // display the error to the user
            throwError(error.reason);
          }
        });
      }
  });
});

Template.tasksList.events({
  'click #addTask': function(e) {
    e.preventDefault();

    var task = {
      name: $("#taskName").val(),
    };

    Meteor.call('addTask', task, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      $("#taskName").val("");
    });
  }
});

Template.tasksList.events({
  'click #sortTodo': function(e, template) {
    e.preventDefault();
    var tasks = Session.get("T");
    var type = $(e.currentTarget).attr("data-sort");
    if(type === "asc"){
      tasks = tasks.sort(naturalSort);
      Session.set("T", tasks);
      $(e.currentTarget).attr("data-sort", "desc");
    } else{
      tasks = tasks.sort(naturalSort).reverse();
      Session.set("T", tasks);
      $(e.currentTarget).attr("data-sort", "asc");
    }
  }
});