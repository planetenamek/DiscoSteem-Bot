const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

var bot = new Discord.Client({autoReconnect:true});

steem.api.setOptions({ url: 'https://api.steemit.com/' });

var content = require("./steem-module.js");

bot.login(config.token)

exports.stream = function() {
 steem.api.streamOperations("irreversible", function(err,result) {
  try{
   if(typeof result != "undefined" && result[0] === "comment" && result[1].parent_author === "") { 
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
   }else if(typeof result != "undefined" && result[0] === "vote") {
     let voter = result[1].voter,
         author = result[1].author,
         permlink = result[1].permlink,
         weight = result[1].weight / 100;
     if(voter === config.trackerVoter) {
      steem.api.getContent(author,permlink, function(err,res) {
       let data = JSON.parse(res.json_metadata)
           tag = data.tags,
           embed = new Discord.RichEmbed();
       embed.setTitle("@" + config.trackerVoter + " voted for @" + author)
            .setDescription("Link : " + "https://busy.org/@" + author + "/"  + permlink)
            .setFooter("Weight vote : " + weight + "%")
            .setTimestamp()
       if(typeof tag != "undefined" && tag.indexOf(config.tagTrackerVoter) != (-1)) {
        return bot.channels.get(config.maintenance).send({embed});
       }
      });
     }
    }
   }catch(err){
     console.log(err);
     process.exit(1);
   } 
  });
}
