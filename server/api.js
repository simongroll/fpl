Meteor.methods({
    "getPlayerData": function(index) {
        try {
            var response = HTTP.get('http://fantasy.premierleague.com/web/api/elements/' + index);

            console.log(response.data.first_name + " " + response.data.web_name + "," + response.data.id);

            // var fplTeamCode = Players.findOne(index).fplTeamCode || null;

            Players.update({
                _id: index
            }, {
                photo: response.data.photo,
                position: response.data.type_name,
                team: response.data.team_name,
                points: response.data.total_points,
                name: response.data.first_name + ' ' + response.data.web_name,
                goals: response.data.goals,
                assists: response.data.assists,
                clean_sheets: response.data.clean_sheets,
                bonus: response.data.bonus,
                minutes: response.data.minutes,
                points_per_game: response.data.points_per_game,
                in_dream_team: response.data.in_dreamteam,
                yellows: response.data.yellow_cards,
                reds: response.data.red_cards,
                saves: response.data.saves //,
                    // fpl_team: fplTeamCode
            }, {
                upsert: true
            });

        } catch (error) {;
            console.log(error);
        }
    },

    "loadTeamData": function() {
        currentlyUpdating = true;
        try {

            var teams = Teams.find().fetch();

            _.each(teams, function(team) {

                Meteor.call("loadOneTeamData", team_.id, function(err, res) {
                    if (err) console.log("Error updating: " + team.name)
                    else console.log(team.name + " updated");
                });

            }); // /each team

        } catch (error) {
            console.log(error);
        }

        currentlyUpdating = false;
        timeSinceLastUpdated = moment();
    },

    "loadOneTeamData": function(teamId) {
        currentlyUpdating = true;
        try {
            var team = Teams.findOne(teamId);

            var players = team.players;

            _.each(team.players, function(player, index) {

                var response = HTTP.get('http://fantasy.premierleague.com/web/api/elements/' + player.id);

                var GW = [];
                _.each(response.data.fixture_history.all, function(gw, index) {
                    GW.push({
                        i: index,
                        score: gw[gw.length - 1]
                    });
                });

                Teams.update({
                    "_id": team._id,
                    'players.id': player.id
                }, {
                    "$set": {
                        'players.$.points': response.data.total_points,
                        'players.$.photo': response.data.photo,
                        'players.$.position': response.data.type_name,
                        'players.$.team': response.data.team_name,
                        'players.$.name': response.data.first_name + ' ' + response.data.web_name,
                        'players.$.goals': response.data.goals,
                        'players.$.assists': response.data.assists,
                        'players.$.clean_sheets': response.data.clean_sheets,
                        'players.$.bonus': response.data.bonus,
                        'players.$.minutes': response.data.minutes,
                        'players.$.points_per_game': response.data.points_per_game,
                        'players.$.in_dream_team': response.data.in_dreamteam,
                        'players.$.yellows': response.data.yellow_cards,
                        'players.$.reds': response.data.red_cards,
                        'players.$.saves': response.data.saves,
                        'players.$.gameweeks': GW
                    }
                });

            }); // /each player
            var goalies = _.sortBy(_.where(team.players, {
                position: "Goalkeeper"
            }), 'points').reverse();
            var gk = goalies[0].points;

            var defenders = _.first((_.sortBy(_.where(team.players, {
                position: "Defender"
            }), 'points').reverse()), 4);
            var df = defenders[0].points + defenders[1].points + defenders[2].points + defenders[3].points;

            var midfielders = _.first((_.sortBy(_.where(team.players, {
                position: "Midfielder"
            }), 'points').reverse()), 4);
            var mf = midfielders[0].points + midfielders[1].points + midfielders[2].points + midfielders[3].points;

            var forwards = _.first((_.sortBy(_.where(team.players, {
                position: "Forward"
            }), 'points').reverse()), 4);
            var cf = forwards[0].points + forwards[1].points;

            var newScore = gk + df + mf + cf;
            console.log(team.name);
            console.log("gk = " + gk);
            console.log("df = " + df);
            console.log("mf = " + mf);
            console.log("cf = " + cf);
            console.log("new score = " + newScore);

            Teams.update({
                "_id": team._id
            }, {
                $set: {
                    score: newScore
                }
            });

            return newScore;

        } catch (error) {
            console.log(error);
        }

    },

    "getTimeSinceLastUpdated": function() {
        return timeSinceLastUpdated;
    },
    "isUpdating": function() {
        return currentlyUpdating;
    }
});
