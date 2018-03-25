const Discord = require("discord.js");
const steem = require("steem");

var redFish = 999999,
minnow = 9999999, 
dolphin = 99999999, 
orca = 999999999, 
whales = 9999999999;



exports.ranking = function(name, message) {
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
      embed.setDescription(" ``` Level : Red Fish \n VEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " to become a MINNOW  ``` ");
      message.channel.send({embed});
    }if(checkVest > redFish && checkVest <= minnow) {
      lastLevel = dolphin - checkVest;
      embed.setDescription(" ``` Level : Minnow \n VEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " to become a DOLPHIN  ``` ");
      message.channel.send({embed});
    }if(checkVest > minnow && checkVest <= dolphin) {
      lastLevel = whales - checkVest;
      embed.setDescription(" ``` Level : Dolphin \n VEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " to become a ORCA  ``` ")
      message.channel.send({embed});
    }if(checkVest > dolphin && checkVest <= orca) {
      lastLevel = orca - checkVest;
      embed.setDescription(" ``` Level : Orca \n VEST : " + checkVest.toFixed("3") +  " / " + steem_power.toFixed("3") + " SP. \n" + lastLevel.toFixed("3") + " to become a WHALES  ``` ")
      message.channel.send({embed});
    }if(checkVest > orca ){
      embed.setDescription("``` Wow with " + checkVest.toFixed("3") +" or " + steem_power.toFixed("3") + " @" + name + " it's a big whales !! ```");
      message.channel.send({embed})
    }
   });
  }else{
   message.channel.send("Sorry user not found !");
  } 
 });
}