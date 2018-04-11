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

#### For all users: 

Configure in config.json the parameter **postSubmissionChan** all links and descriptions posted on this channel will go directly to the channel you configured with **savingSubmissionChan**.

#### For moderators and curators

Configure in config.json the parameter **curationChan** all links and descriptions posted on this channel will go directly to the channel you have configured with **savingChan**.

In addition to being saved in a different channel, the data will be saved in the file **post-saved.json** which will allow you to process them much more quickly and simply.

**WARNING** : For more consistency think of configuring the permissions of your **curationChan** so that nobody can write there, but simply add reactions. This will allow you to have a very clean channel and therefore a better visibility to view the selected articles.

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
- **$curate_Description of your post here_Full Steemit link to your post** saves those information on "curateChan" or on "savingSubmissionChan"
- **$clear** deletes messages from the channel you are on. **- Ex : $clear 30 -**
- **$rank** Displays the rank of the user of your choice. (minnow, dolphin, orca)  

### StreamOperation

You can now display the Steemit articles of your choice directly on your Discord server. Change the settings to suit your needs in the **config.json**.

You can specify **a single principalTag** and as **many altTags as you like**. The bot will sort the articles and send them to the channels you specify in the **config.json** file.

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
  "voter" : "YOUR STEEM USERNAME"
}
```

## Run 

If you manage your own server we recommend using pm2

- pm2 start app.js

## More informations

https://steemit.com/utopian-io/@planetenamek/discosteem-bot-update-0-2-1-back-up-your-curation-data-upvote-with-reaction-and-more
