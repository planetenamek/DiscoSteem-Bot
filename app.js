const Discord = require("discord.js");
const steem = require("steem");
const bot = new Discord.Client();

var config = require("./config.json");

var streamOp = require("./actions/streamOp.js");
var cmd = require("./cmd-bot.js");

bot.on("ready", () => {
 console.log("App-Stream-V2 Ready !"); 
 bot.user.setActivity("Stream Steem !");
 streamOp.stream();
}); 

bot.on("message", async message => {
 const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
 const command = args.shift().toLowerCase()

 if(message.author.bot) return

 if(message.content.indexOf(config.prefix) !== 0) return

 if(command === "help") {
  return cmd.help(message);
 }

 if(command === "last-post") {
  return cmd.getLastPost(message);
 }

 if(command === "search") {
  return cmd.getSearchContent(message);
 }

 if(command === "bal") {
  return cmd.getWallet(message);
 }    
});

bot.login(config.token);








