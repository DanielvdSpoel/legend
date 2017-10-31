const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs"); // Gets the fs Package

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`>help || on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`>help || on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`>help || on ${client.guilds.size} servers`);
});

bot.on('guildCreate', (guild) => { // If the Bot was added on a server, proceed
    if (!guildConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
	guildConf[guild.id] = {
		prefix: config.prefix
	}
     fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
     	if (err) console.log(err)
	})
});


bot.on('guildDelete', (guild) => { // If the Bot was removed on a server, proceed
     delete guildConf[guild.id]; // Deletes the Guild ID and Prefix
     fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
     	if (err) console.log(err)
	})
});

client.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(command === "beonline") {
    message.channel.send("beonline");
  }
});
bot.on('message', (message) => {
    if (message.channel.type === "dm" || msg.author.bot || msg.author === client.user) return; // Checks if we're on DMs, or the Author is a Bot, or the Author is our Bot, stop.
    var args = message.content.split(' ').slice(1); // We need this later
    var command = message.content.split(' ')[0].replace(guildConf[message.guild.id].prefix, ''); // Replaces the Current Prefix with this

    if (command === "ping") { // If your command is <prefix>ping, proceed
	message.channel.send('pong!') // Reply pong!
    } else
    if (command === "prefix") {
	guildConf[message.guild.id].prefix = args[0];
	if (!guildConf[message.guild.id].prefix) {
		guildConf[message.guild.id].prefix = config.prefix; // If you didn't specify a Prefix, set the Prefix to the Default Prefix
	}
     fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
     	if (err) console.log(err)
	})
  }
});
client.on("message"), async message => {
  const swearWords = ["darn", "shucks", "frak", "shite"];
  if( swearWords.some(word => message.content.includes(word)) ) {
    message.reply("Oh no you said a bad word!!!");
  }
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "botinfo") {
    message.channel.send(`Ik heb op dit moment  ${client.users.size} gebruikers, in ${client.channels.size} channels in ${client.guilds.size} servers.`);
  }
  if(command === "userdata") {
    const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const member = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
  if (!member) return msg.reply("Please provide a vaild Mention or USER ID");
  let bot;
  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "No";
  }
  const embed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(`${member.user.displayAvatarURL()}`)
    .setAuthor(`${member.user.tag} (${member.id})`, `${member.user.avatarURL()}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Bot?", `${bot}`, true)
    .addField("Guild", `${bot}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("Joined At", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .addField("Created At", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true);

  msg.channel.send({
    embed
  });
  }
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, je hebt helaas geen permission voor dit");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Je moet wel iemand uit de server mentionen!");
    if(!member.kickable)
      return message.reply("Ik kan deze gebruiker niet bannen. Heeft  hij een hogere rol? en heb ik kick permission?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Je moet wel een reden invoeren voor de kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} Ik kon deze persoon niet bannen omdat: ${error}`));
    message.reply(`${member.user.tag} is gekickt door ${message.author.tag} met als reden: ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, Je hebt helaas geen permission voor dit!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Je moet wel iemand uit de server mentionen!");
    if(!member.bannable)
      return message.reply("Ik kan deze gebruiker niet bannen. Heeft hij een hogere rank dan mij? en heb ik ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Je moet een reden geven voor de ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} Ik kan deze persoon niet bannen omdat: ${error}`));
    message.reply(`${member.user.tag} is geband door ${message.author.tag} met als reden: ${reason}`);
  }
  if(command === "avatar") {
    const user = message.mentions.users.first();
    if (!user) {
      message.reply(message.author.avatarURL);
    } else {
      message.reply(user.avatarURL)
    };
  }
  if(command === "help") {
      if (args[0] === "moderation") {
        message.reply("Moderation help:")
      } else { message.channel.send({embed: {
          color: 0xFF8000,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [{
              name: "!help",
              value: "Krijg dit bericht"
            },
            {
              name: "!help moderation",
              value: "Krijg alle moderation commands"
            },
            {
              name: "!help fun",
              value: "Krijg alle fun commands"
            },
            {
              name: "!help music",
              value: "Krijg alle music help",
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Legend"
          }
        }
      });}

    }
    if(command === "credits") {
      message.channel.send({embed: {
            color: 0xFF8000,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
                name: "DanielvdSpoel (Bot Owner)",
                value: "Hij heeft de basis gemaakt"
              },
              {
                name: "Kolkies",
                value: "Heeft geholpen bij bugs"
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Legend"
            }
          }
        });}
  if(command === "ping") {
    const Discord = require('discord.js');
    let embed = new Discord.RichEmbed()

    .setColor(0xFF8000)
    .addField(':ping_pong: Pong!', `Took: (**${Date.now() - message.createdTimestamp}**) ms\n1000 ms = 1 second`)
    message.channel.send({embed});
  }
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});
client.on('guildMemberAdd', member => {
  console.log(`${member.user.tag} has joined the ${member.guild.name} server`);
  var welcomeChannel = member.guild.channels.find('name', 'member-log')
  if (welcomeChannel != null) {
  const embed = new Discord.RichEmbed()
    .setColor(0x15FF00)
    .setTimestamp()
    .setDescription(`Welcome ${member.user} to the ${member.guild.name}!!\n${dommerd} and enjoy your time here`)
    welcomeChannel.send({embed})
} else {
return
};
});
client.login(config.token);
