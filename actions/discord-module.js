const Discord = require("discord.js");
const fs = require("fs");
const config = require("./../config.json");
const roleID = config.voterID;

var bot = new Discord.Client();
var postVote = require("./steem-module.js");

bot.login(config.token);

module.exports = {
  // Processing of data collected via the reaction event
  reaction: function (reaction, user, err) {
    try {
      if (reaction.emoji.name === config.checkEmoji) {
        if (user.id === roleID) {
          data = reaction.message.embeds[0].url
          if (data.startsWith("https://")) {
            data = data.split("/")
            permlink = data.pop();
            author = data.pop();
            return postVote.upvote(author, permlink);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  // Returns the display of links for more information
  moreInfo: function (username, message) {
    embed = new Discord.RichEmbed();
    embed.setTitle("List of links")
      .setDescription("**https://steemworld.org/@" + username + "**" +
        "\n\n" + "**https://steemd.com/@" + username + "**" +
        "\n\n" + "**https://steemitboard.com/board.html?user=" + username + "**" +
        "\n\n" + "**http://steemreports.com/incoming-votes-info/?account=" + username + "&days=14**" +
        "\n\n" + "**http://steemreports.com/outgoing-votes-info/?account=" + username + "&days=14**")
      .setTimestamp();
    return message.channel.send({embed});
  },

  // Displays the contents of the post-saved.json file
  display: function (message) {
    fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        if (obj.nomination.length > 0) {
          for (i = 0; i < obj.nomination.length; i++) {
            if (typeof obj.nomination[i].id != "undefined") {
              let embed = new Discord.RichEmbed();
              embed.setTitle("Author : " + obj.nomination[i].author)
                .setDescription("ID : " + obj.nomination[i].id + "\n" + "Link : " + obj.nomination[i].link)
                .setFooter("Selected on " + obj.nomination[i].dateForm)
              message.channel.send({embed});
            }
          }
          return message.channel.send("Complete");
        } else {
          return message.channel.send("The list is empty !");
        }
      }
    });
  },

  // Delete post of post-saved.json by ID
  deletePost: function (nb, message) {
    fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        resultat = obj.nomination.find(nomination => nomination.id === nb);
        vl = obj.nomination.indexOf(resultat);

        if (typeof obj.nomination[vl] != "undefined") {
          obj.nomination[vl] = obj.nomination.slice(vl, vl)
          json = JSON.stringify(obj);

          fs.writeFile('post-saved.json', json, 'utf8', function () {
            return message.channel.send("Article n° " + nb + " supprimé !");
          });

        } else {
          return message.channel.send("This article does not exist !");
        }
      }
    });
  },
  // Delete all content of post-saved.json
  deleteAll: function (message) {
    fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        obj.nomination = []
      }
      json = JSON.stringify(obj);
      fs.writeFile('post-saved.json', json, 'utf8', function () {
        message.channel.send("All posts deleted ! ")
      });
    });
  },

  // Curation function
  curation: function (message) {
    embed = new Discord.RichEmbed()
    date = new Date();
    element = message.content.split("_")
    link = element.pop();
    link = link.trim();
    description = element.pop();
    dataLink = link.split("/");

    dateFormated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() +
      " at " + date.getHours() + ":" + date.getMinutes();

    if (link.startsWith("https://busy")) {
      author = dataLink.slice(3, 4);
      author = String(author);
      embed.setAuthor(author);
    } else if (link.startsWith("https://steemit") || link.startsWith("https://utopian")) {
      author = dataLink.slice(4, 5);
      author = String(author);
      embed.setAuthor(author);
    } else {
      return message.channel.send("Invalid link please try again !");
    }

    embed.setDescription(description + "\n\n" + link)
      .setColor("#7DDF64")
      .setTimestamp()
      .setURL(link)

    fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        if (typeof obj.nomination[0] === "undefined") { id = 1} else { id = obj.nomination.length + 1 }
        obj.nomination.push({id: id, author: author, link: link, dateForm: dateFormated, date: date});
        message.channel.send("Article n° " + obj.nomination.length + " enregistré !");
        json = JSON.stringify(obj);
        fs.writeFile('post-saved.json', json, 'utf8', cb);
      }
    });

    cb = function () {
      bot.channels.get(config.savingChan).send({embed});
    }
  },

  // Curation data processing
  curationAction: function (message) {
    if (message.channel.id === config.curationChan) {
      return this.curation(message);
    } else if (message.channel.id === config.postSubmissionChan) {
      let element = message.content.split("_")
      link = element.pop();
      link = link.trim();
      description = element.pop();
      dataLink = link.split("/");
      embed = new Discord.RichEmbed();

      if (link.startsWith("https://busy")) {
        author = dataLink.slice(3, 4);
        author = String(author);
        embed.setAuthor(author);
      } else if (link.startsWith("https://steemit") || link.startsWith("https://utopian")) {
        author = dataLink.slice(4, 5);
        author = String(author);
        embed.setAuthor(author);
      } else {
        return message.channel.send("Invalid link please try again !");
      }

      embed.setDescription(description + "\n\n" + link);
      bot.channels.get(config.savingSubmissionChan).send({embed});
      return message.channel.send("Saved to curation channel !");
    } else {
      return message.channel.send("Please use $curate in the appropriate channel !");
    }
  },

  // Count element from post-saved.json
  count: function (message) {
    fs.readFile('post-saved.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        count = obj.nomination.length;
        return message.channel.send(count + " posts selected");
      }
    });
  },

  // Clear messages function
  clear: function (value, message) {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      if (value > 0 && value <= 100) {
        message.channel.bulkDelete(value)
      } else {
        message.channel.send("Error ! Please try with value > 0 or <= 100");
      }
    } else {
      message.channel.send("Sorry this command is reserved to admin !");
    }
  }
}; //End