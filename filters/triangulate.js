const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas')    

const rgb2hex = require('../util/rgb2hex.js');
const PoissonDisk = require('poisson-disk-sampling');
const Delaunator = require('delaunator');

module.exports = (url, dataBuffer, imageSize, mode) => {
    const canvas = createCanvas(imageSize.width, imageSize.height);
    const ctx = canvas.getContext('2d');

    // image loaded to canvas
    const img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0)
    img.onerror = err => { throw err }
    img.src = dataBuffer;

    // poisson disc sampling
    const resolution = mode == 'small' ? 0.75 : mode == 'medium' ? 1.25 : mode == 'large' ? 1.75 : 2.25; // 0.5 = small, 1 = medium, 1.5 = large, 2 = extralarge
    const pointRadius = (imageSize.width < imageSize.height ? imageSize.width / 50 : imageSize.height / 50) * resolution;
    const viewport = [imageSize.width - pointRadius * 2, imageSize.height - pointRadius * 2];

    // middle region
    const minDistance = Math.floor(pointRadius), maxDistance = minDistance * 2, sampleRate = 30;
    const pointGenerator = new PoissonDisk(viewport, minDistance, maxDistance, sampleRate);
    const middlePoints = pointGenerator.fill().map(point => [point[0] + pointRadius, point[1] + pointRadius]);

    // edge points
    const topPoints = Array(Math.floor(imageSize.width / pointRadius)).fill(0).map((v, i) => [pointRadius * i + (Math.random() * pointRadius - pointRadius / 2), 0]);
    const bottomPoints = Array(Math.floor(imageSize.width / pointRadius)).fill(0).map((v, i) => [pointRadius * i + (Math.random() * pointRadius - pointRadius / 2), imageSize.height]);
    const leftPoints = Array(Math.floor(imageSize.height / pointRadius)).fill(0).map((v, i) => [0, pointRadius * i + (Math.random() * pointRadius - pointRadius / 2)]);
    const rightPoints = Array(Math.floor(imageSize.height / pointRadius)).fill(0).map((v, i) => [imageSize.width, pointRadius * i + (Math.random() * pointRadius - pointRadius / 2), 0]);

    const points = [...middlePoints, ...topPoints, ...bottomPoints, ...leftPoints, ...rightPoints];
    const delaunay = Delaunator.from(points);
    const triangles = delaunay.triangles;

    const canvas2 = createCanvas(imageSize.width, imageSize.height);
    const ctx2 = canvas2.getContext('2d');

    ctx2.fillStyle = '#FFFFFF';
    ctx2.fillRect(0, 0, imageSize.width, imageSize.height);
    ctx2.fillStyle = '#000000';

    for(let i = 0; i < triangles.length; i += 3){
        const p1 = points[triangles[i]],
            p2 = points[triangles[i + 1]],
            p3 = points[triangles[i + 2]];
        let triangleCenter = [(p1[0] + p2[0] + p3[0])/3, (p1[1] + p2[1] + p3[1])/3];
        if(triangleCenter[0] < 0) triangleCenter[0] = 1;
        else if(triangleCenter[0] > imageSize.width) triangleCenter[0] = imageSize.width - 1;

        if(triangleCenter[1] < 0) triangleCenter[1] = 1;
        else if(triangleCenter[1] > imageSize.height) triangleCenter[1] = imageSize.height - 1;

        const triangleColor = `#${rgb2hex(...ctx.getImageData(triangleCenter[0], triangleCenter[1], 1, 1).data)}`
        if(triangleCenter[0] < 0 || triangleCenter[0] > imageSize.width || triangleCenter[1] < 0 || triangleCenter[1] > imageSize.height) console.log(triangleCenter);

        ctx2.fillStyle = triangleColor;
        ctx2.strokeStyle = triangleColor;
        ctx2.beginPath()
        ctx2.lineTo(...p1);
        ctx2.lineTo(...p2);
        ctx2.lineTo(...p3);
        ctx2.lineTo(...p1);
        ctx2.closePath();
        
        ctx2.fill(); ctx2.stroke();
    }

    const fileName = `./temp/${url.slice(-8).replace(/[.\/\\]/g, '')}-${new Date().valueOf()}.png`;
    fs.writeFileSync(fileName, canvas2.toBuffer());
    return fileName;
}
