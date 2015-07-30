Template.detailed.helpers({
    gk: function() {
      var goalies = _.where(this.players, {position: "Goalkeeper"});
      var sortedGoalies = _.sortBy(goalies, 'points').reverse();
      return _.first(sortedGoalies);
    },

    defenders: function () {
      var defenders = _.where(this.players, {position: "Defender"});
      var sortedDefenders = _.sortBy(defenders, 'points').reverse();
      return _.first(sortedDefenders, 4);
    },

    midfielders: function () {
      var midfielders = _.where(this.players, {position: "Midfielder"});
      var sortedMidfielders = _.sortBy(midfielders, 'points').reverse();
      return _.first(sortedMidfielders, 4);
    },

    forwards: function () {
      var forwards = _.where(this.players, {position: "Forward"});
      var sortedForwards = _.sortBy(forwards, 'points').reverse();
      return _.first(sortedForwards, 2);
    },

    total: function () {

      var goalies = _.sortBy(_.where(this.players, {position: "Goalkeeper"}), 'points').reverse();
      var gk = goalies[0].points;

      var defenders = _.first((_.sortBy( _.where(this.players, {position: "Defender"}), 'points').reverse()), 4);
      var df = defenders[0].points + defenders[1].points + defenders[2].points + defenders[3].points;

      var midfielders = _.first((_.sortBy( _.where(this.players, {position: "Midfielder"}), 'points').reverse()), 4);
      var mf = midfielders[0].points + midfielders[1].points + midfielders[2].points + midfielders[3].points;

      var forwards = _.first((_.sortBy( _.where(this.players, {position: "Forward"}), 'points').reverse()), 4);
      var cf = forwards[0].points + forwards[1].points;

      return gk + df + mf + cf;
    }
});
