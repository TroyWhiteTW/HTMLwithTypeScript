let canvas;
let ctx;
const shape_array = new Array();
const gameLoop = () => {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1280, 720);
    for (let item of shape_array) {
        item.draw();
        item.x++;
    }
};
class cRectangle {
    constructor(x, y, width, height, color = 'blue', line_width = 2) {
        this.color = 'blue';
        this.lineWidth = 5;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = line_width;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }
}
class Circle {
    constructor(x, y, radius, color = 'red', line_width = 2) {
        this.x = 0;
        this.y = 0;
        this.radius = 10;
        this.lineWidth = 2;
        this.color = 'red';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = line_width;
        this.color = color;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}
class cPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class cAsteroid {
    constructor(x, y, size, color = 'white', line_width = 2) {
        this.color = 'white';
        this.lineWidth = 5;
        this.x = 0;
        this.y = 0;
        this.size = 20;
        this.rotation = 0;
        this.pointList = new Array();
        this.x = x;
        this.y = y;
        this.size = size;
        this.pointList.push(new cPoint(0, 3 * size));
        this.pointList.push(new cPoint(-1 * size, 2 * size));
        this.pointList.push(new cPoint(-2 * size, 2 * size));
        this.pointList.push(new cPoint(-3.5 * size, size));
        this.pointList.push(new cPoint(-3 * size, size));
        this.pointList.push(new cPoint(-4 * size, 0));
        this.pointList.push(new cPoint(-1 * size, -3 * size));
        this.pointList.push(new cPoint(2 * size, -4 * size));
        this.pointList.push(new cPoint(2 * size, -3 * size));
        this.pointList.push(new cPoint(4 * size, -2 * size));
        this.pointList.push(new cPoint(4 * size, size));
        this.pointList.push(new cPoint(3 * size, 2 * size));
        this.color = color;
        this.lineWidth = line_width;
    }
    draw() {
        this.rotation += 0.02;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);
        for (let item of this.pointList) {
            ctx.lineTo(item.x, item.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
class cSpaceShip {
    constructor(x, y, size, color = 'white', lime_width = 2) {
        this.color = 'white';
        this.lineWidth = 5;
        this.x = 0;
        this.y = 0;
        this.size = 20;
        this.pointList = new Array();
        this.x = x;
        this.y = y;
        this.size = size;
        this.pointList.push(new cPoint(3 * size, 0));
        this.pointList.push(new cPoint(-2 * size, -2 * size));
        this.pointList.push(new cPoint(-1 * size, 0));
        this.pointList.push(new cPoint(-2 * size, 2 * size));
        this.color = color;
        this.lineWidth = lime_width;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.lineTo(this.x + this.pointList[this.pointList.length - 1].x, this.y + this.pointList[this.pointList.length - 1].y);
        for (let item of this.pointList) {
            ctx.lineTo(this.x + item.x, this.y + item.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
window.onload = () => {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext('2d');
    shape_array.push(new Circle(500, 500, 50));
    shape_array.push(new Circle(70, 500, 20, 'pink', 4));
    shape_array.push(new cRectangle(200, 200, 200, 100));
    shape_array.push(new cRectangle(900, 300, 150, 30, 'purple'));
    shape_array.push(new cAsteroid(850, 600, 20));
    shape_array.push(new cSpaceShip(200, 450, 20));
    gameLoop();
};
