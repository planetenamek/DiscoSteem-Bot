# DiscoSteem-Bot
**A Discord bot that interacts with the Steem blockchain API**

## Function of the bot

**To make it simple, here is the result of the **$help** command from DiscoSteem-Bot, you will find all the features supported for the moment.**

- **$last-post** followed by the author of your choice, displays the link to the author's latest article.
- **$price** displays the Steem value of an SBD at internal market price  
- **$trending** takes two parameters separated by spaces. the first one is the tag you want to display and the second one is the number (min = 1, max = 15) of items to display. 
***This option is reserved for the administrator and anyone who has permission to edit a channel.*** 
- **$created** takes two parameters separated by spaces. the first one is the tag you want to display 
and the second one is the number (min = 1, max = 15) of items to display. 
***This option is reserved for the administrator and anyone who has permission to edit a channel.***
- **$bal-steem** followed by the steemit username of your choice to display its Steem balance. 
- **$bal-sbd** followed by the steemit username of your choice to display its SBD balance.
- **$bal-sp** followed by the steemit username of your choice to display its Steem Power balance.
- **$last payout** displays the pending payment of the last article of the author of your choice 
***Each command ($...) that requires a parameter must be separated by a space***

## Install 
You will need a Node JS environment 

npm install discord.js --save 
npm install steem --save 

## Configuration

Go to the config.json file to add your Discord API application key. 

#### More Information

https://steemit.com/utopian-io/@planetenamek/construction-from-new-steem-discord-bot-discosteem-bot
