const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const palette = require('./commands/palette.js');
const view = require('./commands/view.js');
const help = require('./commands/help.js');
const filter = require('./commands/filter.js');

const generateEmbed = require('./util/generateEmbed.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Serving ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity('Use **help to get started')
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', async msg => {
    if(msg.content.slice(0, 2) != config.prefix) return;
    const args = msg.content.slice(2).replace(/\s+/g, ' ').split(' ').map(str => {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(str)
            ? str : str.toLowerCase();
    });

    if(args[0] == 'palette'){
        palette(msg, args);
    } else if(args[0] == 'view'){
        view(msg, args);
    } else if(args[0] == 'help'){
        help(msg, args);
    } else if(args[0] == 'filter'){
        filter(msg, args);
    } else {
        const embed = await generateEmbed(
            `Error: unknown command`, 
            `Use \`**help\` for a list of valid commands.`,
            16711680);
        msg.channel.send(embed);
        return;
    }
});

client.login(config.token);