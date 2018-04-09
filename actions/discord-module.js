const Discord = require("discord.js");
const fs = require("fs");
const config = require("./../config.json");
const roleID = config.voterID;

var bot = new Discord.Client();
var postVote = require("../steem-actions/upvote.js");

bot.login(config.token);

module.exports = {
 // Processing of data collected via the reaction event
 reaction : function(reaction,user,err) {
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
 
 // Returns the display of links for more information
 moreInfo : function(username,message) {
 	embed = new RichEmbed();
 	embed.setTitle("List of links")
 	     .setDescription("For maximum detail https://steemworld.org/@" + username +
 	     "\n" + "To view all transactions https://steemd.com/@" + username +
 	     "\n" + "For an overview of your performance and ranking https://steemitboard.com/board.html?user=" + username +
 	     "\n" + "View incoming votes http://steemreports.com/incoming-votes-info/?account=" + username + "&days=14" +
 	     "\n" + "View outgoing votes sortants http://steemreports.com/outgoing-votes-info/?account=" + username + "&days=14")
         .setTimestamp()
    return message.channel.send({embed}); 	  
 },

 // Displays the contents of the post-saved.json file
 display : function(message) {
  fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data){
   if (err){
    console.log(err);
   }else{
    obj = JSON.parse(data);
    if(obj.nomination.length > 0) {
     for(i=0; i < obj.nomination.length; i++) {
      if(typeof obj.nomination[i].id != "undefined") {
       let embed = new Discord.RichEmbed();
           embed.setTitle("Author : " + obj.nomination[i].author)
                .setDescription("ID : " + obj.nomination[i].id + "\n"  + "Link : " + obj.nomination[i].link )
                .setFooter("Selected on " + obj.nomination[i].dateForm)
       message.channel.send({embed});
      }
     }
      return message.channel.send("Complete");
    }else{
     return message.channel.send("The list is empty !");
    }
   }
  });
 },

 // Delete post of post-saved.json by ID
 deletePost : function(nb,message) {
  fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data){
   if (err){
    console.log(err);
   }else{
    obj = JSON.parse(data);
    resultat = obj.nomination.find( nomination => nomination.id === nb);
    vl = obj.nomination.indexOf(resultat);
    
    if(typeof obj.nomination[vl] != "undefined"){
     obj.nomination[vl] = obj.nomination.slice(vl,vl)
     json = JSON.stringify(obj);
    
     fs.writeFile('post-saved.json', json, 'utf8', function(){
      return message.channel.send("Article n° " + nb + " supprimé !");
     });

    }else{
     return message.channel.send("This article does not exist !");
    }
   }
  });
 },
 // Delete all content of post-saved.json

}//End