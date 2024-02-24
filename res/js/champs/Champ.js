export class Champ {
  constructor(name, hp, dmg, mana, type) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.img = new Image();
    this.setType(type);
    this.img.src = this.path;
    this.ratio = 0.18;
    this.size = {
      width: 500 * this.ratio,
      height: 500 * this.ratio,
    };
    this.position = {
      x: 600,
      y: 10,
    };
    this.velocity = {
      x: 1,
      y: 1,
    };
    this.canShoot = true;
    this.dart = new EnemyDart();
  }

  update() {
    this.move();
    this.attack();
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x >= 750) {
      this.velocity.x *= -1;
      this.velocity.y = -1;
      this.position.y = 99;
    }
    if (this.position.x <= 450) {
      this.velocity.x *= -1;
      this.velocity.y = -1;
      this.position.y = 99;
    }
    if (this.position.y <= 10) {
      this.velocity.y = 0;
    }
    if (
      this.position.x >= 595 &&
      this.position.x <= 605 &&
      this.position.y === 10
    ) {
      this.velocity.y = 1;
    }
    if (this.position.y >= 100) {
      this.velocity.y = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.save(); // uloží současný stav štětce
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x - 15, this.position.y - 20, this.hp, 20);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.position.x - 15, this.position.y - 20, 100, 20);
    ctx.restore(); // vrátí stav do předchozího uložení
  }

  attack() {
    if (
      (this.position.y == 100 && this.position.x == 460) ||
      (this.position.y == 100 && this.position.x == 740) || 
      (this.position.y == 10 && this.position.x == 590) ||
      (this.position.y == 10 && this.position.x == 605)
    ) {
      this.canShoot = false;
      this.dart.x = this.position.x + this.size.width / 2 - 5;
      this.dart.y = this.position.y + 40;
      this.dart.width = 10;
      this.dart.height = 20;
      this.dart.type = 0;
      this.dart.dmg = 10;
      this.dart.shoot(this);
    }
  }

  setType(type) {
    const paths = [
      "./res/img/teemo.png",
      "./res/img/caitlyn.png",
      "./res/img/ezreal.png",
      "./res/img/jinx.png",
      "./res/img/vayne.png",
    ];
    this.path = paths[type];
  }

  static detectHit(dart, champ) {
    if (
      dart.x < champ.position.x + champ.size.width &&
      dart.x + dart.width > champ.position.x &&
      dart.y < champ.position.y + champ.size.height &&
      dart.y + dart.height > champ.position.y
    ) {
      dart.hit = true;
      champ.hp -= dart.dmg;
      dart.x = -50;
      if (champ.hp <= 0) {
        champ.position.x = 2000;
      }
    }
  }
}

class EnemyDart {
  constructor() {
    this.velocity = 1.5;
    this.hit = false;
  }
  async shoot(champ) {
    this.canShoot = false;
    this.y += this.velocity;
    await new Promise((resolve) => setTimeout(resolve, 1));
    if (this.hit) {
      this.hit = false;
      return (this.canShoot = true);
    }
    if (this.y + this.height > 0) {
      return this.shoot();
    }
    this.canShoot = true;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
