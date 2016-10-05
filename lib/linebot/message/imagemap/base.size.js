function ImagemapBaseSize(width, height) {
  this.build = function() {
    return {
      height: height,
      width: width
    };
  }
}

module.exports = ImagemapBaseSize;
