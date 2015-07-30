Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('team', function(id) {
  return Teams.find(id);
});
