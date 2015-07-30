Meteor.methods({
    "getPlayerData": function(index) {
        try {
            var response = HTTP.get('http://fantasy.premierleague.com/web/api/elements/' + index);

            var fplTeamCode = Players.findOne(index).fplTeamCode || null;

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
                saves: response.data.saves,
                fpl_team: fplTeamCode
            }, {
                upsert: true
            });

        } catch (error) {;
            console.log(error);
        }
    },

    "loadTeamData": function() {
        try {

            var teams = Teams.find().fetch();

            _.each(teams, function(team) {

                var score = 0,
                    players = team.players;

                _.each(team.players, function(player, index) {

                    var response = HTTP.get('http://fantasy.premierleague.com/web/api/elements/' + player.id);
                    score += response.data.total_points;

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
                            'players.$.saves': response.data.saves
                        }
                    });

                }); // /each player

                Teams.update({
                    "_id": team._id
                }, {
                    $set: {
                        score: score
                    }
                });

            }); // /each team

        } catch (error) {
            console.log(error);
        }
    }
});
