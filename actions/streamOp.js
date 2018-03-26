const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

var bot = new Discord.Client({autoReconnect:true});

steem.api.setOptions({ url: 'https://api.steemit.com/' });

var content = require("./content.js");

bot.login(config.token)

exports.stream = function() {
 steem.api.streamOperations("irreversible", function(err,result) {
  try{
   if(typeof result != "undefined" && result[0] === "comment" && result[1].parent_author === "") {
    let dataString = String(result[1].json_metadata);
    let data = JSON.parse(result[1].json_metadata),
        tag = data.tags;
    if(typeof tag != "undefined" ) {
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
   }
  }catch(err){
    console.log(err);
	process.exit(1);
  } 
 });
}
