//====================================================
// Require
//====================================================

//======================
// Vendors

var fs = require('fs');
const Discord = require('discord.js');
//const axios = require('axios');

//======================
// Own

var Brain = require('./brain');
var NAMES = ["Ally", "Steve", "Max", "Lucie", "Astrid", "Tommy"];

//====================================================
// Define
//====================================================

const BOT_PATH = "./data/bots/";
const BRAIN_PATH = "./data/brains/";
const MOUTH_PATH = "./data/mouths/";

//====================================================
// Class
//====================================================

class BotsManager {
	
	constructor (){
		this.bots = {}
	}

	async loadBots(){

		let files;
		try {
			files = fs.readdirSync(BOT_PATH);
		} catch(e) {
			console.log("Error reading the directory");
			return "Error reading the BOT_PATH directory";
		}

		let list = {};
		files.forEach(function (file) {
			let f = fs.readFileSync(BOT_PATH+file)
			let id = parseInt(file.trim(".json"));
		
			let bot = JSON.parse(f);
			
			if (bot.state){
				list[id] = bot;
			}
		});

		for (let id in this.bots){
			let stillIn = false;
			for (let id2 in list){
				if (id2 == id){
					stillIn = true;
				}
			}
			if (!stillIn){
				delete this.bots[id];
			}
		}

		for (let id in list){
			let bot = list[id];

			let name = (parseInt(id) <= NAMES.length)?NAMES[parseInt(id)-1]:"ACEHILRTUVW123456789".split('').sort(function(){return 0.5-Math.random()}).join('');

			this.bots[id] = {
				"brain": new Brain("Bot"+id, bot.mouths.map(value => BRAIN_PATH+value+".rive")),
				"name": name
			}

			await this.bots[id].brain.loading().then(() => {
				this.bots[id].brain.loadingDone();
			}).catch(err => {
				throw err
			});
		}
	}
}

//====================================================
// Export
//====================================================

module.exports = BotsManager;


//====================================================
// End
//====================================================