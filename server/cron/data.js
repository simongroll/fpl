SyncedCron.add({
    name: 'Get Fresh Player Data',
    schedule: function(parser) {
        return parser.text("every 24 hours");
    },
    job: function() {

        for (var i = 1; i < 513; i++) {
            Meteor.call("getPlayerData", i, function(err) {
                if (err) {
                    console.log("getPlayerData failed with index = " + i);
                }
            });
        };


    }
});
