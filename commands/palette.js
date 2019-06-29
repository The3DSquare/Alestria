const sendPalette = require('../util/sendPalette.js');
const generateEmbed = require('../util/generateEmbed.js');
const hsl2hex = require('../util/hsl2hex.js');
const random = require('../util/randomInt.js');

const pastelGenerator = require('../generator/pastel.js');
const pastelTintedGenerator = require('../generator/pastelTinted.js');
const goldenRatioGenerator = require('../generator/goldenRatio.js');
const toneGenerator = require('../generator/toneOffset.js');
const shadowLightGenerator = require('../generator/shadowLight.js');
const harmonicGenerator = require('../generator/harmony.js')
const triadGenerator = require('../generator/triad.js');
const gradientGenerator = require('../generator/gradient.js');

const paletteNames = [
    'pastel',
    'tintedpastel',
    'neon',
    'tone',
    'shadowlight',
    'harmonic',
    'triad',
    'gradient'
];

module.exports = async (message, args) => {
    if(args[1] == undefined || isNaN(args[1])){
        const embed = await generateEmbed(
            `Error: Missing or Invalid color count`, 
            `Use \`**help palette\` for more information.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    if(args[2] == undefined || !paletteNames.includes(args[2])){
        const embed = await generateEmbed(
            `Error: Missing or Invalid palette type`, 
            `Use \`**help palette\` for more information.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    const length = parseInt(args[1]);

    if(length > 50){
        const embed = await generateEmbed(
            `Error: Color count exceeds 50`, 
            `The max number of colors in a palette one can generate is 50.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    if(length <= 0){
        const embed = await generateEmbed(
            `Error: Color count less than 1.`, 
            `The minimum color count is 1.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    const type = args[2];

    if(type == 'pastel'){
        sendPalette(message, pastelGenerator(length), 'Pastel');

    } else if(type == 'tintedpastel'){
        const tint = [Math.random(), 1, 0.4 + random(0, 0.25)];
        sendPalette(message, pastelTintedGenerator(length, tint), 'Tinted Pastel');

    } else if(type == 'neon'){
        sendPalette(message, goldenRatioGenerator(length), 'Neon');

    } else if(type == 'tone'){
        const tone = [random(50, 100), random(100, 200), random(50, 200)].sort(() => 0.5 > Math.random());
        sendPalette(message, toneGenerator(length, tone), 'Tone');

    } else if(type == 'shadowlight'){
        const tone = [Math.random(), 1, 0.5];
        sendPalette(message, shadowLightGenerator(length, tone), 'Shadow Light');

    } else if(type == 'harmonic'){
        sendPalette(message, harmonicGenerator(length), 'Harmonic');

    } else if(type == 'triad'){
        sendPalette(message, triadGenerator(length, 0.2), 'Triad');

    } else if(type == 'gradient'){
        gradientGenerator(message, length, args);
    }
}