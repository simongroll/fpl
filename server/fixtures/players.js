// Meteor.startup(function() {

//     var max_id = 533;

//     if (Players.find().count() === 0) {
//         for (var i = 1; i < max_id + 1; i++) {
//             Meteor.call("getPlayerData", i, function(err) {
//                 if (err) {
//                     console.log("getPlayerData failed with index = " + i);
//                 }
//             });
//         }
//     }
// });
