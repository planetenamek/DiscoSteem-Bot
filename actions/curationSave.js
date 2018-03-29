const Discord = require("discord.js");
const config = require("./../config.json");

var fs = require("fs");
var  bot = new Discord.Client();

bot.login(config.token);

exports.curation = function(message) {
 embed = new Discord.RichEmbed()
 element = message.content.split("!")
 link = element.pop();
 link = link.trim();
 description = element.pop();
 dataLink = link.split("/");
 
 if(link.startsWith("https://busy")){  
  author = dataLink.slice(3,4);
  author = String(author);
  embed.setAuthor(author);
 }else if (link.startsWith("https://steemit") || link.startsWith("https://utopian")) { 
  author = dataLink.slice(4,5);
  author = String(author);
  embed.setAuthor(author);
 }else {
  message.channel.send("Invalid link please try again !");
 }
 
 embed.setDescription(description + "\n\n" + link)
      .setColor("#7DDF64")
      .setTimestamp()
      .setURL(link)
  
 fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
    obj = JSON.parse(data);
     if(typeof obj.nomination[0] === "undefined") { id = 0} else { id = obj.nomination.length }
      obj.nomination.push({id: id, author:author, link:link});
      message.channel.send("Article n° " + obj.nomination.length + " enregistré !");
      json = JSON.stringify(obj);
      fs.writeFile('post-saved.json', json, 'utf8', cb); // write it back
    }
 });
  
 cb = function(){
  bot.channels.get(config.savingChan).send({embed});
 }   
}
