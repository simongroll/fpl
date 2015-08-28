// ***************************************************************
// STARTUP (Will run as soon as the DOM is ready)
// ***************************************************************

Meteor.startup(function() {

  Session.set("selectedTeam", null);

  Meteor.call("getCurrentGameweek", function(e,r){
    Session.set("maxGameweek", r);
    Session.set("gameweek", r);
  });

    // Meteor.call("loadTeamData", function(err, res) {
    //     if (err) console.log(err);
    //     else {
    //         console.log("Success!");
    //     }
    // });

});
