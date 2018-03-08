const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");


exports.discussionBFD = function(value,author,limit,message) {
 if(value === "single-content"){
  steem.api.getDiscussionsByAuthorBeforeDate(author,null, new Date().toISOString().split('.')[0],limit , function(err, result) {
   if(typeof result != "undefined"){
    let rep = steem.formatter.reputation(result[0].author_reputation),
        data = JSON.parse(result[0].json_metadata),
        tag = data.tags,
        img = "",
        embed = new Discord.RichEmbed();
    
    if(typeof data.image != "undefined"){
      img = data.image;
    }

    embed.setColor("#7DDF64")
         .setTitle("**" + result[0].title + "**") 
         .setDescription("**pending payout : " + result[0].pending_payout_value + " - Votes : " + result[0].net_votes + "**")
         .setAuthor( result[0].author + " (" + rep + ")")
         .setURL("https://busy.org" + result[0].url)
    
    if(typeof img != "undefined"){
      embed.setThumbnail(img[0])
    }
    
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
       message.channel.send("https://busy.org/" + tag[0] + "/@" + author + "/" + permlink);
      }else{
       return message.channel.send("Sorry you do not have access to this command for the moment.");
      }
     }
    }
   });
 }
}
