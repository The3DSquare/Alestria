module.exports = (r, g, b) => {
    r = r > 255 ? 255 : r;
    g = g > 255 ? 255 : g;
    b = b > 255 ? 255 : b;
    const rawHexArray = [Math.floor(r).toString(16), Math.floor(g).toString(16), Math.floor(b).toString(16)];
    const paddedHexArray = rawHexArray.map(hex => hex.length < 2 ? `0${hex}` : hex);
    return paddedHexArray.join('');
}