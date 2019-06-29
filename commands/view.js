const sendPalette = require('../util/sendPalette.js');
const generateEmbed = require('../util/generateEmbed.js');

module.exports = async (message, args) => {
    if(args[1] == undefined){
        const embed = await generateEmbed(
            `Error:`, 
            `No color values given.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    const colors = args.slice(1);

    if(!colors.every(color => /\b[0-9A-F]{6}\b/gi.test(color))){
        const errorEmbed = await generateEmbed('Error:', 'Invalid hex input.', 16711680);
        message.channel.send(errorEmbed);
        return;
    }

    sendPalette(message, colors, 'View'); 
}