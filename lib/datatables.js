TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Players = new Tabular.Table({
  name: "Players",
  collection: Players,
  columns: [
    {
      tmpl: Meteor.isClient && Template.player_photo
    },
    {data: "name", title: "Player"},
    {data: "team", title: "Team"},
    {data: "position", title: "Position"},
    {data: "points", title: "Points"}
  ]
});
