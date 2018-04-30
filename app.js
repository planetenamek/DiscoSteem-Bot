const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var bot = new Discord.Client({autoReconnect:true});

var streamOp = require("./actions/streamOp.js");
var cmd = require("./cmd-bot.js");

bot.on("ready", () => {
 console.log("DiscoSteem-V2 Ready !"); 
 bot.user.setActivity('Stream Steem');
 streamOp.stream();
}); 

bot.setTimeout (function () {
 process.exit(1) // Restart
}, 1 * 1800000);

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

 if(command === "display-list") {
   return cmd.displayList(message);
 }

 if(command === "count") {
  return cmd.countList(message);
 }

 if(command === "delete-post"){
  return cmd.deletePost(message);
 }

 if(command === "delete-all") {
   return cmd.deleteAll(message);
 }

 if(command === "more-info") {
  return cmd.moreInfo(message);
 }

 if(command === "help") {
  return cmd.help(message);
 }

 // Get Steem account info from blockchain
 if(command === "info") {
  return cmd.getInfo(message);
 }

});

bot.on("messageReactionAdd", (reaction, user) => {
  return cmd.checkReaction(reaction,user);
});

bot.on("disconnect", function() {
  console.log("Bot disconnected");
  bot.login(config.token);
  console.log("DiscoSteem-V2 Ready !");
});


bot.login(config.token);
