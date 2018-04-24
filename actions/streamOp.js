const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

steem.api.setOptions({url: 'https://rpc.steemviz.com'});

var bot = new Discord.Client({autoReconnect:true});
var content = require("./steem-module.js");

bot.login(config.token)

exports.stream = function() {
 steem.api.streamOperations("head", function(err,result) {
  if(!err && result) {
   // Check all posts published on the steem blockchain
    if(result[0] == "comment" && result[1].parent_author == "") {
      let data = JSON.parse(result[1].json_metadata),
          tag = data.tags;
      if(typeof tag != "undefined" ) {
        if(tag.indexOf(config.principalTag) != (-1)) {
          let author = result[1].author,
              permlink = result[1].permlink;
          for (v in config.altTags) {
            if(tag.indexOf(v) != (-1)) { 
             content.getContent(author, permlink,config.altTags[v]);
            } 
          }
         content.getContent(author, permlink,config.principalChan);
        }  
      }
    }if(result[0] == "vote"){  // Check all votes from steem blockchain
      let voter = result[1].voter,
          author = result[1].author,
          permlink = result[1].permlink,
          weight = result[1].weight / 100;
      if(voter == config.trackerVoter) {
       steem.api.getContent(author,permlink, function(err,res) {
        let data = JSON.parse(res.json_metadata)
            tag = data.tags,
            embed = new Discord.RichEmbed();
            embed.setTitle("@" + config.trackerVoter + " voted for @" + author)
                 .setDescription("Link : " + "https://busy.org/@" + author + "/"  + permlink)
                 .setFooter("Weight vote : " + weight + "%")
                 .setTimestamp()
        if(typeof tag != "undefined" && tag.indexOf(config.tagTrackerVoter) != (-1)) {
           bot.channels.get(config.maintenance).send({embed});
        }
       });
      }
    }// End if vote
  }
 });
}
