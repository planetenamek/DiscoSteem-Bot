const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");
var steemAction = require("./actions/steem-module.js");
var discordAction = require("./actions/discord-module.js");

const bot = new Discord.Client();

bot.login(config.token)
// 
module.exports = { 
 getLastPost : function(message) {
  let element = message.content.split(" ")
      element.shift()
      element = String(element)
  return steemAction.discussionBFD("single-content", element,1,message);
 },

 getCreatedContent : function(message) {
  let tag = message.content.split(" ")
      tag.shift()
  let limit = tag.pop()
      limit = parseInt(limit)
  return steemAction.created(tag,limit,message);
 },

 getSearchContent : function(message) {
  let element = message.content.split(" ")
      element.shift()
      limit = element.pop()
      tagSearch = String(element.pop())
      author = String(element.shift())
  return steemAction.discussionBFD("search", author,limit,message);
 },

 getWallet : function(message) {
  let account = message.content.split(" ")
      account.shift()
  return steemAction.wallet(account,message);
 },

 curateArticle : function(message) {
  return discordAction.curationAction(message);
 },

 clearMessage : function(message) {
  let value = message.content.split(" ")
      value = value.pop()
  return discordAction.clear(value,message);
 },

 getRanking : function(message) {
  let name = message.content.split(" ")
      name.shift()
      name = String(name)
  return steemAction.ranking(name,message);
 },

 checkReaction : function(reaction,user,err) {
  return discordAction.reaction(reaction,user,err);
 },

 deletePost : function(message) {
  let value = message.content.split(" ");
      nb = value.pop();
      nb = parseInt(nb);
  return discordAction.deletePost(nb,message);
 },

 displayList : function(message) {
  return discordAction.display(message);
 },

 countList : function(message) {
  return discordAction.count(message);
 },

 deleteAll : function(message) {
  return discordAction.deleteAll(message);
 },
 
 moreInfo : function(message) {
  let element = message.content.split(" "),
      username = element.pop();
  return discordAction.moreInfo(username,message);
 },

 help : function(message) {
  let embed = new Discord.RichEmbed();
      // Descriptions command help
      embed.setTitle("List of the command from the bot")  
           .setDescription("-----------------------------------------\n\n" +
              info.infoCmdBot["lastPost"] +"\n\n" + info.infoCmdBot["created"] + "\n\n" +
              info.infoCmdBot["bal"] + "\n\n" + info.infoCmdBot["search"] + "\n\n" + info.infoCmdBot["curatePost"] + "\n\n" +
              info.infoCmdBot["rank"] + "\n\n" + info.infoCmdBot["display-list"] + "\n\n" + info.infoCmdBot["count"] + "\n\n" + 
              info.infoCmdBot["delete-post"] + "\n\n" + info.infoCmdBot["delete-all"] + "\n\n" + info.infoCmdBot["more-info"] +
              "\n\n" + info.infoCmdBot["clear"])
           .setColor("#7DDF64")
           .setTimestamp()

  return message.channel.send({embed});
 },

 // Get Steem account info from blockchain
 getInfo: function(message) {
   let element = message.content.split(" "),
       username = element.pop();

   return steemAction.getInfo(username, message);
 }
}
