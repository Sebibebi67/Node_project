//====================================================
// Require
//====================================================

//======================
// Vendors

var RiveScript = require('rivescript');

//======================
// Own

//====================================================
// Class
//====================================================

/**
 * @classdesc Contains informations about a brain
 * @author Sébastien HERT & Tony CHOUTEAU
 */
class Brain {
	
	/**
	 * @constructor
	 * @param {String} name the bot name
	 * @param {String} files the files list
	 */
	constructor(name, files){
		this.bot = new RiveScript({utf8: true});
		this.name = name;
		this.files = files;
	}
	
	/**
	 * Loads a directory whitch contains the .rive files
	 */
	loading(){
		return this.bot.loadFile(this.files);
	}
	
	/**
	 * Confirms the success of the loading
	 */
	loadingDone(){
		console.log("Success Loading\n");
		this.bot.sortReplies();
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