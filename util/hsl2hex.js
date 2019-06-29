/**
 *  h, s, and l range: [0, 1]
 */

module.exports = (h, s, l) => {
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const rawHexArray = [Math.floor(r * 255).toString(16), Math.floor(g * 255).toString(16), Math.floor(b * 255).toString(16)];
    const paddedHexArray = rawHexArray.map(hex => hex.length < 2 ? `0${hex}` : hex);
    return paddedHexArray.join('');
}