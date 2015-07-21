Meteor.methods({
    "getPlayerData": function(index) {
        try {
            //Get Player Data Function
            var response = HTTP.get('http://fantasy.premierleague.com/web/api/elements/'+index);

            Players.update({
              _id: index
            }, {
              photo: response.data.photo,
              position: response.data.type_name,
              team: response.data.team_name,
              points: response.data.total_points,
              name: response.data.first_name + ' ' + response.data.second_name,
              goals: response.data.goals,
              assists: response.data.assists,
              clean_sheets: response.data.clean_sheets,
              bonus: response.data.bonus,
              minutes: response.data.minutes,
              points_per_game: response.data.points_per_game,
              in_dream_team: response.data.in_dreamteam,
              yellows: response.data.yellow_cards,
              reds: response.data.red_cards,
              saves: response.data.saves
            }, {
              upsert: true
            })

        } catch (error) {
            console.log(error);

        }
    }
});
