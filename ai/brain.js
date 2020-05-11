//===========================
// Import

// var test = require("./test");
var RiveScript = require('rivescript');
var bot = undefined;

//===========================
// Functions

module.exports.loading = function(){
    bot = new RiveScript();

    //Loading a directory and a file
    bot.loadDirectory("./ai/brain").catch(loading_error);
    bot.loadFile("./ai/brain/standard.rive");

    bot.sortReplies();
}

var loading_error = function(error){
    console.log("Error when loading files: " + error);
}

module.exports.response = function(username, message){
    bot.reply("local-user", message).then(function (reply){
        console.log(reply);
    });
}



// bot = test.loading();


// module.exports.load = function(){
//     test.loading();
// }





