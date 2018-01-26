const Discord = require("discord.js")
const steem = require("steem")
const config = require("./config.json")
const bot = new Discord.Client()

steem.api.setOptions({url: "https://api.steemit.com"})

bot.on("ready", () => {
    console.log("Ready !") 
    bot.user.setActivity("Steemit for life")
});

bot.on("message", async message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    if(message.author.bot) return

    if(message.content.indexOf(config.prefix) !== 0) return

    if(command === "bal-steem"){
        account = message.content.split(" ")
        account.shift()

        steem.api.getAccounts(account, function(err, result) {
            if(result.length > 0) {
                let messageBalance = "STEEM amount available from **" + account + "** =  **"
                message.channel.send(messageBalance + " " + result[0]["balance"] + "**")
            }else {
                message.channel.send("User not found !")
            }      
        });            
    }

    if(command === "bal-sbd"){
        account = message.content.split(' ')
        account.shift()

        steem.api.getAccounts(account, function(err, result) {
            if(result.length > 0) {
                let messageBalance = "SBD amount available from **" + account + "** =  **"
                message.channel.send(messageBalance + result[0]['sbd_balance']+ "**")
            }else {
                message.channel.send("User not found !")
            }     
        });            
    }

    if(command === "bal-sp"){
        account = message.content.split(" ")
        account.shift()

        steem.api.getAccounts(account, function(err, result) {
            if( result.length > 0 ) {
                messageBalance = "STEEM POWER amount available from **" + account + "** =  **"

                vests = result[0]["vesting_shares"]
                vests.replace(" VESTS", "")
                vests = parseFloat(vests)
                vests = vests * 0.00048845018732699
                vests = vests.toFixed(3)

                message.channel.send(messageBalance + vests + " STEEM POWER**")
            }else{
                message.channel.send("User not found !");
            }
        });
    }
    
    if (command === "last-payout"){
        element = message.content.split(" ")
        element.shift()
        element = String(element)

        steem.api.getDiscussionsByAuthorBeforeDate(element,null, new Date().toISOString().split('.')[0],1 , function(err, result) {
            if(result !== undefined && result.length > 0 ){
                message.channel.send("Pending payout value from **" + result[0]["author"] + "** ***title*** : **" + result[0]["title"] +  "** = **" + result[0]['pending_payout_value'] + "**")
            }else{
                message.channel.send("User not found !")
            }
        });
    }

    if(command === "last-post"){
        element = message.content.split(" ")
        element.shift()
        element = String(element)

        steem.api.getDiscussionsByAuthorBeforeDate(element,null, new Date().toISOString().split('.')[0],1 , function(err, result) {
            if(result !== undefined && result.length > 0){
                tag = result[0]["category"]
                auteur = result[0]["author"]
                permlink = result[0]["permlink"]
                
                message.channel.send("https://steemit.com/" + tag + "/@" + auteur + "/" + permlink )
            }else{
                message.channel.send("User not found !")
            }      
        });
    }

    if(command === "created" ){
        tag = message.content.split(" ")
        tag.shift()
        limit = tag.pop()
        limit = parseInt(limit)

        if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
            if(limit > 0 && limit <= 15) {    
                steem.api.getDiscussionsByCreated({"tag": tag[0], "limit": limit}, function(err, result) {
                    if(result){
                        for (i = 0; i < result.length; i++) {
                            author = result[i]["author"]
                            permlink = result[i]["permlink"]
                            message.channel.send("Number **" + (i+1) + "** in **Created** from tag **" + tag + "** by **@" + author + "** : https://steemit.com/" + tag + "/@" + author + "/" + permlink)
                        }                
                    }else{
                        message.channel.send("Command invalid ! Please try again or type $help")
                    }  
                });
            }else{
                return message.channel.send("Sorry the limit from this command is min 1 post and max 10 post ! Try again")
            }
        }else{
            message.channel.send("You are not authorized from this action !")
        }
    }

    if(command === "trending" ){
        tag = message.content.split(" ")
        tag.shift()
        limit = tag.pop()
        limit = parseInt(limit)

        if(message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_CHANNELS") ){
            
            if(limit > 0 && limit <= 15) {    
                steem.api.getDiscussionsByTrending({"tag": tag[0], "limit": limit}, function(err, result) {
                    if(result){
                        for (i = 0; i < result.length; i++) {
                            author = result[i]["author"]
                            permlink = result[i]["permlink"]
                            message.channel.send("Number **" + (i+1) + "** in **Trending** from tag **" + tag + "** by **@" + author + "** : https://steemit.com/" + tag + "/@" + author + "/" + permlink)
                        }                
                    }else{
                        message.channel.send("Command invalid ! Please try again or type $help")
                    }  
                });
            }else{
                return message.channel.send("Sorry the limit from this command is min 1 post and max 10 post ! Try again")
            }
        }else{
            message.channel.send("You are not authorized from this action !")
        }
    }

    if(command === "price"){
        steem.api.getOrderBook(1, function(err, result) {
            asks = parseFloat(result["asks"][0]["real_price"]).toFixed(5)
            bids = parseFloat(result["bids"][0]["real_price"]).toFixed(5)
            message.channel.send("From **1 SBD** in internal market : **Asks** =  **" + asks + "** STEEM **Bids** = **" + bids + "** STEEM" );
          });
    }

    if(command === "help"){
        message.channel.send("**Function of the bot** \n" +
        "------------------- \n" + 
        "**$last-post** followed by the author of your choice, displays the link to the author's latest article.\n \n" + 
        "**$price** displays the Steem value of an SBD at internal market price \n \n" +
        "**$trending** takes **two parameters** separated by **spaces.** the first one is the **tag** you want to display \n" +
        "and the second one is the **number** (min = 1, max = 15) of items to display. \n" +
        "**This option is reserved for the administrator and anyone who has permission to edit a channel.** \n \n" + 
        "**$created** takes **two parameters** separated by **spaces.** the first one is the **tag** you want to display \n" +
        "and the second one is the **number** (min = 1, max = 15) of items to display. \n" +
        "**This option is reserved for the administrator and anyone who has permission to edit a channel.**\n \n" + 
        "**$bal-steem** followed by the steemit username of your choice to display its **Steem balance.** \n \n" + 
        "**$bal-sbd** followed by the steemit username of your choice to display its **SBD balance.**  \n \n" + 
        "**$bal-sp** followed by the steemit username of your choice to display its **Steem Power balance.**  \n \n" + 
        "**$last-payout** displays the pending payment of the last article of the author of your choice \n \n" +
        "**Each command ($...) that requires a parameter must be separated by a space**")
    }
});

bot.login(config.token);
