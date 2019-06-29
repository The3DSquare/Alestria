const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas')    

const Vonoroi = require('../util/vonoroi.js');
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
    const resolution = mode == 'small' ? 0.5 : mode == 'medium' ? 1 : mode == 'large' ? 1.5 : 2; // 0.5 = small, 1 = medium, 1.5 = large, 2 = extralarge
    const minDistance = Math.floor((imageSize.width < imageSize.height ? imageSize.width / 50 : imageSize.height / 50) * resolution), maxDistance = minDistance * 2, sampleRate = 30;
    const pointGenerator = new PoissonDisk(viewport, minDistance, maxDistance, sampleRate);
    const points = pointGenerator.fill();

    // draw vonoroi
    const vonoroi = new Vonoroi();
    const bbox = {xl: 0, xr: imageSize.width, yt: 0, yb: imageSize.height};
    const sites = points.map(point => {
        return {x: point[0], y: point[1]}
    });
    const diagram = vonoroi.compute(sites, bbox);
    const cells = diagram.cells;

    const canvas2 = createCanvas(imageSize.width, imageSize.height);
    const ctx2 = canvas2.getContext('2d');

    ctx2.fillStyle = '#FFFFFF';
    ctx2.fillRect(0, 0, imageSize.width, imageSize.height);

    ctx2.strokeStyle = '#000000';
    ctx2.lineWidth = 0;

    cells.forEach(cell => {
        const cellSite = cell.site;
        const colorData = ctx.getImageData(cellSite.x, cellSite.y, 1, 1).data;
        const cellColor = `#${rgb2hex(colorData[0], colorData[1], colorData[2])}`
        ctx2.fillStyle = cellColor; ctx2.strokeStyle = cellColor;

        const edges = cell.halfedges;
        ctx2.beginPath()
        edges.forEach(edge => {
            let start = edge.getStartpoint(),
                end = edge.getEndpoint();

            ctx2.lineTo(start.x, start.y)
            ctx2.lineTo(end.x, end.y) 
        });
        ctx2.closePath();
        ctx2.fill(); ctx2.stroke();
    });
        
    const fileName = `./temp/${url.slice(-8).replace(/[.\/\\]/g, '')}-${new Date().valueOf()}.png`;
    fs.writeFileSync(fileName, canvas2.toBuffer());

    return fileName;
}

