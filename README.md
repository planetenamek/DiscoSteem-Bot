# DiscoSteem-Bot (0.1.0)

**A Discord bot that interacts with the Steem blockchain API**

## Function of the bot

**To make it simple, here is the result of the **$help** command from DiscoSteem-Bot, you will find all the features supported for the moment.**

- **$last-post** followed by the author of your choice, displays the link to the author's latest article.
- **$created** takes two parameters separated by spaces. the first one is the tag you want to display 
and the second one is the number (min = 1, max = 15) of items to display. 
***This option is reserved for the administrator and anyone who has permission to edit a channel.***
- **search** does an article search based on the parameters you specify. ***- Ex: $search planetenamek fr 30 -*** will search in my last 30 articles and return all articles containing the tag **FR**
- **$bal** displays the wallet of the Steem account of your choice. ***- Ex: $bal planetenamek -*** will display my wallet.
***Each command ($...) that requires a parameter must be separated by a space***

### StreamOperation

You can now display the Steemit articles of your choice directly on your Discord server. Change the settings to suit your needs in the **config.json** file :

- **altTags :** Modify the tags according to your needs. You can add or remove them. Do not forget to add each time the identifier of the channel on which you want to retrieve the article.
- **principalTag :** Used to retrieve items based on a specific tag. For example, I use it to filter articles from the Francophone community on #fr
- **principalChan** Enter here the channel id on which to receive articles that pass on the **principalTag** but not on altTags.
- **maintenance :** Takes as parameter the channel id of your choice. It allows you to recover errors directly on your Discord server. 

Convenient in case of crash to receive immediate notification. I use it on a private channel so that visitors can't see errors and tests.

You can specify **a single principalTag** and as **many altTags as you like**. The bot will sort the articles and send them to the channels you specify in the **config.json** file.

## Install 
You will need a Node JS environment 

- npm install

## Configuration

Go to the config file.json to add your Discord API application key and configure the ids of your Discord channels.


## More informations

https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-new-features-to-animate-your-discord-server
