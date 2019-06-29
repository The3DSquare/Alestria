const random = require('../util/randomInt.js');
const hsl2hex = require('../util/hsl2hex.js');

module.exports = (length) => {
    const referenceAngle = Math.random() * 360;
    const offsetAngle1 = 120, offsetAngle2 = 240;
    const rangeAngle0 = random(20, 40), rangeAngle1 = random(20, 40), rangeAngle2 = random(20, 40);
    const saturation = 0.9;

    const colors = Array(length).fill(0).map(() => (
        randomAngle = Math.random() * (rangeAngle0 + rangeAngle1 + rangeAngle2),
        (randomAngle > rangeAngle0) ? 
            (randomAngle < rangeAngle0 + rangeAngle1) ? 
                randomAngle += offsetAngle1 
                : randomAngle += offsetAngle2
            : null,
        [((referenceAngle + randomAngle) / 360) % 1, saturation, Math.random() * 0.75 + 0.25]
    ));

    return colors.map(color => hsl2hex(...color));
}