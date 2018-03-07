const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

const bot = new Discord.Client();

var content = require("./content.js");

bot.login(config.token)

exports.stream = function() {
  steem.api.streamOperations("irreversible", function(err,result) {
    try{
      if(result[0] === "comment" && result[1].parent_author === "") {
        let data = JSON.parse(result[1].json_metadata),
        tag = data.tags;

        if(tag.indexOf(config.principalTag) != (-1)) {
          let author = result[1].author,
              permlink = result[1].permlink;

          for (v in config.altTags) {
            if(tag.indexOf(v) != (-1)) {	
              return content.getContent(author, permlink,config.altTags[v]);
            } 
          }
            return content.getContent(author, permlink,config.principalChan);
        }			
      }
    }catch(err){
      bot.channels.get(checkTags.maintenance).send("Error : " + err);
    } 
  });
}