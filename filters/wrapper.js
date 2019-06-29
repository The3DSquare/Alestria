const fs = require('fs');                                                    
const { Image, createCanvas } = require('canvas')    
const fileType = require('file-type');
const sizeOf = require('image-size');
const request = require('request');

module.exports = async (rawUrl, mode, internalFunction) => {
    // aurora: http://db6rjmzmfh7la.cloudfront.net/wp-content/uploads/2015/09/7-wonders-northern-lights-1-780x456.jpg
    // flowers w/ snowy mountain: 'https://i.ytimg.com/vi/xRzVrpgLpUs/maxresdefault.jpg'
    let url = rawUrl;                    
    if(url.slice(0, 5) == 'https') url = (url = url.split(''), url.splice(4, 1), url.join(''));

    const options = {
        url: url,
        method: "get",
        encoding: null
    };

    const wrapper = await (new Promise((resolve, reject) => {
        request(options, async (error, response, body) => {
            if (error) {
                resolve('[£µ╓α]Bad image link. Try again later or find a new image URL.');
                return;
            }
            
            const dataBuffer = body;
            const _filetype = fileType(dataBuffer);

            if(_filetype == undefined){
                resolve('[£µ╓α]Bad image link. Try again later or find a new image URL.');
                return;
            }

            const mime = _filetype.mime;

            if(mime != 'image/jpeg' && mime != 'image/png'){
                resolve('[£µ╓α]Invalid File Format. Find another image URL or use `**help filter` for proper URL guidelines.');
                return;
            }

            const imageSize = await sizeOf(dataBuffer);

            if(imageSize.width < 128 || imageSize.height < 128){
                resolve('[£µ╓α]Image is too small. Choose an image with resolution higher than 128 x 128.');
                return;
            }

            const fileName = internalFunction(url, dataBuffer, imageSize, mode);

            resolve(fileName);
        })
    }));

    return wrapper;
}

