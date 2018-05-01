const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var bot = new Discord.Client({autoReconnect:true});

var streamOp = require("./actions/streamOp.js");
var cmd = require("./cmd-bot.js");

bot.on("ready", () => {
  console.log("DiscoSteem-V2 Ready !");
  bot.user.setActivity('Stream Steem');
  streamOp.stream();
});

bot.setTimeout (function () {
  process.exit(1) // Restart
}, 1 * 1800000);

bot.on("message", async message =>
{
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.bot || message.content.indexOf(config.prefix) !== 0) {
    return;
  }

  switch(command) {
    case "created":
      return cmd.getCreatedContent(message);

    case "last-post":
      return cmd.getLastPost(message);

    case "search":
      return cmd.getSearchContent(message);

    case "bal":
      return cmd.getWallet(message);

    case "clear":
      return cmd.clearMessage(message);

    case "rank":
      return cmd.getRanking(message);

    case "display-list":
      return cmd.displayList(message);

    case "count":
      return cmd.countList(message);

    case "delete-post":
      return cmd.deletePost(message);

    case "delete-all":
      return cmd.deleteAll(message);

    case "more-info":
      return cmd.moreInfo(message);

    case "help":
      return cmd.help(message);

    case "info": // Get Steem account info from blockchain
      return cmd.getInfo(message);

    default:
      if (command.startsWith("curate")) {
        return cmd.curateArticle(message);
      }

      console.log('Unknown command');
  }
});

bot.on("messageReactionAdd", (reaction, user) => {
  return cmd.checkReaction(reaction,user);
});

bot.on("disconnect", function() {
  console.log("Bot disconnected");
  bot.login(config.token);
  console.log("DiscoSteem-V2 Ready !");
});

bot.login(config.token);
