const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");
const wif = config.wif;
const weight = config.weightVote;
const voter  = config.voter;
const bot = new Discord.Client();

var redFish = 999999,
    minnow = 9999999, 
    dolphin = 99999999, 
    orca = 999999999, 
    whales = 9999999999;

bot.login(config.token)

module.exports = {
// Get the created steem feed
created : function(tag,limit,message) {
 if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
  if(limit > 0 && limit <= 100) {    
   steem.api.getDiscussionsByCreated({"tag": tag[0], "limit": limit}, function(err, result) {
    if(result){
     for (i = 0; i < result.length; i++) {
      let author = result[i]["author"],
          permlink = result[i]["permlink"]
      message.channel.send("https://busy.org/" + tag + "/@" + author + "/" + permlink);
     }                
    }else{
      return message.channel.send("Command invalid ! Please try again or type $help");
    }  
   });
  }else{
   return message.channel.send("Sorry the limit from this command is min 1 post and max 100 post ! Try again");
  }
}else{
 return message.channel.send("You are not allowed to perform this action. (Admin or Mod only)");
}
},

// Get the content with author (steem) and permlink
getContent : function(author,permlink,idChannel) {
 steem.api.getContent(author,permlink, function (err,result) {
  if(!err && result) {
    try{ // try for check the json_metada
      let author = result.author,
          reputation = steem.formatter.reputation(result.author_reputation),
          dataContent = JSON.parse(result.json_metadata),
          tag = dataContent.tags,
          date = result.created,
          update = result.last_update,
          embed = new Discord.RichEmbed();
  
      embed.setAuthor(author + " (" + reputation + ")", )
           .setTitle(result.title)
           .setColor(0x00AE86)
           .setFooter("Catégorie : " + tag[0])
           .setTimestamp()
           .setURL("https://busy.org" + result.url)

      if(dataContent.image != "undefined" && dataContent.image != null){
       embed.setImage(dataContent.image[0])                                
      }

      if(date === update) {
        bot.channels.get(idChannel).send({embed});
        console.log("New post on " + tag[0] + " category !");
      }
    }catch(err){
      console.log("Error getContent : " + err)
      return
    }
  }
 });
},

// Get discussion before date
discussionBFD : function(value,author,limit,message) {
 if(value === "single-content"){
  steem.api.getDiscussionsByAuthorBeforeDate(author,null, new Date().toISOString().split('.')[0],limit , function(err, result) {
   if(typeof result != "undefined"){
    let rep = steem.formatter.reputation(result[0].author_reputation),
        data = JSON.parse(result[0].json_metadata),
        tag = data.tags,
        img = "",
        embed = new Discord.RichEmbed();
    
    if(typeof data.image != "undefined"){
      img = data.image;
    }

    embed.setColor("#7DDF64")
         .setTitle("**" + result[0].title + "**") 
         .setDescription("**pending payout : " + result[0].pending_payout_value + " - Votes : " + result[0].net_votes + "**")
         .setAuthor( result[0].author + " (" + rep + ")")
         .setURL("https://busy.org" + result[0].url)
    
    if(typeof img != "undefined"){
      embed.setThumbnail(img[0])
    }
    
    return message.channel.send({embed});
   }else{
    return message.channel.send("Sorry user not found !");
   }
  });
 }else{
   steem.api.getDiscussionsByAuthorBeforeDate(author,null, new Date().toISOString().split('.')[0],limit , function(err, result) {
    for(var i = 0; i < result.length; i++) {
      let author = result[i].author,
          data = JSON.parse(result[i].json_metadata),
          tag = data.tags,
          permlink = result[i].permlink;

     if (tag.indexOf(tagSearch) !== (-1) ) {
      if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
       message.channel.send("https://busy.org/" + tag[0] + "/@" + author + "/" + permlink);
      }else{
       return message.channel.send("Sorry you do not have access to this command for the moment.");
      }
     }
    }
   });
 }
},

//Get the rank from user
ranking : function(name, message) {
 steem.api.getAccounts([name], function(err, result) {
  if(typeof result != undefined ) {
   let vesting_shares = result[0].vesting_shares,
       name = result[0].name;

   steem.api.getDynamicGlobalProperties(function(err, result) {
    var total_vesting_shares=result.total_vesting_shares,
        total_vesting_fund=result.total_vesting_fund_steem,
        steem_power= steem.formatter.vestToSteem(vesting_shares, total_vesting_shares, total_vesting_fund),

        checkVest = vesting_shares.split(" "),
        checkVest = checkVest.shift();
        checkVest = parseFloat(checkVest),
        embed = new Discord.RichEmbed(),
        lastLevel = 0;

    embed.setTitle("@" + name)
         .setColor(0x00AE86)
         .setTimestamp()

    if(checkVest > 0 && checkVest <= redFish) {
      lastLevel = redFish - checkVest;
      embed.setDescription(" ``` Level : Red Fish \n VEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " VEST to become a MINNOW  ``` ");
      message.channel.send({embed});
    }if(checkVest > redFish && checkVest <= minnow) {
      lastLevel = dolphin - checkVest;
      embed.setDescription(" ```Level : Minnow \nVEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " VEST to become a DOLPHIN  ``` ");
      message.channel.send({embed});
    }if(checkVest > minnow && checkVest <= dolphin) {
      lastLevel = whales - checkVest;
      embed.setDescription(" ```Level : Dolphin \nVEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " VEST to become a ORCA  ``` ")
      message.channel.send({embed});
    }if(checkVest > dolphin && checkVest <= orca) {
      lastLevel = orca - checkVest;
      embed.setDescription(" ```Level : Orca \nVEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " VEST to become a WHALES  ``` ")
      message.channel.send({embed});
    }if(checkVest > orca ){
      embed.setDescription("```Wow with " + checkVest.toFixed("3") +" VEST or " + steem_power.toFixed("3") + " SP @" + name + " it's a big whales !! ```");
      message.channel.send({embed})
    }
   });
  }else{
   message.channel.send("Sorry user not found !");
  } 
 });
},

// Upvote function
upvote : function(author,permlink) {
 author = author.substring(1)
 steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
    if(err) {
        console.log(err);
    }else{
        console.log("Upvote done ! " + result);
    }
 });
},

// Getthe wallet from user
wallet : function(account,message) {
 steem.api.getAccounts(account, function(err, result) {
  if(result.length > 0) {
   let vesting_shares= result["0"].vesting_shares,
       delegated_vesting_shares= result["0"].delegated_vesting_shares,
       received_vesting_shares=result["0"].received_vesting_shares,
       name = result[0].name,
       steemBal = result[0].balance,
       sbdBal = result[0].sbd_balance,
       data = result[0].json_metadata;
   if(data !== "") {
    data = JSON.parse(data)
   }else{
    imgProfilURL = "https://image.noelshack.com/fichiers/2018/06/6/1518257301-question-mark-1751308-640.png"
   }
   if(data.profile !== undefined){
    imgProfilURL = data.profile.profile_image
   }
   var urlInconnu = "https://image.noelshack.com/fichiers/2018/06/6/1518257301-question-mark-1751308-640.png"

   steem.api.getDynamicGlobalProperties(function(err, result) {
    let total_vesting_shares=result.total_vesting_shares,
        total_vesting_fund=result.total_vesting_fund_steem,
        steem_power= steem.formatter.vestToSteem(vesting_shares, total_vesting_shares, total_vesting_fund),
        delegated_steem_power= steem.formatter.vestToSteem((received_vesting_shares.split(' ')[0]-delegated_vesting_shares.split(' ')[0])+' VESTS', total_vesting_shares, total_vesting_fund),
        delegation_in = steem.formatter.vestToSteem(received_vesting_shares.split(' ')[0], total_vesting_shares, total_vesting_fund),
        deleg = delegated_steem_power - delegation_in,
        delegWal = deleg + delegation_in,
        embed = new Discord.RichEmbed();

    embed.setDescription( "**Wallet** **@" + name + "**" + "\n\n" + 
                         "**" + steemBal + "**\n\n" + 
                         "**"+ steem_power.toFixed("3") +" STEEM POWER**" + "\n" + 
                         "**(" + delegWal.toFixed("3") + " SP)** \n\n" + 
                         "**" + sbdBal + "**\n\n" + 
                         "**Delegation In : \n ---------------- \n" + delegation_in.toFixed("3") + " STEEM POWER**")
         .setURL("https://steemit.com/@" + name)
    if(data.profile === undefined) {
     console.log("No data.profile avaible");
    }if(urlInconnu === imgProfilURL){
      embed.setThumbnail(imgProfilURL)
    }else{
     embed.setThumbnail(imgProfilURL) 
    }
    message.channel.send({embed});     
   });
  }else {
   message.channel.send("User not found !")
  }      
 });      
}
}