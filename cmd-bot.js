const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");

var getCreated = require("./actions/created.js");
var getDiscussion = require("./actions/discussionBFD.js");
var getRank = require("./actions/ranking.js")
var getWallet = require("./actions/wallet.js");
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
  thumbnail = message.embeds[0].thumbnail.url
  element = message.content.split("%")                 
  link = element.pop();
  description = element.pop();
  dataLink = link.split("/");
  author = dataLink.slice(4,5); 
  author = String(author);
          
  fs.readFile('reception-content.json', 'utf8', function readFileCallback(err, data){
   if (err){
    console.log(err);
   } else {
    obj = JSON.parse(data); 
    obj.nomination.push({id: message.id, description:description, author:author, link:link, thumbnail:thumbnail}); 
    json = JSON.stringify(obj);
    fs.writeFile('post-saved.json', json, 'utf8', cb); // write it back 
  }});

  cb = function(){
    bot.channels.get(config.curationChan).send(author + "\n" + description + " \n" + link);
    message.channel.send("Saved to curation file !");
  }
 },

 clearMessage : function(message) {
  let value = message.content.split(" ")
      value = value.pop()

  if(message.member.permissions.has("ADMINISTRATOR")){
   if(value > 0 && value <= 100) {
    message.channel.bulkDelete(value)
   }else{
    message.channel.send("Error ! Please try with value > 0 or < 100");
   }
  }else{
    message.channel.send("Sorry this command is reserved to admin !")
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
   console.log(user.message)
   if(reaction.emoji.name === config.checkEmoji) {
    if(user.id === config.voterID) {
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
