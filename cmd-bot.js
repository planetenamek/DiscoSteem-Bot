const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");

var getCreated = require("./actions/created.js");
var getDiscussion = require("./actions/discussionBFD.js");
var getWallet = require("./actions/wallet.js");

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
    let element = message.content.split("_")                 
	useless = element.shift()      
	description = element.shift()		
        link = element.shift()          
        ope1 = link.split("@")         
        useless2 = ope1.shift()         
        ope2 = ope1.shift()             
        ope3 = ope2.split("/")
        author = ope3.shift()		
        useful = "----------------\n**Author :** @" + author + 
	         "\n----------------\n**Description :** \n\n" + description + "\n\n" + link
     bot.channels.get(config.curationChan).send(useful)
     return message.channel.send("Saved to curation channel !");
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
