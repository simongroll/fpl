Router.map(function() {
    this.route('players', {
        template: 'players',
        path: '/',
        waitOn: function() {
            return Meteor.subscribe('players');
        },
        data: {
            players: function() {
                return Players.find();
            }
        }
    });
});
