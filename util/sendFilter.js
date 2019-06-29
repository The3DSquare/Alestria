const fs = require('fs');

module.exports = async (message, fileName) => {
    message.channel.send({
        file: fileName
    }).then(async () => {
        fs.unlink(fileName, (err) => {
            if(err) console.log('sendFilter.js - unlink error', err);
        })
    }).catch(err => console.log('sendFilter.js - send image error' + err, fileName));
}