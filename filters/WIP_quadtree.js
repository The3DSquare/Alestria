const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas')    

const random = require('../util/randomInt.js');
const standardDeviation = require('../util/standardDeviation.js');
const rgb2hex = require('../util/rgb2hex.js');

module.exports = async (url, dataBuffer, imageSize, mode) => {
    const canvas = createCanvas(imageSize.width, imageSize.height);
    const ctx = canvas.getContext('2d');

    // image loaded to canvas
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.onerror = err => { throw err }
    img.src = dataBuffer;

    const shorterSize = (imageSize.width > imageSize.height) ? imageSize.height : imageSize.width;
    const canvas2 = createCanvas(shorterSize, shorterSize);
    const ctx2 = canvas2.getContext('2d');
    const cropDimensions = (imageSize.width > imageSize.height) ?
        // [cropXStart, cropYStart, cropWidth, cropHeight]
        [(imageSize.width - imageSize.height) / 2, 0, imageSize.height, imageSize.height] :
        [0, (imageSize.height - imageSize.width) / 2, imageSize.width, imageSize.width]
    ctx2.drawImage(img, ...cropDimensions, 0, 0, shorterSize, shorterSize);
        
    const baseNode = new QuadNode([0, 0], [shorterSize, shorterSize]);

    const samplingRate = 7;
    const threshhold = 15;
    const maxDepth = 7 - mode == 'small' ? 0 : mode == 'medium' ? 1 : mode == 'large' ? 2 : 3;
    const processNode = (node, depth, callback) => {
        const xRange = [node.TL[0], node.BR[0]];
        const yRange = [node.TL[1], node.BR[1]];

        const randomColors = Array(samplingRate).fill(0).map(() => {
            const randomPoint = [random(xRange[0], xRange[1]), random(yRange[0], yRange[1])];
            const rgbColors = ctx2.getImageData(randomPoint[0], randomPoint[1], 1, 1).data;
            return [rgbColors[0], rgbColors[1], rgbColors[2]];
        });

        const rColors = [], gColors = [], bColors = [];
        randomColors.forEach(color => {
            rColors.push(color[0]);
            gColors.push(color[1]);
            bColors.push(color[2]);
        });

        const averageDeviation = (standardDeviation(rColors) + standardDeviation(gColors) + standardDeviation(bColors)) / 3;
        if(averageDeviation > threshhold && depth < maxDepth){
            node.giveChildren();
            node.children.forEach(child => {
                processNode(child, depth + 1, () => {});
            });
        } else {
            ctx2.fillStyle = `#${rgb2hex(rColors.reduce((a, v) => a + v) / rColors.length, (gColors).reduce((a, v) => a + v) / rColors.length, (bColors).reduce((a, v) => a + v) / rColors.length)}`
            ctx2.fillRect(node.TL[0], node.TL[1], node.BR[0] - node.TL[0], node.BR[1] - node.TL[1]);
        }

        callback();
    }

    const finalName = await new Promise((resolve, reject) => {
        processNode(baseNode, 0, () => {
            const fileName = `./temp/${url.slice(-8).replace(/[.\/\\]/g, '')}-${new Date().valueOf()}.png`;
            fs.writeFileSync(fileName, canvas2.toBuffer());
            resolve(fileName);
        });
    });

    return finalName;
}

class QuadNode {
    constructor(p1TL, p2BR){
        this.TL = p1TL; // [x, y];
        this.BR = p2BR;

        this.color = [0, 0, 0];
        this.hasChildren = false;
        this.children = [];
    }

    giveChildren(){
        const TL = this.TL;
        const BR = this.BR;

        this.hasChildren = true;
        this.children = [
            new QuadNode(TL, [(TL[0] + BR[0]) / 2, (TL[1] + BR[1]) / 2]),
            new QuadNode([(TL[0] + BR[0]) / 2, TL[1]], [BR[0], (TL[1] + BR[1]) / 2]),
            new QuadNode([TL[0], (TL[1] + BR[1]) / 2], [(TL[0] + BR[0]) / 2, BR[1]]),
            new QuadNode([(TL[0] + BR[0]) / 2, (TL[1] + BR[1]) / 2], BR)
        ]
    }

    setColor(r, g, b){
        this.color = [r, g, b];
    }
}