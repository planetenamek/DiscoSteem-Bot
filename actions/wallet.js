const Discord = require("discord.js");
const steem = require("steem");

exports.wallet = function(account,message) {
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