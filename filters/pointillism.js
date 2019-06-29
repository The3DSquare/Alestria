const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas');

const rgb2hex = require('../util/rgb2hex.js');
const PoissonDisk = require('poisson-disk-sampling');

module.exports = (url, dataBuffer, imageSize, mode) => {
    const canvas = createCanvas(imageSize.width, imageSize.height);
    const ctx = canvas.getContext('2d');

    // image loaded to canvas
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.onerror = err => { throw err }
    img.src = dataBuffer;


    // poisson disc sampling
    const viewport = [imageSize.width, imageSize.height];
    const resolution = mode == 'small' ? 0.5 : mode == 'medium' ? 1 : mode == 'large' ? 1.5 : 2;; // 0.5 = small, 1 = medium, 1.5 = large, 2 = extralarge
    const pointRadius = (imageSize.width < imageSize.height ? imageSize.width / 50 : imageSize.height / 50) * resolution;
    const minDistance = Math.floor(pointRadius), maxDistance = minDistance * 2, sampleRate = 30;
    const pointGenerator = new PoissonDisk(viewport, minDistance, maxDistance, sampleRate);
    const points = pointGenerator.fill();

    const canvas2 = createCanvas(imageSize.width, imageSize.height);
    const ctx2 = canvas2.getContext('2d');

    ctx2.fillStyle = '#FFFFFF';
    ctx2.fillRect(0, 0, imageSize.width, imageSize.height);

    points.forEach(point => {
        const colorData = ctx.getImageData(point[0], point[1], 1, 1).data;
        const cellColor = `#${rgb2hex(colorData[0], colorData[1], colorData[2])}`;

        ctx2.fillStyle = cellColor;
        ctx2.beginPath();
        ctx2.arc(point[0], point[1], pointRadius / 2, 0, 2 * Math.PI);
        ctx2.fill();
    });

    const fileName = `./temp/${url.slice(-8).replace(/[.\/\\]/g, '')}-${new Date().valueOf()}.png`;
    fs.writeFileSync(fileName, canvas2.toBuffer());
    return fileName;
}
