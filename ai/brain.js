//===========================
// Import

// var test = require("./test");
var RiveScript = require('rivescript');
var bot = undefined;

//===========================
// Functions

function loadingDone() {
    console.log("Success Loading\n");
    bot.sortReplies();
    response("local-user", "hello");
}

function loadingError(error) {
    console.log("Failed Loading: " + error);
}

module.exports.loading = function(){
    bot = new RiveScript();

    //Loading a directory and a file
    bot.loadDirectory("./ai/brain").then(loadingDone).catch(loadingError);

    bot.loadFile("./ai/brain/standard.rive");
}

var response = function(username, message){
    bot.reply(username, message).then(function (reply){
        console.log(reply);
    });
}

// bot = test.loading();


// module.exports.load = function(){
//     test.loading();
// }





