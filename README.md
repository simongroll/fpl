# fpl

Config-driven Meteor.js project for viewing Fantasy Premier League auction.

Add your teams to *private/teams.json* in the format:

[
  {
    "name": "Team A Name",
    "manager": "Manager A Name",
    "players": [
      {"id":"1"},
      {"id":"2"},
      {"id":"3"},
      {"id":"4"},
      {"id":"5"},
      {"id":"6"},
      {"id":"7"},
      {"id":"8"},
      {"id":"9"},
      {"id":"10"},
      {"id":"11"}
    ]
  },
    {
    "name": "Team B Name",
    "manager": "Manager B Name",
    "players": [
      {"id":"12"},
      {"id":"13"},
      {"id":"14"},
      {"id":"15"},
      {"id":"16"},
      {"id":"17"},
      {"id":"18"},
      {"id":"19"},
      {"id":"20"},
      {"id":"21"},
      {"id":"22"}
    ]
  },
]

_"id"_ must correspond to the player's ID at: fantasy.premierleague.com/web/api/elements/1/
