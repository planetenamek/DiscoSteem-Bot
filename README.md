# DiscoSteem-Bot (0.3.1)

**A Discord bot that interacts with the Steem blockchain API**

## Release 0.3.1

### New implementations

DiscoSteem-Bot is constantly evolving, in this update we have added several features that we will detail below.

- $display-list : With this function you can now display the contents of the file (post-saved.json) containing all the selections of articles made by the curators.
- $delete-post : With this function you can now delete an element contained in post-saved.json according to its ID. 
- $delete-all : This function resets the post-saved.json file to zero.
- $count : This function simply counts the number of articles you have selected and which are in post-saved.json
- $more-info : This feature will allow you to display a list of links to the most visited sites by Steemians. Of course you can mention an @ and the links will be displayed with your @ in the link, which will allow you to consult directly your information or that of any Steemians.
- We also added a new filter on the StreamOp function, you can now follow the votes of an account on a specific tag. The bot will display a message in a channel that you have defined beforehand, with the different information on the voted article (voting weight, author and post link). To activate this function, simply configure the new parameters in the config.json file (trackerVoter and tagTrackerVoter)

### Bug fixing

- The setGame (deprecated ) function has been modified by the setActivity function.

### About the code

Compared to version 0.2.1, we have reviewed the entire code architecture. You will notice in the./actions/ folder that we have added two: 

- discord-module.js
- steem-module.js

The functions being more and more numerous, we wanted to keep a clear code. You will therefore find in each file the functions specific to each platform (steem, discord). This makes it easier to read and add new functions. 

You will notice in particular that the code in cmd-bot.js is much clearer because we no longer have this gigantic list of "require".

## Function of the bot

**To make it simple, here is the result of the **$help** command from DiscoSteem-Bot, you will find all the features supported for the moment.**

- **$last-post** followed by the author of your choice, displays the link to the author's latest article.
- **$created** takes two parameters separated by spaces. the first one is the tag you want to display.
and the second one is the number (min = 1, max = 15) of items to display. 
***This option is reserved for the administrator and anyone who has permission to edit a channel.***
- **$search** does an article search based on the parameters you specify. ***- Ex: $search planetenamek fr 30 -*** will search in my last 30 articles and return all articles containing the tag **FR**.
- **$bal** displays the wallet of the Steem account of your choice. ***- Ex: $bal planetenamek -*** will display my wallet.
***Each command ($...) that requires a parameter must be separated by a space***.
- **$curate_Description of your post here_Full Steemit link to your post** saves those information on "curateChan" or on "savingSubmissionChan".
- **$clear** deletes messages from the channel you are on. **- Ex : $clear 30 -**.
- **$rank** Displays the rank of the user of your choice. (minnow, dolphin, orca).
- **$display-post** Displays the contents of the post-saved.json file.
- **$delete-post** Delete a post present in post-saved.json according to its ID.
- **$delete-all** Deletes all content in post-saved.json.
- **$count** Count the number of elements present in post-saved.json
- **$more-info** Displays a link list containing many related Steem accounts (steemitboard, steemworld etc..) 

### StreamOperation

You can now display the Steemit articles of your choice directly on your Discord server. Change the settings to suit your needs in the **config.json**.

You can specify **a single principalTag** and as **many altTags as you like**. The bot will sort the articles and send them to the channels you specify in the **config.json** file.

You can also track the votes of the account you use for post steem curation on a specific tag. The bot will display a message on the channel you have chosen. This message will contain the different information about the vote in question.

## Install 

You will need a Node JS environment 

### Heroku

If you are using Heroku please read the following content before deploying your project. The **config.json file contains sensitive information**, which you should not put in everyone's hands. Follow the steps to configure your environment variables before continuing with the installation.

https://devcenter.heroku.com/articles/config-vars

### Server administrator

Don't forget the basic safety measures, here is a little reminder.

- https://support.rackspace.com/how-to/linux-server-security-best-practices/

- **npm install**

## Configuration

- mv config-example.json config.json

- Go to the config.json file to add your Discord API application key and configure the ids of your Discord channels.

```
{ 
  "token"  : "YOUR TOKEN DISCORD", 
  "prefix" : "$", // prefix for all command's
  "altTags" : {"life" : "ID FROM THE CHAN", "blog" : "ID FROM THE CHAN", "photography" : "ID FROM THE CHAN" },
  "principalTag" : "steemit",
  "principalChan" : "ID FROM THE CHAN",
  "curationChan" : "ID FROM THE CHAN",
  "postSubmissionChan" : "ID FROM THE CHAN",
  "savingChan" : "ID FROM THE CHAN",
  "savingSubmissionChan" : "ID FROM THE CHAN",
  "maintenance" : "ID FROM THE CHAN",
  "checkEmoji" : "✅",
  "voterID" : "YOUR USER DISCORD ID",
  "weightVote" : 10000,
  "wif" : "YOUR PRIVATE POSTING KEY",
  "voter" : "YOUR STEEM USERNAME",
  "trackerVoter" : "@ OF THE ACCOUNT TO BE TRACKED ",
  "tagTrackerVoter" : "fr"
}
```

## Run 

If you manage your own server we recommend using pm2

- pm2 start app.js

## More informations

### [0.3.1](https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-0-2-1-management-of-optimized-curation-data)
### [0.2.1](https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-0-2-1-back-up-your-curation-data-upvote-with-reaction-and-more)
### [0.1.0](https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-new-features-to-animate-your-discord-server)
### [0.0.1](https://steemit.com/utopian-io/@planetenamek/construction-from-new-steem-discord-bot-discosteem-bot)

**We remind you that you can test this bot on this server --> https://discord.gg/qbqP3**
