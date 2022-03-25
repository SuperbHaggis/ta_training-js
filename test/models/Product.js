function Product(
  instanceNum,
  series,
  instance,
  gpu,
  gpuNum,
  ssd,
  location,
  years
) {
  this.instanceNum = instanceNum;
  this.series = series;
  this.instance = instance;
  this.gpu = gpu;
  this.gpuNum = gpuNum;
  this.ssd = ssd;
  this.location = location;
  this.years = years;
}

module.exports = Product;
