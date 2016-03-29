// Fixture data
if (Articles.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var test1Id = Meteor.users.insert({
    profile: { name: 'Test1' }
  });
  var test1 = Meteor.users.findOne(test1Id);
  var test2Id = Meteor.users.insert({
    profile: { name: 'Test2' }
  });
  var test2 = Meteor.users.findOne(test2Id);

  Articles.insert({
    title: 'Hello Meteor',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate leo faucibus dui gravida, sit amet ornare leo posuere. Suspendisse potenti. Phasellus nisi nibh, venenatis nec nisi at, tincidunt eleifend justo. Nunc id nisi et elit maximus mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla nec viverra sapien, in pellentesque sapien. Aenean accumsan hendrerit mauris, in suscipit lectus varius et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed in felis tempus, dapibus magna ut, consequat tellus. Ut erat nisl, porttitor a sem in, pellentesque porttitor turpis. Nam dui augue, ultricies in ultricies at, pretium sed turpis. Sed scelerisque vitae nunc non dignissim. Integer lectus orci, laoreet quis vehicula sed, tempus nec libero. Cras quis magna ante. Donec dapibus justo libero, id semper libero dignissim ac. Duis condimentum, leo mollis pellentesque gravida, lacus erat mollis erat, sit amet posuere sapien nulla non ipsum. Morbi quis bibendum ante. Pellentesque eu semper orci. Fusce dignissim sem ac fringilla pulvinar. Praesent sit amet enim vel orci mollis pharetra id scelerisque ante. Phasellus vel leo in elit tempor sodales sed a sapien.',
    userId: test2._id,
    author: test2.profile.name,
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Articles.insert({
    title: 'Hello JavaScript',
    body: 'Vivamus pulvinar massa in odio finibus ornare. Donec semper lorem sit amet lacinia suscipit. Ut nec dolor luctus, semper ipsum et, tempus arcu. Nullam efficitur faucibus eros, non pellentesque lorem porta vel. Nulla aliquet aliquet leo, mattis vestibulum massa convallis efficitur. Aliquam erat volutpat. Vivamus tempus ullamcorper est, eget vehicula ipsum iaculis ut. Pellentesque ullamcorper a mi eget fringilla. Etiam leo metus, finibus eget finibus tincidunt, tempus nec odio. Maecenas commodo dapibus libero, in ornare felis pellentesque eu. Maecenas vulputate, est a ultrices volutpat, urna enim imperdiet dui, sed sagittis urna nibh a dolor. Suspendisse potenti. Morbi luctus arcu vel risus rhoncus dapibus. Proin eu nulla ac sem bibendum faucibus ut eget velit. Nulla eleifend viverra velit, vel feugiat ligula. Integer molestie varius tortor vitae porta. Vivamus quis elit a justo maximus sollicitudin. Praesent vitae condimentum justo, eu placerat augue. Nullam consectetur, sem non semper lobortis, augue nibh maximus purus, in varius libero nisl et est. Fusce convallis metus lorem, vitae consequat sapien placerat fringilla. Cras et lacus a elit consequat egestas et mattis arcu. Quisque id laoreet erat.',
    userId: test1._id,
    author: test1.profile.name,
    submitted: new Date(now - 10 * 3600 * 1000)
  });

  Articles.insert({
    title: 'Hello css',
    body: 'This is my css hello world article.',
    userId: test1._id,
    author: test1.profile.name,
    submitted: new Date(now - 12 * 3600 * 1000)
  });
}

Tasks.insert({
  name: 'Tasks1',
  status: 'To do',
  userId: '536AZswsijHRJjq4M'
});

Tasks.insert({
  name: 'Tasks2',
  status: 'To do',
  userId: '536AZswsijHRJjq4M'
});