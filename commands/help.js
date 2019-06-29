const generateEmbedMultifield = require('../util/generateEmbedMultifield.js');
const random = require('../util/randomInt.js');

module.exports = async (message, args) => {
    if(args[1] == undefined){ // '**help' only
        const embed = await generateEmbedMultifield(
            'Alestria Bot Help:',
            [
            {
                name: 'About:',
                value: 'This is Alestria Bot\'s command center. View the commands below for more information. Also visit https://github.com/The3DSquare/Alestria for a complete guide to this bot.' 
            },
            {
                name: 'Help Commands:',
                value: '- `**help palette`\n' + 
                       '- `**help gradient`\n' + 
                       '- `**help filter`\n' + 
                       '- `**help view`'
            }
        ], random(0, 16777215));
        message.channel.send(embed);
    } else if(args[1] == 'palette'){
        const embed = await generateEmbedMultifield(
            'Palette help:',
            [          
            {
                name: 'About:',
                value: 'This command generates a color palette and supplies corresponding hex values.'
            },
            {
                name: 'Command: `**palette <count> <type>',
                value: '- Replace <count> with the number of colors you want to generate in the palette\n' +
                       '- Replace <type> with the palette type\n' +
                       '- Example: `**palette 6 harmonic`'
            },
            {
                name: 'Palette types:',
                value: '- pastel\n' +
                       '- tintedpastel\n' +
                       '- neon\n' +
                       '- tone\n' +
                       '- shadowlight\n' +
                       '- harmonic\n' +
                       '- triad\n' +
                       '- gradient (use `**help gradient` for more details)'
            },
        ], random(0, 16777215));
        message.channel.send(embed);
    } else if(args[1] == 'gradient'){
        const embed = await generateEmbedMultifield(
            'Palette help:',
            [
            {
                name: 'About:',
                value: 'This command generates a color palette based on a gradient algorithm and supplies corresponding hex values. There are thematic as well as random gradients you can use.'
            },
            {
                name: 'Command: `**palette <count> gradient <type>`',
                value: '- Replace <count> with the number of colors you want to generate in the palette\n' +
                       '- Replace <type> with the gradient type\n' +
                       '- Example: `**palette 6 gradient summergarden`'
            },
            {
                name: 'Gradient types',
                value: '- autumn\n' +
                       '- beach\n' +
                       '- earth\n' +
                       '- lavenderfield\n' +
                       '- mint\n' +
                       '- oceangem\n' +
                       '- random\n' +
                       '- renaissancefair\n' +
                       '- squashpatch\n' +
                       '- summergarden'
            },
        ], random(0, 16777215));
        message.channel.send(embed);
    } else if(args[1] == 'view'){
        const embed = await generateEmbedMultifield(
            'View help:',
            [
            {
                name: 'About:',
                value: 'This command displays hex color values.'
            },
            {
                name: 'Command: `**view <hex values>',
                value: '- Replace <hex values> with the hex values of colors you want to view\n' +
                       '- Example: `**view 9BCCC1 8E7D51 494C28 A02B3D C69847`'
            }
        ], random(0, 16777215));
        message.channel.send(embed);
    } else if(args[1] == 'filter'){
        const embed = await generateEmbedMultifield(
            'View help:',
            [
            {
                name: 'About:',
                value: 'This command applies various filters to images.'
            },
            {
                name: 'Command: `**filter <type> <resolution> <url>',
                value: '- Replace <type> with a filter type\n' +
                       '- Replace <resolution> with: `small`, `medium`, `large`, or `extralarge`\n' +
                       '- Replace <url> with a valid image URL\n' +
                       '    - Valid image URLs tend to end in `.jpg` or `.png`\n' +
                       '    - Only JPEG or PNG image types are supporte\n' +
                       '- Example: `**filter triangulate small https://raw.githubusercontent.com/The3DSquare/image-storage/master/Aurora.jpg`'
            },
            {
                name: 'Filter types',
                value: '- crystallize\n' +
                       '- pixelate\n' +
                       '- pointillism\n' +
                       '- triangulate'
            },
        ], random(0, 16777215));
        message.channel.send(embed);
    }
}