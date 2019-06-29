const generateEmbed = require('../util/generateEmbed.js');
const random = require('../util/randomInt.js');
const sendFilter = require('../util/sendFilter.js');

const wrapper = require('../filters/wrapper.js');

const triangulate = require('../filters/triangulate.js');
const crystallize = require('../filters/crystallize.js');
const pixelate = require('../filters/pixelize.js');
const pointillism = require('../filters/pointillism.js');


const filterNames = [
    'triangulate',
    'crystallize',
    'pixelate',
    'pointillism',
];

const sizes = [
    'small', 
    'medium',
    'large',
    'extralarge'
]

module.exports = async (message, args) => {
    if(args[1] == undefined || !filterNames.includes(args[1])){
        const embed = await generateEmbed(
            `Error: Missing or invalid filter type`, 
            `Use \`**help filter\` for more information.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    if(args[2] == undefined || !sizes.includes(args[2])){
        const embed = await generateEmbed(
            `Error: Missing or invalid filter resoluion`, 
            `Use \`**help filter\` for more information.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    if(args[3] == undefined){
        const embed = await generateEmbed(
            `Error: Missing link/URL`, 
            `Use \`**help filter\` for more information.`,
            16711680);
        message.channel.send(embed);
        return;
    }

    const type = args[1];
    const resolution = args[2]; // aka mode
    const url = args[3];

    let error = -1;

    if(type == 'triangulate'){
        const fileName = await wrapper(url, resolution, (url, dataBuffer, imageSize, mode) => triangulate(url, dataBuffer, imageSize, mode));
        if(fileName.slice(0, 6) != '[£µ╓α]') sendFilter(message, fileName);
        else error = fileName;
    } else if(type == 'crystallize'){
        console.log(args);
        const fileName = await wrapper(url, resolution, (url, dataBuffer, imageSize, mode) => crystallize(url, dataBuffer, imageSize, mode));
        if(fileName.slice(0, 6) != '[£µ╓α]') sendFilter(message, fileName);
        else error = fileName;
    } else if(type == 'pixelate'){
        const fileName = await wrapper(url, resolution, (url, dataBuffer, imageSize, mode) => pixelate(url, dataBuffer, imageSize, mode));
        if(fileName.slice(0, 6) != '[£µ╓α]') sendFilter(message, fileName);
        else error = fileName;
    } else if(type == 'pointillism'){
        const fileName = await wrapper(url, resolution, (url, dataBuffer, imageSize, mode) => pointillism(url, dataBuffer, imageSize, mode));
        if(fileName.slice(0, 6) != '[£µ╓α]') sendFilter(message, fileName);
        else error = fileName;
    }

    if(error != -1){
        const embed = await generateEmbed(
            `Filter Error:`, 
            error.slice(6),
            16711680);
        message.channel.send(embed);
    }
}