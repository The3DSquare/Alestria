const sendPalette = require('../util/sendPalette.js');
const generateEmbed = require('../util/generateEmbed.js');

const gradients = {
    oceanGem: require('./gradient/oceanGem.js'),
    autumn: require('./gradient/autumn.js'),
    summerGarden: require('./gradient/summerGarden.js'),
    renaissanceFair: require('./gradient/renaissanceFair.js'),
    beach: require('./gradient/beach.js'),
    lavenderField: require('./gradient/lavenderField.js'),
    squashPatch: require('./gradient/squashPatch.js'),
    mint: require('./gradient/mint.js'),
    earth: require('./gradient/earth.js'),
    random: require('./gradient/random.js')
}

const gradientNames = {
    'oceangem': 'oceanGem',
    'autumn': 'autumn',
    'summergarden': 'summerGarden',
    'renaissancefair': 'renaissanceFair',
    'beach': 'beach',
    'lavenderfield': 'lavenderField',
    'squashpatch': 'squashPatch',
    'mint': 'mint',
    'earth': 'earth',
    'random': 'random',
};

const properNames = {
    'oceangem': 'Ocean Gem',
    'autumn': 'Autumn',
    'summergarden': 'Summer Garden',
    'renaissancefair': 'Renaissance Fair',
    'beach': 'Beach',
    'lavenderfield': 'Lavender Field',
    'squashpatch': 'SquashPatch',
    'mint': 'Mint',
    'earth': 'Earth',
    'random': 'Random',
}

module.exports = async (message, length, args) => {
    if(args[3] == undefined || Object.keys(gradientNames).includes(args[3])){
        const type = args[3] == undefined ? 'random' : gradientNames[args[3]];
        sendPalette(message, gradients[type](length), `Gradient: ${properNames[args[3] == undefined ? 'random' : args[3]]}`);
    } else {
        const embed = await generateEmbed(
            `Error: Unknown gradient type **'${args[3]}'**`, 
            `Use \`**help gradient\` for more information.`,
            16711680);
        message.channel.send(embed);
    }
}