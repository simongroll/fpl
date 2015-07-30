Router.map(function() {

    // Players
    this.route('players', {
        template: 'players',
        path: '/players',
        waitOn: function() {
            return Meteor.subscribe('players');
        },
        data: {
            players: function() {
                return Players.find();
            }
        }
    });

    // Teams
    this.route('teams', {
        template: 'teams',
        path: '/',
        waitOn: function() {
            return Meteor.subscribe('teams');
        },
        data: {
            teams: function() {
                return Teams.find({}, {
                    sort: {
                        score: -1
                    }
                });
            }
        }
    });
});
