Teams = new Meteor.Collection('teams');

// Allow and deny rules
Teams.allow({
  insert: function (userId, doc) {
    // Free-for-all!
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // Free-for-all!
    return true;
  },
  remove: function (userId, doc) {
    // Free-for-all!
    return true;
  }
});


Teams.helpers({

  best_xi_score: function() {

      var goalies = _.sortBy(_.where(this.players, {
          position: "Goalkeeper"
      }), 'points').reverse();
      var gk = goalies[0].points;

      var defenders = _.first((_.sortBy(_.where(this.players, {
          position: "Defender"
      }), 'points').reverse()), 4);
      var df = defenders[0].points + defenders[1].points + defenders[2].points + defenders[3].points;

      var midfielders = _.first((_.sortBy(_.where(this.players, {
          position: "Midfielder"
      }), 'points').reverse()), 4);
      var mf = midfielders[0].points + midfielders[1].points + midfielders[2].points + midfielders[3].points;

      var forwards = _.first((_.sortBy(_.where(this.players, {
          position: "Forward"
      }), 'points').reverse()), 4);
      var cf = forwards[0].points + forwards[1].points;

      return gk + df + mf + cf;
  },

      goalkeeper: function() {
        return _.sortBy(_.where(Session.get("selectedTeam").players, {
            position: "Goalkeeper"
        }), 'points').reverse()[0];
    }

});
