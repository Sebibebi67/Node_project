//===========================
// Import

var RiveScript = require('rivescript');

//===========================
// Class

/**
 * @classdesc Contains informations about a brain
 * @author Sébastien HERT
 */
class Brain {
    
    /**
     * @constructor
     * @param {String} name the bot name
     * @param {String} repo the directory name
     */
    constructor(name, repo, file){
        this.bot = new RiveScript({utf8: true});
        this.name = name;
        this.repo = repo;
        
        this.loading();
    }
    
    /**
     * Loads a directory whitch contains the .rive files
     */
    loading(){        
        this.bot.loadDirectory(this.repo).then( () => {
            this.loadingDone();
        }).catch(this.loadingError);
    }
    
    /**
     * Confirms the success of the loading
     */
    loadingDone(){
        console.log("Success Loading\n");
        this.bot.sortReplies();
    }
    
    /**
     * Catches the potential errors and prints them
     * @param {String} error 
     */
    loadingError(error) {
        console.log("Failed Loading: " + error);
    }
    
    /**
     * Sends a response to a user
     * @param {String} username 
     * @param {String} message
     * @async
     */
    async response(username, message){
        var answer = await this.bot.reply(username, message);
        return answer;
    }

    
};

//===========================
// Export

module.exports = Brain;