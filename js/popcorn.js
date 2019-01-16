// children si taste
// timeout
// Main
window.onload = function () {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    canvas.style.overflowX = 'hidden';

    let mousePosX = 0, position;
    canvas.addEventListener('mousemove', (event) => {
        mousePosX = event.clientX;
    });

    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowLeft') {
            position -= 10;
        }
        if (event.key == 'ArrowRight') {
            position += 10;
        }
    });

    let trigger = false;
    canvas.addEventListener('click', () => {
        if (trigger == false) trigger = true;
    });

    class Game {
        constructor(canvas) {
            console.log("The game has been created");
            this.fallingObjects = [];
            this.bucket;
            this.score = 0;
            this.bgImg = document.querySelector('#bg');
        }

        start() {
            console.log("The game has started!");

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            position = canvas.width / 2;

            ctx.textAlign = 'center';
            ctx.font = "30px Arial";
            ctx.fillText("Apasa pe ecran pentru a incepe!", canvas.width / 2, canvas.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Poti utiliza mouse-ul sau sagetelele pentru a te misca.", canvas.width / 2, canvas.height / 2 + 30);

            for (let i = 0; i < 5; i++) {
                this.fallingObjects.push(new FallingObject('popcorn', Math.random() * canvas.width, -50, 3 + Math.random() * 1));
            }

            for (let i = 0; i < 5; i++) {
                this.fallingObjects.push(new FallingObject('bomb', Math.random() * canvas.width, -50, 3 + Math.random() * 1));
            }

            this.bucket = new Bucket(0, canvas.height - 100);

            this.gameEnd = false;

            this.gameLoop = window.setInterval(() => {
                if (trigger) {
                    console.log("Game is running!" + this.score);
                    this.update();
                    this.draw();
                    if (this.gameEnd) {
                        this.reset();
                    }
                }
            }, 36);
        }

        reset() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.bgImg, 0, 0);
            trigger = false;
            window.clearInterval(this.gameLoop);
            setTimeout(() => {
                console.log("Game has stopped!");

                ctx.fillStyle = "white";
                ctx.textAlign = 'center';
                ctx.font = "30px Arial";
                ctx.fillText("Scorul tau este: " + this.score, canvas.width / 2, canvas.height / 2);
                ctx.font = "20px Arial";

                if (this.score >= 100) {
                    ctx.fillText("Poti folosi codul VSAX23 pentru a primi o portie de popcorn gratis! :D", canvas.width / 2, canvas.height / 2 + 30);
                } else {
                    ctx.fillText("Ne pare rau dar iti trebuie un scor mai mare de 100 pentru a castiga portia de popcorn!:(", canvas.width / 2, canvas.height / 2 + 30);
                }
            }, 1000);
        }

        collision(object) {
            let bucket = this.bucket;
            return object.x < bucket.x + bucket.width &&
                object.x + object.width > bucket.x &&
                object.y < object.y + bucket.height &&
                object.y + object.height > bucket.y;
        }

        draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this.bgImg, 0, 0);

            // Score
            ctx.fillStyle = "white";
            ctx.fillText("Score: " + this.score, 80, 30);

            // Objects
            this.fallingObjects.forEach((object) => {
                object.draw();
            });

            // Bucket
            this.bucket.draw();
        }

        update() {
            // Objects
            this.fallingObjects.forEach((object) => {
                if (this.collision(object)) {
                    if (object.type == 'popcorn') {
                        object.y = -25;
                        this.score += 10;
                    } else if (object.type == 'bomb') {
                        this.gameEnd = true;
                    }
                }
                object.update();
            });

            // Bucket
            this.bucket.update();
        }
    }

    class FallingObject {
        constructor(type, x, y, speed) {
            console.log(type + " created at " + x + ' ' + y);
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 50;
            this.type = type;
            this.speed = speed;
            this.popcornImg = document.querySelector('#popcorn');
            this.bombImg = document.querySelector('#bomb');
        }

        draw() {
            if (this.type == 'popcorn') {
                ctx.drawImage(this.popcornImg, this.x, this.y, this.width, this.height);
            } else if (this.type == 'bomb') {
                ctx.drawImage(this.bombImg, this.x, this.y, this.width, this.height);
            }
        }

        update() {
            if (this.y >= canvas.height) {
                this.y = -25;
                this.x = Math.random() * canvas.width;
            }
            this.y += this.speed;
        }
    }

    class Bucket {
        constructor(x, y) {
            console.log("Bucket created!");
            this.x = x;
            this.y = y;
            this.width = 100;
            this.height = 100;
            this.bucketImg = document.querySelector('#bucket');
        }

        moveLeft() {
            this.x -= 10;
        }

        moveRight() {
            this.x += 10;
        }

        followMouseX() {
            this.x = mousePosX;
        }

        followPosition() {
            this.x = position;
        }

        draw() {
            ctx.drawImage(this.bucketImg, this.x, this.y, this.width, this.height);
        }

        update() {
            //this.followMouseX();
            this.followPosition();
        }
    }

    let game = new Game(canvas);
    game.start();
}