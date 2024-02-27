export class Player {
    constructor(){
        this.hp = 100;
        this.img = new Image();
        this.path = "./res/img/teemo.png";
        this.img.src = this.path;
        this.ratio = 0.2;
        this.size = {
            width: 300 * this.ratio,
            height: 500 * this.ratio,
        }
        this.position = {
            x: 1280 / 2 - this.size.width / 2,
            y: 470,
        }
        this.velocity = {
            x: 2,
            y: 1,
        }
        this.canShoot = true;
        this.dart = new Dart();
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.save(); // uloží současný stav štětce
        ctx.fillStyle = "red";
        ctx.fillRect(
            (this.position.x - this.size.width / 2) - 0.5,
            this.position.y + this.size.height + 10,
            this.hp,
            20
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            (this.position.x - this.size.width / 2) - 0.5,
            this.position.y + this.size.height + 10,
            100,
            20
        );
        ctx.restore(); // vrátí stav do předchozího uložení
    }
    update(keys) {
        this.movement(keys);
        this.attack(keys);
        // this.position.y = 470
    }
    movement(keys){
        if(keys["KeyA"]){
            if(this.position.x - this.velocity.x < 400) return;
            this.position.x -= this.velocity.x
        }
        if(keys["KeyD"]){
            if(this.position.x - this.velocity.x > 850) return;
            this.position.x += this.velocity.x
        }
    }
    attack(keys) {
        if(keys["Space"] && this.canShoot) {
            this.canShoot = false;
            this.dart.x = this.position.x + this.size.width / 2 - 5;
            this.dart.y = this.position.y - 30;
            this.dart.width = 10;
            this.dart.height = 20;
            this.dart.type = 0;
            this.dart.dmg = 10;
            this.dart.shoot(this);
        }
    }
    static detectHit(dart, player) {
        if (
          dart.x < player.position.x + player.size.width &&
          dart.x + dart.width > player.position.x &&
          dart.y < player.position.y + player.size.height &&
          dart.y + dart.height > player.position.y
        ) {
          dart.hit = true;
          player.hp -= dart.dmg;
          dart.x = -50;
          if (player.hp <= 0) {
            player.position.x = 2000;
          }
        }
      }
}

class Dart {
    constructor(){
        this.velocity = 2;
        this.hit = false;
    }
    async shoot(player){
        player.canShoot = false;
        this.y -= this.velocity;
        await new Promise(resolve => setTimeout(resolve, 1));
        if(this.hit){
            this.hit = false;
            return player.canShoot = true;
        }
        if(this.y + this.height > 0){
            return this.shoot(player);
        }
        player.canShoot = true;
    }

    draw(ctx){
        ctx.fillStyle = "lime";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
