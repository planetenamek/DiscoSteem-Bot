const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var bot = new Discord.Client({autoReconnect:true});

var streamOp = require("./actions/streamOp.js");
var cmd = require("./cmd-bot.js");

bot.on("ready", () => {
 console.log("DiscoSteem-V2 Ready !"); 
 bot.user.setGame('Stream Steem');
}); 

bot.on("message", async message => {
 const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
 const command = args.shift().toLowerCase()

 if(message.author.bot) return

 if(message.content.indexOf(config.prefix) !== 0) return
 
 if(command === "created") {
  return cmd.getCreatedContent(message);
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
 
 if(command.startsWith("curate")) {
  return cmd.curateArticle(message);
 }
 
 if(command === "clear") {
  return cmd.clearMessage(message);
 }

 if(command === "rank") {
  return cmd.getRanking(message);
 }

 if(command === "help") {
  return cmd.help(message);
 }

});

bot.on("disconnect", function() {
 console.log("Bot disconnected");
 bot.connect() // Restart
 console.log("Bot reconnected !");
});

bot.login(config.token);

streamOp.stream();















