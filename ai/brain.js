//===========================
// Import

// var test = require("./test");
var RiveScript = require('rivescript');
// var bot = undefined;

//===========================
// Functions

// function loadingDone() {
//     console.log("Success Loading\n");
//     bot.sortReplies();
//     response("local-user", "hello");
// }

// function loadingError(error) {
//     console.log("Failed Loading: " + error);
// }

// module.exports.loading = function(){
//     bot = new RiveScript();

//     //Loading a directory and a file
//     bot.loadDirectory("./ai/brain").then(loadingDone).catch(loadingError);

//     bot.loadFile("./ai/brain/standard.rive");
// }


// /**
//  * Returns an answer to the message send by a user
//  * @param {String} username 
//  * @param {String} message
//  * @author Tony CHOUTEAU
//  * @author Sébastien HERT
//  */
// var response = function(username, message){
//     bot.reply(username, message).then(function (reply){
//         console.log(reply);
//     });
// }

class Brain {
    // bot = undefined;
    // name = undefined;
    // repo = undefined;
    // files = undefined;
    
    constructor(name, repo, file){
        this.bot = new RiveScript({utf8: true});
        this.name = name;
        this.repo = repo;
        this.file = file;
        
        this.loading();
    }
    
    
    loading(){
        
        //Loading a directory and a file
        this.bot.loadDirectory(this.repo).then( () => {
            this.loadingDone();
        }).catch(this.loadingError);
        
        this.bot.loadFile(this.repo+'/'+this.file);
    }
    
    loadingDone(){
        console.log("Success Loading\n");
        this.bot.sortReplies();
        // this.response("local-user", "hello");
    }
    
    loadingError(error) {
        console.log("Failed Loading: " + error);
    }
    
    response(username, message){
        this.bot.reply(username, message).then(function (reply){
            console.log(reply);
        });
    }

    
};

module.exports = Brain;