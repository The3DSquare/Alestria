module.exports = (values) => {
    const mean = values.reduce((acc, val) => acc + val) / values.length;
    const devations = values.map(val => Math.pow(val - mean, 2));
    const deviationMean = devations.reduce((acc, val) => acc + val) / devations.length;
    return Math.sqrt(deviationMean);
}