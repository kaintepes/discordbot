const Discord = require('discord.js');
const client = new Discord.Client();
var streaming = [];
const role = 'YOUR ROLE ID YOU WANT ASSIGNED';
const config = require("./config.json");

function checkStream(member) {
    var str = member.presence.game.details;
    if (str) {
        var lower = str.toLowerCase();
        lower = lower.replace(/\s+/g, '');
        var swt = lower.search("YOUR COMMUNITY NAME");
        if (swt != -1) {
            if (!member.roles.has(role)) {
                let cstr        = member.presence.game.url;
                cstr = cstr.split(".tv/").pop();
                let server = "Other Activities";
                if (member.presence.game.state == "Grand Theft Auto V") {
                    server = "Your GTA Server Name"
                } else if (member.presence.game.state == "Red Dead Redemption 2") {
                    server = "Your RDR Server Name"
                } // This can be expanded with more Else Ifs for any game you want.
                const embed = new Discord.RichEmbed()
                    .setColor('#0b4145')
                    .setTitle(member.presence.game.details)
                    .setURL(member.presence.game.url)
                    .setAuthor(member.displayName,member.user.avatarURL,member.presence.game.url)
                    .setDescription("Server: "+server+" ("+member.presence.game.state+")")
                    .addField("URL:", member.presence.game.url)
                    .setThumbnail(member.user.avatarURL)
                    .setImage('https://static-cdn.jtvnw.net/previews-ttv/live_user_'+cstr+'-480x270.jpg')
                    .setTimestamp()
                    .setFooter('Thank you for streaming on YOUR COMMUNITY NAME!')
                client.channels.get('YOUR CHANNEL ID').send(embed);
                member.addRole(role).catch(console.error);
            }
        } else {
                member.removeRole(role);
        }
    }
}

client.on('ready', () => {
    client.user.setActivity('Custom Message');
});

client.on("message", message => {
    if (message.author.bot) return;
  
    if (message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(command === 'ping') {
      message.channel.send('Pong!');
    }
});

client.on('presenceUpdate', (oldMember, newMember) => {
    if (newMember.presence.game != null) {
        if (newMember.presence.game.type == 1) {
            checkStream(newMember);
        }
    } else {
        if (newMember.roles.has(role)) {
            newMember.removeRole(role);
        }
    }
});

client.login('YOUR DISCORD HOOK');
