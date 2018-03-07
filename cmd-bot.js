const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");

var getCreated = require("./actions/created.js");
var getDiscussion = require("./actions/discussionBFD.js");
var getWallet = require("./actions/wallet.js");



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

  help : function(message) {
    let embed = new Discord.RichEmbed();
        // Descriptions command help
        embed.setTitle("List of the command from the bot")  
              .setDescription("-----------------------------------------\n\n" +
                              info.infoCmdBot["lastPost"] +"\n\n" + info.infoCmdBot["created"] + "\n\n" +
                              info.infoCmdBot["bal"] + "\n\n" + info.infoCmdBot["search"])
              .setColor("#7DDF64")
              .setTimestamp()
        return message.channel.send({embed});
  }
}
