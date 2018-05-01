const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

const { nodes } = require("./../nodes");

var bot = new Discord.Client({autoReconnect:true});
var content = require("./steem-module.js");

var index = 0;

bot.login(config.token);

function stream() {
  steem.api.setOptions({ url: nodes[index] });
  return new Promise((resolve, reject) => {
    console.log('Connected to', nodes[index]);

    steem.api.streamOperations((err, operation) => {
      if(err) return reject(err);

      // Check all posts published on the steem blockchain
      if (operation[0] == "comment" && operation[1].parent_author == "") {
        let data = JSON.parse(operation[1].json_metadata),
          tag = data.tags;
        if (typeof tag != "undefined") {
          if (tag.indexOf(config.principalTag) != (-1)) {
            let author = operation[1].author,
              permlink = operation[1].permlink;
            for (v in config.altTags) {
              if (tag.indexOf(v) != (-1)) {
                content.getContent(author, permlink, config.altTags[v]);
              }
            }
            content.getContent(author, permlink, config.principalChan);
          }
        }
      } else if (operation[0] == "vote") {  // Check all votes from steem blockchain
        let voter = operation[1].voter,
          author = operation[1].author,
          permlink = operation[1].permlink,
          weight = operation[1].weight / 100;
        if (voter == config.trackerVoter) {
          steem.api.getContent(author, permlink, function (err, res) {
            try {
              let data = JSON.parse(res.json_metadata)
              tag = data.tags;
            } catch (err) {
              console.log("Error : " + err);
              return;
            }

            embed = new Discord.RichEmbed();
            embed.setTitle("@" + config.trackerVoter + " voted for @" + author)
              .setDescription("Link : " + "https://busy.org/@" + author + "/" + permlink)
              .setFooter("Weight vote : " + weight + "%")
              .setTimestamp();

            if (typeof tag != "undefined" && tag.indexOf(config.tagTrackerVoter) != (-1)) {
              bot.channels.get(config.maintenance).send({embed});
            }
          });
        }
      } // End if vote
    });

  }).catch(err => {
    console.log('Stream error:', err.message, 'with', nodes[index]);
    index = ++index === nodes.length ? 0 : index;
    stream();
  });
}

exports.stream = stream;
