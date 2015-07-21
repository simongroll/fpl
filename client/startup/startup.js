// ***************************************************************
// STARTUP (Will run as soon as the DOM is ready)
// ***************************************************************

Meteor.startup(function () {

  for (var i = 1; i < 513; i++) {
      Meteor.call("getPlayerData", i, function(err) {
          if (err) {
              console.log("getPlayerData failed with index = " + i);
          }
      });
  };

});
