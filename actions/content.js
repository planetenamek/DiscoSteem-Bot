const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

const bot = new Discord.Client();

bot.login(config.token)

exports.getContent = function(author,permlink,idChannel) {
 steem.api.getContent(author,permlink, function (err,result) {
  if(!err && result) {
   let author = result.author,
       reputation = steem.formatter.reputation(result.author_reputation),
       dataContent = JSON.parse(result.json_metadata),
       tag = dataContent.tags,
       date = result.created,
       update = result.last_update,
       embed = new Discord.RichEmbed();

   embed.setAuthor(author + " (" + reputation + ")", )
        .setTitle(result.title)
        .setColor(0x00AE86)
        .setFooter("Catégorie : " + tag[0])
        .setTimestamp()
        .setURL("https://busy.org" + result.url)

   if(dataContent.image != "undefined" && dataContent.image != undefined && dataContent.image != null){
    embed.setImage(dataContent.image[0])                                
   }

   if(date === update) {
     bot.channels.get(idChannel).send({embed});
     console.log("New post on " + tag[0] + " category !");
   }
  }
 });
}
