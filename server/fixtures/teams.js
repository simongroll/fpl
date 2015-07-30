if (Teams.find().count() === 0) {
    console.log("Importing private/teams.json to db")

    var data = JSON.parse(Assets.getText("teams.json"));

    data.forEach(function(item, index, array) {
        Teams.insert(item);
    });
}
