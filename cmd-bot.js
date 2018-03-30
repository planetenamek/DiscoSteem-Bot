const Discord = require("discord.js");
const steem = require("steem");
const fs = require("fs");
const config = require("./config.json");

const roleID = config.voterID;

var info = require("./info.json");

var getCreated = require("./actions/created.js");
var getDiscussion = require("./actions/discussionBFD.js");
var getRank = require("./actions/ranking.js")
var getWallet = require("./actions/wallet.js");
var curationSave = require("./actions/curationSave.js");
var postVote = require("./actions/upvote.js");

const bot = new Discord.Client();

bot.login(config.token)

module.exports = { 
 getLastPost : function(message) {
  let element = message.content.split(" ")
      element.shift()
      element = String(element)
  return getDiscussion.discussionBFD("single-content", element,1,message);
 },

 getCreatedContent : function(message) {
  let tag = message.content.split(" ")
      tag.shift()
  let limit = tag.pop()
      limit = parseInt(limit)
  return getCreated.created(tag,limit,message);
 },

 getSearchContent : function(message) {
  let element = message.content.split(" ")
      element.shift()
      limit = element.pop()
      tagSearch = String(element.pop())
      author = String(element.shift())
  return getDiscussion.discussionBFD("search", author,limit,message);
 },

 getWallet : function(message) {
  let account = message.content.split(" ")
      account.shift()
  return getWallet.wallet(account,message);
 },

 curateArticle : function(message) {
   if(message.channel.id === config.curationChan){
       return curationSave.curation(message);
   }else if(message.channel.id === config.postSubmissionChan) {
    let element = message.content.split("%")                 
	link = element.pop();
	link = link.trim();
	description = element.pop();
	dataLink = link.split("/");
	embed = new Discord.RichEmbed();   
    if(link.startsWith("https://busy")) {
      author = dataLink.slice(3,4);
      author = String(author);
      embed.setAuthor(author)
    }else if (link.startsWith("https://steemit") || link.startsWith("https://utopian")){
      author = dataLink.slice(4,5); 
      author = String(author);
      embed.setAuthor(author)
    }else{
      return message.channel.send("Invalid link please try again !");
    }
     embed.setDescription(description + "\n\n" + link)
     bot.channels.get(config.savingSubmissionChan).send({embed});
     return message.channel.send("Saved to curation channel !");
   }else{
     message.channel.send("Please use $curate in #postsubmission !");
   }
 },

 clearMessage : function(message) {
  let value = message.content.split(" ")
      value = value.pop()

  if(message.member.permissions.has("ADMINISTRATOR")){
   if(value > 0 && value <= 100) {
    message.channel.bulkDelete(value)
   }else{
    message.channel.send("Error ! Please try with value > 0 or <= 100");
   }
  }else{
    message.channel.send("Sorry this command is reserved to admin !");
  }
 },

 getRanking : function(message) {
  let name = message.content.split(" ")
      name.shift()
      name = String(name)
  return getRank.ranking(name,message);
 },

 checkReaction : function(reaction,user,err) {
  try{
   if(reaction.emoji.name === config.checkEmoji) {
    if(user.id === roleID) {
     data = reaction.message.embeds[0].url
     if(data.startsWith("https://")) {
      data = data.split("/")
      permlink = data.pop();
      author = data.pop();
      return postVote.upvote(author,permlink);
     }
    }
   }
  }catch(err) {
    console.log(err);
  }
 },

 help : function(message) {
  let embed = new Discord.RichEmbed();
      // Descriptions command help
      embed.setTitle("List of the command from the bot")  
           .setDescription("-----------------------------------------\n\n" +
                        info.infoCmdBot["lastPost"] +"\n\n" + info.infoCmdBot["created"] + "\n\n" +
                        info.infoCmdBot["bal"] + "\n\n" + info.infoCmdBot["search"] + "\n\n" + info.infoCmdBot["curatePost"])
           .setColor("#7DDF64")
           .setTimestamp()

  return message.channel.send({embed});
 }
}
