Meteor.startup(function() {
    Meteor.call("loadTeamData", function(err, res) {
        if (err) console.log(err);
        else {
            console.log("Success!");
        }
    });

    // SyncedCron.start();

});
