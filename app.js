var Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");
let userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
//ping command
bot.on("message", message => {
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = ">"

  //antibot commands
  if (sender.id === "345148779911053312") {
    return;
  }

  //commands
  if (msg === prefix + "PING") {
    message.channel.send({embed:{
      title:"Ping!",
      description:"Pong!",
      color:0xFF8000
    }})
  }
  if (msg === prefix + "HELP") {
    message.channel.send({embed:{
      title:"Help:",
      description:"Here you can find all my commands",
      color: 0xFF8000,
      fields:[
        {
          name: ">Help",
          value:"See all my commands",
          inline: true
        }
      ]
    }})
  }

  if (message.channel.id === "356903213804552192") {
    if (isNaN(message.content)) {
      message.delete()
      message.author.send("Please only post the number of the message")
    }
  }
  if (msg.includes('HOMO')) {
    message.delete();
    message.author.send('Het woord **homo** is helaas geblokeert')
}
  if (!userData[sender.id]) userData[sender.id] = {
    messagesSent: 0
  }
  userData[sender.id].messagesSent++;
  fs.writeFile("storage/userData.json", JSON.stringify(userData), err => {
    if (err) console.error(err);
  });
});

bot.on("guildMemberAdd", member => {
  console.log("User" + member.user.username + "is de discord gejoind ")

  var role = member.guild.roles.find("name", "User");
  member.addRole(role)
  member.guild.channel.get("346542966376235008").send("**" + member.user.username + "**, is de server gejoind");
});

bot.on("guildMemberRemove", member => {
  member.guild.channel.get("346542966376235008").send("**" + member.user.username + "**, heeft de server verlaten");

});

//startupmessage
bot.on("ready", () => {
  console.log("Legend is succesvol opgestart")
  bot.user.setStatus("idle")
  bot.user.setGame("Legend.DanielvdSpoel.nl || >help")
});

//login
bot.login("MzQ1MTQ4Nzc5OTExMDUzMzEy.DJGNIg.fGMY3bvtViBAK19c0YeizQnHHX0")
//token: MzQ1MTQ4Nzc5OTExMDUzMzEy.DJGNIg.fGMY3bvtViBAK19c0YeizQnHHX0