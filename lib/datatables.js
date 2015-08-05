TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Players = new Tabular.Table({
  name: "Players",
  collection: Players,

  autoWidth: false,
  pageLength: 100,
  lengthMenu: [10, 20, 100],

  columns: [
    // {
    //   tmpl: Meteor.isClient && Template.player_photo
    // },
    {data: "_id", title: "ID"},
    {data: "name", title: "Player"},
    {data: "team", title: "Team"},
    {data: "position", title: "Position"},
    {data: "points", title: "Points"}
  ]
});
