const Discord = require("discord.js");
const steem = require("steem");

exports.created = function(tag,limit,message) {
 if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
  if(limit > 0 && limit <= 100) {    
   steem.api.getDiscussionsByCreated({"tag": tag[0], "limit": limit}, function(err, result) {
    if(result){
     for (i = 1; i < result.length; i++) {
      let author = result[i]["author"],
          permlink = result[i]["permlink"]
      message.channel.send("https://busy.org/" + tag + "/@" + author + "/" + permlink);
     }                
    }else{
      return message.channel.send("Command invalid ! Please try again or type $help");
    }  
   });
  }else{
   return message.channel.send("Sorry the limit from this command is min 1 post and max 10 post ! Try again");
  }
}else{
 return message.channel.send("You are not allowed to perform this action. (Admin or Mod only)");
}
}
