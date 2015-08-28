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
    'click button#update': function() {
        Session.set("isUpdating", true);
        var teams = Teams.find().fetch();
        var teamCount = teams.length;
        var counter = 0;

        var teams = _.each(Teams.find().fetch(), function(team) {
            var oldScore = team.score;
            console.log("Calling 'update' for " + team.name);
            Meteor.call("loadOneTeamData", team._id, function(err, res) {
                console.log("Team: " + team.name);
                console.log("Old score: " + oldScore);
                console.log("New score: " + res);
                console.log();
                counter++;

                console.log("counter =" + counter);
                console.log("teamCount =" + teamCount);

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

// Template.gameweeks.rendered = function() {
//     if (this.data.teams().fetch()[0].players[0].gameweeks){
//         var maxGameweek = this.data.teams().fetch()[0].players[0].gameweeks.length;
//         Session.set("gameweek", maxGameweek);
//         Session.set("maxGameweek", maxGameweek);
//     }
// };

Template.gameweeks.events({
    'click button.change-gameweek': function(evt) {
        Session.set("gameweek", evt.target.innerText);
    }
});

Template.gameweeks.helpers({
    currentGameweek: function() {
        return Session.get("gameweek");
    },
    changeGameweekButtons: function() {
        var maxGameweek = Session.get("maxGameweek");
        var currentGameweek = Session.get("gameweek");
        var buttonHTML = "";
        for (var i = 1; i < maxGameweek + 1; i++) {
            if (i === currentGameweek) {
            buttonHTML += '<button type="button" class="btn btn-info btn-flat change-gameweek">' + i + '</button>';
            }
            else {
            buttonHTML += '<button type="button" class="btn btn-default btn-flat change-gameweek">' + i + '</button>';
            }
        };
        return buttonHTML;
    },
    gk: function() {
        var goalies = _.where(this.players, {
            position: "Goalkeeper"
        });
        var sortedGoalies = _.sortBy(goalies, 'points').reverse();

        var goalie = _.first(sortedGoalies);
        var gw = Session.get("gameweek");
        return {
            name: goalie.name,
            points: goalie.gameweeks[gw - 1].score
        };
    },

    defenders: function() {
        var defenders = _.where(this.players, {
            position: "Defender"
        });
        var sortedDefenders = _.sortBy(defenders, 'points').reverse();

        var df = [];
        var gw = Session.get("gameweek");

        _.each(_.first(sortedDefenders, 4), function(defender) {
            df.push({
                name: defender.name,
                points: defender.gameweeks[gw - 1].score
            });
        })
        return df;
    },

    midfielders: function() {
        var midfielders = _.where(this.players, {
            position: "Midfielder"
        });
        var sortedMidfielders = _.sortBy(midfielders, 'points').reverse();

        var mf = [];
        var gw = Session.get("gameweek");

        _.each(_.first(sortedMidfielders, 4), function(midfielder) {
            if (midfielder.gameweeks[gw - 1]) {

                mf.push({
                    name: midfielder.name,
                    points: midfielder.gameweeks[gw - 1].score
                });
            } else {
                mf.push({
                    name: midfielder.name,
                    points: 0
                });
            }
        })
        return mf;
    },

    forwards: function() {
        var forwards = _.where(this.players, {
            position: "Forward"
        });

        var cf = [];
        var gw = Session.get("gameweek");

        _.each(_.first(_.sortBy(forwards, 'points').reverse(), 2), function(forward) {
            cf.push({
                name: forward.name,
                points: forward.gameweeks[gw - 1].score
            });
        });
        return cf;
    },

    gameweekTotal: function() {
        var gw = Session.get("gameweek");

        var goalies = _.where(this.players, {
            position: "Goalkeeper"
        });
        var sortedGoalies = _.sortBy(goalies, 'points').reverse();
        var goalie = _.first(sortedGoalies);
        var gkScore = goalie.gameweeks[gw - 1].score;

        var defenders = _.where(this.players, {
            position: "Defender"
        });
        var sortedDefenders = _.sortBy(defenders, 'points').reverse();
        var dfScore = 0;
        _.each(_.first(sortedDefenders, 4), function(defender) {
            if (defender.gameweeks[gw - 1]) {
                dfScore += defender.gameweeks[gw - 1].score;
            }
        });

        var midfielders = _.where(this.players, {
            position: "Midfielder"
        });
        var sortedMidfielders = _.sortBy(midfielders, 'points').reverse();
        var mfScore = 0;
        _.each(_.first(sortedMidfielders, 4), function(midfielder) {
            if (midfielder.gameweeks[gw - 1]) {
                mfScore += midfielder.gameweeks[gw - 1].score
            }
        });

        var forwards = _.where(this.players, {
            position: "Forward"
        });
        var cfScore = 0;
        _.each(_.first(_.sortBy(forwards, 'points').reverse(), 2), function(forward) {
            if (forward.gameweeks[gw - 1]) {
                cfScore += forward.gameweeks[gw - 1].score;
            }
        });


        return gkScore + dfScore + mfScore + cfScore;
    }
});
