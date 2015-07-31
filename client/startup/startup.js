// ***************************************************************
// STARTUP (Will run as soon as the DOM is ready)
// ***************************************************************

Meteor.startup(function() {

  Session.set("selectedTeam", null);

    // Meteor.call("loadTeamData", function(err, res) {
    //     if (err) console.log(err);
    //     else {
    //         console.log("Success!");
    //     }
    // });

});
