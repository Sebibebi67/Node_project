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

//====================================================
// Define
//====================================================

const BOT_PATH = "./data/bots/";
const BRAIN_PATH = "./data/brains/";
const MOUTH_PATH = "./data/mouths/";

var NAMES = ["Ally", "Steve", "Max", "Lucie", "Astrid", "Tommy"];

//====================================================
// Class
//====================================================

class BotsManager {
	
	constructor (){
		this.bots = {}
	}

	load(){
		this.loadBots().then(() => {
			console.log("Bots loaded");
			this.display();
		}).catch(err => {
			console.log(err);
			process.exit(1);
		})
	}

	display(){
		//console.log(Object.values(this).map((id, bot) => [id, bot.name]));
		console.log(this);
	}

	async loadBots(){

		for (let id in this.bots){
			if (this.bots[id].client != undefined){
				this.bots[id].client.destroy();
			}
		}

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

			let token = undefined;
			let web = undefined;
			for (let mouth in bot.mouths){
				let f = fs.readFileSync(MOUTH_PATH + bot.mouths[mouth] + ".json");
				let data = JSON.parse(f);
				if (token == undefined && data.token != null){
					token = data.token;
				} else if (data.type == "web"){
					web = true;
				}
			}

			let brain = new Brain(name, bot.brains.map(value => BRAIN_PATH+value+".rive"))

			let client = undefined;
			if (token != undefined){
				try {
					client = new Discord.Client();

					client.on("ready", () => {
						console.log("I'm ready ! ("+id+" - "+name+")");
					});

					let t = this;
					client.on('message', msg => {
						if (msg.content == "!who") {
							msg.reply("**"+name+"**"+", here !");
						}
						if (msg.content.startsWith(name)){
							let message = msg.content.split(name+" ").join("");
							brain.response(msg.author.username, message).then((reply) => {
								msg.reply(reply.split("$name").join("**"+name+"**"));
							});
							
						}
					});
					
					client.login(token).catch(error => undefined);
				} catch (err){
					console.log("The client has already rebooted");
				}
			}

			this.bots[id] = {
				"brain": brain,
				"name": name,
				"token": token,
				"web": web,
				"client": client
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