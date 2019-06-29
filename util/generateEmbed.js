module.exports = async (name, value, color = Math.floor(Math.random() * 16777215)) => {
    return new Promise((resolve, reject) => {
        resolve({
                    embed: {
                    "color": color,
                    "timestamp": new Date(),
                    "footer": {
                        "text": "Alestria"
                    },
                    "fields": [
                        {
                            "name": name,
                            "value": value
                        }
                    ]
                }
            }
        );
    });
}