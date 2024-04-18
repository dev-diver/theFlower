class Flower extends Sprite {
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
    });

    this.velocity = { x: 0, y: 0 };
    //console.log(this.position)
  }

  update() {
    this.draw();
    this.velocity.x = -background.scrollSpeed;
    this.position.x += this.velocity.x;
  }
}

class Flowers {
  constructor() {
    this.flowers = [];
    this.data = [
      { dist: 1200, height: 240, type: "red" },
      { dist: 2000, height: 280, type: "sun" },
      { dist: 3600, height: 240, type: "pink" },
      { dist: 4100, height: 280, type: "purple" },
      { dist: 4800, height: 280, type: "yellow" },
    ];
    this.images = {
      red: "./img/flowers/red.png",
      pink: "./img/flowers/pink.png",
      purple: "./img/flowers/purple.png",
      yellow: "./img/flowers/yellow.png",
      sun: "./img/flowers/sun.png",
    };
  }

  newFlower(type, position) {
    let p = new Flower({
      imageSrc: this.images[type],
      position: position,
    });
    this.flowers.push(p);
    return p;
  }

  makeFlowers() {
    this.data.forEach((elem) => {
      let position = { x: elem.dist, y: elem.height };
      this.newFlower(elem.type, position);
    });
  }

  checkCollision(i) {
    if (this.flowers[i].position.x < player.position.x + player.width) {
      console.log("eat!");
      return true;
    }
    return false;
  }
  deleteFlower(i) {
    this.flowers.splice(i, 1);
  }

  update() {
    for (let i = this.flowers.length - 1; i >= 0; i--) {
      this.flowers[i].update();
      if (this.checkCollision(i)) {
        player.point++;
        this.deleteFlower(i);
      }
    }
  }
}
