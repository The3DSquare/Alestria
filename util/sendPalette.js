const { createCanvas } = require('canvas');
const fs = require('fs');
const generateEmbed = require('./generateEmbed.js');

module.exports = async (message, colors, paletteName) => {
    const maxWidth = 1680;
    const boxSize = maxWidth / colors.length;

    const canvas = createCanvas(maxWidth, boxSize);
    const ctx = canvas.getContext('2d');

    colors.forEach((color, i) => {
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(i * boxSize, 0, boxSize, boxSize);
    });

    const data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer.from(data, 'base64');
    const fileName = `./temp/${colors.join('-').slice(0, 64)}.png`;

    fs.writeFile(fileName, buffer, () => {
        message.channel.send({
            file: fileName
        }).then(async () => {
            const colorEmbed = await generateEmbed(`Colors (${paletteName}):`, colors.map(color => `#${`${color}`.toUpperCase()}`).join(', '), parseInt(colors[colors.length - 1], 16));
            message.channel.send(colorEmbed).then(() => {
                fs.unlink(fileName, (err) => {
                    if(err) console.log('sendPalette.js - unlink error', err);
                });
            }).catch(err => console.log('sendPalette.js - send embed error' + err));
        }).catch(err => console.log('sendPalette.js - send image error' + err));
    });
}