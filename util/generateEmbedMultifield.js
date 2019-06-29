module.exports = async (title, fields, color = Math.floor(Math.random() * 16777215)) => {
    return new Promise((resolve, reject) => {
        resolve({
                    embed: {
                    "color": color,
                    "timestamp": new Date(),
                    "title": title,
                    "footer": {
                        "text": "Alestria"
                    },
                    "fields": fields
                }
            }
        );
    });
}