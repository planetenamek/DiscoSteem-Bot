const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

const wif = config.wif;
const weight = config.weightVote;
const voter  = config.voter;

exports.upvote = function(author,permlink) {
 author = author.substring(1)
 steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
    if(err) {
        console.log(err);
    }else{
        console.log("Upvote done ! " + result);
    }
 });
}

