# DiscoSteem-Bot (0.2.1)

**A Discord bot that interacts with the Steem blockchain API**

## Release 0.2.1

### New implementations

DiscoSteem-Bot now offers an upvote system from your Discord server. To vote for an article you can simply add a reaction,that you have previously defined, to a Steemit/Busy link.

The curate function has been improved to allow data to be stored in a JSON file. This allows simple data reuse and also allows more efficient processing.

We have implemented the $rank function to display a Steem user's rank. The function calculates the VEST and returns the rank and number of VEST remaining to reach the next level.

### Bug fixing

Stream's function was struggling to last over time. We have corrected the major problems and now you can Streamer the Steem blockchain without interruption.

We also added a function allowing the bot to detect its disconnection, which allows us to restart it immediately.

We've added a feature that allows you to delete messages quickly and easily. With the $clear function add the number of messages (max 100) to delete and the bot will clean your Discord channel in a split second.

## Function of the bot

**To make it simple, here is the result of the **$help** command from DiscoSteem-Bot, you will find all the features supported for the moment.**

- **$last-post** followed by the author of your choice, displays the link to the author's latest article.
- **$created** takes two parameters separated by spaces. the first one is the tag you want to display 
and the second one is the number (min = 1, max = 15) of items to display. 
***This option is reserved for the administrator and anyone who has permission to edit a channel.***
- **search** does an article search based on the parameters you specify. ***- Ex: $search planetenamek fr 30 -*** will search in my last 30 articles and return all articles containing the tag **FR**
- **$bal** displays the wallet of the Steem account of your choice. ***- Ex: $bal planetenamek -*** will display my wallet.
***Each command ($...) that requires a parameter must be separated by a space***
- **$curate_Description of your post here_Full Steemit link to your post** saves those information on "curateChan"
- **$clear** deletes messages from the channel you are on. **- Ex : $clear 30 -**
- **$rank** Displays the rank of the user of your choice. (minnow, dolphin, orca)  

### StreamOperation

You can now display the Steemit articles of your choice directly on your Discord server. Change the settings to suit your needs in the **config.json** file :

- **altTags :** Modify the tags according to your needs. You can add or remove them. Do not forget to add each time the identifier of the channel on which you want to retrieve the article.
- **principalTag :** Used to retrieve items based on a specific tag. For example, I use it to filter articles from the Francophone community on #fr
- **principalChan** Enter here the channel id on which to receive articles that pass on the **principalTag** but not on altTags.
- **maintenance :** Takes as parameter the channel id of your choice. It allows you to recover errors directly on your Discord server. 
- **curateChan :** Enter here the channel id on which to receive curation proposition from your community **(with $curate post)**
Convenient in case of crash to receive immediate notification. I use it on a private channel so that visitors can't see errors and tests.

You can specify **a single principalTag** and as **many altTags as you like**. The bot will sort the articles and send them to the channels you specify in the **config.json** file.

## Install 
You will need a Node JS environment 

- npm install

## Configuration

- Go to the config.json file to add your Discord API application key and configure the ids of your Discord channels.

## Run 

- node app.js


## More informations

https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-new-features-to-animate-your-discord-server
