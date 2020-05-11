//===========================
// Import

// var test = require("./test");
var RiveScript = require('rivescript');
var bot = undefined;

//===========================
// Functions

function loadingDone(files) {
    console.log("ok");
    bot.sortReplies();
    bot.reply("local-user", "Hello").then((reply) => {
        console.log(reply)
    });
}

function loadingError(files, error) {
    console.log("error");
}

module.exports.loading = function(){
    bot = new RiveScript();

    //Loading a directory and a file
    bot.loadDirectory("./ai/brain").then(loadingDone).catch(loadingError);

    bot.loadFile("./ai/brain/standard.rive");
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





