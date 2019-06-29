const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas')    

const random = require('../util/randomInt.js');
const rgb2hex = require('../util/rgb2hex.js');

module.exports = (url, dataBuffer, imageSize, mode) => {
    const canvas = createCanvas(imageSize.width, imageSize.height);
    const ctx = canvas.getContext('2d');

    // image loaded to canvas
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.onerror = err => { throw err }
    img.src = dataBuffer;

    const shorterSize = (imageSize.width > imageSize.height) ? imageSize.height : imageSize.width;
    
    const pixelSize = Math.round(shorterSize / 50) * (mode == 'small' ? 1 : (mode == 'medium' ? 2.5 : (mode == 'large' ? 4 : 5.5))); // divide shortest side by this
    const width = imageSize.width / pixelSize,
        height = imageSize.height / pixelSize;

    const canvas2 = createCanvas(width * pixelSize, height * pixelSize);
    const ctx2 = canvas2.getContext('2d');

    const sampleSize = 3;
        
    for(let y = 0; y < height - 1; y++){
        for(let x = 0; x < width - 1; x++){
            const TL = [x * pixelSize, y * pixelSize];
            const BR = [(x + 1) * pixelSize, (y + 1) * pixelSize];

            const samples = [0, 0, 0];
            for(let i = 0; i < sampleSize; i++){
                const rgbValues = ctx.getImageData(random(TL[0], BR[0]), random(TL[1], BR[1]), 1, 1).data;
                samples[0] += rgbValues[0];
                samples[1] += rgbValues[1];
                samples[2] += rgbValues[2];
            }
            const averageColors = [samples[0] / sampleSize, samples[1] / sampleSize, samples[2] / sampleSize];
            ctx2.fillStyle = `#${rgb2hex(...averageColors)}`
            ctx2.fillRect(TL[0], TL[1], pixelSize, pixelSize);
        }
    }

    const fileName = `./temp/${url.slice(-8).replace(/[.\/\\]/g, '')}-${new Date().valueOf()}.png`;
    fs.writeFileSync(fileName, canvas2.toBuffer());
    return fileName;
}