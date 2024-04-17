class Sign extends Sprite {
    constructor({
      imageSrc,
      position,
      scale = 0.6,
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

      this.velocity = {x: 0, y: 0}
      
  }
  
  update(){
    console.log(this.position)
    this.draw()
    this.velocity.x = -background.scrollSpeed
    this.position.x += this.velocity.x
  }
}

class Signs {
    constructor(){
        this.signs = []
        this.data = [
            {dist:-1000, height: 240, type:'sign1'},
            {dist:-2200, height: 240, type:'sign2'},
            {dist:-3400, height: 220, type:'sign3'},
            {dist:-4600, height: 280, type:'sign4'}, 
            {dist:-5800, height: 330, type:'sign5'},
            {dist:-6400, height: 240, type:'sign6'},
            {dist:-9200, height: 200, type:'sign7'}
        ]
        this.images = {
          sign1 : './img/signs/sign1.png',
          sign2 : './img/signs/sign2.png',
          sign3 : './img/signs/sign3.png',
          sign4 : './img/signs/sign4.png',
          sign5 : './img/signs/sign5.png',
          sign6 : './img/signs/sign6.png',
          sign7 : './img/signs/sign7.png'
      }
    }

    newSign(type, position){
        let p = new Sign({
          imageSrc: this.images[type], 
          position: position
        })
        this.signs.push(p)
        
        return p
    }

    makeSigns(){
        
        this.data.forEach((elem) => {
            let position = {x : elem.dist, y: elem.height}
            this.newSign(elem.type, position)
        })
    }

    update(){
        for(let i = this.signs.length-1; i>=0; i--){
            this.signs[i].update()
        }
    }
}