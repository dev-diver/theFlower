class LoopImage {
  constructor({
    position,
    imageSrc,
    scale = 1,
  }){
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.x = position.x
    this.y = position.y
    this.scrollSpeed = 0;
  }

  draw(){
    c.drawImage(this.image, this.x, this.y)
    c.drawImage(this.image, this.x + this.image.width, this.y)
    c.drawImage(this.image, this.x - this.image.width, this.y)
  }

  animateFrames(){
    this.x -= this.scrollSpeed;
    if(this.x <= -this.image.width || this.x >= this.image.width){ this.x = 0}
  }

  update(){
    this.draw()
    this.animateFrames()
  }
}

class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.image = new Image()
      this.image.src = imageSrc
      this.width = this.image.width
      this.height = this.image.height
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 10
      this.offset = offset
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    animateFrames() {
      this.framesElapsed++  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }
  
    update() {
      this.draw()
      this.animateFrames()
    }
  }
 
class Item extends Sprite {
  constructor({
    position,
    velocity,
    color = 'pink',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    })
    this.velocity = velocity
    this.color = color
    this.sprites = sprites
  }

  update(){
    this.draw()
  }
}
  
class Character extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset,
      })
      
      this.velocity = velocity
      this.lastKey
      this.color = color
      this.point = 0
      this.framesHold = 8
      this.sprites = sprites
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
  
    update() {
      
      this.draw()

      this.width = this.image.width/this.framesMax
      this.height = this.image.height
      c.fillStyle = this.color

      this.animateFrames()
  
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      
    }

    switchSprite(sprite) {  

      if (this.image !== this.sprites[sprite].image) {
        this.image = this.sprites[sprite].image
        this.framesMax = this.sprites[sprite].framesMax
        this.framesCurrent = 0
      }

    }
  }