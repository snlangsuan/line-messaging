function ImagemapArea(x, y, width, height) {
  this.build = function() {
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  }
}

module.exports = ImagemapArea;
