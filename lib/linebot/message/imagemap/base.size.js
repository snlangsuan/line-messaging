function ImagemapBaseSize(height, width) {
  this.build = function() {
    return {
      height: height,
      width: width
    };
  }
}

module.exports = ImagemapBaseSize;
