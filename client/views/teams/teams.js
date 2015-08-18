Template.teams.helpers({
    timeSinceUpdated: function() {
        return Session.get("timeSinceUpdated") || 'calculating...';
    },
    isUpdating: function() {
        return Session.get("isUpdating") || false;
    }
});

Template.teams.rendered = function() {
    console.log("teams rendered");
    Meteor.call("getTimeSinceLastUpdated", function(err, res) {
        if (moment(res).isValid()) {
            Session.set("timeSinceUpdated", moment(res).fromNow());
        } else {
            Session.set("timeSinceUpdated", res);
        }
    });
    Meteor.call("isUpdating", function(err, res) {
        Session.set("isUpdating", res);
    })
};

Template.teams.events({
    'click button': function() {
        Session.set("isUpdating", true);
        var teams = Teams.find().fetch();
        var teamCount = teams.length;
        var counter = 0;

        var teams = _.each(Teams.find().fetch(), function(team){
            var oldScore = team.score;
            console.log("Calling 'update' for "+team.name);
            Meteor.call("loadOneTeamData", team._id, function(err, res){
                console.log("Team: "+team.name);
                console.log("Old score: "+oldScore);
                console.log("New score: "+res);
                console.log();
                counter++;

                console.log("counter ="+counter);
                console.log("teamCount ="+teamCount);

                if (counter == teamCount) {
                    Session.set("isUpdating", false);
                    Session.set("timeSinceUpdated", moment(moment).fromNow());
                }
            });
        });
    }
});

Template.team.events({
    'click td': function() {
        Session.set("selectedTeam", this);
    }
});

Template.totals.helpers({
    selectedTeam: function() {
        return Session.get("selectedTeam");
    },

    chosenToggle: function() {
        if (Session.get("selectedTeam") === null)
            return ""
        return "col-md-6";
    }
});

Template.team.helpers({
    selectedTeam: function() {
        return Session.get("selectedTeam");
    }
});

Template.team_visi.events({
    'click button.btn-box-tool': function() {
        Session.set("selectedTeam", null);
    }
})
Template.team_visi.helpers({
    score: function() {
        return this.score;
    },
    goalie: function() {
        return _.sortBy(_.where(Session.get("selectedTeam").players, {
            position: "Goalkeeper"
        }), 'points').reverse()[0];
    },

    defenders: function() {
        var defenders = _.where(Session.get("selectedTeam").players, {
            position: "Defender"
        });
        var sortedDefenders = _.sortBy(defenders, 'points').reverse();
        return _.first(sortedDefenders, 4);
    },
    midfielders: function() {
        var midfielders = _.where(Session.get("selectedTeam").players, {
            position: "Midfielder"
        });
        var sortedMidfielders = _.sortBy(midfielders, 'points').reverse();
        return _.first(sortedMidfielders, 4);
    },
    forwards: function() {
        var forwards = _.where(Session.get("selectedTeam").players, {
            position: "Forward"
        });
        var sortedForwards = _.sortBy(forwards, 'points').reverse();
        return _.first(sortedForwards, 2);
    }
});

Template.detailed.helpers({
    gk: function() {
        var goalies = _.where(this.players, {
            position: "Goalkeeper"
        });
        var sortedGoalies = _.sortBy(goalies, 'points').reverse();
        return _.first(sortedGoalies);
    },

    defenders: function() {
        var defenders = _.where(this.players, {
            position: "Defender"
        });
        var sortedDefenders = _.sortBy(defenders, 'points').reverse();
        return _.first(sortedDefenders, 4);
    },

    midfielders: function() {
        var midfielders = _.where(this.players, {
            position: "Midfielder"
        });
        var sortedMidfielders = _.sortBy(midfielders, 'points').reverse();
        return _.first(sortedMidfielders, 4);
    },

    forwards: function() {
        var forwards = _.where(this.players, {
            position: "Forward"
        });
        var sortedForwards = _.sortBy(forwards, 'points').reverse();
        return _.first(sortedForwards, 2);
    }
});
