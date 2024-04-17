class Point extends Sprite {
    constructor({
      imageSrc,
      position,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset,
      })
      this.pointSrc = [
          './img/point/0.png',
          './img/point/1.png',
          './img/point/2.png',
          './img/point/3.png',
          './img/point/4.png',
          './img/point/5.png',
      ]
  }
  
  update(){
    this.image.src = this.pointSrc[player.point]
    this.draw()
  }
}