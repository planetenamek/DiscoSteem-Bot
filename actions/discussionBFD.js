const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");


exports.discussionBFD = function(value,author,limit,message) {
 if(value === "single-content"){
  steem.api.getDiscussionsByAuthorBeforeDate(author,null, new Date().toISOString().split('.')[0],limit , function(err, result) {
   if(result !== undefined && result.length > 0 ){
    let rep = steem.formatter.reputation(result[0].author_reputation),
        data = JSON.parse(result[0].json_metadata),
        tag = data.tags,
        img = data.image,
        embed = new Discord.RichEmbed();

    embed.setColor("#7DDF64")
         .setTitle("**" + result[0].title + "**") 
         .setDescription("**pending payout : " + result[0].pending_payout_value + " - Votes : " + result[0].net_votes + "**")
         .setAuthor( result[0].author + " (" + rep + ")")
         .setThumbnail(img[0])
         .setURL("https://steemit.com" + result[0].url)
    return message.channel.send({embed});
   }else{
    return message.channel.send("Sorry user not found !");
   }
  });
 }else{
   steem.api.getDiscussionsByAuthorBeforeDate(author,null, new Date().toISOString().split('.')[0],limit , function(err, result) {
    for(var i = 0; i < result.length; i++) {
      let author = result[i].author,
          data = JSON.parse(result[i].json_metadata),
          tag = data.tags,
          permlink = result[i].permlink;

     if (tag.indexOf(tagSearch) !== (-1) ) {
      if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
       message.channel.send("https://steemit.com/" + tag[0] + "/@" + author + "/" + permlink);
      }else{
       return message.channel.send("Désolé vous n'avez pas accès à cette commande pour le moment.");
      }
     }
    }
   });
 }
}